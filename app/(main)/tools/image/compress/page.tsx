"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Minimize2, Upload, Download, Image as ImageIcon, Maximize2, ArrowLeftRight, Scissors } from "lucide-react";

const imageTools = [
  { name: "ضغط", href: "/tools/image/compress", icon: Minimize2 },
  { name: "حجم", href: "/tools/image/resize", icon: Maximize2 },
  { name: "تحويل", href: "/tools/image/convert", icon: ArrowLeftRight },
  { name: "خلفية", href: "/tools/image/remove-background", icon: Scissors },
];

export default function ImageCompressPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState([80]);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setOriginalSize(file.size);
      setCompressedImage(null);
    }
  };

  const compressImage = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      // Create canvas for compression
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

          // Convert to blob with quality
          canvas.toBlob(
            (blob) => {
              if (blob) {
                setCompressedSize(blob.size);
                const url = URL.createObjectURL(blob);
                setCompressedImage(url);
              }
              setIsProcessing(false);
            },
            selectedFile.type || 'image/jpeg',
            quality[0] / 100
          );
        };
        img.src = e.target?.result as string;
      };

      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Compression error:', error);
      setIsProcessing(false);
    }
  };

  const downloadCompressed = () => {
    if (!compressedImage) return;

    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `compressed-${selectedFile?.name || 'image'}`;
    link.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const savingsPercent = originalSize > 0 && compressedSize > 0
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : 0;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mb-4">
              <Minimize2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              ضغط الصور
            </h1>
            <p className="text-gray-600 text-lg">قلل حجم الصور مع الحفاظ على الجودة</p>
          </div>

          {/* Tool Navigation */}
          <ToolNavigation tools={imageTools} category="الصور" />

          {/* Main Tool */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* File Upload */}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-blue-500 bg-gray-50 hover:bg-blue-50 transition-all"
                    variant="outline"
                  >
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <span className="text-gray-600">
                        {selectedFile ? selectedFile.name : 'اختر صورة للضغط'}
                      </span>
                      {selectedFile && (
                        <p className="text-sm text-gray-500 mt-1">
                          الحجم الأصلي: {formatFileSize(originalSize)}
                        </p>
                      )}
                    </div>
                  </Button>
                </div>

                {/* Quality Slider */}
                {selectedFile && (
                  <div className="space-y-4">
                    <div>
                      <Label>مستوى الجودة: {quality[0]}%</Label>
                      <Slider
                        value={quality}
                        onValueChange={setQuality}
                        min={10}
                        max={100}
                        step={5}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>حجم أصغر</span>
                        <span>جودة أعلى</span>
                      </div>
                    </div>

                    <Button
                      onClick={compressImage}
                      disabled={isProcessing}
                      className="w-full"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2" />
                          جاري الضغط...
                        </>
                      ) : (
                        <>
                          <Minimize2 className="ml-2 h-5 w-5" />
                          ضغط الصورة
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* Results */}
                {compressedImage && (
                  <div className="space-y-4 pt-6 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">الحجم الأصلي</p>
                        <p className="text-2xl font-bold text-gray-800">{formatFileSize(originalSize)}</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">الحجم الجديد</p>
                        <p className="text-2xl font-bold text-green-600">{formatFileSize(compressedSize)}</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">التوفير</p>
                        <p className="text-2xl font-bold text-orange-600">{savingsPercent}%</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">الأصلية</p>
                        <img
                          src={URL.createObjectURL(selectedFile!)}
                          alt="Original"
                          className="w-full rounded-lg border"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">المضغوطة</p>
                        <img
                          src={compressedImage}
                          alt="Compressed"
                          className="w-full rounded-lg border"
                        />
                      </div>
                    </div>

                    <Button onClick={downloadCompressed} className="w-full" size="lg">
                      <Download className="ml-2 h-5 w-5" />
                      تحميل الصورة المضغوطة
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-blue-600" />
                نصائح للحصول على أفضل النتائج
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• للصور العادية: استخدم جودة 70-80% للحصول على توازن جيد</li>
                <li>• للويب: جودة 60-70% كافية وتوفر تحميلاً أسرع</li>
                <li>• للطباعة: استخدم جودة 90-100%</li>
                <li>• صيغة JPEG أفضل للصور الفوتوغرافية</li>
                <li>• صيغة PNG أفضل للصور ذات الألوان المحدودة والشعارات</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
