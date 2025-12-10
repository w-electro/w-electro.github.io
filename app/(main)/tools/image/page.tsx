"use client";

import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Image as ImageIcon, Minimize2, Maximize2, ArrowLeftRight, Scissors } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const imageTools = [
  {
    name: "ضغط الصور",
    description: "قلل حجم الصور مع الحفاظ على الجودة",
    icon: Minimize2,
    href: "/tools/image/compress",
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "تغيير حجم الصور",
    description: "غير أبعاد الصور بسهولة",
    icon: Maximize2,
    href: "/tools/image/resize",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "تحويل صيغة الصور",
    description: "حول بين PNG, JPG, WebP",
    icon: ArrowLeftRight,
    href: "/tools/image/convert",
    color: "from-green-500 to-teal-500",
  },
  {
    name: "إزالة الخلفية",
    description: "أزل الخلفية تلقائياً بالذكاء الاصطناعي",
    icon: Scissors,
    href: "/tools/image/remove-background",
    color: "from-orange-500 to-red-500",
    badge: "AI",
  },
];

export default function ImageToolsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-2xl mb-6 shadow-lg">
              <ImageIcon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-orange-500">
              أدوات الصور
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              أدوات قوية لتحرير ومعالجة الصور
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {imageTools.map((tool) => (
              <Link key={tool.name} href={tool.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group relative">
                  {tool.badge && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {tool.badge}
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <tool.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600">{tool.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
