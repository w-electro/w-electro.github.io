"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftRight, Upload, Download, Minimize2, Maximize2, Scissors } from "lucide-react";

const imageTools = [
  { name: "ضغط", href: "/tools/image/compress", icon: Minimize2 },
  { name: "حجم", href: "/tools/image/resize", icon: Maximize2 },
  { name: "تحويل", href: "/tools/image/convert", icon: ArrowLeftRight },
  { name: "خلفية", href: "/tools/image/remove-background", icon: Scissors },
];

const formats = [
  { value: "image/png", label: "PNG" },
  { value: "image/jpeg", label: "JPEG" },
  { value: "image/webp", label: "WebP" },
];

export default function ImageConvertPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState("image/png");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setConvertedImage(null);
    }
  };

  const convertImage = () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setConvertedImage(url);
          }
          setIsProcessing(false);
        }, targetFormat, 0.95);
      };
      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(selectedFile);
  };

  const downloadConverted = () => {
    if (!convertedImage || !selectedFile) return;
    const extension = targetFormat.split('/')[1];
    const link = document.createElement('a');
    link.href = convertedImage;
    link.download = selectedFile.name.replace(/\.[^/.]+$/, `.${extension}`);
    link.click();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl mb-4">
              <ArrowLeftRight className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
              تحويل صيغة الصور
            </h1>
            <p className="text-gray-600 text-lg">حول بين PNG, JPG, WebP بسهولة</p>
          </div>

          <ToolNavigation tools={imageTools} category="الصور" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-green-500 bg-gray-50 hover:bg-green-50"
                  variant="outline"
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <span className="text-gray-600">
                      {selectedFile ? selectedFile.name : 'اختر صورة للتحويل'}
                    </span>
                    {selectedFile && (
                      <p className="text-sm text-gray-500 mt-1">
                        الصيغة الحالية: {selectedFile.type.split('/')[1].toUpperCase()}
                      </p>
                    )}
                  </div>
                </Button>

                {selectedFile && (
                  <div className="space-y-4">
                    <div>
                      <Label>الصيغة المستهدفة</Label>
                      <Select value={targetFormat} onValueChange={setTargetFormat}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {formats.map((format) => (
                            <SelectItem key={format.value} value={format.value}>
                              {format.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={convertImage} disabled={isProcessing} className="w-full" size="lg">
                      {isProcessing ? "جاري التحويل..." : "تحويل الصيغة"}
                    </Button>
                  </div>
                )}

                {convertedImage && selectedFile && (
                  <div className="space-y-4 pt-6 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">الأصلية ({selectedFile.type.split('/')[1].toUpperCase()})</p>
                        <img src={URL.createObjectURL(selectedFile)} alt="Original" className="w-full rounded-lg border" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">المحولة ({targetFormat.split('/')[1].toUpperCase()})</p>
                        <img src={convertedImage} alt="Converted" className="w-full rounded-lg border" />
                      </div>
                    </div>
                    <Button onClick={downloadConverted} className="w-full" size="lg">
                      <Download className="ml-2 h-5 w-5" />
                      تحميل الصورة المحولة
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">متى تستخدم كل صيغة؟</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex gap-2">
                  <span className="font-semibold min-w-[60px]">PNG:</span>
                  <span>للصور ذات الشفافية، الشعارات، والرسومات</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold min-w-[60px]">JPEG:</span>
                  <span>للصور الفوتوغرافية وحجم ملف أصغر</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold min-w-[60px]">WebP:</span>
                  <span>للويب - حجم أصغر مع جودة ممتازة</span>
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
