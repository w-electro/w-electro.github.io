"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Wrench,
  GraduationCap,
  Palette,
  Zap,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "الرئيسية",
    href: "/",
  },
  {
    name: "المساعد الذكي",
    href: "/ai",
    badge: "جديد",
    icon: Sparkles,
  },
  {
    name: "الأدوات المجانية",
    href: "/tools",
    icon: Wrench,
    children: [
      { name: "استخراج النصوص OCR", href: "/tools/ocr" },
      { name: "أدوات PDF", href: "/tools/pdf" },
      { name: "مولد QR", href: "/tools/qr" },
      { name: "أدوات الصور", href: "/tools/image" },
      { name: "الحاسبات", href: "/tools/calculator" },
      { name: "المحولات", href: "/tools/converter" },
      { name: "جميع الأدوات", href: "/tools" },
    ],
  },
  {
    name: "الخدمات",
    href: "/services",
    icon: GraduationCap,
    children: [
      { name: "خدمات طلابية", href: "/services/academic", icon: GraduationCap },
      { name: "خدمات تصميم", href: "/services/design", icon: Palette },
      { name: "خدمات إلكترونية", href: "/services/electronic", icon: Zap },
    ],
  },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-md">
              <Image
                src="/wD.png"
                alt="نجاح"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-orange-500">
                نجاح
              </span>
              <span className="text-[10px] text-muted-foreground -mt-1">
                رفيقك الذكي
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-accent"
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.name}
                  {item.badge && (
                    <span className="badge-ai text-[10px]">{item.badge}</span>
                  )}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        activeDropdown === item.name && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-1 w-56 rounded-xl bg-background border shadow-xl p-2"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-colors",
                            pathname === child.href
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-accent"
                          )}
                        >
                          {"icon" in child && child.icon && (
                            <child.icon className="h-4 w-4" />
                          )}
                          {child.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">تسجيل الدخول</Link>
            </Button>
            <Button size="sm" className="gap-2" asChild>
              <Link href="/ai">
                <Sparkles className="h-4 w-4" />
                جرب المساعد الذكي
              </Link>
            </Button>
          </div>

          {/* WhatsApp Button (Mobile) */}
          <a
            href="https://wa.me/966540732077"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white shadow-lg"
          >
            <MessageCircle className="h-5 w-5" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium",
                        pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-accent"
                      )}
                      onClick={() => !item.children && setMobileMenuOpen(false)}
                    >
                      {item.icon && <item.icon className="h-5 w-5" />}
                      {item.name}
                      {item.badge && (
                        <span className="badge-ai text-[10px]">{item.badge}</span>
                      )}
                    </Link>
                    {item.children && (
                      <div className="mr-8 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block px-4 py-2 rounded-lg text-sm",
                              pathname === child.href
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="pt-4 px-4 space-y-3 border-t">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login">تسجيل الدخول</Link>
                  </Button>
                  <Button className="w-full gap-2" asChild>
                    <Link href="/ai">
                      <Sparkles className="h-4 w-4" />
                      جرب المساعد الذكي
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
