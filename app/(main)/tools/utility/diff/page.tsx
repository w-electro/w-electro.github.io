"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { GitCompare, Shuffle, Copy, StickyNote } from "lucide-react";

const utilityTools = [
  { name: "عداد الكلمات", href: "/tools/utility/word-count", icon: Copy },
  { name: "مقارنة النصوص", href: "/tools/utility/diff", icon: GitCompare },
  { name: "أرقام عشوائية", href: "/tools/utility/random", icon: Shuffle },
];

interface DiffLine {
  type: "same" | "added" | "removed" | "changed";
  text: string;
  lineNumber1?: number;
  lineNumber2?: number;
}

export default function TextDiffPage() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diff, setDiff] = useState<DiffLine[]>([]);
  const [stats, setStats] = useState<{
    same: number;
    added: number;
    removed: number;
  } | null>(null);

  const comparTexts = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result: DiffLine[] = [];
    let i = 0, j = 0;

    while (i < lines1.length || j < lines2.length) {
      if (i >= lines1.length) {
        // Only lines in text2 remain
        result.push({ type: "added", text: lines2[j], lineNumber2: j + 1 });
        j++;
      } else if (j >= lines2.length) {
        // Only lines in text1 remain
        result.push({ type: "removed", text: lines1[i], lineNumber1: i + 1 });
        i++;
      } else if (lines1[i] === lines2[j]) {
        // Lines are the same
        result.push({ type: "same", text: lines1[i], lineNumber1: i + 1, lineNumber2: j + 1 });
        i++;
        j++;
      } else {
        // Lines are different - check if line from text1 exists later in text2
        const foundInText2 = lines2.slice(j).indexOf(lines1[i]);
        const foundInText1 = lines1.slice(i).indexOf(lines2[j]);

        if (foundInText2 !== -1 && (foundInText1 === -1 || foundInText2 < foundInText1)) {
          // Line from text1 found later in text2, so lines in between were added
          result.push({ type: "added", text: lines2[j], lineNumber2: j + 1 });
          j++;
        } else if (foundInText1 !== -1) {
          // Line from text2 found later in text1, so lines in between were removed
          result.push({ type: "removed", text: lines1[i], lineNumber1: i + 1 });
          i++;
        } else {
          // Lines are different and don't appear later - mark as changed
          result.push({ type: "removed", text: lines1[i], lineNumber1: i + 1 });
          result.push({ type: "added", text: lines2[j], lineNumber2: j + 1 });
          i++;
          j++;
        }
      }
    }

    setDiff(result);
    setStats({
      same: result.filter(d => d.type === "same").length,
      added: result.filter(d => d.type === "added").length,
      removed: result.filter(d => d.type === "removed").length,
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-4">
              <GitCompare className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
              مقارنة النصوص
            </h1>
            <p className="text-gray-600 text-lg">قارن بين نصين واكتشف الاختلافات</p>
          </div>

          <ToolNavigation tools={utilityTools} category="الأدوات المساعدة" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3">النص الأول:</h3>
                <Textarea
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  placeholder="الصق النص الأول هنا..."
                  className="min-h-[300px] font-mono"
                  dir="auto"
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3">النص الثاني:</h3>
                <Textarea
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  placeholder="الصق النص الثاني هنا..."
                  className="min-h-[300px] font-mono"
                  dir="auto"
                />
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <Button onClick={comparTexts} size="lg" className="w-full bg-green-600 hover:bg-green-700">
              مقارنة النصوص
            </Button>
          </div>

          {stats && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-center">الإحصائيات:</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 text-center border border-gray-200">
                    <p className="text-3xl font-bold text-gray-600">{stats.same}</p>
                    <p className="text-sm text-gray-600 mt-1">أسطر متطابقة</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center border border-green-200">
                    <p className="text-3xl font-bold text-green-600">{stats.added}</p>
                    <p className="text-sm text-gray-600 mt-1">أسطر مضافة</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 text-center border border-red-200">
                    <p className="text-3xl font-bold text-red-600">{stats.removed}</p>
                    <p className="text-sm text-gray-600 mt-1">أسطر محذوفة</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {diff.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">الاختلافات:</h3>
                <div className="space-y-1 font-mono text-sm max-h-[600px] overflow-y-auto">
                  {diff.map((line, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded ${
                        line.type === "same"
                          ? "bg-gray-50"
                          : line.type === "added"
                          ? "bg-green-100 border-l-4 border-green-500"
                          : "bg-red-100 border-l-4 border-red-500"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xs text-gray-500 min-w-[60px]">
                          {line.lineNumber1 && `${line.lineNumber1}`}
                          {line.lineNumber1 && line.lineNumber2 && " | "}
                          {line.lineNumber2 && `${line.lineNumber2}`}
                        </span>
                        <span className={line.type === "same" ? "text-gray-600" : ""} dir="auto">
                          {line.type === "added" && "+ "}
                          {line.type === "removed" && "- "}
                          {line.text || "(سطر فارغ)"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">دليل الألوان:</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-50 border rounded"></div>
                  <span>أسطر متطابقة في كلا النصين</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border-l-4 border-green-500 rounded"></div>
                  <span>أسطر مضافة (موجودة في النص الثاني فقط)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 border-l-4 border-red-500 rounded"></div>
                  <span>أسطر محذوفة (موجودة في النص الأول فقط)</span>
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
