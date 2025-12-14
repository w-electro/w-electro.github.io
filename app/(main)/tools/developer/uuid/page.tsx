"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileJson, Key, Type, FileCode, Copy, Check, RefreshCw, Trash2 } from "lucide-react";

const developerTools = [
  { name: "JSON", href: "/tools/developer/json", icon: FileJson },
  { name: "UUID", href: "/tools/developer/uuid", icon: Key },
  { name: "Lorem Ipsum", href: "/tools/developer/lorem", icon: Type },
  { name: "Meta Tags", href: "/tools/developer/meta", icon: FileCode },
];

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UUIDGeneratorPage() {
  const [uuids, setUuids] = useState<string[]>([generateUUID()]);
  const [count, setCount] = useState(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [format, setFormat] = useState<"lowercase" | "uppercase">("lowercase");

  const generateNewUUIDs = () => {
    const newUuids = Array.from({ length: count }, () => {
      const uuid = generateUUID();
      return format === "uppercase" ? uuid.toUpperCase() : uuid;
    });
    setUuids(newUuids);
  };

  const copyToClipboard = async (uuid: string, index: number) => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Clipboard access denied
    }
  };

  const copyAllToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(uuids.join("\n"));
      setCopiedIndex(-1);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Clipboard access denied
    }
  };

  const clearAll = () => {
    setUuids([]);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl mb-4">
              <Key className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
              مولد UUID
            </h1>
            <p className="text-gray-600 text-lg">أنشئ معرفات فريدة عالمياً (UUID v4)</p>
          </div>

          <ToolNavigation tools={developerTools} category="المطورين" />

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label htmlFor="count">عدد UUIDs</Label>
                  <Input
                    id="count"
                    type="number"
                    min="1"
                    max="100"
                    value={count}
                    onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>التنسيق</Label>
                  <div className="flex gap-2 mt-1">
                    <Button
                      variant={format === "lowercase" ? "default" : "outline"}
                      onClick={() => setFormat("lowercase")}
                      className="flex-1"
                    >
                      أحرف صغيرة
                    </Button>
                    <Button
                      variant={format === "uppercase" ? "default" : "outline"}
                      onClick={() => setFormat("uppercase")}
                      className="flex-1"
                    >
                      أحرف كبيرة
                    </Button>
                  </div>
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={generateNewUUIDs}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  >
                    <RefreshCw className="h-4 w-4 ml-2" />
                    توليد
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <Button onClick={copyAllToClipboard} variant="outline" size="sm">
                  {copiedIndex === -1 ? <Check className="h-4 w-4 ml-2" /> : <Copy className="h-4 w-4 ml-2" />}
                  نسخ الكل
                </Button>
                <Button onClick={clearAll} variant="ghost" size="sm" className="text-red-500">
                  <Trash2 className="h-4 w-4 ml-2" />
                  مسح الكل
                </Button>
              </div>

              <div className="space-y-2">
                {uuids.map((uuid, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg font-mono text-sm"
                  >
                    <span className="text-gray-400 w-8">{index + 1}.</span>
                    <span className="flex-1" dir="ltr">{uuid}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(uuid, index)}
                    >
                      {copiedIndex === index ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">ما هو UUID؟</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• UUID (Universally Unique Identifier) هو معرف فريد من 128 بت</li>
                <li>• يُستخدم لتعريف المعلومات بشكل فريد دون الحاجة لتنسيق مركزي</li>
                <li>• الإصدار 4 (UUID v4) يعتمد على الأرقام العشوائية</li>
                <li>• احتمالية التكرار ضئيلة جداً (أقل من 1 في المليار مليار)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
