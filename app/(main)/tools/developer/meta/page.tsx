"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileJson, Key, Type, FileCode, Copy, Check, Eye } from "lucide-react";

const developerTools = [
  { name: "JSON", href: "/tools/developer/json", icon: FileJson },
  { name: "UUID", href: "/tools/developer/uuid", icon: Key },
  { name: "Lorem Ipsum", href: "/tools/developer/lorem", icon: Type },
  { name: "Meta Tags", href: "/tools/developer/meta", icon: FileCode },
];

export default function MetaTagsGeneratorPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [url, setUrl] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [copied, setCopied] = useState(false);

  const generateMetaTags = () => {
    const tags = [];

    // Basic meta tags
    tags.push(`<meta charset="UTF-8">`);
    tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0">`);

    if (title) {
      tags.push(`<title>${title}</title>`);
      tags.push(`<meta name="title" content="${title}">`);
    }

    if (description) {
      tags.push(`<meta name="description" content="${description}">`);
    }

    if (keywords) {
      tags.push(`<meta name="keywords" content="${keywords}">`);
    }

    if (author) {
      tags.push(`<meta name="author" content="${author}">`);
    }

    // Open Graph tags
    tags.push(`\n<!-- Open Graph / Facebook -->`);
    tags.push(`<meta property="og:type" content="website">`);
    if (url) tags.push(`<meta property="og:url" content="${url}">`);
    if (title) tags.push(`<meta property="og:title" content="${title}">`);
    if (description) tags.push(`<meta property="og:description" content="${description}">`);
    if (ogImage) tags.push(`<meta property="og:image" content="${ogImage}">`);

    // Twitter Card tags
    tags.push(`\n<!-- Twitter -->`);
    tags.push(`<meta property="twitter:card" content="summary_large_image">`);
    if (url) tags.push(`<meta property="twitter:url" content="${url}">`);
    if (title) tags.push(`<meta property="twitter:title" content="${title}">`);
    if (description) tags.push(`<meta property="twitter:description" content="${description}">`);
    if (ogImage) tags.push(`<meta property="twitter:image" content="${ogImage}">`);
    if (twitterHandle) tags.push(`<meta name="twitter:creator" content="${twitterHandle}">`);

    return tags.join("\n");
  };

  const output = generateMetaTags();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl mb-4">
              <FileCode className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600">
              مولد Meta Tags
            </h1>
            <p className="text-gray-600 text-lg">أنشئ وسوم SEO لموقعك</p>
          </div>

          <ToolNavigation tools={developerTools} category="المطورين" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">المعلومات الأساسية</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">عنوان الصفحة</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="موقعي الرائع"
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">يُفضل 50-60 حرفاً</p>
                  </div>

                  <div>
                    <Label htmlFor="description">الوصف</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="وصف مختصر لموقعك..."
                      className="mt-1 h-20"
                    />
                    <p className="text-xs text-gray-500 mt-1">يُفضل 150-160 حرفاً</p>
                  </div>

                  <div>
                    <Label htmlFor="keywords">الكلمات المفتاحية</Label>
                    <Input
                      id="keywords"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="كلمة1, كلمة2, كلمة3"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="author">المؤلف</Label>
                    <Input
                      id="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="اسمك"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="url">رابط الموقع</Label>
                    <Input
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="mt-1"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ogImage">صورة المشاركة (OG Image)</Label>
                    <Input
                      id="ogImage"
                      value={ogImage}
                      onChange={(e) => setOgImage(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="mt-1"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <Label htmlFor="twitter">حساب Twitter</Label>
                    <Input
                      id="twitter"
                      value={twitterHandle}
                      onChange={(e) => setTwitterHandle(e.target.value)}
                      placeholder="@username"
                      className="mt-1"
                      dir="ltr"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">الكود المولد</h3>
                    <Button onClick={copyToClipboard} variant="outline" size="sm">
                      {copied ? <Check className="h-4 w-4 ml-2" /> : <Copy className="h-4 w-4 ml-2" />}
                      {copied ? "تم النسخ" : "نسخ"}
                    </Button>
                  </div>
                  <Textarea
                    value={output}
                    readOnly
                    className="font-mono text-xs h-80 resize-none bg-gray-900 text-green-400"
                    dir="ltr"
                  />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="h-5 w-5 text-blue-500" />
                    <h3 className="font-bold">معاينة Google</h3>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-blue-600 text-lg hover:underline cursor-pointer" dir="ltr">
                      {title || "عنوان الصفحة"}
                    </p>
                    <p className="text-green-700 text-sm" dir="ltr">
                      {url || "https://example.com"}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {description || "وصف الصفحة سيظهر هنا..."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
