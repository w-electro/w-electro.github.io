"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Minimize2, Upload, Download, Loader2, Combine, Split, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const pdfTools = [
  { name: "دمج", href: "/tools/pdf/merge", icon: Combine },
  { name: "تقسيم", href: "/tools/pdf/split", icon: Split },
  { name: "ضغط", href: "/tools/pdf/compress", icon: Minimize2 },
  { name: "تحويل", href: "/tools/pdf/convert", icon: ArrowLeftRight },
];

export default function PDFCompressPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ originalSize: number; compressedSize: number; url: string } | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setResult(null);
      setStatus({ type: null, message: '' });
    } else if (selectedFile) {
      setStatus({ type: 'error', message: 'يرجى اختيار ملف PDF صالح' });
    }
  };

  const handleCompress = async () => {
    if (!file) return;

    setIsProcessing(true);
    setStatus({ type: null, message: '' });

    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, {
        updateMetadata: false,
      });

      // Remove metadata to reduce size
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('');
      pdfDoc.setCreator('');

      // Save with compression
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      const blob = new Blob([new Uint8Array(compressedBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const originalSize = file.size;
      const compressedSize = compressedBytes.length;

      setResult({ originalSize, compressedSize, url });

      if (compressedSize < originalSize) {
        const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(1);
        setStatus({ type: 'success', message: `تم الضغط بنجاح! تم تقليل الحجم بنسبة ${reduction}%` });
      } else {
        setStatus({ type: 'success', message: 'الملف مضغوط بالفعل - لا يمكن تقليل الحجم أكثر' });
      }
    } catch (error) {
      console.error('PDF Compress Error:', error);
      setStatus({ type: 'error', message: 'حدث خطأ أثناء ضغط الملف' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const a = document.createElement('a');
    a.href = result.url;
    a.download = `compressed-${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4">
              <Minimize2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
              ضغط PDF
            </h1>
            <p className="text-gray-600 text-lg">قلل حجم ملفات PDF مع الحفاظ على الجودة</p>
          </div>

          <ToolNavigation tools={pdfTools} category="PDF" />

          <Card className="mb-8">
            <CardContent className="p-8">
              {!result ? (
                <>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <Upload className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">اختر ملف PDF</h3>
                    <p className="text-gray-600 mb-4">سيتم ضغط الملف مع الحفاظ على الجودة</p>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      اختر ملف
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </div>

                  {file && (
                    <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-semibold">{file.name}</p>
                          <p className="text-sm text-gray-500">الحجم الأصلي: {formatSize(file.size)}</p>
                        </div>
                        <Button variant="outline" onClick={() => setFile(null)}>
                          تغيير الملف
                        </Button>
                      </div>
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleCompress}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                            جاري الضغط...
                          </>
                        ) : (
                          <>
                            <Minimize2 className="ml-2 h-5 w-5" />
                            ضغط الملف
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {status.type === 'error' && (
                    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
                      {status.message}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <Minimize2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">تم الضغط بنجاح!</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">الحجم الأصلي</p>
                      <p className="text-2xl font-bold text-gray-700">{formatSize(result.originalSize)}</p>
                    </div>
                    <div className="p-4 bg-green-100 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">الحجم بعد الضغط</p>
                      <p className="text-2xl font-bold text-green-600">{formatSize(result.compressedSize)}</p>
                    </div>
                  </div>

                  {result.compressedSize < result.originalSize && (
                    <div className="p-4 bg-green-50 rounded-lg mb-6">
                      <p className="text-green-700 font-semibold">
                        تم توفير {formatSize(result.originalSize - result.compressedSize)} ({((1 - result.compressedSize / result.originalSize) * 100).toFixed(1)}%)
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button className="flex-1" size="lg" onClick={handleDownload}>
                      <Download className="ml-2 h-5 w-5" />
                      تحميل الملف المضغوط
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setFile(null);
                        setResult(null);
                        setStatus({ type: null, message: '' });
                      }}
                    >
                      ضغط ملف آخر
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">كيفية ضغط ملف PDF</h2>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="font-bold text-orange-600">1.</span>
                  <span>اختر ملف PDF الذي تريد ضغطه</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-orange-600">2.</span>
                  <span>انقر على "ضغط الملف" وانتظر المعالجة</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-orange-600">3.</span>
                  <span>حمّل الملف المضغوط بالحجم الجديد</span>
                </li>
              </ol>
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
