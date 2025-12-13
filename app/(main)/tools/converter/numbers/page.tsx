"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Binary, Ruler, DollarSign, Thermometer, HardDrive } from "lucide-react";

const converterTools = [
  { name: "درجات الحرارة", href: "/tools/converter/temperature", icon: Thermometer },
  { name: "الوحدات", href: "/tools/converter/units", icon: Ruler },
  { name: "العملات", href: "/tools/converter/currency", icon: DollarSign },
  { name: "الأرقام", href: "/tools/converter/numbers", icon: Binary },
];

export default function NumbersConverterPage() {
  const [decimal, setDecimal] = useState("");
  const [binary, setBinary] = useState("");
  const [hexadecimal, setHexadecimal] = useState("");
  const [octal, setOctal] = useState("");

  const handleDecimalChange = (value: string) => {
    setDecimal(value);
    if (value === "") {
      setBinary("");
      setHexadecimal("");
      setOctal("");
      return;
    }
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0) {
      setBinary(num.toString(2));
      setHexadecimal(num.toString(16).toUpperCase());
      setOctal(num.toString(8));
    } else {
      setBinary("");
      setHexadecimal("");
      setOctal("");
    }
  };

  const handleBinaryChange = (value: string) => {
    setBinary(value);
    if (value === "") {
      setDecimal("");
      setHexadecimal("");
      setOctal("");
      return;
    }
    // Validate binary (only 0s and 1s)
    if (!/^[01]+$/.test(value)) {
      return;
    }
    const num = parseInt(value, 2);
    if (!isNaN(num)) {
      setDecimal(num.toString());
      setHexadecimal(num.toString(16).toUpperCase());
      setOctal(num.toString(8));
    }
  };

  const handleHexadecimalChange = (value: string) => {
    setHexadecimal(value.toUpperCase());
    if (value === "") {
      setDecimal("");
      setBinary("");
      setOctal("");
      return;
    }
    // Validate hexadecimal
    if (!/^[0-9A-Fa-f]+$/.test(value)) {
      return;
    }
    const num = parseInt(value, 16);
    if (!isNaN(num)) {
      setDecimal(num.toString());
      setBinary(num.toString(2));
      setOctal(num.toString(8));
    }
  };

  const handleOctalChange = (value: string) => {
    setOctal(value);
    if (value === "") {
      setDecimal("");
      setBinary("");
      setHexadecimal("");
      return;
    }
    // Validate octal (only 0-7)
    if (!/^[0-7]+$/.test(value)) {
      return;
    }
    const num = parseInt(value, 8);
    if (!isNaN(num)) {
      setDecimal(num.toString());
      setBinary(num.toString(2));
      setHexadecimal(num.toString(16).toUpperCase());
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
              <Binary className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              محول الأرقام
            </h1>
            <p className="text-gray-600 text-lg">حول بين الأنظمة العددية المختلفة</p>
          </div>

          <ToolNavigation tools={converterTools} category="المحولات" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="decimal" className="text-lg font-semibold">عشري (Decimal)</Label>
                  <Input
                    id="decimal"
                    type="text"
                    value={decimal}
                    onChange={(e) => handleDecimalChange(e.target.value)}
                    placeholder="10"
                    className="text-lg mt-2 font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-1">أرقام من 0-9</p>
                </div>

                <div>
                  <Label htmlFor="binary" className="text-lg font-semibold">ثنائي (Binary)</Label>
                  <Input
                    id="binary"
                    type="text"
                    value={binary}
                    onChange={(e) => handleBinaryChange(e.target.value)}
                    placeholder="1010"
                    className="text-lg mt-2 font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-1">أرقام من 0-1 فقط</p>
                </div>

                <div>
                  <Label htmlFor="octal" className="text-lg font-semibold">ثماني (Octal)</Label>
                  <Input
                    id="octal"
                    type="text"
                    value={octal}
                    onChange={(e) => handleOctalChange(e.target.value)}
                    placeholder="12"
                    className="text-lg mt-2 font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-1">أرقام من 0-7 فقط</p>
                </div>

                <div>
                  <Label htmlFor="hexadecimal" className="text-lg font-semibold">سادس عشري (Hexadecimal)</Label>
                  <Input
                    id="hexadecimal"
                    type="text"
                    value={hexadecimal}
                    onChange={(e) => handleHexadecimalChange(e.target.value)}
                    placeholder="A"
                    className="text-lg mt-2 font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-1">أرقام من 0-9 وحروف A-F</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">أمثلة:</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="grid grid-cols-4 gap-2 font-semibold border-b pb-2">
                  <span>عشري</span>
                  <span>ثنائي</span>
                  <span>ثماني</span>
                  <span>سادس عشري</span>
                </div>
                <div className="grid grid-cols-4 gap-2 font-mono">
                  <span>10</span>
                  <span>1010</span>
                  <span>12</span>
                  <span>A</span>
                </div>
                <div className="grid grid-cols-4 gap-2 font-mono">
                  <span>255</span>
                  <span>11111111</span>
                  <span>377</span>
                  <span>FF</span>
                </div>
                <div className="grid grid-cols-4 gap-2 font-mono">
                  <span>100</span>
                  <span>1100100</span>
                  <span>144</span>
                  <span>64</span>
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
