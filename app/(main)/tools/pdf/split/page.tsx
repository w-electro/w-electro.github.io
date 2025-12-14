"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Split, Upload, Download, Loader2, Combine, Minimize2, ArrowLeftRight, CheckSquare, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const pdfTools = [
  { name: "دمج", href: "/tools/pdf/merge", icon: Combine },
  { name: "تقسيم", href: "/tools/pdf/split", icon: Split },
  { name: "ضغط", href: "/tools/pdf/compress", icon: Minimize2 },
  { name: "تحويل", href: "/tools/pdf/convert", icon: ArrowLeftRight },
];

interface PageInfo {
  pageNumber: number;
  selected: boolean;
}

export default function PDFSplitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (files && files[0]) {
      const selectedFile = files[0];
      if (selectedFile.type !== 'application/pdf') {
        setStatus({ type: 'error', message: 'يرجى اختيار ملف PDF صالح' });
        return;
      }

      setFile(selectedFile);
      setIsLoading(true);
      setStatus({ type: null, message: '' });

      try {
        const { PDFDocument } = await import('pdf-lib');
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pageCount = pdfDoc.getPageCount();

        setPages(Array.from({ length: pageCount }, (_, i) => ({
          pageNumber: i + 1,
          selected: true
        })));
      } catch (error) {
        console.error('PDF Load Error:', error);
        setStatus({ type: 'error', message: 'حدث خطأ أثناء تحميل الملف' });
        setFile(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const togglePage = (pageNumber: number) => {
    setPages(prev => prev.map(p =>
      p.pageNumber === pageNumber ? { ...p, selected: !p.selected } : p
    ));
  };

  const selectAll = () => {
    setPages(prev => prev.map(p => ({ ...p, selected: true })));
  };

  const deselectAll = () => {
    setPages(prev => prev.map(p => ({ ...p, selected: false })));
  };

  const handleSplit = async () => {
    if (!file) return;

    const selectedPages = pages.filter(p => p.selected);
    if (selectedPages.length === 0) {
      setStatus({ type: 'error', message: 'يرجى تحديد صفحة واحدة على الأقل' });
      return;
    }

    setIsProcessing(true);
    setStatus({ type: null, message: '' });

    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);

      // Create new PDF with selected pages
      const newPdf = await PDFDocument.create();
      for (const page of selectedPages) {
        const [copiedPage] = await newPdf.copyPages(sourcePdf, [page.pageNumber - 1]);
        newPdf.addPage(copiedPage);
      }

      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `split-${selectedPages.length}-pages.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus({ type: 'success', message: `تم استخراج ${selectedPages.length} صفحة بنجاح!` });
    } catch (error) {
      console.error('PDF Split Error:', error);
      setStatus({ type: 'error', message: 'حدث خطأ أثناء تقسيم الملف' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = async () => {
    if (!file) return;

    setIsProcessing(true);
    setStatus({ type: null, message: '' });

    try {
      const { PDFDocument } = await import('pdf-lib');
      const JSZip = (await import('jszip')).default;
      const arrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const pageCount = sourcePdf.getPageCount();

      const zip = new JSZip();

      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(sourcePdf, [i]);
        newPdf.addPage(copiedPage);
        const pdfBytes = await newPdf.save();
        zip.file(`page-${i + 1}.pdf`, pdfBytes);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `split-all-${pageCount}-pages.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus({ type: 'success', message: `تم تقسيم الملف إلى ${pageCount} صفحة!` });
    } catch (error) {
      console.error('PDF Split All Error:', error);
      setStatus({ type: 'error', message: 'حدث خطأ أثناء تقسيم الملف' });
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedCount = pages.filter(p => p.selected).length;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
              <Split className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              تقسيم PDF
            </h1>
            <p className="text-gray-600 text-lg">قسم ملف PDF إلى عدة ملفات منفصلة</p>
          </div>

          <ToolNavigation tools={pdfTools} category="PDF" />

          <Card className="mb-8">
            <CardContent className="p-8">
              {!file ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Upload className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">اختر ملف PDF</h3>
                  <p className="text-gray-600 mb-4">حدد الملف الذي تريد تقسيمه</p>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    اختر ملف PDF
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files)}
                  />
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6 p-4 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-semibold">{file.name}</p>
                      <p className="text-sm text-gray-500">{pages.length} صفحة</p>
                    </div>
                    <Button variant="outline" onClick={() => { setFile(null); setPages([]); }}>
                      تغيير الملف
                    </Button>
                  </div>

                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                      <span className="mr-2">جاري تحميل الصفحات...</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={selectAll}>
                            <CheckSquare className="h-4 w-4 ml-1" />
                            تحديد الكل
                          </Button>
                          <Button variant="outline" size="sm" onClick={deselectAll}>
                            <Square className="h-4 w-4 ml-1" />
                            إلغاء التحديد
                          </Button>
                        </div>
                        <span className="text-sm text-gray-500">
                          محدد: {selectedCount} من {pages.length}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mb-6">
                        {pages.map((page) => (
                          <button
                            key={page.pageNumber}
                            onClick={() => togglePage(page.pageNumber)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              page.selected
                                ? 'border-purple-500 bg-purple-100 text-purple-700'
                                : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300'
                            }`}
                          >
                            <span className="font-semibold">{page.pageNumber}</span>
                          </button>
                        ))}
                      </div>

                      {status.type && (
                        <div className={`mb-4 p-4 rounded-lg text-center ${
                          status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {status.message}
                        </div>
                      )}

                      <div className="flex gap-3">
                        <Button
                          className="flex-1"
                          size="lg"
                          onClick={handleSplit}
                          disabled={selectedCount === 0 || isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                              جاري المعالجة...
                            </>
                          ) : (
                            <>
                              <Download className="ml-2 h-5 w-5" />
                              تحميل المحدد ({selectedCount})
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={handleDownloadAll}
                          disabled={isProcessing}
                        >
                          <Split className="ml-2 h-5 w-5" />
                          تقسيم الكل (ZIP)
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">كيفية تقسيم ملف PDF</h2>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="font-bold text-purple-600">1.</span>
                  <span>اختر ملف PDF الذي تريد تقسيمه</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-purple-600">2.</span>
                  <span>حدد الصفحات التي تريد استخراجها</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-purple-600">3.</span>
                  <span>انقر على "تحميل المحدد" أو "تقسيم الكل" للحصول على كل صفحة بشكل منفصل</span>
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
