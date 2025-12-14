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
import { FileJson, Key, Type, FileCode, Copy, Check, RefreshCw } from "lucide-react";

const developerTools = [
  { name: "JSON", href: "/tools/developer/json", icon: FileJson },
  { name: "UUID", href: "/tools/developer/uuid", icon: Key },
  { name: "Lorem Ipsum", href: "/tools/developer/lorem", icon: Type },
  { name: "Meta Tags", href: "/tools/developer/meta", icon: FileCode },
];

const loremWords = [
  "لوريم", "إيبسوم", "دولور", "سيت", "أميت", "كونسيكتيتور", "أديبيسكينج", "إيليت",
  "سيد", "دو", "إيوسمود", "تيمبور", "إنسيديدونت", "يوت", "لابوري", "إيت",
  "دولوري", "ماجنا", "أليكوا", "إينيم", "آد", "مينيم", "فينيام", "كويس",
  "نوستراد", "إكسيرسيتاشن", "أولامكو", "لابوريس", "نيسي", "أوت", "أليكويب",
  "إكس", "إيا", "كومودو", "كونسيكوات", "دويس", "أوتي", "إيروري", "إن",
  "ريبريهينديريت", "فولوبتات", "فيليت", "إيسي", "سيلوم", "فوجيات", "نولا",
  "باراياتور", "إكسيبتيور", "سينت", "أوكايكات", "كيوبيداتات", "نون", "برويدينت",
  "سونت", "كولبا", "كوي", "أوفيسيا", "ديسيرونت", "موليت", "أنيم", "إيد",
  "إيست", "لابوروم", "النص", "العربي", "التجريبي", "للتصميم", "والطباعة",
  "منذ", "القرن", "الخامس", "عشر", "عندما", "قامت", "مطبعة", "مجهولة",
  "بأخذ", "مجموعة", "من", "الأحرف", "بشكل", "عشوائي", "لتكوين", "كتيب",
];

const arabicLoremParagraphs = [
  "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
  "إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص.",
  "حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع، ومن هنا وجب على المصمم أن يضع نصوصاً مؤقتة على التصميم ليظهر للعميل الشكل كاملاً.",
  "دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.",
  "هذا النص يمكن أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص منسوخ، غير منظم، غير منسق، أو حتى غير مفهوم.",
];

export default function LoremIpsumPage() {
  const [output, setOutput] = useState("");
  const [paragraphs, setParagraphs] = useState(3);
  const [type, setType] = useState<"paragraphs" | "words" | "sentences">("paragraphs");
  const [copied, setCopied] = useState(false);

  const generateLorem = () => {
    let result = "";

    if (type === "paragraphs") {
      const generated = [];
      for (let i = 0; i < paragraphs; i++) {
        generated.push(arabicLoremParagraphs[i % arabicLoremParagraphs.length]);
      }
      result = generated.join("\n\n");
    } else if (type === "words") {
      const words = [];
      for (let i = 0; i < paragraphs; i++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
      }
      result = words.join(" ");
    } else if (type === "sentences") {
      const sentences = [];
      for (let i = 0; i < paragraphs; i++) {
        const sentenceWords = [];
        const wordCount = 8 + Math.floor(Math.random() * 7);
        for (let j = 0; j < wordCount; j++) {
          sentenceWords.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
        sentences.push(sentenceWords.join(" ") + ".");
      }
      result = sentences.join(" ");
    }

    setOutput(result);
  };

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
      <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl mb-4">
              <Type className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
              Lorem Ipsum العربي
            </h1>
            <p className="text-gray-600 text-lg">نصوص عشوائية عربية للتصميم</p>
          </div>

          <ToolNavigation tools={developerTools} category="المطورين" />

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label htmlFor="count">العدد</Label>
                  <Input
                    id="count"
                    type="number"
                    min="1"
                    max="50"
                    value={paragraphs}
                    onChange={(e) => setParagraphs(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>النوع</Label>
                  <div className="flex gap-1 mt-1">
                    <Button
                      variant={type === "paragraphs" ? "default" : "outline"}
                      onClick={() => setType("paragraphs")}
                      size="sm"
                      className="flex-1"
                    >
                      فقرات
                    </Button>
                    <Button
                      variant={type === "sentences" ? "default" : "outline"}
                      onClick={() => setType("sentences")}
                      size="sm"
                      className="flex-1"
                    >
                      جمل
                    </Button>
                    <Button
                      variant={type === "words" ? "default" : "outline"}
                      onClick={() => setType("words")}
                      size="sm"
                      className="flex-1"
                    >
                      كلمات
                    </Button>
                  </div>
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={generateLorem}
                    className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
                  >
                    <RefreshCw className="h-4 w-4 ml-2" />
                    توليد
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <Button onClick={copyToClipboard} variant="outline" size="sm" disabled={!output}>
                  {copied ? <Check className="h-4 w-4 ml-2" /> : <Copy className="h-4 w-4 ml-2" />}
                  {copied ? "تم النسخ" : "نسخ"}
                </Button>
              </div>

              <Textarea
                value={output}
                readOnly
                placeholder="اضغط على زر التوليد لإنشاء النص..."
                className="h-64 resize-none"
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">عن النص العشوائي:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• يُستخدم كنص بديل في التصاميم والمواقع قيد التطوير</li>
                <li>• يساعد المصممين على تصور الشكل النهائي قبل المحتوى الفعلي</li>
                <li>• النص العربي أفضل من Lorem Ipsum اللاتيني للتصاميم العربية</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
