"use client";

import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Clock, Calendar, Globe, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const datetimeTools = [
  { name: "حاسبة الأيام", description: "احسب الفرق بين تاريخين", icon: CalendarDays, href: "/tools/datetime/days", color: "from-blue-500 to-cyan-500" },
  { name: "محول التاريخ الهجري", description: "حول بين الهجري والميلادي", icon: Calendar, href: "/tools/datetime/hijri", color: "from-purple-500 to-pink-500" },
  { name: "ساعة العالم", description: "الوقت في مختلف المدن", icon: Globe, href: "/tools/datetime/world-clock", color: "from-green-500 to-emerald-500" },
];

export default function DateTimePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-2xl mb-6 shadow-lg">
              <Clock className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-orange-500">أدوات التاريخ والوقت</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">أدوات متكاملة للتعامل مع التواريخ والأوقات</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {datetimeTools.map((tool) => (
              <Link key={tool.name} href={tool.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <tool.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-600 transition-colors">{tool.name}</h3>
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
