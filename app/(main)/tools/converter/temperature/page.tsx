"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Thermometer, Ruler, DollarSign, Binary, HardDrive } from "lucide-react";

const converterTools = [
  { name: "درجات الحرارة", href: "/tools/converter/temperature", icon: Thermometer },
  { name: "الوحدات", href: "/tools/converter/units", icon: Ruler },
  { name: "العملات", href: "/tools/converter/currency", icon: DollarSign },
  { name: "الأرقام", href: "/tools/converter/numbers", icon: Binary },
];

export default function TemperatureConverterPage() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");
  const [kelvin, setKelvin] = useState("");

  const handleCelsiusChange = (value: string) => {
    setCelsius(value);
    if (value === "") {
      setFahrenheit("");
      setKelvin("");
      return;
    }
    const c = parseFloat(value);
    if (!isNaN(c)) {
      setFahrenheit(((c * 9/5) + 32).toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    }
  };

  const handleFahrenheitChange = (value: string) => {
    setFahrenheit(value);
    if (value === "") {
      setCelsius("");
      setKelvin("");
      return;
    }
    const f = parseFloat(value);
    if (!isNaN(f)) {
      const c = (f - 32) * 5/9;
      setCelsius(c.toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    }
  };

  const handleKelvinChange = (value: string) => {
    setKelvin(value);
    if (value === "") {
      setCelsius("");
      setFahrenheit("");
      return;
    }
    const k = parseFloat(value);
    if (!isNaN(k)) {
      const c = k - 273.15;
      setCelsius(c.toFixed(2));
      setFahrenheit(((c * 9/5) + 32).toFixed(2));
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4">
              <Thermometer className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
              محول درجات الحرارة
            </h1>
            <p className="text-gray-600 text-lg">حول بين سيلسيوس، فهرنهايت، وكلفن</p>
          </div>

          <ToolNavigation tools={converterTools} category="المحولات" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="celsius" className="text-lg font-semibold">سيلسيوس (°C)</Label>
                  <Input
                    id="celsius"
                    type="number"
                    value={celsius}
                    onChange={(e) => handleCelsiusChange(e.target.value)}
                    placeholder="0"
                    className="text-lg mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="fahrenheit" className="text-lg font-semibold">فهرنهايت (°F)</Label>
                  <Input
                    id="fahrenheit"
                    type="number"
                    value={fahrenheit}
                    onChange={(e) => handleFahrenheitChange(e.target.value)}
                    placeholder="32"
                    className="text-lg mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="kelvin" className="text-lg font-semibold">كلفن (K)</Label>
                  <Input
                    id="kelvin"
                    type="number"
                    value={kelvin}
                    onChange={(e) => handleKelvinChange(e.target.value)}
                    placeholder="273.15"
                    className="text-lg mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">نقاط مرجعية مهمة:</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="grid grid-cols-3 gap-4 font-semibold border-b pb-2">
                  <span>سيلسيوس</span>
                  <span>فهرنهايت</span>
                  <span>كلفن</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <span>0°C</span>
                  <span>32°F</span>
                  <span>273.15 K</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                  <span className="col-span-3">نقطة تجمد الماء</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <span>100°C</span>
                  <span>212°F</span>
                  <span>373.15 K</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                  <span className="col-span-3">نقطة غليان الماء</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <span>37°C</span>
                  <span>98.6°F</span>
                  <span>310.15 K</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                  <span className="col-span-3">درجة حرارة الجسم الطبيعية</span>
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
