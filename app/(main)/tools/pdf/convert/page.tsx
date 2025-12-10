"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ArrowLeftRight, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PDFConvertPage() {
  const [file, setFile] = useState<File | null>(null);
  const [convertTo, setConvertTo] = useState("word");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
            <p className="text-gray-600 text-lg">حول PDF إلى صيغ مختلفة أو العكس</p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">التحويل إلى:</label>
                <Select value={convertTo} onValueChange={setConvertTo}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="word">Word (DOCX)</SelectItem>
                    <SelectItem value="excel">Excel (XLSX)</SelectItem>
                    <SelectItem value="powerpoint">PowerPoint (PPTX)</SelectItem>
                    <SelectItem value="image">صورة (JPG/PNG)</SelectItem>
                    <SelectItem value="text">نص (TXT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Upload className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <Button onClick={() => fileInputRef.current?.click()}>اختر ملف PDF</Button>
                <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </div>
              {file && (
                <div className="mt-6">
                  <Button className="w-full" onClick={() => alert("ستتوفر قريباً!")}>تحويل الملف</Button>
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
