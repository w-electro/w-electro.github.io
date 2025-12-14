"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Combine, Upload, X, Download, Loader2, Split, Minimize2, ArrowLeftRight, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const pdfTools = [
  { name: "دمج", href: "/tools/pdf/merge", icon: Combine },
  { name: "تقسيم", href: "/tools/pdf/split", icon: Split },
  { name: "ضغط", href: "/tools/pdf/compress", icon: Minimize2 },
  { name: "تحويل", href: "/tools/pdf/convert", icon: ArrowLeftRight },
];

export default function PDFMergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const pdfFiles = Array.from(newFiles).filter(file => file.type === "application/pdf");
    setFiles(prev => [...prev, ...pdfFiles]);
    setStatus({ type: null, message: '' });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      const [movedFile] = newFiles.splice(fromIndex, 1);
      newFiles.splice(toIndex, 0, movedFile);
      return newFiles;
    });
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setStatus({ type: 'error', message: 'يرجى اختيار ملفين على الأقل للدمج' });
      return;
    }

    setIsProcessing(true);
    setStatus({ type: null, message: '' });

    try {
      const { PDFDocument } = await import('pdf-lib');
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(mergedPdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus({ type: 'success', message: 'تم دمج الملفات بنجاح!' });
      setFiles([]);
    } catch (error) {
      console.error('PDF Merge Error:', error);
      setStatus({ type: 'error', message: 'حدث خطأ أثناء دمج الملفات. يرجى المحاولة مرة أخرى.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4">
              <Combine className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              دمج ملفات PDF
            </h1>
            <p className="text-gray-600 text-lg">اجمع عدة ملفات PDF في ملف واحد بسهولة</p>
          </div>

          <ToolNavigation tools={pdfTools} category="PDF" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFileSelect(e.dataTransfer.files);
                }}
              >
                <Upload className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">اسحب الملفات هنا</h3>
                <p className="text-gray-600 mb-4">أو انقر لاختيار الملفات</p>
                <Button onClick={() => fileInputRef.current?.click()}>
                  اختر ملفات PDF
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files)}
                />
              </div>

              {status.type && (
                <div className={`mt-4 p-4 rounded-lg text-center ${
                  status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {status.message}
                </div>
              )}

              {files.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">الملفات المحددة ({files.length})</h3>
                  <p className="text-sm text-gray-500 mb-3">اسحب لتغيير الترتيب</p>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', index.toString());
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                          if (fromIndex !== index) {
                            moveFile(fromIndex, index);
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                          <span className="text-sm font-medium text-gray-700 w-6">{index + 1}</span>
                          <span className="text-sm">{file.name}</span>
                          <span className="text-xs text-gray-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full mt-4"
                    size="lg"
                    onClick={handleMerge}
                    disabled={files.length < 2 || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                        جاري الدمج...
                      </>
                    ) : (
                      <>
                        <Combine className="ml-2 h-5 w-5" />
                        دمج الملفات
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">كيفية دمج ملفات PDF</h2>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">1.</span>
                  <span>اختر ملفات PDF التي تريد دمجها</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">2.</span>
                  <span>رتب الملفات بالترتيب الذي تريده بالسحب والإفلات</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">3.</span>
                  <span>انقر على "دمج الملفات" واحصل على ملف واحد</span>
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
