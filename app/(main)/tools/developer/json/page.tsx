"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileJson, Key, Type, FileCode, Copy, Check, AlertCircle, CheckCircle } from "lucide-react";

const developerTools = [
  { name: "JSON", href: "/tools/developer/json", icon: FileJson },
  { name: "UUID", href: "/tools/developer/uuid", icon: Key },
  { name: "Lorem Ipsum", href: "/tools/developer/lorem", icon: Type },
  { name: "Meta Tags", href: "/tools/developer/meta", icon: FileCode },
];

export default function JSONFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setIsValid(true);
      setError("");
    } catch (e) {
      setIsValid(false);
      setError(e instanceof Error ? e.message : "خطأ في تحليل JSON");
      setOutput("");
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setIsValid(true);
      setError("");
    } catch (e) {
      setIsValid(false);
      setError(e instanceof Error ? e.message : "خطأ في تحليل JSON");
      setOutput("");
    }
  };

  const validateJSON = () => {
    try {
      JSON.parse(input);
      setIsValid(true);
      setError("");
    } catch (e) {
      setIsValid(false);
      setError(e instanceof Error ? e.message : "خطأ في تحليل JSON");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output || input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
    setIsValid(null);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl mb-4">
              <FileJson className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
              منسق JSON
            </h1>
            <p className="text-gray-600 text-lg">تنسيق وتحقق وضغط JSON</p>
          </div>

          <ToolNavigation tools={developerTools} category="المطورين" />

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-3 mb-4">
                <Button onClick={formatJSON} className="bg-gradient-to-r from-blue-500 to-blue-600">
                  تنسيق (Format)
                </Button>
                <Button onClick={minifyJSON} variant="outline">
                  ضغط (Minify)
                </Button>
                <Button onClick={validateJSON} variant="outline">
                  تحقق (Validate)
                </Button>
                <Button onClick={copyToClipboard} variant="outline">
                  {copied ? <Check className="h-4 w-4 ml-2" /> : <Copy className="h-4 w-4 ml-2" />}
                  {copied ? "تم النسخ" : "نسخ"}
                </Button>
                <Button onClick={clearAll} variant="ghost" className="text-red-500">
                  مسح الكل
                </Button>
              </div>

              {isValid !== null && (
                <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
                  isValid ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}>
                  {isValid ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>JSON صالح</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-5 w-5" />
                      <span>JSON غير صالح: {error}</span>
                    </>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">الإدخال</label>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='{"name": "أحمد", "age": 25}'
                    className="font-mono text-sm h-96 resize-none"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">الإخراج</label>
                  <Textarea
                    value={output}
                    readOnly
                    placeholder="النتيجة ستظهر هنا..."
                    className="font-mono text-sm h-96 resize-none bg-gray-50"
                    dir="ltr"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">نصائح:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>تنسيق:</strong> يضيف مسافات بادئة لجعل JSON قابل للقراءة</li>
                <li>• <strong>ضغط:</strong> يزيل المسافات الزائدة لتقليل الحجم</li>
                <li>• <strong>تحقق:</strong> يتأكد من صحة بنية JSON</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
