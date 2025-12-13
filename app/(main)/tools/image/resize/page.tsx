"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Maximize2, Upload, Download, Minimize2, ArrowLeftRight, Scissors } from "lucide-react";

const imageTools = [
  { name: "ضغط", href: "/tools/image/compress", icon: Minimize2 },
  { name: "حجم", href: "/tools/image/resize", icon: Maximize2 },
  { name: "تحويل", href: "/tools/image/convert", icon: ArrowLeftRight },
  { name: "خلفية", href: "/tools/image/remove-background", icon: Scissors },
];

export default function ImageResizePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setResizedImage(null);

      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width.toString());
        setHeight(img.height.toString());
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleWidthChange = (value: string) => {
    setWidth(value);
    if (maintainAspect && originalWidth > 0 && value) {
      const aspectRatio = originalHeight / originalWidth;
      setHeight(Math.round(parseInt(value) * aspectRatio).toString());
    }
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
    if (maintainAspect && originalHeight > 0 && value) {
      const aspectRatio = originalWidth / originalHeight;
      setWidth(Math.round(parseInt(value) * aspectRatio).toString());
    }
  };

  const resizeImage = () => {
    if (!selectedFile || !width || !height) return;

    setIsProcessing(true);
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = parseInt(width);
        canvas.height = parseInt(height);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, parseInt(width), parseInt(height));

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setResizedImage(url);
          }
          setIsProcessing(false);
        }, selectedFile.type || 'image/jpeg', 0.95);
      };
      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(selectedFile);
  };

  const downloadResized = () => {
    if (!resizedImage || !selectedFile) return;
    const link = document.createElement('a');
    link.href = resizedImage;
    link.download = `resized-${selectedFile.name}`;
    link.click();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
              <Maximize2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              تغيير حجم الصور
            </h1>
            <p className="text-gray-600 text-lg">غير أبعاد الصور بسهولة</p>
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
                  className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-purple-500 bg-gray-50 hover:bg-purple-50"
                  variant="outline"
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <span className="text-gray-600">
                      {selectedFile ? selectedFile.name : 'اختر صورة لتغيير حجمها'}
                    </span>
                    {originalWidth > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        الأبعاد الأصلية: {originalWidth} × {originalHeight}
                      </p>
                    )}
                  </div>
                </Button>

                {selectedFile && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>العرض (px)</Label>
                        <Input
                          type="number"
                          value={width}
                          onChange={(e) => handleWidthChange(e.target.value)}
                          placeholder="عرض"
                        />
                      </div>
                      <div>
                        <Label>الارتفاع (px)</Label>
                        <Input
                          type="number"
                          value={height}
                          onChange={(e) => handleHeightChange(e.target.value)}
                          placeholder="ارتفاع"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="aspect"
                        checked={maintainAspect}
                        onChange={(e) => setMaintainAspect(e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="aspect">الحفاظ على نسبة العرض إلى الارتفاع</Label>
                    </div>

                    <Button onClick={resizeImage} disabled={isProcessing} className="w-full" size="lg">
                      {isProcessing ? "جاري التغيير..." : "تغيير الحجم"}
                    </Button>
                  </div>
                )}

                {resizedImage && selectedFile && (
                  <div className="space-y-4 pt-6 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">الأصلية ({originalWidth}×{originalHeight})</p>
                        <img src={URL.createObjectURL(selectedFile)} alt="Original" className="w-full rounded-lg border" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">الجديدة ({width}×{height})</p>
                        <img src={resizedImage} alt="Resized" className="w-full rounded-lg border" />
                      </div>
                    </div>
                    <Button onClick={downloadResized} className="w-full" size="lg">
                      <Download className="ml-2 h-5 w-5" />
                      تحميل الصورة
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
