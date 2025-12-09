import { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  QrCode,
  Image as ImageIcon,
  Calculator,
  ArrowLeftRight,
  Calendar,
  Shield,
  Palette,
  Code,
  Wrench,
  Barcode,
  Search,
} from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "الأدوات المجانية | نجاح",
  description:
    "مجموعة شاملة من الأدوات المجانية: OCR استخراج النصوص، أدوات PDF، مولد QR، محولات، حاسبات، والمزيد. جميع الأدوات مجانية 100%.",
  keywords: [
    "أدوات مجانية",
    "OCR",
    "PDF",
    "QR",
    "محول",
    "حاسبة",
    "أدوات أونلاين",
  ],
};

const toolCategories = [
  {
    id: "ocr-pdf",
    title: "النصوص والمستندات",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    tools: [
      {
        name: "استخراج النصوص OCR",
        description: "استخرج النصوص من الصور بدقة 99%",
        href: "/tools/ocr",
        badge: "الأكثر استخداماً",
      },
      {
        name: "دمج ملفات PDF",
        description: "اجمع عدة ملفات PDF في ملف واحد",
        href: "/tools/pdf/merge",
      },
      {
        name: "تقسيم PDF",
        description: "قسم ملف PDF إلى عدة ملفات",
        href: "/tools/pdf/split",
      },
      {
        name: "ضغط PDF",
        description: "قلل حجم ملفات PDF",
        href: "/tools/pdf/compress",
      },
      {
        name: "تحويل PDF",
        description: "حول من وإلى PDF",
        href: "/tools/pdf/convert",
      },
    ],
  },
  {
    id: "qr-barcode",
    title: "QR والباركود",
    icon: QrCode,
    color: "from-purple-500 to-pink-500",
    tools: [
      {
        name: "مولد QR",
        description: "أنشئ رموز QR مخصصة بألوانك",
        href: "/tools/qr",
        badge: "شائع",
      },
      {
        name: "قارئ QR",
        description: "امسح واقرأ رموز QR",
        href: "/tools/qr/scanner",
      },
      {
        name: "مولد الباركود",
        description: "أنشئ باركود بجميع الأنواع",
        href: "/tools/barcode",
      },
    ],
  },
  {
    id: "images",
    title: "الصور",
    icon: ImageIcon,
    color: "from-green-500 to-emerald-500",
    tools: [
      {
        name: "ضغط الصور",
        description: "قلل حجم الصور مع الحفاظ على الجودة",
        href: "/tools/image/compress",
      },
      {
        name: "تغيير حجم الصور",
        description: "غير أبعاد الصور بسهولة",
        href: "/tools/image/resize",
      },
      {
        name: "تحويل صيغة الصور",
        description: "حول بين PNG, JPG, WebP",
        href: "/tools/image/convert",
      },
      {
        name: "إزالة خلفية الصور",
        description: "أزل الخلفية تلقائياً",
        href: "/tools/image/remove-bg",
        badge: "AI",
      },
    ],
  },
  {
    id: "calculators",
    title: "الحاسبات",
    icon: Calculator,
    color: "from-orange-500 to-red-500",
    tools: [
      {
        name: "حاسبة النسبة المئوية",
        description: "احسب النسب المئوية بسهولة",
        href: "/tools/calculator/percentage",
      },
      {
        name: "حاسبة العمر",
        description: "احسب عمرك بالتفصيل",
        href: "/tools/calculator/age",
      },
      {
        name: "حاسبة BMI",
        description: "احسب مؤشر كتلة الجسم",
        href: "/tools/calculator/bmi",
      },
      {
        name: "حاسبة القروض",
        description: "احسب الأقساط الشهرية",
        href: "/tools/calculator/loan",
      },
    ],
  },
  {
    id: "converters",
    title: "المحولات",
    icon: ArrowLeftRight,
    color: "from-yellow-500 to-amber-500",
    tools: [
      {
        name: "محول الوحدات",
        description: "حول بين مختلف الوحدات",
        href: "/tools/converter/units",
      },
      {
        name: "محول العملات",
        description: "أسعار صرف محدثة",
        href: "/tools/converter/currency",
      },
      {
        name: "محول درجات الحرارة",
        description: "سيلسيوس، فهرنهايت، كلفن",
        href: "/tools/converter/temperature",
      },
      {
        name: "محول الأرقام",
        description: "ثنائي، عشري، سادس عشري",
        href: "/tools/converter/numbers",
      },
    ],
  },
  {
    id: "datetime",
    title: "التاريخ والوقت",
    icon: Calendar,
    color: "from-teal-500 to-cyan-500",
    tools: [
      {
        name: "حاسبة الأيام",
        description: "احسب الفرق بين تاريخين",
        href: "/tools/datetime/days",
      },
      {
        name: "محول التاريخ الهجري",
        description: "حول بين الهجري والميلادي",
        href: "/tools/datetime/hijri",
      },
      {
        name: "ساعة العالم",
        description: "الوقت في مختلف المدن",
        href: "/tools/datetime/world-clock",
      },
    ],
  },
  {
    id: "security",
    title: "الأمان",
    icon: Shield,
    color: "from-red-500 to-rose-500",
    tools: [
      {
        name: "مولد كلمات المرور",
        description: "أنشئ كلمات مرور قوية",
        href: "/tools/security/password",
      },
      {
        name: "مولد Hash",
        description: "MD5, SHA-1, SHA-256",
        href: "/tools/security/hash",
      },
      {
        name: "تشفير/فك تشفير",
        description: "Base64, URL encoding",
        href: "/tools/security/encode",
      },
    ],
  },
  {
    id: "design",
    title: "التصميم",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    tools: [
      {
        name: "منتقي الألوان",
        description: "اختر وحول بين صيغ الألوان",
        href: "/tools/design/color-picker",
      },
      {
        name: "مولد التدرجات",
        description: "أنشئ تدرجات لونية جميلة",
        href: "/tools/design/gradient",
      },
      {
        name: "مولد الظلال",
        description: "CSS box-shadow generator",
        href: "/tools/design/shadow",
      },
    ],
  },
  {
    id: "developer",
    title: "المطورين",
    icon: Code,
    color: "from-gray-600 to-gray-800",
    tools: [
      {
        name: "منسق JSON",
        description: "تنسيق وتحقق من JSON",
        href: "/tools/developer/json",
      },
      {
        name: "مولد UUID",
        description: "أنشئ معرفات فريدة",
        href: "/tools/developer/uuid",
      },
      {
        name: "Lorem Ipsum",
        description: "نصوص عشوائية للتصميم",
        href: "/tools/developer/lorem",
      },
      {
        name: "مولد Meta Tags",
        description: "أنشئ وسوم SEO",
        href: "/tools/developer/meta",
      },
    ],
  },
  {
    id: "utility",
    title: "أدوات متنوعة",
    icon: Wrench,
    color: "from-indigo-500 to-violet-500",
    tools: [
      {
        name: "عداد الكلمات",
        description: "احسب الكلمات والحروف",
        href: "/tools/utility/word-count",
      },
      {
        name: "مقارنة النصوص",
        description: "قارن بين نصين",
        href: "/tools/utility/diff",
      },
      {
        name: "أرقام عشوائية",
        description: "ولد أرقاماً عشوائية",
        href: "/tools/utility/random",
      },
    ],
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                أدوات مجانية 100%
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                مجموعة شاملة من الأدوات المجانية لمساعدتك في مهامك اليومية
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="ابحث عن أداة..."
                  className="w-full h-14 pr-12 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {toolCategories.map((category) => (
                <div key={category.id}>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                    >
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {category.title}
                    </h2>
                  </div>

                  {/* Tools Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {category.tools.map((tool) => (
                      <Link key={tool.href} href={tool.href}>
                        <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-0 bg-white group">
                          <CardContent className="p-5">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                                {tool.name}
                              </h3>
                              {tool.badge && (
                                <span
                                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                                    tool.badge === "AI"
                                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                                      : "bg-orange-100 text-orange-700"
                                  }`}
                                >
                                  {tool.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {tool.description}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
