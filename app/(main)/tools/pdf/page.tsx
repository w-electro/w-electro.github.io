"use client";

import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { FileText, Combine, Split, Minimize2, ArrowLeftRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const pdfTools = [
  {
    name: "دمج ملفات PDF",
    description: "اجمع عدة ملفات PDF في ملف واحد",
    icon: Combine,
    href: "/tools/pdf/merge",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "تقسيم PDF",
    description: "قسم ملف PDF إلى عدة ملفات",
    icon: Split,
    href: "/tools/pdf/split",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "ضغط PDF",
    description: "قلل حجم ملفات PDF",
    icon: Minimize2,
    href: "/tools/pdf/compress",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "تحويل PDF",
    description: "حول من وإلى PDF",
    icon: ArrowLeftRight,
    href: "/tools/pdf/convert",
    color: "from-green-500 to-emerald-500",
  },
];

export default function PDFToolsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-2xl mb-6 shadow-lg">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-orange-500">
              أدوات PDF
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              جميع الأدوات التي تحتاجها للتعامل مع ملفات PDF بسهولة
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {pdfTools.map((tool) => (
              <Link key={tool.name} href={tool.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
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

          {/* Features Section */}
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">لماذا أدوات PDF من نجاح؟</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">سهل الاستخدام</h3>
                    <p className="text-sm text-gray-600">واجهة بسيطة وسهلة للجميع</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">سريع وآمن</h3>
                    <p className="text-sm text-gray-600">معالجة فورية وآمنة لملفاتك</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold mb-2">مجاني تماماً</h3>
                    <p className="text-sm text-gray-600">جميع الأدوات مجانية بدون حدود</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
