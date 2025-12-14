"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { DollarSign, Calendar, Activity, Percent, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const calculatorTools = [
  { name: "ضريبة", href: "/tools/calculator/vat", icon: DollarSign },
  { name: "العمر", href: "/tools/calculator/age", icon: Calendar },
  { name: "BMI", href: "/tools/calculator/bmi", icon: Activity },
  { name: "نسبة", href: "/tools/calculator/percentage", icon: Percent },
  { name: "القروض", href: "/tools/calculator/loan", icon: Landmark },
];

export default function LoanCalculatorPage() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    schedule: { month: number; payment: number; principal: number; interest: number; balance: number }[];
  } | null>(null);

  const calculateLoan = () => {
    const p = parseFloat(principal);
    const annualRate = parseFloat(rate);
    const y = parseInt(years);

    if (isNaN(p) || isNaN(annualRate) || isNaN(y) || p <= 0 || annualRate <= 0 || y <= 0) {
      alert("الرجاء إدخال قيم صحيحة");
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const numPayments = y * 12;

    // Monthly payment formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment = p * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - p;

    // Generate amortization schedule (first 12 months)
    const schedule = [];
    let balance = p;
    for (let i = 1; i <= Math.min(12, numPayments); i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      schedule.push({
        month: i,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      });
    }

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      schedule,
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-4">
              <Landmark className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
              حاسبة القروض
            </h1>
            <p className="text-gray-600 text-lg">احسب القسط الشهري وإجمالي الفوائد</p>
          </div>

          <ToolNavigation tools={calculatorTools} category="الحاسبات" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="principal">مبلغ القرض (ريال)</Label>
                  <Input
                    id="principal"
                    type="number"
                    placeholder="100000"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="rate">نسبة الفائدة السنوية (%)</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.1"
                    placeholder="5"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="years">مدة القرض (سنوات)</Label>
                  <Input
                    id="years"
                    type="number"
                    placeholder="5"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <Button
                className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                size="lg"
                onClick={calculateLoan}
              >
                <Landmark className="ml-2 h-5 w-5" />
                احسب القسط الشهري
              </Button>

              {result && (
                <div className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl text-center">
                      <p className="text-sm text-gray-600 mb-2">القسط الشهري</p>
                      <p className="text-3xl font-bold text-emerald-600">
                        {result.monthlyPayment.toLocaleString("ar-SA", { maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">ريال</p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl text-center">
                      <p className="text-sm text-gray-600 mb-2">إجمالي المدفوعات</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {result.totalPayment.toLocaleString("ar-SA", { maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">ريال</p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl text-center">
                      <p className="text-sm text-gray-600 mb-2">إجمالي الفوائد</p>
                      <p className="text-3xl font-bold text-orange-600">
                        {result.totalInterest.toLocaleString("ar-SA", { maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">ريال</p>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-4">جدول السداد (أول 12 شهر)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-3 text-right">الشهر</th>
                          <th className="p-3 text-right">القسط</th>
                          <th className="p-3 text-right">الأصل</th>
                          <th className="p-3 text-right">الفائدة</th>
                          <th className="p-3 text-right">الرصيد المتبقي</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.schedule.map((row) => (
                          <tr key={row.month} className="border-b">
                            <td className="p-3">{row.month}</td>
                            <td className="p-3">{row.payment.toLocaleString("ar-SA", { maximumFractionDigits: 2 })}</td>
                            <td className="p-3 text-emerald-600">{row.principal.toLocaleString("ar-SA", { maximumFractionDigits: 2 })}</td>
                            <td className="p-3 text-orange-600">{row.interest.toLocaleString("ar-SA", { maximumFractionDigits: 2 })}</td>
                            <td className="p-3">{row.balance.toLocaleString("ar-SA", { maximumFractionDigits: 2 })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">ملاحظات مهمة:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• هذه الحاسبة تستخدم طريقة القسط الثابت (الأكثر شيوعاً)</li>
                <li>• الفائدة الفعلية قد تختلف حسب سياسة البنك</li>
                <li>• تأكد من معرفة جميع الرسوم والتكاليف الإضافية</li>
                <li>• استشر المؤسسة المالية للحصول على عرض دقيق</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
