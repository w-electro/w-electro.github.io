# OCR Service - Google Cloud Run Deployment Guide

This guide explains how to deploy the OCR backend service to Google Cloud Run.

## Prerequisites

1. Google Cloud account with billing enabled (Free tier includes 2M requests/month)
2. Google Cloud CLI installed ([Install gcloud](https://cloud.google.com/sdk/docs/install))
3. Google Cloud Vision API credentials (service account JSON)

## Step 1: Set Up Google Cloud Project

```bash
# Login to Google Cloud
gcloud auth login

# Create a new project (or use existing one)
gcloud projects create w-electro-ocr --name="W-ELECTRO OCR Service"

# Set the project as default
gcloud config set project w-electro-ocr

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable vision.googleapis.com
```

## Step 2: Prepare Google Cloud Vision Credentials

You need to store your Google Cloud Vision API credentials as a secret:

```bash
# Create the credentials as a base64-encoded secret
# Replace 'your-credentials.json' with your actual service account file
cat your-credentials.json | base64 > credentials-base64.txt

# Create secret in Secret Manager
gcloud services enable secretmanager.googleapis.com
gcloud secrets create GOOGLE_CREDENTIALS_JSON --data-file=your-credentials.json
```

## Step 3: Build and Deploy to Cloud Run

### Option A: Deploy with gcloud (Recommended)

```bash
# Navigate to the ocr-backend directory
cd ocr-backend

# Deploy to Cloud Run (this will build and deploy in one command)
gcloud run deploy w-electro-ocr \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 1Gi \
  --cpu 1 \
  --timeout 600 \
  --max-instances 10 \
  --set-secrets=GOOGLE_CREDENTIALS_JSON=GOOGLE_CREDENTIALS_JSON:latest
```

### Option B: Build with Docker first, then deploy

```bash
# Set your project ID
export PROJECT_ID=w-electro-ocr

# Build the Docker image
gcloud builds submit --tag gcr.io/$PROJECT_ID/w-electro-ocr

# Deploy the built image
gcloud run deploy w-electro-ocr \
  --image gcr.io/$PROJECT_ID/w-electro-ocr \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 1Gi \
  --cpu 1 \
  --timeout 600 \
  --max-instances 10 \
  --set-secrets=GOOGLE_CREDENTIALS_JSON=GOOGLE_CREDENTIALS_JSON:latest
```

## Step 4: Get Your Service URL

After deployment, you'll see output like:

```
Service [w-electro-ocr] revision [w-electro-ocr-00001-abc] has been deployed and is serving 100 percent of traffic.
Service URL: https://w-electro-ocr-xxxxxxxxx-uc.a.run.app
```

**Save this URL** - you'll need to update your frontend OCR page to use this endpoint.

## Step 5: Test Your Deployment

```bash
# Test the health endpoint
curl https://w-electro-ocr-xxxxxxxxx-uc.a.run.app/api/health

# Expected response:
# {"message":"OCR service is running","status":"healthy"}
```

## Step 6: Update Frontend Configuration

Update your `ocr.html` file to point to the new Cloud Run URL:

```javascript
// Replace the old Render URL with your new Cloud Run URL
const API_URL = 'https://w-electro-ocr-xxxxxxxxx-uc.a.run.app';
```

## Cost Estimation (Free Tier)

Google Cloud Run free tier includes:
- 2 million requests per month
- 360,000 GB-seconds of compute time
- 180,000 vCPU-seconds of compute time
- 1 GB outbound data transfer (to North America)

For typical OCR usage (< 10,000 requests/month), you'll stay **completely free**.

## Monitoring and Logs

```bash
# View logs
gcloud run services logs read w-electro-ocr --limit=50

# View service details
gcloud run services describe w-electro-ocr --region=us-central1
```

## Updating the Service

When you make changes to the code:

```bash
# Simply redeploy (Cloud Run will rebuild)
gcloud run deploy w-electro-ocr \
  --source . \
  --platform managed \
  --region us-central1
```

## Custom Domain (Optional)

To use a custom domain like `ocr.w-electro.com`:

```bash
# Map your domain
gcloud run domain-mappings create \
  --service w-electro-ocr \
  --domain ocr.w-electro.com \
  --region us-central1
```

Then add the DNS records shown in the output to your domain registrar.

## Security Notes

- The service is configured with `--allow-unauthenticated` for public access
- CORS is already configured in the Flask app to accept requests from your domain
- Credentials are stored securely in Secret Manager
- The container runs as a non-root user for security

## Troubleshooting

### Error: Permission Denied

```bash
# Grant the Cloud Run service account access to the secret
gcloud secrets add-iam-policy-binding GOOGLE_CREDENTIALS_JSON \
  --member=serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com \
  --role=roles/secretmanager.secretAccessor
```

### Error: Build Timeout

Increase the timeout:
```bash
gcloud config set builds/timeout 1200
```

### Check Service Health

```bash
curl https://YOUR-SERVICE-URL/api/health
```

## Support

For issues or questions, refer to:
- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Google Cloud Vision API Documentation](https://cloud.google.com/vision/docs)
