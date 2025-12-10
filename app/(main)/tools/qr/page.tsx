"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  QrCode,
  Download,
  Copy,
  Check,
  Link as LinkIcon,
  Type,
  Phone,
  Mail,
  Wifi,
  MapPin,
  Palette,
  Settings,
  RefreshCw,
  Camera,
  StopCircle,
} from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type QRType = "url" | "text" | "phone" | "email" | "wifi" | "location";

interface QRTypeOption {
  id: QRType;
  name: string;
  icon: typeof LinkIcon;
  placeholder: string;
  prefix?: string;
}

const qrTypes: QRTypeOption[] = [
  { id: "url", name: "رابط", icon: LinkIcon, placeholder: "https://example.com" },
  { id: "text", name: "نص", icon: Type, placeholder: "أدخل النص هنا..." },
  { id: "phone", name: "هاتف", icon: Phone, placeholder: "966540732077", prefix: "tel:" },
  { id: "email", name: "بريد", icon: Mail, placeholder: "example@email.com", prefix: "mailto:" },
  { id: "wifi", name: "واي فاي", icon: Wifi, placeholder: "اسم الشبكة" },
  { id: "location", name: "موقع", icon: MapPin, placeholder: "24.7136,46.6753" },
];

const presetColors = [
  { name: "أسود", value: "#000000" },
  { name: "أزرق", value: "#0891b2" },
  { name: "برتقالي", value: "#f97316" },
  { name: "أخضر", value: "#10b981" },
  { name: "بنفسجي", value: "#8b5cf6" },
  { name: "أحمر", value: "#ef4444" },
];

const sizes = [
  { name: "صغير", value: 150 },
  { name: "متوسط", value: 256 },
  { name: "كبير", value: 400 },
];

