"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Key, Copy, Check, RefreshCw, Shield, Hash, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const securityTools = [
  { name: "كلمات المرور", href: "/tools/security/password", icon: Key },
  { name: "Hash", href: "/tools/security/hash", icon: Hash },
  { name: "تشفير", href: "/tools/security/encode", icon: Lock },
];

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      setPassword("");
      return;
    }

    let result = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }

    setPassword(result);
    setCopied(false);
  }, [length, uppercase, lowercase, numbers, symbols]);

  const copyPassword = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const getStrength = () => {
    if (!password) return { text: "", color: "", width: 0 };

    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    if (score <= 2) return { text: "ضعيفة", color: "bg-red-500", width: 33 };
    if (score <= 4) return { text: "متوسطة", color: "bg-yellow-500", width: 66 };
    return { text: "قوية", color: "bg-green-500", width: 100 };
  };

  const strength = getStrength();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4">
              <Key className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              مولد كلمات المرور
            </h1>
            <p className="text-gray-600 text-lg">أنشئ كلمات مرور قوية وآمنة</p>
          </div>

          <ToolNavigation tools={securityTools} category="الأمان" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Password Display */}
                <div className="relative">
                  <div className="flex items-center gap-2 p-4 bg-gray-100 rounded-lg font-mono text-lg break-all min-h-[60px]">
                    {password || <span className="text-gray-400">انقر "توليد" لإنشاء كلمة مرور</span>}
                  </div>
                  {password && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 left-2"
                      onClick={copyPassword}
                    >
                      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  )}
                </div>

                {/* Strength Indicator */}
                {password && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>قوة كلمة المرور</span>
                      <span className={strength.color.replace("bg-", "text-")}>{strength.text}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${strength.color} transition-all duration-300`}
                        style={{ width: `${strength.width}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Length Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>طول كلمة المرور</Label>
                    <span className="text-lg font-bold text-blue-600">{length}</span>
                  </div>
                  <Slider
                    value={[length]}
                    onValueChange={(value) => setLength(value[0])}
                    min={8}
                    max={64}
                    step={1}
                    className="py-4"
                  />
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={uppercase}
                      onChange={(e) => setUppercase(e.target.checked)}
                      className="rounded"
                    />
                    <span>أحرف كبيرة (A-Z)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={lowercase}
                      onChange={(e) => setLowercase(e.target.checked)}
                      className="rounded"
                    />
                    <span>أحرف صغيرة (a-z)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={numbers}
                      onChange={(e) => setNumbers(e.target.checked)}
                      className="rounded"
                    />
                    <span>أرقام (0-9)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={symbols}
                      onChange={(e) => setSymbols(e.target.checked)}
                      className="rounded"
                    />
                    <span>رموز (!@#$%)</span>
                  </label>
                </div>

                {/* Generate Button */}
                <Button className="w-full" size="lg" onClick={generatePassword}>
                  <RefreshCw className="ml-2 h-5 w-5" />
                  توليد كلمة مرور
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                نصائح لكلمات المرور الآمنة
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>استخدم كلمة مرور مختلفة لكل حساب</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>اجعل طول كلمة المرور 12 حرفاً على الأقل</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>امزج بين الأحرف والأرقام والرموز</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>استخدم مدير كلمات المرور لحفظها بأمان</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
