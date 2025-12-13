"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Calendar, Globe, CalendarDays } from "lucide-react";

const datetimeTools = [
  { name: "الأيام", href: "/tools/datetime/days", icon: Calendar },
  { name: "العد التنازلي", href: "/tools/datetime/countdown", icon: Clock },
  { name: "المناطق الزمنية", href: "/tools/datetime/timezone", icon: Globe },
  { name: "التقويم الهجري", href: "/tools/datetime/hijri", icon: CalendarDays },
];

export default function CountdownPage() {
  const [targetDate, setTargetDate] = useState("");
  const [targetTime, setTargetTime] = useState("00:00");
  const [eventName, setEventName] = useState("");
  const [countdown, setCountdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  } | null>(null);

  useEffect(() => {
    if (!targetDate) {
      setCountdown(null);
      return;
    }

    const calculateCountdown = () => {
      const target = new Date(`${targetDate}T${targetTime}`);
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate, targetTime]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              العد التنازلي
            </h1>
            <p className="text-gray-600 text-lg">عداد تنازلي لحدث معين</p>
          </div>

          <ToolNavigation tools={datetimeTools} category="التاريخ والوقت" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="event-name" className="text-lg font-semibold">اسم الحدث (اختياري)</Label>
                  <Input
                    id="event-name"
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="مثال: عيد الفطر، عيد ميلاد، امتحان..."
                    className="text-lg mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="target-date" className="text-lg font-semibold">التاريخ المستهدف</Label>
                    <Input
                      id="target-date"
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="text-lg mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="target-time" className="text-lg font-semibold">الوقت المستهدف</Label>
                    <Input
                      id="target-time"
                      type="time"
                      value={targetTime}
                      onChange={(e) => setTargetTime(e.target.value)}
                      className="text-lg mt-2"
                    />
                  </div>
                </div>

                {countdown && (
                  <div className="pt-6 border-t">
                    {eventName && (
                      <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        {countdown.isExpired ? `انتهى: ${eventName}` : `العد التنازلي لـ ${eventName}`}
                      </h3>
                    )}

                    {countdown.isExpired ? (
                      <div className="text-center py-12">
                        <p className="text-6xl mb-4">🎉</p>
                        <p className="text-2xl font-bold text-purple-600">الوقت حان!</p>
                        <p className="text-gray-600 mt-2">الحدث قد بدأ</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl p-6 text-center shadow-lg">
                          <p className="text-5xl font-bold mb-2">{countdown.days}</p>
                          <p className="text-lg opacity-90">يوم</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl p-6 text-center shadow-lg">
                          <p className="text-5xl font-bold mb-2">{countdown.hours}</p>
                          <p className="text-lg opacity-90">ساعة</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-2xl p-6 text-center shadow-lg">
                          <p className="text-5xl font-bold mb-2">{countdown.minutes}</p>
                          <p className="text-lg opacity-90">دقيقة</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 text-center shadow-lg">
                          <p className="text-5xl font-bold mb-2">{countdown.seconds}</p>
                          <p className="text-lg opacity-90">ثانية</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">أفكار للعد التنازلي:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>🎂 أعياد الميلاد والمناسبات الشخصية</li>
                <li>🎓 امتحانات أو تخرج</li>
                <li>✈️ رحلات وعطلات</li>
                <li>🎉 مناسبات وأعياد وطنية أو دينية</li>
                <li>💍 حفلات زفاف ومناسبات خاصة</li>
                <li>🎯 أهداف ومشاريع شخصية</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