export default function QRGeneratorPage() {
  const [activeType, setActiveType] = useState<QRType>("url");
  const [inputValue, setInputValue] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(256);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<"generator" | "scanner">("generator");
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const generateQRCode = useCallback(async () => {
    if (!inputValue.trim()) {
      setQrDataUrl(null);
      return;
    }

    let content = inputValue;
    const currentType = qrTypes.find((t) => t.id === activeType);

    if (currentType?.prefix) {
      content = currentType.prefix + inputValue;
    }

    if (activeType === "wifi") {
      content = `WIFI:T:${wifiEncryption};S:${inputValue};P:${wifiPassword};;`;
    }

    if (activeType === "location") {
      const [lat, lng] = inputValue.split(",").map((s) => s.trim());
      if (lat && lng) {
        content = `geo:${lat},${lng}`;
      }
    }

    try {
      const QRCode = (await import("qrcode")).default;
      const dataUrl = await QRCode.toDataURL(content, {
        width: size,
        margin: 2,
        color: {
          dark: color,
          light: bgColor,
        },
        errorCorrectionLevel: "H",
      });
      setQrDataUrl(dataUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  }, [inputValue, activeType, color, bgColor, size, wifiPassword, wifiEncryption]);

  useEffect(() => {
    const timer = setTimeout(() => {
      generateQRCode();
    }, 300);
    return () => clearTimeout(timer);
  }, [generateQRCode]);

  const downloadQR = async (format: "png" | "svg") => {
    if (!inputValue.trim()) return;

    let content = inputValue;
    const currentType = qrTypes.find((t) => t.id === activeType);

    if (currentType?.prefix) {
      content = currentType.prefix + inputValue;
    }

    if (activeType === "wifi") {
      content = `WIFI:T:${wifiEncryption};S:${inputValue};P:${wifiPassword};;`;
    }

    try {
      const QRCode = (await import("qrcode")).default;

      if (format === "png") {
        const dataUrl = await QRCode.toDataURL(content, {
          width: size * 2,
          margin: 2,
          color: { dark: color, light: bgColor },
          errorCorrectionLevel: "H",
        });
        const link = document.createElement("a");
        link.download = "qr-code.png";
        link.href = dataUrl;
        link.click();
      } else {
        const svgString = await QRCode.toString(content, {
          type: "svg",
          width: size,
          margin: 2,
          color: { dark: color, light: bgColor },
          errorCorrectionLevel: "H",
        });
        const blob = new Blob([svgString], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "qr-code.svg";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  const copyQR = async () => {
    if (!qrDataUrl) return;
    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers that don't support clipboard.write
      try {
        await navigator.clipboard.writeText(inputValue);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        console.error("Failed to copy");
      }
    }
  };

  // Scanner functionality
  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setScanning(true);
      setScanResult(null);
      scanFrame();
    } catch (error) {
      console.error("Error starting scanner:", error);
      alert("لم نتمكن من الوصول إلى الكاميرا. تأكد من إعطاء الإذن.");
    }
  };

  const stopScanner = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setScanning(false);
  };

  const scanFrame = async () => {
    if (!videoRef.current || !canvasRef.current || !scanning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (video.readyState === video.HAVE_ENOUGH_DATA && ctx) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      try {
        const jsQR = (await import("jsqr")).default;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setScanResult(code.data);
          stopScanner();
          return;
        }
      } catch (error) {
        console.error("Error scanning:", error);
      }
    }

    if (scanning) {
      requestAnimationFrame(scanFrame);
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <QrCode className="h-5 w-5" />
                <span className="text-sm font-medium">مجاني 100% - بدون حدود</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                مولد وماسح رموز QR
              </h1>
              <p className="text-xl text-white/90">
                أنشئ رموز QR مخصصة بألوانك أو امسح أي رمز QR
              </p>
            </div>
          </div>
        </section>

        {/* Main Tool Section */}
        <section className="py-12 -mt-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Tab Buttons */}
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={() => {
                    setActiveTab("generator");
                    stopScanner();
                  }}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                    activeTab === "generator"
                      ? "bg-white text-orange-600 shadow-lg"
                      : "bg-white/50 text-gray-600 hover:bg-white/80"
                  )}
                >
                  <QrCode className="h-5 w-5" />
                  مولد QR
                </button>
                <button
                  onClick={() => setActiveTab("scanner")}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                    activeTab === "scanner"
                      ? "bg-white text-orange-600 shadow-lg"
                      : "bg-white/50 text-gray-600 hover:bg-white/80"
                  )}
                >
                  <Camera className="h-5 w-5" />
                  ماسح QR
                </button>
              </div>

              {activeTab === "generator" ? (
                <Card className="shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-2">
                      {/* Left Side - Input */}
                      <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-l">
                        {/* QR Type Selector */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            نوع المحتوى
                          </label>
                          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                            {qrTypes.map((type) => (
                              <button
                                key={type.id}
                                onClick={() => {
                                  setActiveType(type.id);
                                  setInputValue("");
                                }}
                                className={cn(
                                  "flex flex-col items-center gap-1 p-3 rounded-xl transition-all",
                                  activeType === type.id
                                    ? "bg-orange-100 text-orange-600 ring-2 ring-orange-500"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                )}
                              >
                                <type.icon className="h-5 w-5" />
                                <span className="text-xs font-medium">{type.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Input Field */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {activeType === "wifi" ? "اسم الشبكة (SSID)" : "المحتوى"}
                          </label>
                          <input
                            type={activeType === "email" ? "email" : "text"}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={qrTypes.find((t) => t.id === activeType)?.placeholder}
                            className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                            dir={activeType === "url" || activeType === "email" ? "ltr" : "rtl"}
                          />
                        </div>

                        {/* WiFi specific fields */}
                        {activeType === "wifi" && (
                          <>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                كلمة المرور
                              </label>
                              <input
                                type="password"
                                value={wifiPassword}
                                onChange={(e) => setWifiPassword(e.target.value)}
                                placeholder="كلمة مرور الشبكة"
                                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                              />
                            </div>
                            <div className="mb-6">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                نوع التشفير
                              </label>
                              <div className="flex gap-2">
                                {(["WPA", "WEP", "nopass"] as const).map((enc) => (
                                  <button
                                    key={enc}
                                    onClick={() => setWifiEncryption(enc)}
                                    className={cn(
                                      "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
                                      wifiEncryption === enc
                                        ? "bg-orange-500 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    )}
                                  >
                                    {enc === "nopass" ? "بدون" : enc}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {/* Settings Toggle */}
                        <button
                          onClick={() => setShowSettings(!showSettings)}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors mb-4"
                        >
                          <Settings className="h-4 w-4" />
                          {showSettings ? "إخفاء الإعدادات" : "إظهار الإعدادات"}
                        </button>

                        {/* Settings Panel */}
                        {showSettings && (
                          <div className="space-y-6 pt-4 border-t">
                            {/* Color Selection */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                <Palette className="h-4 w-4 inline ml-1" />
                                لون الرمز
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {presetColors.map((c) => (
                                  <button
                                    key={c.value}
                                    onClick={() => setColor(c.value)}
                                    className={cn(
                                      "w-10 h-10 rounded-lg transition-all",
                                      color === c.value && "ring-2 ring-offset-2 ring-orange-500"
                                    )}
                                    style={{ backgroundColor: c.value }}
                                    title={c.name}
                                  />
                                ))}
                                <input
                                  type="color"
                                  value={color}
                                  onChange={(e) => setColor(e.target.value)}
                                  className="w-10 h-10 rounded-lg cursor-pointer"
                                />
                              </div>
                            </div>

                            {/* Size Selection */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                حجم الرمز
                              </label>
                              <div className="flex gap-2">
                                {sizes.map((s) => (
                                  <button
                                    key={s.value}
                                    onClick={() => setSize(s.value)}
                                    className={cn(
                                      "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
                                      size === s.value
                                        ? "bg-orange-500 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    )}
                                  >
                                    {s.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Side - QR Preview */}
                      <div className="p-6 md:p-8 bg-gray-50 flex flex-col items-center justify-center">
                        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                          {qrDataUrl ? (
                            <img
                              src={qrDataUrl}
                              alt="رمز QR"
                              className="mx-auto"
                              style={{ width: Math.min(size, 280), height: Math.min(size, 280) }}
                            />
                          ) : (
                            <div
                              className="flex items-center justify-center bg-gray-100 rounded-xl"
                              style={{ width: 200, height: 200 }}
                            >
                              <QrCode className="h-16 w-16 text-gray-300" />
                            </div>
                          )}
                        </div>

                        {qrDataUrl && (
                          <div className="flex flex-wrap justify-center gap-3">
                            <Button
                              onClick={() => downloadQR("png")}
                              className="gap-2"
                            >
                              <Download className="h-4 w-4" />
                              تحميل PNG
                            </Button>
                            <Button
                              onClick={() => downloadQR("svg")}
                              variant="outline"
                              className="gap-2"
                            >
                              <Download className="h-4 w-4" />
                              تحميل SVG
                            </Button>
                            <Button onClick={copyQR} variant="outline" className="gap-2">
                              {copied ? (
                                <>
                                  <Check className="h-4 w-4 text-green-600" />
                                  تم النسخ
                                </>
                              ) : (
                                <>
                                  <Copy className="h-4 w-4" />
                                  نسخ
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                /* Scanner Tab */
                <Card className="shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 md:p-8">
                    <div className="max-w-md mx-auto text-center">
                      {!scanning && !scanResult && (
                        <>
                          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Camera className="h-10 w-10 text-orange-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4">
                            امسح رمز QR
                          </h3>
                          <p className="text-gray-600 mb-6">
                            استخدم كاميرا جهازك لمسح أي رمز QR
                          </p>
                          <Button onClick={startScanner} size="lg" className="gap-2">
                            <Camera className="h-5 w-5" />
                            بدء المسح
                          </Button>
                        </>
                      )}

                      {scanning && (
                        <>
                          <div className="relative rounded-2xl overflow-hidden mb-6">
                            <video
                              ref={videoRef}
                              className="w-full rounded-2xl"
                              playsInline
                            />
                            <div className="absolute inset-0 border-4 border-orange-500 rounded-2xl pointer-events-none">
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white rounded-lg" />
                            </div>
                          </div>
                          <canvas ref={canvasRef} className="hidden" />
                          <Button
                            onClick={stopScanner}
                            variant="outline"
                            className="gap-2"
                          >
                            <StopCircle className="h-5 w-5" />
                            إيقاف المسح
                          </Button>
                        </>
                      )}

                      {scanResult && (
                        <div className="space-y-6">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <Check className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                            تم المسح بنجاح!
                          </h3>
                          <div className="bg-gray-100 p-4 rounded-xl">
                            <p className="text-gray-800 break-all" dir="ltr">
                              {scanResult}
                            </p>
                          </div>
                          <div className="flex justify-center gap-3">
                            {scanResult.startsWith("http") && (
                              <Button asChild>
                                <a href={scanResult} target="_blank" rel="noopener noreferrer">
                                  فتح الرابط
                                </a>
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              onClick={async () => {
                                await navigator.clipboard.writeText(scanResult);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                              }}
                              className="gap-2"
                            >
                              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              نسخ
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setScanResult(null);
                                startScanner();
                              }}
                              className="gap-2"
                            >
                              <RefreshCw className="h-4 w-4" />
                              مسح آخر
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
              ما يمكنك تحويله إلى QR
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {qrTypes.map((type) => (
                <div
                  key={type.id}
                  className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <type.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-medium text-gray-900">{type.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
              الأسئلة الشائعة
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: "هل مولد باركود QR مجاني؟",
                  a: "نعم، مولد باركود QR مجاني 100% بدون أي حدود أو رسوم. يمكنك إنشاء عدد غير محدود من رموز QR مجاناً.",
                },
                {
                  q: "كيف أحول رابط إلى باركود QR؟",
                  a: "ببساطة: 1) الصق الرابط في الحقل، 2) اختر الألوان إذا أردت، 3) سيتم إنشاء الرمز تلقائياً، 4) حمّل الباركود بصيغة PNG أو SVG.",
                },
                {
                  q: "هل يمكنني تخصيص ألوان باركود QR؟",
                  a: "نعم، يمكنك اختيار لون الباركود من الألوان المحددة مسبقاً أو اختيار أي لون تريده.",
                },
                {
                  q: "ما هي صيغ التحميل المتاحة؟",
                  a: "يمكنك تحميل رمز QR بصيغة PNG (للصور العادية) أو SVG (للجودة العالية والطباعة). كلتا الصيغتين مجانيتان.",
                },
              ].map((faq, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">
              استكشف المزيد من الأدوات المجانية
            </h2>
            <p className="text-white/80 mb-6">
              لدينا أكثر من 50 أداة مجانية لمساعدتك
            </p>
            <Button variant="glass" size="lg" asChild>
              <Link href="/tools">جميع الأدوات</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
