from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import tempfile
from dotenv import load_dotenv
import logging
import json
from google.cloud import vision
from google.oauth2 import service_account
import io

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for your front-end domain
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# Set up Google Cloud credentials
google_credentials_json = os.environ.get("GOOGLE_CREDENTIALS_JSON")
if google_credentials_json:
    # For production: use credentials from environment variable
    try:
        info = json.loads(google_credentials_json)
        credentials = service_account.Credentials.from_service_account_info(info)
        logger.info("Successfully loaded Google credentials from environment variable")
    except Exception as e:
        logger.error(f"Error parsing credentials from environment: {str(e)}")
        raise
else:
    # For local development: fallback to file
    try:
        credentials_path = os.environ.get("GOOGLE_CREDENTIALS_PATH", "D:\Secure\euphoric-effect-411201-f016c1b7d091.json")
        credentials = service_account.Credentials.from_service_account_file(credentials_path)
        logger.info(f"Successfully loaded Google credentials from file: {credentials_path}")
    except Exception as e:
        logger.error(f"Error loading credentials from file: {str(e)}")
        raise

# Initialize vision client
vision_client = vision.ImageAnnotatorClient(credentials=credentials)

# Configure upload settings
ALLOWED_EXTENSIONS = {'pdf', 'jpg', 'jpeg', 'png'}
MAX_CONTENT_LENGTH = 50 * 1024 * 1024  # 50MB

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "OCR service is running"}), 200

@app.route('/api/ocr', methods=['POST'])
def process_ocr():
    """
    Process OCR on an uploaded file using Google Cloud Vision API
    """
    # Check if file was submitted
    if 'file' not in request.files:
        return jsonify({"success": False, "error": "No file part in the request"}), 400
    
    file = request.files['file']
    
    # Check if file is empty
    if file.filename == '':
        return jsonify({"success": False, "error": "No file selected"}), 400
    
    # Check file size
    if request.content_length > MAX_CONTENT_LENGTH:
        return jsonify({"success": False, "error": f"File size exceeds maximum limit of {MAX_CONTENT_LENGTH/1024/1024}MB"}), 413
    
    # Check if file extension is allowed
    if not allowed_file(file.filename):
        return jsonify({
            "success": False, 
            "error": f"File type not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
        }), 400
    
    # Save the file to a temporary location
    temp_file = None
    try:
        # Create a temporary file with the same extension as the original
        extension = os.path.splitext(file.filename)[1]
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=extension)
        file.save(temp_file.name)
        temp_file.close()
        
        logger.info(f"Processing file: {file.filename}")
        
        # Process based on file type
        if extension.lower() in ['.jpg', '.jpeg', '.png']:
            # For images, use the Vision API directly
            with open(temp_file.name, 'rb') as image_file:
                content = image_file.read()
            
            image = vision.Image(content=content)
            response = vision_client.text_detection(
                image=image,
                image_context={"language_hints": ["ar"]}  # Add Arabic language hint
            )
            
            if response.error.message:
                raise Exception(f"API Error: {response.error.message}")
                
            texts = response.text_annotations
            if texts:
                # First element contains all the text
                extracted_text = texts[0].description
            else:
                extracted_text = "No text detected in the image."
            
            page_count = 1
                
        elif extension.lower() == '.pdf':
            # For PDFs, convert all pages and process each one
            try:
                # Import only when needed
                from pdf2image import convert_from_path
                
                logger.info(f"Converting PDF to images: {file.filename}")
                
                # Convert all PDF pages to images
                images = convert_from_path(temp_file.name, 300)
                
                if not images:
                    return jsonify({"success": False, "error": "Failed to convert PDF to images"}), 500
                
                extracted_text = ""
                page_count = 0
                
                # Process each page
                for i, image in enumerate(images):
                    page_count += 1
                    logger.info(f"Processing page {page_count}")
                    
                    # Convert PIL Image to bytes
                    img_byte_arr = io.BytesIO()
                    image.save(img_byte_arr, format='PNG')
                    img_byte_arr = img_byte_arr.getvalue()
                    
                    # Process with Vision API
                    vision_image = vision.Image(content=img_byte_arr)
                    response = vision_client.document_text_detection(
                        image=vision_image,
                        image_context={"language_hints": ["ar"]}
                    )
                    
                    if response.error.message:
                        logger.error(f"Error on page {page_count}: {response.error.message}")
                        continue
                    
                    # Extract text from response
                    if response.full_text_annotation:
                        page_text = response.full_text_annotation.text
                        extracted_text += f"--- Page {page_count} ---\n\n{page_text}\n\n"
                    else:
                        extracted_text += f"--- Page {page_count} ---\n\nNo text detected on this page.\n\n"
                
                if not extracted_text:
                    extracted_text = "No text detected in the PDF."
                
            except Exception as e:
                logger.error(f"Error processing PDF: {str(e)}")
                return jsonify({"success": False, "error": f"Error processing PDF: {str(e)}"}), 500
        
        # Return the results
        return jsonify({
            "success": True,
            "markdown": extracted_text,
            "page_count": page_count,
            "file_name": os.path.splitext(file.filename)[0] + "_ocr.txt"
        }), 200
        
    except Exception as e:
        logger.error(f"Error processing OCR: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500
    
    finally:
        # Clean up temporary file
        if temp_file and os.path.exists(temp_file.name):
            os.unlink(temp_file.name)

@app.route('/api/ocr-download', methods=['POST'])
def process_ocr_download():
    """
    Process OCR on an uploaded file and return a downloadable file
    """
    # Get the result from the regular OCR process
    result = process_ocr()
    
    # If it's not successful, return the error
    if isinstance(result, tuple) and result[1] != 200:
        return result
        
    # Get the data from the response
    data = result[0].json
    
    if data["success"]:
        # Create a temporary file with the extracted text
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".txt", mode="w", encoding="utf-8")
        temp_file.write(data["markdown"])
        temp_file.close()
        
        # Return the file for download
        return send_file(
            temp_file.name,
            as_attachment=True,
            download_name=data["file_name"],
            mimetype="text/plain"
        )
    else:
        return jsonify(data), result[1]

if __name__ == '__main__':
    # Get port from environment or default to 5000
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)