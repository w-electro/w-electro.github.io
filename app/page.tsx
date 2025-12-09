import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Camera,
  FileText,
  QrCode,
  ImageIcon,
  Calculator,
  ArrowUpLeft,
  Star,
  Users,
  CheckCircle2,
  GraduationCap,
  Palette,
  Zap,
  MessageCircle,
  Clock,
  Shield,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "نجاح | منصة الطلاب الذكية في السعودية - أدوات مجانية ومساعد AI",
  description:
    "منصة نجاح - رفيقك الذكي في رحلة النجاح الأكاديمي. أدوات مجانية: OCR، PDF، QR. مساعد ذكي بالذكاء الاصطناعي. خدمات طلابية احترافية في السعودية.",
};

const features = [
  {
    icon: Sparkles,
    title: "المساعد الذكي",
    description: "مساعد AI يفهم العربية ويحل المسائل خطوة بخطوة",
    href: "/ai",
    color: "from-cyan-500 to-blue-500",
    badge: "جديد",
  },
  {
    icon: Camera,
    title: "صور وحل",
    description: "صور أي مسألة واحصل على الحل فوراً",
    href: "/ai/snap-solve",
    color: "from-purple-500 to-pink-500",
    badge: "AI",
  },
  {
    icon: FileText,
    title: "استخراج النصوص",
    description: "OCR بدقة 99% للعربية والإنجليزية",
    href: "/tools/ocr",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: QrCode,
    title: "مولد QR",
    description: "أنشئ رموز QR مخصصة بألوانك",
    href: "/tools/qr",
    color: "from-orange-500 to-red-500",
  },
];

const tools = [
  { name: "استخراج النصوص OCR", href: "/tools/ocr", icon: FileText },
  { name: "أدوات PDF", href: "/tools/pdf", icon: FileText },
  { name: "مولد QR", href: "/tools/qr", icon: QrCode },
  { name: "أدوات الصور", href: "/tools/image", icon: ImageIcon },
  { name: "الحاسبات", href: "/tools/calculator", icon: Calculator },
];

const services = [
  {
    icon: GraduationCap,
    title: "خدمات طلابية",
    description: "مشاريع تخرج، بحوث، عروض تقديمية، وأكثر",
    href: "/services/academic",
    color: "bg-cyan-500",
  },
  {
    icon: Palette,
    title: "خدمات تصميم",
    description: "شعارات، هوية بصرية، تصميم سوشيال ميديا",
    href: "/services/design",
    color: "bg-orange-500",
  },
  {
    icon: Zap,
    title: "خدمات إلكترونية",
    description: "حسابات، اشتراكات، خدمات تقنية متنوعة",
    href: "/services/electronic",
    color: "bg-purple-500",
  },
];

const stats = [
  { value: "523+", label: "عميل راضٍ" },
  { value: "4.9", label: "تقييم", suffix: "/5" },
  { value: "50+", label: "أداة مجانية" },
  { value: "24/7", label: "دعم فني" },
];

