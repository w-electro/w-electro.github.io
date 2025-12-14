"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Lock, Copy, Check, Key, Hash, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const securityTools = [
  { name: "كلمات المرور", href: "/tools/security/password", icon: Key },
  { name: "Hash", href: "/tools/security/hash", icon: Hash },
  { name: "تشفير", href: "/tools/security/encode", icon: Lock },
];

type EncodingType = 'base64' | 'url' | 'html';

export default function EncodePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [encodingType, setEncodingType] = useState<EncodingType>('base64');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const process = () => {
    setError("");
    try {
      if (mode === 'encode') {
        switch (encodingType) {
          case 'base64':
            setOutput(btoa(unescape(encodeURIComponent(input))));
            break;
          case 'url':
            setOutput(encodeURIComponent(input));
            break;
          case 'html':
            setOutput(input
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;'));
            break;
        }
      } else {
        switch (encodingType) {
          case 'base64':
            setOutput(decodeURIComponent(escape(atob(input))));
            break;
          case 'url':
            setOutput(decodeURIComponent(input));
            break;
          case 'html':
            setOutput(input
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&quot;/g, '"')
              .replace(/&#039;/g, "'"));
            break;
        }
      }
    } catch (e) {
      setError("حدث خطأ أثناء المعالجة. تأكد من صحة النص المدخل.");
      setOutput("");
    }
  };

  const copyOutput = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const swapInputOutput = () => {
    setInput(output);
    setOutput("");
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
              تشفير وفك تشفير
            </h1>
            <p className="text-gray-600 text-lg">Base64, URL encoding, HTML entities</p>
          </div>

          <ToolNavigation tools={securityTools} category="الأمان" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Encoding Type Selection */}
                <div>
                  <Label>نوع التشفير</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {(['base64', 'url', 'html'] as EncodingType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => { setEncodingType(type); setOutput(""); }}
                        className={`p-3 rounded-lg text-sm font-medium transition-all ${
                          encodingType === type
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type === 'base64' && 'Base64'}
                        {type === 'url' && 'URL'}
                        {type === 'html' && 'HTML'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mode Toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => { setMode('encode'); setOutput(""); }}
                    className={`flex-1 p-3 rounded-lg font-medium transition-all ${
                      mode === 'encode'
                        ? 'bg-green-100 text-green-700 border-2 border-green-500'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    تشفير
                  </button>
                  <button
                    onClick={() => { setMode('decode'); setOutput(""); }}
                    className={`flex-1 p-3 rounded-lg font-medium transition-all ${
                      mode === 'decode'
                        ? 'bg-green-100 text-green-700 border-2 border-green-500'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    فك التشفير
                  </button>
                </div>

                {/* Input */}
                <div>
                  <Label htmlFor="input">
                    {mode === 'encode' ? 'النص الأصلي' : 'النص المشفر'}
                  </Label>
                  <Textarea
                    id="input"
                    placeholder={mode === 'encode' ? 'أدخل النص المراد تشفيره...' : 'أدخل النص المشفر...'}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={4}
                    className="mt-2"
                    dir="ltr"
                  />
                </div>

                <Button className="w-full" size="lg" onClick={process} disabled={!input}>
                  <Lock className="ml-2 h-5 w-5" />
                  {mode === 'encode' ? 'تشفير' : 'فك التشفير'}
                </Button>

                {error && (
                  <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center">
                    {error}
                  </div>
                )}

                {/* Output */}
                {output && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>
                        {mode === 'encode' ? 'النص المشفر' : 'النص الأصلي'}
                      </Label>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={swapInputOutput}>
                          <ArrowLeftRight className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={copyOutput}>
                          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-lg font-mono text-sm break-all" dir="ltr">
                      {output}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">أنواع التشفير</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Base64</h3>
                  <p className="text-sm text-gray-600">
                    تشفير ثنائي يحول النص إلى أحرف ASCII آمنة. يُستخدم كثيراً في نقل البيانات عبر الإنترنت.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">URL Encoding</h3>
                  <p className="text-sm text-gray-600">
                    يحول الرموز الخاصة إلى صيغة آمنة للاستخدام في روابط URL.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">HTML Entities</h3>
                  <p className="text-sm text-gray-600">
                    يحول الرموز الخاصة إلى صيغة آمنة للعرض في صفحات HTML.
                  </p>
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
