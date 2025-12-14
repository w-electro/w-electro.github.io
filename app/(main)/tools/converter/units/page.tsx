"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ruler, Thermometer, DollarSign, Binary, HardDrive } from "lucide-react";

const converterTools = [
  { name: "درجات الحرارة", href: "/tools/converter/temperature", icon: Thermometer },
  { name: "الوحدات", href: "/tools/converter/units", icon: Ruler },
  { name: "العملات", href: "/tools/converter/currency", icon: DollarSign },
  { name: "الأرقام", href: "/tools/converter/numbers", icon: Binary },
];

const unitCategories = {
  length: {
    name: "الطول",
    units: {
      meter: { name: "متر", factor: 1 },
      kilometer: { name: "كيلومتر", factor: 1000 },
      centimeter: { name: "سنتيمتر", factor: 0.01 },
      millimeter: { name: "ميليمتر", factor: 0.001 },
      mile: { name: "ميل", factor: 1609.344 },
      yard: { name: "ياردة", factor: 0.9144 },
      foot: { name: "قدم", factor: 0.3048 },
      inch: { name: "بوصة", factor: 0.0254 },
    }
  },
  weight: {
    name: "الوزن",
    units: {
      kilogram: { name: "كيلوجرام", factor: 1 },
      gram: { name: "جرام", factor: 0.001 },
      milligram: { name: "ميليجرام", factor: 0.000001 },
      ton: { name: "طن", factor: 1000 },
      pound: { name: "رطل", factor: 0.453592 },
      ounce: { name: "أونصة", factor: 0.0283495 },
    }
  },
  volume: {
    name: "الحجم",
    units: {
      liter: { name: "لتر", factor: 1 },
      milliliter: { name: "ميليلتر", factor: 0.001 },
      gallon: { name: "جالون", factor: 3.78541 },
      quart: { name: "كوارت", factor: 0.946353 },
      pint: { name: "باينت", factor: 0.473176 },
      cup: { name: "كوب", factor: 0.236588 },
    }
  },
  area: {
    name: "المساحة",
    units: {
      squareMeter: { name: "متر مربع", factor: 1 },
      squareKilometer: { name: "كيلومتر مربع", factor: 1000000 },
      squareFoot: { name: "قدم مربع", factor: 0.092903 },
      squareYard: { name: "ياردة مربعة", factor: 0.836127 },
      acre: { name: "فدان", factor: 4046.86 },
      hectare: { name: "هكتار", factor: 10000 },
    }
  }
};

export default function UnitsConverterPage() {
  const [category, setCategory] = useState<keyof typeof unitCategories>("length");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const handleCategoryChange = (newCategory: keyof typeof unitCategories) => {
    setCategory(newCategory);
    const units = Object.keys(unitCategories[newCategory].units);
    setFromUnit(units[0]);
    setToUnit(units[1]);
    setFromValue("");
    setToValue("");
  };

  const convertUnits = (value: string, from: string, to: string) => {
    if (value === "") {
      setToValue("");
      return;
    }
    const val = parseFloat(value);
    if (isNaN(val)) {
      setToValue("");
      return;
    }

    const currentUnits = unitCategories[category].units as Record<string, { name: string; factor: number }>;
    const fromFactor = currentUnits[from].factor;
    const toFactor = currentUnits[to].factor;
    const result = (val * fromFactor) / toFactor;
    setToValue(result.toFixed(6).replace(/\.?0+$/, ""));
  };

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
    convertUnits(value, fromUnit, toUnit);
  };

  const handleFromUnitChange = (unit: string) => {
    setFromUnit(unit);
    if (fromValue) convertUnits(fromValue, unit, toUnit);
  };

  const handleToUnitChange = (unit: string) => {
    setToUnit(unit);
    if (fromValue) convertUnits(fromValue, fromUnit, unit);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4">
              <Ruler className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              محول الوحدات
            </h1>
            <p className="text-gray-600 text-lg">حول بين مختلف وحدات القياس</p>
          </div>

          <ToolNavigation tools={converterTools} category="المحولات" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-semibold">نوع الوحدة</Label>
                  <Select value={category} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(unitCategories).map(([key, cat]) => (
                        <SelectItem key={key} value={key}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="from-value" className="text-lg font-semibold">من</Label>
                    <Input
                      id="from-value"
                      type="number"
                      value={fromValue}
                      onChange={(e) => handleFromValueChange(e.target.value)}
                      placeholder="0"
                      className="text-lg mt-2 mb-2"
                    />
                    <Select value={fromUnit} onValueChange={handleFromUnitChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(unitCategories[category].units).map(([key, unit]) => (
                          <SelectItem key={key} value={key}>{unit.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="to-value" className="text-lg font-semibold">إلى</Label>
                    <Input
                      id="to-value"
                      type="number"
                      value={toValue}
                      readOnly
                      placeholder="0"
                      className="text-lg mt-2 mb-2 bg-gray-50"
                    />
                    <Select value={toUnit} onValueChange={handleToUnitChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(unitCategories[category].units).map(([key, unit]) => (
                          <SelectItem key={key} value={key}>{unit.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">نصائح:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• يمكنك تغيير نوع الوحدة من القائمة المنسدلة</li>
                <li>• النتيجة تحسب تلقائياً عند إدخال القيمة</li>
                <li>• جميع التحويلات دقيقة وفقاً للمعايير الدولية</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
