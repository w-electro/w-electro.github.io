"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Droplet, Copy, Check, Pipette, Box, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const designTools = [
  { name: "الألوان", href: "/tools/design/color-picker", icon: Pipette },
  { name: "التدرجات", href: "/tools/design/gradient", icon: Droplet },
  { name: "الظلال", href: "/tools/design/shadow", icon: Box },
];

const presetGradients = [
  { name: "غروب", colors: ["#ff6b6b", "#feca57"] },
  { name: "محيط", colors: ["#667eea", "#764ba2"] },
  { name: "فجر", colors: ["#f093fb", "#f5576c"] },
  { name: "ليل", colors: ["#0f0c29", "#302b63"] },
  { name: "نعناع", colors: ["#11998e", "#38ef7d"] },
  { name: "برتقالي", colors: ["#fc4a1a", "#f7b733"] },
];

export default function GradientGeneratorPage() {
  const [color1, setColor1] = useState("#0891b2");
  const [color2, setColor2] = useState("#f97316");
  const [angle, setAngle] = useState(135);
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");
  const [copied, setCopied] = useState(false);

  const getGradientCSS = () => {
    if (gradientType === "linear") {
      return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    }
    return `radial-gradient(circle, ${color1}, ${color2})`;
  };

  const getFullCSS = () => {
    return `background: ${getGradientCSS()};`;
  };

  const getTailwindCSS = () => {
    if (gradientType === "linear") {
      const directions: Record<number, string> = {
        0: "bg-gradient-to-t",
        45: "bg-gradient-to-tr",
        90: "bg-gradient-to-r",
        135: "bg-gradient-to-br",
        180: "bg-gradient-to-b",
        225: "bg-gradient-to-bl",
        270: "bg-gradient-to-l",
        315: "bg-gradient-to-tl",
      };
      const closest = Object.keys(directions).reduce((a, b) =>
        Math.abs(Number(b) - angle) < Math.abs(Number(a) - angle) ? b : a
      );
      return `${directions[Number(closest)]} from-[${color1}] to-[${color2}]`;
    }
    return `bg-[radial-gradient(circle,${color1},${color2})]`;
  };

  const copyCSS = async () => {
    try {
      await navigator.clipboard.writeText(getFullCSS());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const randomGradient = () => {
    const randomColor = () =>
      "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    setColor1(randomColor());
    setColor2(randomColor());
    setAngle(Math.floor(Math.random() * 360));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
              <Droplet className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              مولد التدرجات اللونية
            </h1>
            <p className="text-gray-600 text-lg">أنشئ تدرجات لونية جميلة لمشاريعك</p>
          </div>

          <ToolNavigation tools={designTools} category="التصميم" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Gradient Preview */}
                <div
                  className="w-full h-48 rounded-2xl shadow-lg"
                  style={{ background: getGradientCSS() }}
                />

                {/* Gradient Type */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setGradientType("linear")}
                    className={`flex-1 p-3 rounded-lg font-medium transition-all ${
                      gradientType === "linear"
                        ? "bg-purple-100 text-purple-700 border-2 border-purple-500"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    خطي (Linear)
                  </button>
                  <button
                    onClick={() => setGradientType("radial")}
                    className={`flex-1 p-3 rounded-lg font-medium transition-all ${
                      gradientType === "radial"
                        ? "bg-purple-100 text-purple-700 border-2 border-purple-500"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    دائري (Radial)
                  </button>
                </div>

                {/* Color Pickers */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>اللون الأول</Label>
                    <div className="flex gap-2 mt-2">
                      <input
                        type="color"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        className="w-14 h-10 rounded-lg cursor-pointer border-2 border-gray-300"
                      />
                      <input
                        type="text"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-lg font-mono text-sm"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>اللون الثاني</Label>
                    <div className="flex gap-2 mt-2">
                      <input
                        type="color"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                        className="w-14 h-10 rounded-lg cursor-pointer border-2 border-gray-300"
                      />
                      <input
                        type="text"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-lg font-mono text-sm"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>

                {/* Angle Slider (only for linear) */}
                {gradientType === "linear" && (
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>الزاوية</Label>
                      <span className="font-bold text-purple-600">{angle}°</span>
                    </div>
                    <Slider
                      value={[angle]}
                      onValueChange={(value) => setAngle(value[0])}
                      min={0}
                      max={360}
                      step={1}
                      className="py-4"
                    />
                  </div>
                )}

                {/* Preset Gradients */}
                <div>
                  <Label>تدرجات جاهزة</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {presetGradients.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => {
                          setColor1(preset.colors[0]);
                          setColor2(preset.colors[1]);
                        }}
                        className="p-2 rounded-lg text-center hover:scale-105 transition-transform"
                        style={{
                          background: `linear-gradient(135deg, ${preset.colors[0]}, ${preset.colors[1]})`,
                        }}
                      >
                        <span className="text-white text-sm font-medium drop-shadow">
                          {preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Random Button */}
                <Button variant="outline" className="w-full" onClick={randomGradient}>
                  <RefreshCw className="ml-2 h-4 w-4" />
                  تدرج عشوائي
                </Button>

                {/* CSS Output */}
                <div className="space-y-3 pt-4 border-t">
                  <Label>الكود</Label>
                  <div className="p-4 bg-gray-900 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">CSS</span>
                      <Button variant="ghost" size="sm" onClick={copyCSS} className="text-white hover:text-white">
                        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <code className="text-green-400 font-mono text-sm" dir="ltr">
                      {getFullCSS()}
                    </code>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <span className="text-gray-500 text-sm">Tailwind CSS</span>
                    <code className="block mt-1 font-mono text-sm text-gray-800" dir="ltr">
                      {getTailwindCSS()}
                    </code>
                  </div>
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
