"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Instagram, Twitter, Mail, Phone } from "lucide-react";

const footerLinks = {
  tools: {
    title: "الأدوات المجانية",
    links: [
      { name: "استخراج النصوص OCR", href: "/tools/ocr" },
      { name: "أدوات PDF", href: "/tools/pdf" },
      { name: "مولد QR", href: "/tools/qr" },
      { name: "أدوات الصور", href: "/tools/image" },
      { name: "جميع الأدوات", href: "/tools" },
    ],
  },
  services: {
    title: "الخدمات",
    links: [
      { name: "خدمات طلابية", href: "/services/academic" },
      { name: "خدمات تصميم", href: "/services/design" },
      { name: "خدمات إلكترونية", href: "/services/electronic" },
      { name: "سوق المشاريع", href: "/marketplace" },
    ],
  },
  company: {
    title: "الشركة",
    links: [
      { name: "من نحن", href: "/about" },
      { name: "تواصل معنا", href: "/contact" },
      { name: "سياسة الخصوصية", href: "/privacy" },
      { name: "الشروط والأحكام", href: "/terms" },
    ],
  },
};

const socialLinks = [
  {
    name: "WhatsApp",
    href: "https://wa.me/966540732077",
    icon: MessageCircle,
    color: "hover:text-green-500",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/wfor_es",
    icon: Instagram,
    color: "hover:text-pink-500",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/WFor_ES",
    icon: Twitter,
    color: "hover:text-blue-400",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="/wD.png"
                  alt="نجاح"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">نجاح</span>
                <p className="text-sm text-gray-400">رفيقك الذكي في رحلة النجاح</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              منصة نجاح هي رفيقك الذكي في رحلة النجاح الأكاديمي. نقدم أدوات مجانية
              متطورة ومساعد ذكي بالذكاء الاصطناعي وخدمات طلابية احترافية.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <a
                href="tel:+966540732077"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span dir="ltr">+966 54 073 2077</span>
              </a>
              <a
                href="mailto:wforelectronicservices@gmail.com"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>wforelectronicservices@gmail.com</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full bg-gray-800 transition-colors ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} نجاح. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-white transition-colors">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/966540732077"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline text-sm font-medium">تواصل معنا</span>
      </a>
    </footer>
  );
}
