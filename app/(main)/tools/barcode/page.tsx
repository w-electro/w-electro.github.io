"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Barcode, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BarcodePage() {
  const [data, setData] = useState("");
  const [barcodeType, setBarcodeType] = useState("code128");

  const handleGenerate = () => {
    alert("سيتم تفعيل هذه الميزة قريباً! نعمل على تطويرها.");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl mb-4">
              <Barcode className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
              مولد الباركود
            </h1>
            <p className="text-gray-600 text-lg">أنشئ باركود بجميع الأنواع بسهولة وسرعة</p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="barcode-type">نوع الباركود</Label>
                  <Select value={barcodeType} onValueChange={setBarcodeType}>
                    <SelectTrigger id="barcode-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="code128">Code 128</SelectItem>
                      <SelectItem value="ean13">EAN-13</SelectItem>
                      <SelectItem value="ean8">EAN-8</SelectItem>
                      <SelectItem value="upc">UPC</SelectItem>
                      <SelectItem value="code39">Code 39</SelectItem>
                      <SelectItem value="itf">ITF-14</SelectItem>
                      <SelectItem value="datamatrix">Data Matrix</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="barcode-data">البيانات</Label>
                  <Input
                    id="barcode-data"
                    type="text"
                    placeholder="أدخل النص أو الأرقام"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  />
                </div>

                <Button className="w-full" size="lg" onClick={handleGenerate} disabled={!data}>
                  <Barcode className="ml-2 h-5 w-5" />
                  إنشاء الباركود
                </Button>
              </div>

              {data && (
                <div className="mt-8 p-8 bg-white border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <p className="text-gray-500 mb-4">معاينة الباركود</p>
                  <div className="flex items-center justify-center h-32 bg-gray-50 rounded">
                    <Barcode className="h-16 w-16 text-gray-400" />
                  </div>
                  <Button className="mt-4" variant="outline">
                    <Download className="ml-2 h-4 w-4" />
                    تحميل الباركود
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">أنواع الباركود المدعومة</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <h3 className="font-semibold mb-2">Code 128</h3>
                  <p className="text-gray-600">الأكثر شيوعاً، يدعم جميع الأحرف</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">EAN-13</h3>
                  <p className="text-gray-600">للمنتجات التجارية (13 رقم)</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">UPC</h3>
                  <p className="text-gray-600">الباركود الأمريكي القياسي</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Code 39</h3>
                  <p className="text-gray-600">يستخدم في الصناعة والمخازن</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
