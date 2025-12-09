import { Metadata } from "next";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ChatInterface } from "@/components/ai/ChatInterface";

export const metadata: Metadata = {
  title: "مُهم - المساعد الذكي | نجاح",
  description:
    "مساعد ذكي يفهم العربية والإنجليزية. يحل المسائل الرياضية خطوة بخطوة، يشرح المفاهيم، ويساعدك في دراستك. جربه مجاناً الآن!",
  keywords: [
    "مساعد ذكي",
    "ذكاء اصطناعي",
    "حل مسائل",
    "مساعدة دراسية",
    "AI",
    "ChatGPT بالعربي",
  ],
};

export default function AIPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <ChatInterface />
      </main>
      <Footer />
    </div>
  );
}
