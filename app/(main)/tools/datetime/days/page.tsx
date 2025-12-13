"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Globe, CalendarDays } from "lucide-react";

const datetimeTools = [
  { name: "الأيام", href: "/tools/datetime/days", icon: Calendar },
  { name: "العد التنازلي", href: "/tools/datetime/countdown", icon: Clock },
  { name: "المناطق الزمنية", href: "/tools/datetime/timezone", icon: Globe },
  { name: "التقويم الهجري", href: "/tools/datetime/hijri", icon: CalendarDays },
];

export default function DaysCalculatorPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<{
    days: number;
    weeks: number;
    months: number;
    years: number;
  } | null>(null);

  const calculateDifference = (start: string, end: string) => {
    if (!start || !end) {
      setResult(null);
      return;
    }

    const startDateTime = new Date(start);
    const endDateTime = new Date(end);

    const diffTime = Math.abs(endDateTime.getTime() - startDateTime.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44); // Average days per month
    const years = Math.floor(days / 365.25); // Account for leap years

    setResult({ days, weeks, months, years });
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    calculateDifference(value, endDate);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    calculateDifference(startDate, value);
  };

  const setToday = (setter: (value: string) => void) => {
    const today = new Date().toISOString().split('T')[0];
    setter(today);
    if (setter === setStartDate) {
      calculateDifference(today, endDate);
    } else {
      calculateDifference(startDate, today);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              حاسبة الأيام
            </h1>
            <p className="text-gray-600 text-lg">احسب الفرق بين تاريخين</p>
          </div>

          <ToolNavigation tools={datetimeTools} category="التاريخ والوقت" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="start-date" className="text-lg font-semibold">التاريخ الأول</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => handleStartDateChange(e.target.value)}
                      className="text-lg flex-1"
                    />
                    <button
                      onClick={() => setToday(setStartDate)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      اليوم
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="end-date" className="text-lg font-semibold">التاريخ الثاني</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => handleEndDateChange(e.target.value)}
                      className="text-lg flex-1"
                    />
                    <button
                      onClick={() => setToday(setEndDate)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      اليوم
                    </button>
                  </div>
                </div>

                {result && (
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-4 text-center">الفرق الزمني:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 text-center border border-blue-200">
                        <p className="text-3xl font-bold text-blue-600">{result.days}</p>
                        <p className="text-sm text-gray-600 mt-1">يوم</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-center border border-purple-200">
                        <p className="text-3xl font-bold text-purple-600">{result.weeks}</p>
                        <p className="text-sm text-gray-600 mt-1">أسبوع</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center border border-green-200">
                        <p className="text-3xl font-bold text-green-600">{result.months}</p>
                        <p className="text-sm text-gray-600 mt-1">شهر تقريباً</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 text-center border border-orange-200">
                        <p className="text-3xl font-bold text-orange-600">{result.years}</p>
                        <p className="text-sm text-gray-600 mt-1">سنة تقريباً</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">استخدامات مفيدة:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• حساب المدة بين عيد ميلادين</li>
                <li>• معرفة كم يوم متبقي على حدث مهم</li>
                <li>• حساب مدة مشروع أو عقد</li>
                <li>• معرفة عمرك بالأيام أو الأسابيع</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
