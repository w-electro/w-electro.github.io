"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shuffle, Copy, GitCompare, StickyNote } from "lucide-react";

const utilityTools = [
  { name: "عداد الكلمات", href: "/tools/utility/word-count", icon: Copy },
  { name: "مقارنة النصوص", href: "/tools/utility/diff", icon: GitCompare },
  { name: "أرقام عشوائية", href: "/tools/utility/random", icon: Shuffle },
];

export default function RandomGeneratorPage() {
  const [generatorType, setGeneratorType] = useState("number");
  const [minNumber, setMinNumber] = useState("1");
  const [maxNumber, setMaxNumber] = useState("100");
  const [passwordLength, setPasswordLength] = useState("16");
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [result, setResult] = useState("");

  const generateRandomNumber = () => {
    const min = parseInt(minNumber) || 1;
    const max = parseInt(maxNumber) || 100;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    setResult(random.toString());
  };

  const generatePassword = () => {
    const length = parseInt(passwordLength) || 16;
    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (charset === "") {
      setResult("يرجى اختيار نوع واحد على الأقل من الأحرف");
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setResult(password);
  };

  const generateUUID = () => {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    setResult(uuid);
  };

  const generateColor = () => {
    const color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setResult(color);
  };

  const handleGenerate = () => {
    switch (generatorType) {
      case "number":
        generateRandomNumber();
        break;
      case "password":
        generatePassword();
        break;
      case "uuid":
        generateUUID();
        break;
      case "color":
        generateColor();
        break;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4">
              <Shuffle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              المولد العشوائي
            </h1>
            <p className="text-gray-600 text-lg">توليد أرقام، كلمات مرور، ومعرفات عشوائية</p>
          </div>

          <ToolNavigation tools={utilityTools} category="الأدوات المساعدة" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-semibold">نوع المولد</Label>
                  <Select value={generatorType} onValueChange={setGeneratorType}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="number">رقم عشوائي</SelectItem>
                      <SelectItem value="password">كلمة مرور قوية</SelectItem>
                      <SelectItem value="uuid">UUID / معرف فريد</SelectItem>
                      <SelectItem value="color">لون عشوائي (Hex)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {generatorType === "number" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="min">الحد الأدنى</Label>
                      <Input
                        id="min"
                        type="number"
                        value={minNumber}
                        onChange={(e) => setMinNumber(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="max">الحد الأقصى</Label>
                      <Input
                        id="max"
                        type="number"
                        value={maxNumber}
                        onChange={(e) => setMaxNumber(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}

                {generatorType === "password" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="length">طول كلمة المرور</Label>
                      <Input
                        id="length"
                        type="number"
                        value={passwordLength}
                        onChange={(e) => setPasswordLength(e.target.value)}
                        min="4"
                        max="128"
                        className="mt-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={includeLowercase}
                          onChange={(e) => setIncludeLowercase(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <span>أحرف صغيرة (a-z)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={includeUppercase}
                          onChange={(e) => setIncludeUppercase(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <span>أحرف كبيرة (A-Z)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={includeNumbers}
                          onChange={(e) => setIncludeNumbers(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <span>أرقام (0-9)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={includeSymbols}
                          onChange={(e) => setIncludeSymbols(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <span>رموز خاصة (!@#$%...)</span>
                      </label>
                    </div>
                  </div>
                )}

                <Button onClick={handleGenerate} className="w-full" size="lg">
                  توليد
                </Button>

                {result && (
                  <div className="space-y-2">
                    <Label>النتيجة:</Label>
                    <div className="flex gap-2">
                      <Input
                        value={result}
                        readOnly
                        className="font-mono text-lg"
                        style={generatorType === "color" ? { backgroundColor: result, color: "#fff" } : {}}
                      />
                      <Button onClick={copyToClipboard} variant="outline">
                        نسخ
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">استخدامات:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>أرقام عشوائية:</strong> للسحوبات، الألعاب، اختيار عشوائي</li>
                <li>• <strong>كلمات مرور:</strong> لإنشاء كلمات مرور قوية وآمنة</li>
                <li>• <strong>UUID:</strong> معرفات فريدة للبرمجة وقواعد البيانات</li>
                <li>• <strong>ألوان:</strong> اختيار ألوان عشوائية للتصميم</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
