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

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const encode = () => {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
      setError("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  const decode = () => {
    try {
      setOutput(decodeURIComponent(escape(atob(input))));
      setError("");
    } catch (e: any) {
      setError("نص Base64 غير صالح");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4">
              <Binary className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
              تشفير Base64
            </h1>
            <p className="text-gray-600 text-lg">تشفير وفك تشفير Base64</p>
          </div>

          <ToolNavigation tools={textTools} category="النصوص" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">الإدخال</h3>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="اكتب النص هنا..."
                  className="min-h-[400px]"
                  dir="auto"
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">الإخراج</h3>
                <Textarea
                  value={output}
                  readOnly
                  placeholder="النتيجة ستظهر هنا..."
                  className="min-h-[400px] bg-gray-50"
                  dir="auto"
                />
              </CardContent>
            </Card>
          </div>

          {error && (
            <Card className="mb-6 bg-red-50 border-red-200">
              <CardContent className="p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4">
            <Button onClick={encode} className="flex-1">تشفير Base64</Button>
            <Button onClick={decode} variant="outline" className="flex-1">فك التشفير</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
