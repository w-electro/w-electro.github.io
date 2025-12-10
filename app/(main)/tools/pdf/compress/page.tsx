"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Minimize2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PDFCompressPage() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Upload className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">اختر ملف PDF</h3>
                <Button onClick={() => fileInputRef.current?.click()}>اختر ملف</Button>
                <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </div>
              {file && (
                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <p>الملف: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
                  <Button className="w-full mt-4" onClick={() => alert("ستتوفر قريباً!")}>ضغط الملف</Button>
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
