"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Percent, DollarSign, Calendar, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const calculatorTools = [
  { name: "ضريبة", href: "/tools/calculator/vat", icon: DollarSign },
  { name: "العمر", href: "/tools/calculator/age", icon: Calendar },
  { name: "BMI", href: "/tools/calculator/bmi", icon: Activity },
  { name: "نسبة", href: "/tools/calculator/percentage", icon: Percent },
];

export default function PercentageCalculatorPage() {
  const [value, setValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const val = parseFloat(value);
    const perc = parseFloat(percentage);
    if (!isNaN(val) && !isNaN(perc)) {
      setResult((val * perc) / 100);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4">
              <Percent className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              حاسبة النسبة المئوية
            </h1>
            <p className="text-gray-600 text-lg">احسب النسب المئوية بسهولة ودقة</p>
          </div>

          <ToolNavigation tools={calculatorTools} category="الحاسبات" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="value">القيمة الأساسية</Label>
                  <Input
                    id="value"
                    type="number"
                    placeholder="مثال: 1000"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="percentage">النسبة المئوية (%)</Label>
                  <Input
                    id="percentage"
                    type="number"
                    placeholder="مثال: 15"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                  />
                </div>

                <Button className="w-full" size="lg" onClick={calculate}>
                  <Percent className="ml-2 h-5 w-5" />
                  احسب
                </Button>

                {result !== null && (
                  <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-2">النتيجة:</p>
                    <p className="text-4xl font-bold text-blue-600">{result.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      {percentage}% من {value} = {result.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">أمثلة على الاستخدام</h2>
              <ul className="space-y-2 text-gray-700">
                <li>• حساب الخصومات على المشتريات</li>
                <li>• حساب الزيادة أو النقصان في الأسعار</li>
                <li>• حساب الضرائب والرسوم</li>
                <li>• حساب نسبة الإنجاز في المشاريع</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
