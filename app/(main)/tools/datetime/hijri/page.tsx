"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Calendar, Clock, Globe } from "lucide-react";

const datetimeTools = [
  { name: "الأيام", href: "/tools/datetime/days", icon: Calendar },
  { name: "العد التنازلي", href: "/tools/datetime/countdown", icon: Clock },
  { name: "المناطق الزمنية", href: "/tools/datetime/timezone", icon: Globe },
  { name: "التقويم الهجري", href: "/tools/datetime/hijri", icon: CalendarDays },
];

const hijriMonths = [
  "محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الآخرة",
  "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
];

const gregorianMonths = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

// Simple Hijri conversion algorithm (approximate)
function gregorianToHijri(gYear: number, gMonth: number, gDay: number) {
  // Julian Day calculation
  const a = Math.floor((14 - gMonth) / 12);
  const y = gYear + 4800 - a;
  const m = gMonth + 12 * a - 3;
  const jd = gDay + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  // Convert to Hijri
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = (Math.floor((10985 - l2) / 5316)) * (Math.floor((50 * l2) / 17719)) + (Math.floor(l2 / 5670)) * (Math.floor((43 * l2) / 15238));
  const l3 = l2 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  const hMonth = Math.floor((24 * l3) / 709);
  const hDay = l3 - Math.floor((709 * hMonth) / 24);
  const hYear = 30 * n + j - 30;

  return { year: hYear, month: hMonth, day: hDay };
}

function hijriToGregorian(hYear: number, hMonth: number, hDay: number) {
  // Convert Hijri to Julian Day
  const l = Math.floor((11 * hYear + 3) / 30);
  const l2 = Math.floor((hMonth - 1) / 2);
  const jd = Math.floor((hMonth / 2)) + Math.floor((354 * hYear) + (30 * hMonth) - Math.floor((hMonth - 1) / 2)) + hDay + 1948440 - 385;

  // Convert Julian Day to Gregorian
  const a = jd + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  const gDay = e - Math.floor((153 * m + 2) / 5) + 1;
  const gMonth = m + 3 - 12 * Math.floor(m / 10);
  const gYear = 100 * b + d - 4800 + Math.floor(m / 10);

  return { year: gYear, month: gMonth, day: gDay };
}

export default function HijriCalendarPage() {
  const [conversionMode, setConversionMode] = useState<"toHijri" | "toGregorian">("toHijri");
  const [gregorianDate, setGregorianDate] = useState("");
  const [hijriYear, setHijriYear] = useState("");
  const [hijriMonth, setHijriMonth] = useState("1");
  const [hijriDay, setHijriDay] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const today = new Date();
    setGregorianDate(today.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (conversionMode === "toHijri" && gregorianDate) {
      const [year, month, day] = gregorianDate.split('-').map(Number);
      const hijri = gregorianToHijri(year, month, day);
      setResult(`${hijri.day} ${hijriMonths[hijri.month - 1]} ${hijri.year} هـ`);
    } else if (conversionMode === "toGregorian" && hijriYear && hijriDay) {
      const year = parseInt(hijriYear);
      const month = parseInt(hijriMonth);
      const day = parseInt(hijriDay);

      if (year > 0 && day > 0 && day <= 30) {
        const gregorian = hijriToGregorian(year, month, day);
        setResult(`${gregorian.day} ${gregorianMonths[gregorian.month - 1]} ${gregorian.year} م`);
      }
    }
  }, [conversionMode, gregorianDate, hijriYear, hijriMonth, hijriDay]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4">
              <CalendarDays className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
              التقويم الهجري
            </h1>
            <p className="text-gray-600 text-lg">تحويل بين التقويمين الهجري والميلادي</p>
          </div>

          <ToolNavigation tools={datetimeTools} category="التاريخ والوقت" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-semibold">نوع التحويل</Label>
                  <Select value={conversionMode} onValueChange={(v) => setConversionMode(v as "toHijri" | "toGregorian")}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toHijri">من ميلادي إلى هجري</SelectItem>
                      <SelectItem value="toGregorian">من هجري إلى ميلادي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {conversionMode === "toHijri" ? (
                  <div>
                    <Label htmlFor="gregorian-date" className="text-lg font-semibold">التاريخ الميلادي</Label>
                    <Input
                      id="gregorian-date"
                      type="date"
                      value={gregorianDate}
                      onChange={(e) => setGregorianDate(e.target.value)}
                      className="text-lg mt-2"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="hijri-year" className="text-lg font-semibold">السنة الهجرية</Label>
                      <Input
                        id="hijri-year"
                        type="number"
                        value={hijriYear}
                        onChange={(e) => setHijriYear(e.target.value)}
                        placeholder="1446"
                        className="text-lg mt-2"
                        min="1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hijri-month" className="text-lg font-semibold">الشهر</Label>
                      <Select value={hijriMonth} onValueChange={setHijriMonth}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {hijriMonths.map((month, idx) => (
                            <SelectItem key={idx} value={String(idx + 1)}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="hijri-day" className="text-lg font-semibold">اليوم</Label>
                      <Input
                        id="hijri-day"
                        type="number"
                        value={hijriDay}
                        onChange={(e) => setHijriDay(e.target.value)}
                        placeholder="1"
                        className="text-lg mt-2"
                        min="1"
                        max="30"
                      />
                    </div>
                  </div>
                )}

                {result && (
                  <div className="bg-gradient-to-br from-orange-100 to-red-100 border-2 border-orange-300 rounded-lg p-6 text-center">
                    <p className="text-sm text-gray-600 mb-2">النتيجة:</p>
                    <p className="text-3xl font-bold text-orange-700">{result}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">⚠️ ملاحظة هامة:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• التحويل يعتمد على خوارزمية حسابية تقريبية</li>
                <li>• قد يختلف التاريخ الهجري الدقيق بيوم أو يومين حسب رؤية الهلال</li>
                <li>• للتواريخ الرسمية، يُفضل الرجوع إلى المراجع الشرعية المحلية</li>
                <li>• التقويم الهجري يعتمد على دورة القمر (354 أو 355 يوماً في السنة)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
