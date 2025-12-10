"use client";

import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ArrowLeftRight, Ruler, DollarSign, Thermometer, Binary } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const converters = [
  { name: "محول الوحدات", description: "حول بين مختلف الوحدات", icon: Ruler, href: "/tools/converter/units", color: "from-blue-500 to-cyan-500" },
  { name: "محول العملات", description: "أسعار صرف محدثة", icon: DollarSign, href: "/tools/converter/currency", color: "from-green-500 to-emerald-500" },
  { name: "محول درجات الحرارة", description: "سيلسيوس، فهرنهايت، كلفن", icon: Thermometer, href: "/tools/converter/temperature", color: "from-orange-500 to-red-500" },
  { name: "محول الأرقام", description: "ثنائي، عشري، سادس عشري", icon: Binary, href: "/tools/converter/numbers", color: "from-purple-500 to-pink-500" },
];

export default function ConverterPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-2xl mb-6 shadow-lg">
              <ArrowLeftRight className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-orange-500">المحولات</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">محولات دقيقة لجميع أنواع الوحدات</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {converters.map((conv) => (
              <Link key={conv.name} href={conv.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${conv.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <conv.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-600 transition-colors">{conv.name}</h3>
                    <p className="text-gray-600">{conv.description}</p>
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
