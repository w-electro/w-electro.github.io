"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import {
  FileText,
  Upload,
  X,
  Copy,
  Download,
  Check,
  Loader2,
  Image as ImageIcon,
  FileType,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const OCR_API_BASE_URL = "https://w-electro-ocr-1079925492391.us-central1.run.app";

const supportedFormats = [
  { name: "PNG", icon: ImageIcon },
  { name: "JPG/JPEG", icon: ImageIcon },
  { name: "PDF", icon: FileType },
  { name: "BMP", icon: ImageIcon },
  { name: "GIF", icon: ImageIcon },
  { name: "WebP", icon: ImageIcon },
];

const features = [
  {
    icon: Globe,
    title: "دعم العربية والإنجليزية",
    description: "استخراج دقيق للنصوص بكلا اللغتين",
  },
  {
    icon: Zap,
    title: "سريع وفعال",
    description: "معالجة فورية للملفات مهما كان حجمها",
  },
  {
    icon: Shield,
    title: "آمن وخاص",
    description: "لا نحتفظ بملفاتك - يتم حذفها فوراً",
  },
];

export default function OCRToolPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  }, []);

  const validateAndSetFile = (file: File) => {
    const validTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/bmp",
      "image/gif",
      "image/webp",
      "application/pdf",
    ];
    if (validTypes.includes(file.type)) {
      setFile(file);
      setError(null);
      setResult(null);
    } else {
      setError("صيغة الملف غير مدعومة. يرجى اختيار صورة أو ملف PDF.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 600000); // 10 minutes

      const response = await fetch(`${OCR_API_BASE_URL}/api/ocr`, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (data.success) {
        setResult(data.markdown);
        setPageCount(data.page_count || 1);
      } else {
        setError(data.error || "حدث خطأ أثناء معالجة الملف");
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        setError("انتهت مهلة الطلب. يرجى المحاولة مرة أخرى.");
      } else {
        setError("حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("فشل في نسخ النص");
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name.split(".")[0] || "extracted"}_ocr.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setPageCount(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-cyan-600 to-cyan-500 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <FileText className="h-5 w-5" />
                <span className="text-sm font-medium">مجاني 100% - بدون تسجيل</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                استخراج النصوص من الصور
              </h1>
              <p className="text-xl text-white/90 mb-2">
                تقنية OCR متقدمة بدقة 99% - دعم كامل للعربية والإنجليزية
              </p>
              <p className="text-sm text-white/70">
                مدعوم بـ Google Cloud Vision AI
              </p>
            </div>
          </div>
        </section>

        {/* Main Tool Section */}
        <section className="py-12 -mt-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-0">
                  {/* Upload Area */}
                  <div className="p-6 md:p-8">
                    {!result ? (
                      <>
                        {/* Drop Zone */}
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`
                            relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all duration-200
                            ${isDragging
                              ? "border-cyan-500 bg-cyan-50"
                              : file
                                ? "border-green-500 bg-green-50"
                                : "border-gray-300 hover:border-cyan-400 hover:bg-cyan-50/50"
                            }
                          `}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="hidden"
                          />

                          {file ? (
                            <div className="space-y-4">
                              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">{file.name}</p>
                                <p className="text-sm text-gray-500">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  resetForm();
                                }}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                              >
                                <X className="h-4 w-4 inline ml-1" />
                                إزالة الملف
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                <Upload className="h-10 w-10 text-white" />
                              </div>
                              <div>
                                <p className="text-xl font-bold text-gray-900">
                                  اسحب الملف هنا أو انقر للاختيار
                                </p>
                                <p className="text-gray-500 mt-2">
                                  يدعم: PNG, JPG, PDF, BMP, GIF, WebP
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Error Message */}
                        {error && (
                          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-red-700">{error}</p>
                          </div>
                        )}

                        {/* Submit Button */}
                        <div className="mt-6">
                          <Button
                            onClick={handleSubmit}
                            disabled={!file || isLoading}
                            size="xl"
                            className="w-full gap-2"
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                جاري استخراج النصوص...
                              </>
                            ) : (
                              <>
                                <FileText className="h-5 w-5" />
                                استخراج النصوص
                              </>
                            )}
                          </Button>
                        </div>
                      </>
                    ) : (
                      /* Results Section */
                      <div className="space-y-6">
                        {/* Success Header */}
                        <div className="text-center py-4 border-b">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                            تم استخراج النص بنجاح!
                          </h3>
                          <p className="text-gray-500">
                            تم معالجة {pageCount} {pageCount === 1 ? "صفحة" : "صفحات"}
                          </p>
                        </div>

                        {/* Extracted Text */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            النص المستخرج:
                          </label>
                          <div className="relative">
                            <pre
                              className="bg-gray-100 p-4 rounded-xl whitespace-pre-wrap text-gray-800 text-right max-h-80 overflow-y-auto text-sm leading-relaxed"
                              dir="rtl"
                            >
                              {result}
                            </pre>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            onClick={handleCopy}
                            variant="outline"
                            className="flex-1 gap-2"
                          >
                            {copied ? (
                              <>
                                <Check className="h-4 w-4 text-green-600" />
                                تم النسخ!
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4" />
                                نسخ النص
                              </>
                            )}
                          </Button>
                          <Button
                            onClick={handleDownload}
                            variant="outline"
                            className="flex-1 gap-2"
                          >
                            <Download className="h-4 w-4" />
                            تحميل كملف
                          </Button>
                          <Button onClick={resetForm} className="flex-1 gap-2">
                            <ArrowRight className="h-4 w-4" />
                            ملف جديد
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
              لماذا تختار أداتنا؟
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {features.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Formats */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold text-center text-gray-900 mb-8">
              الصيغ المدعومة
            </h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
              {supportedFormats.map((format) => (
                <div
                  key={format.name}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm"
                >
                  <format.icon className="h-5 w-5 text-cyan-600" />
                  <span className="font-medium text-gray-700">{format.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
              الأسئلة الشائعة
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: "هل أداة OCR مجانية؟",
                  a: "نعم، أداة استخراج النصوص OCR مجانية 100% بدون أي قيود على الاستخدام أو عدد الملفات. يمكنك استخدامها بدون تسجيل أو اشتراك.",
                },
                {
                  q: "ما هي دقة استخراج النصوص؟",
                  a: "تصل دقة استخراج النصوص إلى 99% باستخدام تقنية Google Cloud Vision المتقدمة. الأداة تدعم اللغة العربية والإنجليزية وتعمل بشكل ممتاز مع جميع أنواع الخطوط.",
                },
                {
                  q: "هل تحتفظون بالصور أو النصوص المرفوعة؟",
                  a: "لا، نحن لا نحتفظ بأي ملفات أو نصوص. جميع العمليات تتم بشكل آمن ويتم حذف الملفات فوراً بعد الانتهاء من استخراج النصوص.",
                },
              ].map((faq, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">
              هل تحتاج خدمات أكثر احترافية؟
            </h2>
            <p className="text-white/80 mb-6">
              نقدم خدمات طلابية وتصميم وخدمات إلكترونية متنوعة
            </p>
            <Button variant="glass" size="lg" asChild>
              <Link href="/services">استكشف خدماتنا</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
