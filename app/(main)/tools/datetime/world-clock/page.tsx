"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Calendar, Clock, CalendarDays, MapPin } from "lucide-react";

const datetimeTools = [
  { name: "حاسبة الأيام", href: "/tools/datetime/days", icon: Calendar },
  { name: "التقويم الهجري", href: "/tools/datetime/hijri", icon: CalendarDays },
  { name: "ساعة العالم", href: "/tools/datetime/world-clock", icon: Globe },
];

const cities = [
  { name: "الرياض", timezone: "Asia/Riyadh", country: "السعودية" },
  { name: "مكة المكرمة", timezone: "Asia/Riyadh", country: "السعودية" },
  { name: "جدة", timezone: "Asia/Riyadh", country: "السعودية" },
  { name: "دبي", timezone: "Asia/Dubai", country: "الإمارات" },
  { name: "القاهرة", timezone: "Africa/Cairo", country: "مصر" },
  { name: "عمّان", timezone: "Asia/Amman", country: "الأردن" },
  { name: "الكويت", timezone: "Asia/Kuwait", country: "الكويت" },
  { name: "الدوحة", timezone: "Asia/Qatar", country: "قطر" },
  { name: "المنامة", timezone: "Asia/Bahrain", country: "البحرين" },
  { name: "مسقط", timezone: "Asia/Muscat", country: "عمان" },
  { name: "بيروت", timezone: "Asia/Beirut", country: "لبنان" },
  { name: "دمشق", timezone: "Asia/Damascus", country: "سوريا" },
  { name: "بغداد", timezone: "Asia/Baghdad", country: "العراق" },
  { name: "الرباط", timezone: "Africa/Casablanca", country: "المغرب" },
  { name: "تونس", timezone: "Africa/Tunis", country: "تونس" },
  { name: "لندن", timezone: "Europe/London", country: "بريطانيا" },
  { name: "باريس", timezone: "Europe/Paris", country: "فرنسا" },
  { name: "برلين", timezone: "Europe/Berlin", country: "ألمانيا" },
  { name: "نيويورك", timezone: "America/New_York", country: "أمريكا" },
  { name: "لوس أنجلوس", timezone: "America/Los_Angeles", country: "أمريكا" },
  { name: "طوكيو", timezone: "Asia/Tokyo", country: "اليابان" },
  { name: "بكين", timezone: "Asia/Shanghai", country: "الصين" },
  { name: "سيدني", timezone: "Australia/Sydney", country: "أستراليا" },
  { name: "موسكو", timezone: "Europe/Moscow", country: "روسيا" },
];

export default function WorldClockPage() {
  const [times, setTimes] = useState<Record<string, { time: string; date: string; period: string }>>({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: Record<string, { time: string; date: string; period: string }> = {};
      cities.forEach((city) => {
        try {
          const now = new Date();
          const timeFormatter = new Intl.DateTimeFormat("ar-SA", {
            timeZone: city.timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          });
          const dateFormatter = new Intl.DateTimeFormat("ar-SA", {
            timeZone: city.timezone,
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          const timeParts = timeFormatter.formatToParts(now);
          const period = timeParts.find(p => p.type === "dayPeriod")?.value || "";
          const timeStr = timeParts
            .filter(p => ["hour", "minute", "second", "literal"].includes(p.type))
            .map(p => p.value)
            .join("");

          newTimes[city.name] = {
            time: timeStr,
            date: dateFormatter.format(now),
            period: period,
          };
        } catch {
          newTimes[city.name] = { time: "--:--:--", date: "", period: "" };
        }
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-4">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              ساعة العالم
            </h1>
            <p className="text-gray-600 text-lg">الوقت الحالي في مدن مختلفة حول العالم</p>
          </div>

          <ToolNavigation tools={datetimeTools} category="التاريخ والوقت" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cities.map((city) => (
              <Card key={city.name} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-indigo-500" />
                      <div>
                        <h3 className="font-bold text-gray-900">{city.name}</h3>
                        <p className="text-xs text-gray-500">{city.country}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">
                      {times[city.name]?.period}
                    </span>
                  </div>
                  <div className="text-center mt-3">
                    <p className="text-3xl font-bold text-indigo-600 font-mono" dir="ltr">
                      {times[city.name]?.time || "--:--:--"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {times[city.name]?.date}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">معلومات:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• يتم تحديث الوقت تلقائياً كل ثانية</li>
                <li>• الأوقات معروضة بالتوقيت المحلي لكل مدينة</li>
                <li>• يتم احتساب التوقيت الصيفي تلقائياً حيث ينطبق</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
