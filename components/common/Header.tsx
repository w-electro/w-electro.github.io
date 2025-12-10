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
  ChevronLeft,
  Sparkles,
  Wrench,
  GraduationCap,
  Palette,
  Zap,
  MessageCircle,
  Home,
  FileText,
  QrCode,
  Calculator,
  ArrowLeftRight,
  Search,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavChild {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  description?: string;
  children?: NavChild[];
}

const navigation: NavItem[] = [
  {
    name: "الرئيسية",
    href: "/",
    icon: Home,
  },
  {
    name: "المساعد الذكي",
    href: "/ai",
    badge: "جديد",
    icon: Sparkles,
    description: "مساعد AI يفهم العربية",
  },
  {
    name: "الأدوات المجانية",
    href: "/tools",
    icon: Wrench,
    description: "أكثر من 50 أداة مجانية",
    children: [
      { name: "استخراج النصوص OCR", href: "/tools/ocr", icon: FileText },
      { name: "أدوات PDF", href: "/tools/pdf", icon: FileText },
      { name: "مولد QR", href: "/tools/qr", icon: QrCode },
      { name: "أدوات الصور", href: "/tools/image", icon: Palette },
      { name: "الحاسبات", href: "/tools/calculator", icon: Calculator },
      { name: "المحولات", href: "/tools/converter", icon: ArrowLeftRight },
      { name: "جميع الأدوات", href: "/tools", icon: Wrench },
    ],
  },
  {
    name: "الخدمات",
    href: "/services",
    icon: GraduationCap,
    description: "خدمات احترافية متنوعة",
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
  const [expandedMobileItem, setExpandedMobileItem] = React.useState<string | null>(null);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedMobileItem(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleMobileItem = (name: string) => {
    setExpandedMobileItem(expandedMobileItem === name ? null : name);
  };

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
                          {child.icon && <child.icon className="h-4 w-4" />}
                          {child.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
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

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            {/* WhatsApp Quick Access */}
            <a
              href="https://wa.me/966540732077"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white shadow-lg active:scale-95 transition-transform"
              aria-label="تواصل عبر واتساب"
            >
              <MessageCircle className="h-5 w-5" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-accent active:scale-95 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Full Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 bg-black/50 backdrop-blur-sm md:hidden z-40"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-16 bottom-0 right-0 w-full max-w-sm bg-background border-r shadow-2xl md:hidden z-50 flex flex-col"
            >
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Quick Search */}
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="search"
                      placeholder="ابحث عن أداة أو خدمة..."
                      className="w-full h-12 pr-11 pl-4 rounded-xl bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="p-4 space-y-2">
                  {navigation.map((item) => (
                    <div key={item.name} className="rounded-xl overflow-hidden">
                      {/* Main Item */}
                      {item.children ? (
                        <button
                          onClick={() => toggleMobileItem(item.name)}
                          className={cn(
                            "w-full flex items-center gap-4 px-4 py-4 text-right rounded-xl transition-all active:scale-[0.98]",
                            pathname === item.href || pathname.startsWith(item.href + "/")
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-accent"
                          )}
                        >
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                            pathname === item.href || pathname.startsWith(item.href + "/")
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}>
                            <item.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1 text-right">
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{item.name}</span>
                              {item.badge && (
                                <span className="badge-ai text-[10px]">{item.badge}</span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <ChevronLeft
                            className={cn(
                              "h-5 w-5 text-muted-foreground transition-transform",
                              expandedMobileItem === item.name && "-rotate-90"
                            )}
                          />
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "w-full flex items-center gap-4 px-4 py-4 text-right rounded-xl transition-all active:scale-[0.98]",
                            pathname === item.href
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-accent"
                          )}
                        >
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                            pathname === item.href
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}>
                            <item.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1 text-right">
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{item.name}</span>
                              {item.badge && (
                                <span className="badge-ai text-[10px]">{item.badge}</span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      )}

                      {/* Submenu Items */}
                      <AnimatePresence>
                        {item.children && expandedMobileItem === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pr-16 pb-2 space-y-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all active:scale-[0.98]",
                                    pathname === child.href
                                      ? "bg-primary/10 text-primary font-medium"
                                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                  )}
                                >
                                  {child.icon && <child.icon className="h-4 w-4" />}
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixed Bottom Section */}
              <div className="border-t bg-background p-4 space-y-3">
                {/* CTA Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full h-12" asChild>
                    <Link href="/login">تسجيل الدخول</Link>
                  </Button>
                  <Button className="w-full h-12 gap-2" asChild>
                    <Link href="/ai">
                      <Sparkles className="h-4 w-4" />
                      المساعد الذكي
                    </Link>
                  </Button>
                </div>

                {/* Branding Footer */}
                <div className="flex items-center justify-center gap-2 pt-2 border-t">
                  <span className="text-xs text-muted-foreground">
                    جزء من
                  </span>
                  <Link
                    href="/"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    W For Electronic Services
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
