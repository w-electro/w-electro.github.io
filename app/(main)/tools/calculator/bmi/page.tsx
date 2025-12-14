"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Activity, DollarSign, Calendar, Percent } from "lucide-react";
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

export default function BMICalculatorPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const [categoryColor, setCategoryColor] = useState("");

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      alert("الرجاء إدخال قيم صحيحة");
      return;
    }

    const heightM = h / 100;
    const bmiValue = w / (heightM * heightM);
    setBmi(bmiValue);

    // Determine category
    if (bmiValue < 18.5) {
      setCategory("نحافة");
      setCategoryColor("text-blue-600 bg-blue-50");
    } else if (bmiValue < 25) {
      setCategory("وزن طبيعي");
      setCategoryColor("text-green-600 bg-green-50");
    } else if (bmiValue < 30) {
      setCategory("وزن زائد");
      setCategoryColor("text-yellow-600 bg-yellow-50");
    } else {
      setCategory("سمنة");
      setCategoryColor("text-red-600 bg-red-50");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              حاسبة مؤشر كتلة الجسم (BMI)
            </h1>
            <p className="text-gray-600 text-lg">احسب مؤشر كتلة جسمك وتعرف على وضعك الصحي</p>
          </div>

          <ToolNavigation tools={calculatorTools} category="الحاسبات" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="weight">الوزن (كجم)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="مثال: 70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="height">الطول (سم)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="مثال: 175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>

                <Button className="w-full" size="lg" onClick={calculate}>
                  <Activity className="ml-2 h-5 w-5" />
                  احسب BMI
                </Button>

                {bmi !== null && (
                  <div className={`mt-6 p-8 rounded-lg text-center ${categoryColor}`}>
                    <p className="text-sm text-gray-600 mb-2">مؤشر كتلة الجسم:</p>
                    <p className="text-5xl font-bold mb-3">{bmi.toFixed(1)}</p>
                    <p className="text-2xl font-semibold">{category}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">تصنيف مؤشر كتلة الجسم</h2>
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <span className="font-bold text-blue-600 block mb-1">أقل من 18.5</span>
                  <span className="text-gray-700">نحافة</span>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <span className="font-bold text-green-600 block mb-1">18.5 - 24.9</span>
                  <span className="text-gray-700">وزن طبيعي</span>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <span className="font-bold text-yellow-600 block mb-1">25 - 29.9</span>
                  <span className="text-gray-700">وزن زائد</span>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <span className="font-bold text-red-600 block mb-1">30 فأكثر</span>
                  <span className="text-gray-700">سمنة</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  ⚠️ ملاحظة: مؤشر كتلة الجسم هو مقياس عام ولا يأخذ في الاعتبار العضلات أو بنية الجسم.
                  استشر طبيبك للحصول على تقييم صحي دقيق.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
