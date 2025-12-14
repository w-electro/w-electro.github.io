"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Box, Copy, Check, Pipette, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const designTools = [
  { name: "الألوان", href: "/tools/design/color-picker", icon: Pipette },
  { name: "التدرجات", href: "/tools/design/gradient", icon: Droplet },
  { name: "الظلال", href: "/tools/design/shadow", icon: Box },
];

const presetShadows = [
  { name: "ناعم", offsetX: 0, offsetY: 4, blur: 20, spread: 0, color: "#00000020" },
  { name: "متوسط", offsetX: 0, offsetY: 8, blur: 30, spread: 0, color: "#00000030" },
  { name: "قوي", offsetX: 0, offsetY: 15, blur: 50, spread: 0, color: "#00000040" },
  { name: "ملون", offsetX: 0, offsetY: 10, blur: 40, spread: -5, color: "#6366f140" },
  { name: "داخلي", offsetX: 0, offsetY: 2, blur: 10, spread: 0, color: "#00000020", inset: true },
];

export default function ShadowGeneratorPage() {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(10);
  const [blur, setBlur] = useState(30);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(25);
  const [inset, setInset] = useState(false);
  const [copied, setCopied] = useState(false);

  const hexToRgba = (hex: string, alpha: number) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return `rgba(0, 0, 0, ${alpha / 100})`;
    return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha / 100})`;
  };

  const getShadowCSS = () => {
    const rgba = hexToRgba(color, opacity);
    return `${inset ? "inset " : ""}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${rgba}`;
  };

  const getFullCSS = () => {
    return `box-shadow: ${getShadowCSS()};`;
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

  const applyPreset = (preset: typeof presetShadows[0]) => {
    setOffsetX(preset.offsetX);
    setOffsetY(preset.offsetY);
    setBlur(preset.blur);
    setSpread(preset.spread);
    // Extract opacity from color if it's in rgba format
    if (preset.color.length === 9) {
      setColor(preset.color.slice(0, 7));
      setOpacity(Math.round(parseInt(preset.color.slice(7), 16) / 255 * 100));
    } else {
      setColor(preset.color.slice(0, 7));
      setOpacity(25);
    }
    setInset(preset.inset || false);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4">
              <Box className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              مولد الظلال
            </h1>
            <p className="text-gray-600 text-lg">أنشئ ظلال CSS مخصصة لعناصرك</p>
          </div>

          <ToolNavigation tools={designTools} category="التصميم" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Preview */}
                <div className="flex items-center justify-center p-12 bg-gray-100 rounded-2xl">
                  <div
                    className="w-40 h-40 bg-white rounded-2xl transition-all duration-300"
                    style={{ boxShadow: getShadowCSS() }}
                  />
                </div>

                {/* Presets */}
                <div>
                  <Label>ظلال جاهزة</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {presetShadows.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => applyPreset(preset)}
                        className="px-4 py-2 bg-white rounded-lg border hover:border-blue-500 transition-colors text-sm font-medium"
                        style={{
                          boxShadow: `${preset.inset ? "inset " : ""}${preset.offsetX}px ${preset.offsetY}px ${preset.blur}px ${preset.spread}px ${preset.color}`,
                        }}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="grid gap-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>الإزاحة الأفقية (X)</Label>
                      <span className="font-bold text-blue-600">{offsetX}px</span>
                    </div>
                    <Slider
                      value={[offsetX]}
                      onValueChange={(value) => setOffsetX(value[0])}
                      min={-50}
                      max={50}
                      step={1}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>الإزاحة الرأسية (Y)</Label>
                      <span className="font-bold text-blue-600">{offsetY}px</span>
                    </div>
                    <Slider
                      value={[offsetY]}
                      onValueChange={(value) => setOffsetY(value[0])}
                      min={-50}
                      max={50}
                      step={1}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>التمويه (Blur)</Label>
                      <span className="font-bold text-blue-600">{blur}px</span>
                    </div>
                    <Slider
                      value={[blur]}
                      onValueChange={(value) => setBlur(value[0])}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>الانتشار (Spread)</Label>
                      <span className="font-bold text-blue-600">{spread}px</span>
                    </div>
                    <Slider
                      value={[spread]}
                      onValueChange={(value) => setSpread(value[0])}
                      min={-50}
                      max={50}
                      step={1}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>الشفافية</Label>
                      <span className="font-bold text-blue-600">{opacity}%</span>
                    </div>
                    <Slider
                      value={[opacity]}
                      onValueChange={(value) => setOpacity(value[0])}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </div>
                </div>

                {/* Color and Inset */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label>لون الظل</Label>
                    <div className="flex gap-2 mt-2">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-14 h-10 rounded-lg cursor-pointer border-2 border-gray-300"
                      />
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-lg font-mono text-sm"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>نوع الظل</Label>
                    <label className="flex items-center gap-2 mt-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inset}
                        onChange={(e) => setInset(e.target.checked)}
                        className="rounded"
                      />
                      <span>ظل داخلي (Inset)</span>
                    </label>
                  </div>
                </div>

                {/* CSS Output */}
                <div className="pt-4 border-t">
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
