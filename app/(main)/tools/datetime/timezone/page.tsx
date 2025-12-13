"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Calendar, Clock, CalendarDays } from "lucide-react";

const datetimeTools = [
  { name: "الأيام", href: "/tools/datetime/days", icon: Calendar },
  { name: "العد التنازلي", href: "/tools/datetime/countdown", icon: Clock },
  { name: "المناطق الزمنية", href: "/tools/datetime/timezone", icon: Globe },
  { name: "التقويم الهجري", href: "/tools/datetime/hijri", icon: CalendarDays },
];

const timezones = [
  { value: "UTC", label: "UTC (التوقيت العالمي)", offset: 0 },
  { value: "GMT", label: "GMT (غرينتش)", offset: 0 },
  { value: "EST", label: "EST (نيويورك)", offset: -5 },
  { value: "PST", label: "PST (لوس أنجلوس)", offset: -8 },
  { value: "CET", label: "CET (باريس)", offset: 1 },
  { value: "EET", label: "EET (القاهرة)", offset: 2 },
  { value: "AST", label: "AST (الرياض)", offset: 3 },
  { value: "GST", label: "GST (دبي)", offset: 4 },
  { value: "PKT", label: "PKT (كراتشي)", offset: 5 },
  { value: "IST", label: "IST (نيودلهي)", offset: 5.5 },
  { value: "CST", label: "CST (بكين)", offset: 8 },
  { value: "JST", label: "JST (طوكيو)", offset: 9 },
  { value: "AEST", label: "AEST (سيدني)", offset: 10 },
  { value: "NZST", label: "NZST (ويلينغتون)", offset: 12 },
];

export default function TimezonePage() {
  const [sourceTime, setSourceTime] = useState("");
  const [sourceDate, setSourceDate] = useState("");
  const [sourceTimezone, setSourceTimezone] = useState("UTC");
  const [targetTimezone, setTargetTimezone] = useState("AST");
  const [convertedTime, setConvertedTime] = useState("");
  const [convertedDate, setConvertedDate] = useState("");

  useEffect(() => {
    // Set current time and date on mount
    const now = new Date();
    setSourceDate(now.toISOString().split('T')[0]);
    setSourceTime(now.toTimeString().slice(0, 5));
  }, []);

  useEffect(() => {
    if (!sourceDate || !sourceTime) return;

    const sourceOffset = timezones.find(tz => tz.value === sourceTimezone)?.offset || 0;
    const targetOffset = timezones.find(tz => tz.value === targetTimezone)?.offset || 0;

    // Parse source date and time
    const [year, month, day] = sourceDate.split('-').map(Number);
    const [hours, minutes] = sourceTime.split(':').map(Number);

    // Create UTC date
    const utcDate = new Date(Date.UTC(year, month - 1, day, hours - sourceOffset, minutes));

    // Convert to target timezone
    const targetDate = new Date(utcDate.getTime() + (targetOffset * 60 * 60 * 1000));

    setConvertedDate(targetDate.toISOString().split('T')[0]);
    setConvertedTime(targetDate.toISOString().split('T')[1].slice(0, 5));
  }, [sourceDate, sourceTime, sourceTimezone, targetTimezone]);

  const setNow = () => {
    const now = new Date();
    setSourceDate(now.toISOString().split('T')[0]);
    setSourceTime(now.toTimeString().slice(0, 5));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-4">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
              محول المناطق الزمنية
            </h1>
            <p className="text-gray-600 text-lg">حول الوقت بين المناطق الزمنية المختلفة</p>
          </div>

          <ToolNavigation tools={datetimeTools} category="التاريخ والوقت" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-green-600">من:</h3>

                    <div>
                      <Label htmlFor="source-timezone">المنطقة الزمنية</Label>
                      <Select value={sourceTimezone} onValueChange={setSourceTimezone}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="source-date">التاريخ</Label>
                      <Input
                        id="source-date"
                        type="date"
                        value={sourceDate}
                        onChange={(e) => setSourceDate(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="source-time">الوقت</Label>
                      <Input
                        id="source-time"
                        type="time"
                        value={sourceTime}
                        onChange={(e) => setSourceTime(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <button
                      onClick={setNow}
                      className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                    >
                      الوقت الحالي
                    </button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-emerald-600">إلى:</h3>

                    <div>
                      <Label htmlFor="target-timezone">المنطقة الزمنية</Label>
                      <Select value={targetTimezone} onValueChange={setTargetTimezone}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>التاريخ</Label>
                      <div className="mt-2 px-4 py-2 bg-gray-50 border rounded-md text-lg font-semibold text-emerald-600">
                        {convertedDate || "---"}
                      </div>
                    </div>

                    <div>
                      <Label>الوقت</Label>
                      <div className="mt-2 px-4 py-2 bg-gray-50 border rounded-md text-lg font-semibold text-emerald-600">
                        {convertedTime || "---"}
                      </div>
                    </div>
                  </div>
                </div>

                {sourceDate && sourceTime && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600">التحويل الكامل:</p>
                    <p className="text-lg font-bold text-blue-600 mt-1">
                      {sourceDate} {sourceTime} ({sourceTimezone}) = {convertedDate} {convertedTime} ({targetTimezone})
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">نصائح:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• اضغط "الوقت الحالي" لتعيين الوقت الحالي تلقائياً</li>
                <li>• مفيد لتنسيق الاجتماعات الدولية</li>
                <li>• تذكر أن بعض المناطق تطبق التوقيت الصيفي</li>
                <li>• التحويل يتم تلقائياً عند تغيير أي قيمة</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
