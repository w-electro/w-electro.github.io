"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Sparkles,
  Camera,
  Mic,
  Image as ImageIcon,
  Paperclip,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  ArrowDown,
  Lightbulb,
  Calculator,
  BookOpen,
  FileText,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { MessageBubble } from "./MessageBubble";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  imageUrl?: string;
}

const suggestions = [
  {
    icon: Calculator,
    text: "حل معادلة x² + 5x + 6 = 0",
    category: "رياضيات",
  },
  {
    icon: Lightbulb,
    text: "اشرح لي نظرية فيثاغورس",
    category: "شرح",
  },
  {
    icon: BookOpen,
    text: "لخص لي هذا النص",
    category: "تلخيص",
  },
  {
    icon: FileText,
    text: "ساعدني في كتابة مقدمة بحث",
    category: "كتابة",
  },
  {
    icon: Code,
    text: "اكتب كود Python لحساب المتوسط",
    category: "برمجة",
  },
];

export function ChatInterface() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showScrollButton, setShowScrollButton] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = React.useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle scroll to show/hide scroll button
  const handleScroll = React.useCallback(() => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
  }, []);

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substring(2, 9);

  // Handle sending message
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Focus back on textarea
    textareaRef.current?.focus();

    try {
      // Call the actual AI API
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      // Even if response is not ok, try to get the content
      const contentType = response.headers.get("content-type") || "";
      const assistantId = generateId();

      // If response failed and it's not JSON, throw error
      if (!response.ok && !contentType.includes("application/json")) {
        throw new Error("Failed to get response");
      }

      // Check if streaming response (text/event-stream) or JSON response (demo mode)
      if (contentType.includes("text/event-stream")) {
        // Handle streaming response
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error("No response body");
        }

        let assistantContent = "";

        // Create empty assistant message
        setMessages((prev) => [
          ...prev,
          {
            id: assistantId,
            role: "assistant",
            content: "",
            timestamp: new Date(),
          },
        ]);

        // Stream the response
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  assistantContent += parsed.content;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, content: assistantContent }
                        : m
                    )
                  );
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      } else {
        // Handle JSON response (demo mode or error fallback)
        try {
          const data = await response.json();
          if (data.content) {
            setMessages((prev) => [
              ...prev,
              {
                id: assistantId,
                role: "assistant",
                content: data.content,
                timestamp: new Date(),
              },
            ]);
          } else {
            throw new Error("No content in response");
          }
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
          throw new Error("Failed to parse response");
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Show error message
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (text: string) => {
    setInput(text);
    textareaRef.current?.focus();
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Clear chat
  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white">
      {/* Chat Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm px-2 md:px-4 py-2 md:py-3 flex-shrink-0">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-orange-500 flex items-center justify-center shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">مُهم</h1>
              <p className="text-xs text-gray-500">مساعدك الذكي للدراسة</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearChat}
                className="text-gray-500"
              >
                <Trash2 className="h-4 w-4 ml-2" />
                مسح المحادثة
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-6"
      >
        <div className="container mx-auto max-w-3xl">
          {messages.length === 0 ? (
            <EmptyState onSuggestionClick={handleSuggestionClick} />
          ) : (
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </AnimatePresence>

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 items-start"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-br-none px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Scroll to bottom button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={scrollToBottom}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 p-2 bg-white rounded-full shadow-lg border hover:bg-gray-50 transition-colors"
          >
            <ArrowDown className="h-5 w-5 text-gray-600" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="border-t bg-white px-2 md:px-4 py-3 md:py-4 flex-shrink-0">
        <div className="container mx-auto max-w-3xl">
          <div className="relative flex items-end gap-2">
            {/* Action buttons */}
            <div className="flex gap-1 pb-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:text-gray-600"
                title="إرفاق صورة"
              >
                <Camera className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-400 hover:text-gray-600"
                title="تسجيل صوتي"
              >
                <Mic className="h-5 w-5" />
              </Button>
            </div>

            {/* Text input */}
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="اكتب سؤالك هنا... (Enter للإرسال)"
                className="min-h-[52px] max-h-[200px] pr-4 pl-12 py-3 resize-none rounded-2xl border-2 focus:border-primary"
                rows={1}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="absolute left-2 bottom-2 rounded-xl h-9 w-9"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="text-xs text-center text-gray-400 mt-2">
            مُهم قد يخطئ أحياناً. تحقق من المعلومات المهمة.
          </p>
        </div>
      </div>
    </div>
  );
}

// Empty state component
function EmptyState({
  onSuggestionClick,
}: {
  onSuggestionClick: (text: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-orange-500 flex items-center justify-center shadow-2xl mb-6"
      >
        <Sparkles className="h-10 w-10 text-white" />
      </motion.div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        مرحباً، أنا مُهم
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        مساعدك الذكي للدراسة. اسألني أي سؤال وسأساعدك في فهمه وحله خطوة بخطوة.
      </p>

      <div className="w-full max-w-lg">
        <p className="text-sm font-medium text-gray-500 mb-3">
          جرب أحد هذه الأسئلة:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSuggestionClick(suggestion.text)}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border hover:border-primary hover:shadow-md transition-all duration-200 text-right group"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                <suggestion.icon className="h-5 w-5 text-gray-600 group-hover:text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {suggestion.text}
                </p>
                <p className="text-xs text-gray-500">{suggestion.category}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Simulated response for demo
function getSimulatedResponse(input: string): string {
  const lowerInput = input.toLowerCase();

  if (
    lowerInput.includes("معادلة") ||
    lowerInput.includes("حل") ||
    lowerInput.includes("x²")
  ) {
    return `# حل المعادلة التربيعية

لحل المعادلة **x² + 5x + 6 = 0**، سنستخدم طريقة التحليل:

## الخطوة 1: إيجاد العوامل
نبحث عن عددين حاصل ضربهما = 6 ومجموعهما = 5

العددان هما: **2** و **3** (لأن 2 × 3 = 6 و 2 + 3 = 5)

## الخطوة 2: التحليل
\`\`\`
x² + 5x + 6 = 0
(x + 2)(x + 3) = 0
\`\`\`

## الخطوة 3: إيجاد الحلول
إما **x + 2 = 0** → **x = -2**
أو **x + 3 = 0** → **x = -3**

## الإجابة النهائية
$$x = -2 \\text{ أو } x = -3$$

---
هل تريد أن أشرح طريقة أخرى لحل هذه المعادلة؟`;
  }

  if (lowerInput.includes("فيثاغورس")) {
    return `# نظرية فيثاغورس

نظرية فيثاغورس هي إحدى أهم النظريات في الهندسة، وتنص على:

> في المثلث القائم الزاوية، مربع طول الوتر يساوي مجموع مربعي طولي الضلعين الآخرين.

## الصيغة الرياضية
$$a² + b² = c²$$

حيث:
- **c** = الوتر (الضلع المقابل للزاوية القائمة)
- **a** و **b** = الضلعان القائمان

## مثال تطبيقي
إذا كان لدينا مثلث قائم بضلعين 3 و 4:
\`\`\`
3² + 4² = c²
9 + 16 = c²
25 = c²
c = 5
\`\`\`

هل تريد أمثلة إضافية؟`;
  }

  return `شكراً لسؤالك!

أنا مُهم، مساعدك الذكي للدراسة. يمكنني مساعدتك في:

- ✅ حل المسائل الرياضية خطوة بخطوة
- ✅ شرح المفاهيم العلمية
- ✅ تلخيص النصوص
- ✅ المساعدة في كتابة البحوث
- ✅ الإجابة على أسئلتك الدراسية

اكتب سؤالك بالتفصيل وسأساعدك بكل سرور! 🎓`;
}
