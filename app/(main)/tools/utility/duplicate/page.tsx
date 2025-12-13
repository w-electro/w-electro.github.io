"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Shuffle, GitCompare, StickyNote } from "lucide-react";

const utilityTools = [
  { name: "مولد عشوائي", href: "/tools/utility/random", icon: Shuffle },
  { name: "كاشف التكرار", href: "/tools/utility/duplicate", icon: Copy },
  { name: "مقارنة النصوص", href: "/tools/utility/diff", icon: GitCompare },
  { name: "ملاحظات", href: "/tools/utility/notes", icon: StickyNote },
];

export default function DuplicateCheckerPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [stats, setStats] = useState<{
    original: number;
    unique: number;
    duplicates: number;
  } | null>(null);

  const findDuplicates = () => {
    const lines = inputText.split('\n');
    const seen = new Set<string>();
    const duplicates: string[] = [];
    const unique: string[] = [];

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine === "") return;

      if (seen.has(trimmedLine)) {
        if (!duplicates.includes(trimmedLine)) {
          duplicates.push(trimmedLine);
        }
      } else {
        seen.add(trimmedLine);
        unique.push(line);
      }
    });

    setOutputText(duplicates.join('\n'));
    setStats({
      original: lines.filter(l => l.trim() !== "").length,
      unique: unique.length,
      duplicates: duplicates.length,
    });
  };

  const removeDuplicates = () => {
    const lines = inputText.split('\n');
    const seen = new Set<string>();
    const unique: string[] = [];

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine === "") {
        unique.push(line);
        return;
      }

      if (!seen.has(trimmedLine)) {
        seen.add(trimmedLine);
        unique.push(line);
      }
    });

    setOutputText(unique.join('\n'));
    setStats({
      original: lines.filter(l => l.trim() !== "").length,
      unique: unique.filter(l => l.trim() !== "").length,
      duplicates: lines.filter(l => l.trim() !== "").length - unique.filter(l => l.trim() !== "").length,
    });
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(outputText);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
              <Copy className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              كاشف التكرار
            </h1>
            <p className="text-gray-600 text-lg">اكتشف وأزل الأسطر المكررة من النص</p>
          </div>

          <ToolNavigation tools={utilityTools} category="الأدوات المساعدة" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3">النص الأصلي:</h3>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="الصق النص هنا... كل سطر سيتم فحصه بشكل منفصل"
                  className="min-h-[400px] font-mono"
                  dir="auto"
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-lg">النتيجة:</h3>
                  {outputText && (
                    <Button onClick={copyOutput} variant="outline" size="sm">
                      نسخ
                    </Button>
                  )}
                </div>
                <Textarea
                  value={outputText}
                  readOnly
                  placeholder="ستظهر النتيجة هنا..."
                  className="min-h-[400px] font-mono bg-gray-50"
                  dir="auto"
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Button onClick={findDuplicates} size="lg" className="bg-purple-600 hover:bg-purple-700">
              عرض الأسطر المكررة فقط
            </Button>
            <Button onClick={removeDuplicates} size="lg" className="bg-pink-600 hover:bg-pink-700">
              إزالة التكرارات (إبقاء الأول)
            </Button>
          </div>

          {stats && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-center">الإحصائيات:</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 text-center border border-blue-200">
                    <p className="text-3xl font-bold text-blue-600">{stats.original}</p>
                    <p className="text-sm text-gray-600 mt-1">أسطر أصلية</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center border border-green-200">
                    <p className="text-3xl font-bold text-green-600">{stats.unique}</p>
                    <p className="text-sm text-gray-600 mt-1">أسطر فريدة</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 text-center border border-red-200">
                    <p className="text-3xl font-bold text-red-600">{stats.duplicates}</p>
                    <p className="text-sm text-gray-600 mt-1">أسطر مكررة</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">كيف يعمل:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>عرض المكررات:</strong> يظهر فقط الأسطر التي تكررت أكثر من مرة</li>
                <li>• <strong>إزالة التكرارات:</strong> يحتفظ بأول ظهور لكل سطر ويحذف التكرارات</li>
                <li>• الأسطر الفارغة لا يتم احتسابها</li>
                <li>• المقارنة تتم بعد إزالة المسافات الزائدة من بداية ونهاية السطر</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