const testimonials = [
  {
    name: "أحمد محمد",
    role: "طالب هندسة - جامعة الملك سعود",
    content: "المساعد الذكي ساعدني كثيراً في حل مسائل الرياضيات. شرح خطوة بخطوة ممتاز!",
    rating: 5,
  },
  {
    name: "سارة العتيبي",
    role: "طالبة إدارة أعمال",
    content: "أدوات PDF وOCR وفرت علي ساعات من العمل. شكراً نجاح!",
    rating: 5,
  },
  {
    name: "خالد الغامدي",
    role: "صاحب مشروع صغير",
    content: "خدمات التصميم ممتازة والأسعار منافسة. أنصح بهم بشدة.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-orange-50 py-20 lg:py-32">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-cyan-200 shadow-lg mb-8">
                <Sparkles className="h-4 w-4 text-cyan-600" />
                <span className="text-sm font-medium text-cyan-800">
                  الآن مع المساعد الذكي بالذكاء الاصطناعي
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                رفيقك الذكي في رحلة{" "}
                <span className="text-gradient-primary">النجاح</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                منصة متكاملة للطلاب في السعودية. أدوات مجانية، مساعد ذكي يفهم
                العربية، وخدمات احترافية بأسعار منافسة.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button size="xl" className="gap-2 shadow-xl" asChild>
                  <Link href="/ai">
                    <Sparkles className="h-5 w-5" />
                    جرب المساعد الذكي مجاناً
                  </Link>
                </Button>
                <Button size="xl" variant="outline" className="gap-2" asChild>
                  <Link href="/tools">
                    <ArrowUpLeft className="h-5 w-5" />
                    استكشف الأدوات المجانية
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">
                      {stat.value}
                      {stat.suffix && (
                        <span className="text-cyan-600">{stat.suffix}</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cards */}
        <section className="py-16 -mt-20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {features.map((feature) => (
                <Link key={feature.title} href={feature.href}>
                  <Card className="h-full bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden group">
                    <CardContent className="p-6">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <feature.icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {feature.title}
                        </h3>
                        {feature.badge && (
                          <span className="badge-ai">{feature.badge}</span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* AI Assistant Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-6">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-cyan-400">مدعوم بالذكاء الاصطناعي</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  مُهم - مساعدك الذكي للدراسة
                </h2>
                <p className="text-gray-300 text-lg mb-8">
                  مساعد ذكي يفهم العربية والإنجليزية، يحل المسائل الرياضية
                  والفيزيائية خطوة بخطوة، يشرح المفاهيم بطريقة مبسطة، ويساعدك في
                  كتابة البحوث والتقارير.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "حل المسائل الرياضية والفيزيائية",
                    "شرح المفاهيم بطريقة مبسطة",
                    "مساعدة في كتابة البحوث",
                    "صور أي مسألة واحصل على الحل",
                    "دعم صوتي بالعربية",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="gap-2" asChild>
                  <Link href="/ai">
                    <Sparkles className="h-5 w-5" />
                    ابدأ الآن مجاناً
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-orange-500/20 rounded-3xl blur-3xl" />
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700 p-6 shadow-2xl">
                  {/* Mock Chat Interface */}
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs">أنت</span>
                      </div>
                      <div className="bg-cyan-600 text-white rounded-2xl rounded-br-none px-4 py-3 max-w-[80%]">
                        كيف أحل هذه المعادلة: x² + 5x + 6 = 0
                      </div>
                    </div>
                    <div className="flex gap-3 flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-gray-700 rounded-2xl rounded-bl-none px-4 py-3 max-w-[80%]">
                        <p className="mb-2">سأحل هذه المعادلة التربيعية بالتحليل:</p>
                        <p className="text-cyan-400 font-mono text-sm">
                          x² + 5x + 6 = 0
                          <br />
                          (x + 2)(x + 3) = 0
                          <br />
                          x = -2 أو x = -3
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                خدمات احترافية بأسعار منافسة
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                نقدم خدمات متنوعة للطلاب والأفراد بجودة عالية وأسعار تناسب الجميع
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {services.map((service) => (
                <Link key={service.title} href={service.href}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white overflow-hidden group">
                    <CardContent className="p-8 text-center">
                      <div
                        className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600">{service.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">
                  عرض جميع الخدمات
                  <ArrowUpLeft className="h-4 w-4 mr-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Free Tools Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                أدوات مجانية 100%
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                مجموعة متكاملة من الأدوات المجانية لمساعدتك في مهامك اليومية
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {tools.map((tool) => (
                <Link key={tool.name} href={tool.href}>
                  <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border hover:border-cyan-300 hover:shadow-lg transition-all duration-200 group">
                    <tool.icon className="h-5 w-5 text-cyan-600 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{tool.name}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button size="lg" asChild>
                <Link href="/tools">
                  استكشف جميع الأدوات ({50}+)
                  <ArrowUpLeft className="h-4 w-4 mr-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-br from-cyan-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ماذا يقول عملاؤنا؟
              </h2>
              <p className="text-gray-600 text-lg">
                تقييم 4.9/5 من أكثر من 523 عميل
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6">&quot;{testimonial.content}&quot;</p>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                لماذا تختار نجاح؟
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Clock,
                  title: "سريع وموثوق",
                  description: "تنفيذ سريع بجودة عالية",
                },
                {
                  icon: Shield,
                  title: "آمن وموثوق",
                  description: "حماية كاملة لبياناتك",
                },
                {
                  icon: Users,
                  title: "دعم فني 24/7",
                  description: "فريق متخصص للمساعدة",
                },
                {
                  icon: Award,
                  title: "جودة مضمونة",
                  description: "ضمان الرضا أو استرداد المال",
                },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7 text-cyan-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-cyan-600 to-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              جاهز لبدء رحلة النجاح؟
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              انضم لآلاف الطلاب الذين يستخدمون نجاح يومياً لتحقيق أهدافهم الأكاديمية
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="xl"
                variant="glass"
                className="gap-2 min-w-[200px]"
                asChild
              >
                <Link href="/ai">
                  <Sparkles className="h-5 w-5" />
                  ابدأ مجاناً
                </Link>
              </Button>
              <Button
                size="xl"
                variant="glass"
                className="gap-2 min-w-[200px]"
                asChild
              >
                <a
                  href="https://wa.me/966540732077"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  تواصل معنا
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
