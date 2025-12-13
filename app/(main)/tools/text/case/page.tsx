"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Hash, Type, Code, Binary } from "lucide-react";

const textTools = [
  { name: "عداد", href: "/tools/text/counter", icon: Hash },
  { name: "حالة", href: "/tools/text/case", icon: Type },
  { name: "JSON", href: "/tools/text/json", icon: Code },
  { name: "Base64", href: "/tools/text/base64", icon: Binary },
];

export default function TextCasePage() {
  const [text, setText] = useState("");

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());
  const toTitleCase = () => {
    setText(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
  };
  const toSentenceCase = () => {
    setText(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
              <Type className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              تحويل حالة الأحرف
            </h1>
            <p className="text-gray-600 text-lg">حول بين الأحرف الكبيرة والصغيرة</p>
          </div>

          <ToolNavigation tools={textTools} category="النصوص" />

          <Card className="mb-6">
            <CardContent className="p-8">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="اكتب النص هنا..."
                className="min-h-[300px] text-lg"
                dir="auto"
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={toUpperCase} className="w-full" variant="outline">
              أحرف كبيرة
            </Button>
            <Button onClick={toLowerCase} className="w-full" variant="outline">
              أحرف صغيرة
            </Button>
            <Button onClick={toTitleCase} className="w-full" variant="outline">
              حالة العنوان
            </Button>
            <Button onClick={toSentenceCase} className="w-full" variant="outline">
              حالة الجملة
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
