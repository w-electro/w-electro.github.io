"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { ArrowLeftRight, Upload, Download, Loader2, Combine, Split, Minimize2, Image as ImageIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const pdfTools = [
  { name: "دمج", href: "/tools/pdf/merge", icon: Combine },
  { name: "تقسيم", href: "/tools/pdf/split", icon: Split },
  { name: "ضغط", href: "/tools/pdf/compress", icon: Minimize2 },
  { name: "تحويل", href: "/tools/pdf/convert", icon: ArrowLeftRight },
];

export default function PDFConvertPage() {
  const [mode, setMode] = useState<'pdf-to-images' | 'images-to-pdf'>('pdf-to-images');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handlePdfToImages = async () => {
    if (!pdfFile) return;

    setIsProcessing(true);
    setStatus({ type: null, message: '' });

    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;

      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const scale = 2;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        const imgData = canvas.toDataURL('image/png').split(',')[1];
        zip.file(`page-${i}.png`, imgData, { base64: true });
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${pdfFile.name.replace('.pdf', '')}-images.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus({ type: 'success', message: `تم تحويل ${numPages} صفحة إلى صور بنجاح!` });
    } catch (error) {
      console.error('PDF to Images Error:', error);
      setStatus({ type: 'error', message: 'حدث خطأ أثناء تحويل الملف' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImagesToPdf = async () => {
    if (imageFiles.length === 0) return;

    setIsProcessing(true);
    setStatus({ type: null, message: '' });

    try {
      const { PDFDocument } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.create();

      for (const file of imageFiles) {
        const arrayBuffer = await file.arrayBuffer();
        let image;

        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          continue;
        }

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'images-combined.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus({ type: 'success', message: `تم تحويل ${imageFiles.length} صورة إلى PDF بنجاح!` });
    } catch (error) {
      console.error('Images to PDF Error:', error);
      setStatus({ type: 'error', message: 'حدث خطأ أثناء تحويل الصور' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-4">
              <ArrowLeftRight className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
              تحويل PDF
            </h1>
            <p className="text-gray-600 text-lg">حول PDF إلى صور أو اجمع الصور في PDF</p>
          </div>

          <ToolNavigation tools={pdfTools} category="PDF" />

          {/* Mode Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => { setMode('pdf-to-images'); setPdfFile(null); setImageFiles([]); setStatus({ type: null, message: '' }); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                mode === 'pdf-to-images'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FileText className="h-5 w-5" />
              PDF → صور
            </button>
            <button
              onClick={() => { setMode('images-to-pdf'); setPdfFile(null); setImageFiles([]); setStatus({ type: null, message: '' }); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                mode === 'images-to-pdf'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ImageIcon className="h-5 w-5" />
              صور → PDF
            </button>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              {mode === 'pdf-to-images' ? (
                <>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">تحويل PDF إلى صور</h3>
                    <p className="text-gray-600 mb-4">اختر ملف PDF لتحويله إلى صور PNG</p>
                    <Button onClick={() => pdfInputRef.current?.click()}>
                      اختر ملف PDF
                    </Button>
                    <input
                      ref={pdfInputRef}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPdfFile(file);
                          setStatus({ type: null, message: '' });
                        }
                      }}
                    />
                  </div>

                  {pdfFile && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-semibold">{pdfFile.name}</p>
                          <p className="text-sm text-gray-500">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <Button variant="outline" onClick={() => setPdfFile(null)}>
                          تغيير الملف
                        </Button>
                      </div>
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handlePdfToImages}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                            جاري التحويل...
                          </>
                        ) : (
                          <>
                            <ImageIcon className="ml-2 h-5 w-5" />
                            تحويل إلى صور
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <ImageIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">تحويل صور إلى PDF</h3>
                    <p className="text-gray-600 mb-4">اختر صور JPG أو PNG لدمجها في ملف PDF واحد</p>
                    <Button onClick={() => imageInputRef.current?.click()}>
                      اختر صور
                    </Button>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          setImageFiles(Array.from(files));
                          setStatus({ type: null, message: '' });
                        }
                      }}
                    />
                  </div>

                  {imageFiles.length > 0 && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-semibold">{imageFiles.length} صورة محددة</p>
                          <p className="text-sm text-gray-500">
                            {imageFiles.map(f => f.name).join(', ').slice(0, 50)}...
                          </p>
                        </div>
                        <Button variant="outline" onClick={() => setImageFiles([])}>
                          إزالة الكل
                        </Button>
                      </div>
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleImagesToPdf}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                            جاري التحويل...
                          </>
                        ) : (
                          <>
                            <FileText className="ml-2 h-5 w-5" />
                            تحويل إلى PDF
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </>
              )}

              {status.type && (
                <div className={`mt-4 p-4 rounded-lg text-center ${
                  status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {status.message}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">خيارات التحويل</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    PDF إلى صور
                  </h3>
                  <p className="text-sm text-gray-600">
                    حول كل صفحة من ملف PDF إلى صورة PNG عالية الجودة. مثالي لمشاركة محتوى PDF على وسائل التواصل.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-green-600" />
                    صور إلى PDF
                  </h3>
                  <p className="text-sm text-gray-600">
                    اجمع عدة صور JPG أو PNG في ملف PDF واحد. مثالي لإنشاء كتيبات أو ملفات عرض.
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  ✅ جميع العمليات تتم محلياً في متصفحك - ملفاتك آمنة ولا يتم رفعها لأي سيرفر
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
