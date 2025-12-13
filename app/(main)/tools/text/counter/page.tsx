"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Hash, Type, Code, Binary } from "lucide-react";

const textTools = [
  { name: "عداد", href: "/tools/text/counter", icon: Hash },
  { name: "حالة", href: "/tools/text/case", icon: Type },
  { name: "JSON", href: "/tools/text/json", icon: Code },
  { name: "Base64", href: "/tools/text/base64", icon: Binary },
];

export default function TextCounterPage() {
  const [text, setText] = useState("");

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text.split('\n').length,
    paragraphs: text.trim() ? text.trim().split(/\n\n+/).length : 0,
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4">
              <Hash className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              عداد الكلمات والأحرف
            </h1>
            <p className="text-gray-600 text-lg">عد الكلمات والأحرف والأسطر في النص</p>
          </div>

          <ToolNavigation tools={textTools} category="النصوص" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="اكتب أو الصق النص هنا..."
                className="min-h-[300px] text-lg"
                dir="auto"
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-blue-600">{stats.characters}</p>
                <p className="text-sm text-gray-600 mt-2">أحرف</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-cyan-600">{stats.charactersNoSpaces}</p>
                <p className="text-sm text-gray-600 mt-2">أحرف بدون مسافات</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-purple-600">{stats.words}</p>
                <p className="text-sm text-gray-600 mt-2">كلمات</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-green-600">{stats.lines}</p>
                <p className="text-sm text-gray-600 mt-2">أسطر</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-orange-600">{stats.paragraphs}</p>
                <p className="text-sm text-gray-600 mt-2">فقرات</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
