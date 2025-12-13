"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Minimize2, Maximize2, ArrowLeftRight, Sparkles } from "lucide-react";

const imageTools = [
  { name: "ضغط", href: "/tools/image/compress", icon: Minimize2 },
  { name: "حجم", href: "/tools/image/resize", icon: Maximize2 },
  { name: "تحويل", href: "/tools/image/convert", icon: ArrowLeftRight },
  { name: "خلفية", href: "/tools/image/remove-background", icon: Scissors },
];

export default function RemoveBackgroundPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4">
              <Scissors className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
              إزالة الخلفية
            </h1>
            <p className="text-gray-600 text-lg">إزالة الخلفية تلقائياً بالذكاء الاصطناعي</p>
          </div>

          <ToolNavigation tools={imageTools} category="الصور" />

          <Card className="mb-8 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-12 text-center">
              <Sparkles className="h-16 w-16 mx-auto mb-6 text-orange-500" />
              <h2 className="text-2xl font-bold mb-4 text-gray-800">قريباً - تحت التطوير</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                نعمل حالياً على تطوير أداة إزالة الخلفية باستخدام الذكاء الاصطناعي المتقدم.
                ستتمكن قريباً من إزالة خلفية أي صورة بضغطة واحدة بدقة عالية.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">قيد التطوير</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">الميزات القادمة:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✨ إزالة تلقائية للخلفية باستخدام AI</li>
                <li>🎯 دقة عالية في التعرف على الحواف</li>
                <li>⚡ معالجة سريعة في المتصفح</li>
                <li>🖼️ دعم جميع صيغ الصور</li>
                <li>💾 تصدير بصيغة PNG بخلفية شفافة</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
