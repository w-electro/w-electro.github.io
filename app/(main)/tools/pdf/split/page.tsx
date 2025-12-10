"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Split, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PDFSplitPage() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files[0]) setFile(files[0]);
  };

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

          <Card className="mb-8">
            <CardContent className="p-8">
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
              {file && (
                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium">الملف المحدد: {file.name}</p>
                  <Button className="w-full mt-4" size="lg" onClick={() => alert("ستتوفر قريباً!")}>
                    <Split className="ml-2 h-5 w-5" />
                    تقسيم الملف
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
