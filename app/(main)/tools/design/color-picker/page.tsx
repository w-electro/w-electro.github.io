"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Pipette, Copy, Check, Droplet, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const designTools = [
  { name: "الألوان", href: "/tools/design/color-picker", icon: Pipette },
  { name: "التدرجات", href: "/tools/design/gradient", icon: Droplet },
  { name: "الظلال", href: "/tools/design/shadow", icon: Box },
];

export default function ColorPickerPage() {
  const [color, setColor] = useState("#0891b2");
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const colorFormats = [
    { name: "HEX", value: color.toUpperCase() },
    { name: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { name: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { name: "CSS Variable", value: `--color: ${color};` },
    { name: "Tailwind", value: `bg-[${color}]` },
  ];

  const copyColor = async (format: string) => {
    const colorFormat = colorFormats.find((f) => f.name === format);
    if (!colorFormat) return;

    try {
      await navigator.clipboard.writeText(colorFormat.value);
      setCopied(format);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const presetColors = [
    "#ef4444", "#f97316", "#eab308", "#22c55e", "#14b8a6",
    "#0891b2", "#3b82f6", "#6366f1", "#8b5cf6", "#d946ef",
    "#ec4899", "#f43f5e", "#64748b", "#000000", "#ffffff",
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl mb-4">
              <Pipette className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600">
              منتقي الألوان
            </h1>
            <p className="text-gray-600 text-lg">اختر الألوان وحولها بين الصيغ المختلفة</p>
          </div>

          <ToolNavigation tools={designTools} category="التصميم" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Color Preview */}
                <div
                  className="w-full h-40 rounded-2xl shadow-lg transition-colors duration-200"
                  style={{ backgroundColor: color }}
                />

                {/* Color Input */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="hex">HEX</Label>
                    <Input
                      id="hex"
                      type="text"
                      value={color}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                          setColor(val);
                        }
                      }}
                      className="mt-2 font-mono"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <Label>اختيار</Label>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="mt-2 w-14 h-10 rounded-lg cursor-pointer border-2 border-gray-300"
                    />
                  </div>
                </div>

                {/* Preset Colors */}
                <div>
                  <Label>ألوان سريعة</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {presetColors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-8 h-8 rounded-lg transition-transform hover:scale-110 ${
                          color === c ? "ring-2 ring-offset-2 ring-pink-500" : ""
                        } ${c === "#ffffff" ? "border border-gray-300" : ""}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                {/* Color Formats */}
                <div className="space-y-3 pt-4 border-t">
                  <Label>صيغ الألوان</Label>
                  {colorFormats.map((format) => (
                    <div
                      key={format.name}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <span className="text-sm text-gray-500">{format.name}</span>
                        <p className="font-mono text-sm" dir="ltr">{format.value}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => copyColor(format.name)}>
                        {copied === format.name ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">صيغ الألوان</h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>HEX:</strong> الصيغة الأكثر شيوعاً (#RRGGBB)</p>
                <p><strong>RGB:</strong> قيم الأحمر والأخضر والأزرق (0-255)</p>
                <p><strong>HSL:</strong> درجة اللون والتشبع والإضاءة</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
