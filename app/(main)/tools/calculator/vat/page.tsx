"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { DollarSign, Calendar, Activity, Percent } from "lucide-react";
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

export default function VATCalculatorPage() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("15");
  const [result, setResult] = useState<{
    original: number;
    vat: number;
    total: number;
  } | null>(null);
  const [mode, setMode] = useState<"add" | "remove">("add");

  const calculateAddVAT = () => {
    const amt = parseFloat(amount);
    const r = parseFloat(rate);

    if (isNaN(amt) || isNaN(r)) {
      alert("الرجاء إدخال قيم صحيحة");
      return;
    }

    const vat = amt * (r / 100);
    const total = amt + vat;

    setResult({
      original: amt,
      vat: vat,
      total: total,
    });
    setMode("add");
  };

  const calculateRemoveVAT = () => {
    const totalWithVat = parseFloat(amount);
    const r = parseFloat(rate);

    if (isNaN(totalWithVat) || isNaN(r)) {
      alert("الرجاء إدخال قيم صحيحة");
      return;
    }

    const original = totalWithVat / (1 + r / 100);
    const vat = totalWithVat - original;

    setResult({
      original: original,
      vat: vat,
      total: totalWithVat,
    });
    setMode("remove");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              حاسبة ضريبة القيمة المضافة (VAT)
            </h1>
            <p className="text-gray-600 text-lg">احسب الضريبة بسهولة - إضافة أو إزالة</p>
          </div>

          <ToolNavigation tools={calculatorTools} category="الحاسبات" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="amount">المبلغ</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="أدخل المبلغ"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="rate">نسبة الضريبة (%)</Label>
                  <Input
                    id="rate"
                    type="number"
                    placeholder="15"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-1">النسبة الافتراضية في السعودية: 15%</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button className="w-full" size="lg" onClick={calculateAddVAT}>
                    <DollarSign className="ml-2 h-5 w-5" />
                    إضافة الضريبة
                  </Button>
                  <Button
                    className="w-full"
                    size="lg"
                    variant="outline"
                    onClick={calculateRemoveVAT}
                  >
                    <DollarSign className="ml-2 h-5 w-5" />
                    إزالة الضريبة
                  </Button>
                </div>

                {result !== null && (
                  <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600 mb-2">المبلغ الأصلي</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {result.original.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">ريال</p>
                      </div>
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600 mb-2">الضريبة ({rate}%)</p>
                        <p className="text-2xl font-bold text-orange-500">
                          {result.vat.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">ريال</p>
                      </div>
                      <div className="p-4 bg-white rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600 mb-2">الإجمالي</p>
                        <p className="text-2xl font-bold text-cyan-600">
                          {result.total.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">ريال</p>
                      </div>
                    </div>
                    <div className="mt-4 text-center text-sm text-gray-600">
                      {mode === "add"
                        ? `تم إضافة ${rate}% ضريبة إلى المبلغ الأصلي`
                        : `تم استخراج ${rate}% ضريبة من المبلغ الإجمالي`}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">كيفية الاستخدام</h2>
              <div className="space-y-4 text-gray-700">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold mb-2">✅ إضافة الضريبة</h3>
                  <p className="text-sm">
                    استخدم هذا الخيار عندما يكون لديك المبلغ الأصلي وتريد إضافة الضريبة إليه.
                    مثال: سعر المنتج 100 ريال، كم سيكون السعر النهائي بعد إضافة 15% ضريبة؟
                  </p>
                </div>
                <div className="p-4 bg-cyan-50 rounded-lg">
                  <h3 className="font-bold mb-2">✅ إزالة الضريبة</h3>
                  <p className="text-sm">
                    استخدم هذا الخيار عندما يكون لديك المبلغ الإجمالي مع الضريبة وتريد معرفة
                    المبلغ الأصلي قبل الضريبة. مثال: دفعت 115 ريال شامل الضريبة، كم كان السعر
                    الأصلي؟
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
