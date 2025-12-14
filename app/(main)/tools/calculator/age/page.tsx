"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Calendar, DollarSign, Activity, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const calculatorTools = [
  { name: "ضريبة", href: "/tools/calculator/vat", icon: DollarSign },
  { name: "العمر", href: "/tools/calculator/age", icon: Calendar },
  { name: "BMI", href: "/tools/calculator/bmi", icon: Activity },
  { name: "نسبة", href: "/tools/calculator/percentage", icon: Percent },
  { name: "القروض", href: "/tools/calculator/loan", icon: DollarSign },
];

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const calculate = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              حاسبة العمر
            </h1>
            <p className="text-gray-600 text-lg">احسب عمرك بالسنوات والشهور والأيام</p>
          </div>

          <ToolNavigation tools={calculatorTools} category="الحاسبات" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="birthdate">تاريخ الميلاد</Label>
                  <Input
                    id="birthdate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>

                <Button className="w-full" size="lg" onClick={calculate} disabled={!birthDate}>
                  <Calendar className="ml-2 h-5 w-5" />
                  احسب العمر
                </Button>

                {result && (
                  <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                    <p className="text-center text-sm text-gray-600 mb-4">عمرك هو:</p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-3xl font-bold text-purple-600">{result.years}</div>
                        <div className="text-sm text-gray-600">سنة</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-purple-600">{result.months}</div>
                        <div className="text-sm text-gray-600">شهر</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-purple-600">{result.days}</div>
                        <div className="text-sm text-gray-600">يوم</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
