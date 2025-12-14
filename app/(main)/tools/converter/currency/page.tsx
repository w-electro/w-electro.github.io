"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Ruler, Thermometer, Binary, HardDrive } from "lucide-react";

const converterTools = [
  { name: "درجات الحرارة", href: "/tools/converter/temperature", icon: Thermometer },
  { name: "الوحدات", href: "/tools/converter/units", icon: Ruler },
  { name: "العملات", href: "/tools/converter/currency", icon: DollarSign },
  { name: "الأرقام", href: "/tools/converter/numbers", icon: Binary },
];

// Exchange rates relative to USD (approximate values for demonstration)
const currencies = {
  USD: { name: "دولار أمريكي", symbol: "$", rate: 1 },
  EUR: { name: "يورو", symbol: "€", rate: 0.92 },
  GBP: { name: "جنيه استرليني", symbol: "£", rate: 0.79 },
  JPY: { name: "ين ياباني", symbol: "¥", rate: 149.50 },
  CNY: { name: "يوان صيني", symbol: "¥", rate: 7.24 },
  SAR: { name: "ريال سعودي", symbol: "﷼", rate: 3.75 },
  AED: { name: "درهم إماراتي", symbol: "د.إ", rate: 3.67 },
  EGP: { name: "جنيه مصري", symbol: "£", rate: 30.90 },
  JOD: { name: "دينار أردني", symbol: "د.ا", rate: 0.71 },
  KWD: { name: "دينار كويتي", symbol: "د.ك", rate: 0.31 },
  QAR: { name: "ريال قطري", symbol: "﷼", rate: 3.64 },
  BHD: { name: "دينار بحريني", symbol: "د.ب", rate: 0.38 },
  OMR: { name: "ريال عماني", symbol: "﷼", rate: 0.38 },
  IQD: { name: "دينار عراقي", symbol: "د.ع", rate: 1310 },
  LBP: { name: "ليرة لبنانية", symbol: "ل.ل", rate: 89500 },
  TRY: { name: "ليرة تركية", symbol: "₺", rate: 28.50 },
};

export default function CurrencyConverterPage() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("SAR");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const convertCurrency = (amount: string, from: string, to: string) => {
    if (amount === "") {
      setToAmount("");
      return;
    }
    const amt = parseFloat(amount);
    if (isNaN(amt)) {
      setToAmount("");
      return;
    }

    const fromRate = currencies[from as keyof typeof currencies].rate;
    const toRate = currencies[to as keyof typeof currencies].rate;

    // Convert to USD first, then to target currency
    const usdAmount = amt / fromRate;
    const result = usdAmount * toRate;

    setToAmount(result.toFixed(2));
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    convertCurrency(value, fromCurrency, toCurrency);
  };

  const handleFromCurrencyChange = (currency: string) => {
    setFromCurrency(currency);
    if (fromAmount) convertCurrency(fromAmount, currency, toCurrency);
  };

  const handleToCurrencyChange = (currency: string) => {
    setToCurrency(currency);
    if (fromAmount) convertCurrency(fromAmount, fromCurrency, currency);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    if (fromAmount) {
      convertCurrency(fromAmount, toCurrency, fromCurrency);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-4">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
              محول العملات
            </h1>
            <p className="text-gray-600 text-lg">حول بين العملات العالمية والعربية</p>
          </div>

          <ToolNavigation tools={converterTools} category="المحولات" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="from-amount" className="text-lg font-semibold">من</Label>
                    <Input
                      id="from-amount"
                      type="number"
                      value={fromAmount}
                      onChange={(e) => handleFromAmountChange(e.target.value)}
                      placeholder="0.00"
                      className="text-lg mt-2 mb-2"
                    />
                    <Select value={fromCurrency} onValueChange={handleFromCurrencyChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(currencies).map(([code, currency]) => (
                          <SelectItem key={code} value={code}>
                            {currency.symbol} {code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="to-amount" className="text-lg font-semibold">إلى</Label>
                    <Input
                      id="to-amount"
                      type="number"
                      value={toAmount}
                      readOnly
                      placeholder="0.00"
                      className="text-lg mt-2 mb-2 bg-gray-50"
                    />
                    <Select value={toCurrency} onValueChange={handleToCurrencyChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(currencies).map(([code, currency]) => (
                          <SelectItem key={code} value={code}>
                            {currency.symbol} {code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {fromAmount && toAmount && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600">سعر الصرف التقريبي:</p>
                    <p className="text-lg font-bold text-blue-600 mt-1">
                      1 {fromCurrency} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(4)} {toCurrency}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">⚠️ ملاحظة هامة:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• أسعار الصرف المعروضة تقريبية ولأغراض المرجع فقط</li>
                <li>• للحصول على أسعار صرف دقيقة ومحدثة، راجع البنك أو مزود خدمة موثوق</li>
                <li>• الأسعار الفعلية قد تختلف بناءً على السوق والوقت</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
