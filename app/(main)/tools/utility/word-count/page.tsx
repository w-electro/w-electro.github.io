"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, GitCompare, Shuffle, Copy, Check, Trash2 } from "lucide-react";

const utilityTools = [
  { name: "عداد الكلمات", href: "/tools/utility/word-count", icon: FileText },
  { name: "مقارنة النصوص", href: "/tools/utility/diff", icon: GitCompare },
  { name: "أرقام عشوائية", href: "/tools/utility/random", icon: Shuffle },
];

export default function WordCountPage() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    readingTime: 0,
    speakingTime: 0,
  });

  useEffect(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.split(/[.!?؟،؛]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
    const lines = text.split(/\n/).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed
    const speakingTime = Math.ceil(words / 130); // Average speaking speed

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readingTime,
      speakingTime,
    });
  }, [text]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied
    }
  };

  const clearText = () => {
    setText("");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600">
              عداد الكلمات
            </h1>
            <p className="text-gray-600 text-lg">احسب الكلمات والحروف والجمل في نصك</p>
          </div>

          <ToolNavigation tools={utilityTools} category="أدوات متنوعة" />

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex gap-2 mb-4">
                <Button onClick={copyToClipboard} variant="outline" size="sm" disabled={!text}>
                  {copied ? <Check className="h-4 w-4 ml-2" /> : <Copy className="h-4 w-4 ml-2" />}
                  نسخ
                </Button>
                <Button onClick={clearText} variant="ghost" size="sm" className="text-red-500" disabled={!text}>
                  <Trash2 className="h-4 w-4 ml-2" />
                  مسح
                </Button>
              </div>

              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="اكتب أو الصق النص هنا..."
                className="h-64 resize-none text-lg"
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">{stats.words.toLocaleString("ar-SA")}</p>
                <p className="text-sm text-gray-600 mt-1">كلمة</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-600">{stats.characters.toLocaleString("ar-SA")}</p>
                <p className="text-sm text-gray-600 mt-1">حرف</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-purple-600">{stats.sentences.toLocaleString("ar-SA")}</p>
                <p className="text-sm text-gray-600 mt-1">جملة</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-orange-600">{stats.paragraphs.toLocaleString("ar-SA")}</p>
                <p className="text-sm text-gray-600 mt-1">فقرة</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4">إحصائيات تفصيلية</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">حروف (بدون فراغات)</p>
                  <p className="text-xl font-bold">{stats.charactersNoSpaces.toLocaleString("ar-SA")}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">الأسطر</p>
                  <p className="text-xl font-bold">{stats.lines.toLocaleString("ar-SA")}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">وقت القراءة</p>
                  <p className="text-xl font-bold">{stats.readingTime} دقيقة</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">وقت التحدث</p>
                  <p className="text-xl font-bold">{stats.speakingTime} دقيقة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
