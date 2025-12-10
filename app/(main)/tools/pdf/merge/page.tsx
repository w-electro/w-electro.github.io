"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Combine, Upload, X, Download, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PDFMergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const pdfFiles = Array.from(newFiles).filter(file => file.type === "application/pdf");
    setFiles(prev => [...prev, ...pdfFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    alert("ستتوفر هذه الميزة قريباً! نعمل على تطويرها.");
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

              {files.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">الملفات المحددة ({files.length})</h3>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-700">{index + 1}</span>
                          <span className="text-sm">{file.name}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4" size="lg" onClick={handleMerge} disabled={files.length < 2}>
                    <Combine className="ml-2 h-5 w-5" />
                    دمج الملفات
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
                  <span>رتب الملفات بالترتيب الذي تريده</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">3.</span>
                  <span>انقر على "دمج الملفات" واحصل على ملف واحد</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
