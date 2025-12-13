"use client";

import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { BookOpen, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title: "كيف تستخدم الذكاء الاصطناعي في دراستك؟",
    excerpt: "دليل شامل لاستخدام أدوات الذكاء الاصطناعي لتحسين أدائك الأكاديمي",
    category: "تقنية",
    date: "2025-01-15",
    readTime: "5 دقائق",
    image: "/blog/ai-study.jpg",
    slug: "ai-in-study",
  },
  {
    id: 2,
    title: "أفضل 10 أدوات مجانية للطلاب في 2025",
    excerpt: "اكتشف أفضل الأدوات المجانية التي ستساعدك في تنظيم دراستك وزيادة إنتاجيتك",
    category: "إنتاجية",
    date: "2025-01-10",
    readTime: "7 دقائق",
    image: "/blog/free-tools.jpg",
    slug: "best-free-tools-2025",
  },
  {
    id: 3,
    title: "نصائح لكتابة بحث جامعي ناجح",
    excerpt: "خطوات عملية لكتابة بحث أكاديمي احترافي يحصل على أعلى الدرجات",
    category: "تعليم",
    date: "2025-01-05",
    readTime: "6 دقائق",
    image: "/blog/research.jpg",
    slug: "successful-research-writing",
  },
];

const categories = ["الكل", "تقنية", "إنتاجية", "تعليم", "خدمات"];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cyan-50 via-white to-orange-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-2xl mb-6 shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-orange-500">
                مدونة نجاح
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                مقالات ونصائح حول التعليم، التقنية، والإنتاجية لمساعدتك في رحلة النجاح
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full transition-all ${
                    category === "الكل"
                      ? "bg-gradient-to-r from-cyan-500 to-orange-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
                    <div className="relative h-48 bg-gradient-to-br from-cyan-100 to-orange-100 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-20 w-20 text-gray-300" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-xs font-medium rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-cyan-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.date).toLocaleDateString("ar-SA")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-cyan-600 font-medium group-hover:gap-3 transition-all">
                        <span>اقرأ المزيد</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-gradient-to-br from-cyan-500 to-orange-500">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">اشترك في النشرة البريدية</h2>
              <p className="mb-6">احصل على آخر المقالات والنصائح مباشرة في بريدك الإلكتروني</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                />
                <button className="px-6 py-3 bg-white text-cyan-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                  اشترك الآن
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
