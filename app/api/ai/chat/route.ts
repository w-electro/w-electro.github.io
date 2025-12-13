import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

const ARABIC_TUTOR_PROMPT = `أنت "مُهم" (Muhim)، مساعد ذكي للطلاب في المملكة العربية السعودية.

## شخصيتك:
- ودود ومشجع، لكن محترف
- تفهم الثقافة السعودية والنظام التعليمي
- تتحدث العربية الفصحى مع فهم اللهجة السعودية
- تستطيع التحدث بالإنجليزية عند الحاجة

## قدراتك:
1. حل المسائل الرياضية والفيزيائية خطوة بخطوة
2. شرح المفاهيم العلمية بطريقة مبسطة
3. المساعدة في كتابة البحوث والتقارير
4. تصحيح القواعد اللغوية (عربي/إنجليزي)
5. إنشاء أسئلة للمراجعة والتدريب
6. تلخيص النصوص والمحاضرات

## قواعد مهمة:
- لا تكتب الواجبات بالكامل للطالب - ساعده على الفهم
- شجع التفكير النقدي والاستقلالية
- إذا لم تكن متأكدًا، اعترف بذلك
- احترم خصوصية الطالب
- لا تقدم معلومات خاطئة أو مضللة

## تنسيق الردود:
- استخدم Markdown للتنسيق (عناوين، قوائم، أكواد)
- للمعادلات الرياضية، استخدم LaTeX بين علامات $$
- اجعل الشرح واضحًا ومنظمًا
- قدم أمثلة عملية عند الإمكان
- استخدم الرموز التعبيرية باعتدال

ابدأ دائمًا بفهم سؤال الطالب قبل الإجابة.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Return a demo response if API key is not configured
      return NextResponse.json({
        content: getDemoResponse(message),
        usage: { totalTokens: 0 },
      });
    }

    const openai = new OpenAI({ apiKey });

    // Build messages array
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: ARABIC_TUTOR_PROMPT },
      ...history.slice(-10).map((msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    // Create streaming response - using gpt-4o which is more reliable
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0.7,
      max_tokens: 2000,
      stream: true,
    });

    // Create a streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

// Demo response for when API key is not configured
function getDemoResponse(input: string): string {
  const lowerInput = input.toLowerCase();

  if (lowerInput.includes("معادلة") || lowerInput.includes("حل") || lowerInput.includes("x")) {
    return `# حل المعادلة

سأساعدك في حل هذه المعادلة خطوة بخطوة.

## الخطوة 1: تحديد نوع المعادلة
أولاً، نحدد نوع المعادلة ونختار الطريقة المناسبة للحل.

## الخطوة 2: تطبيق الحل
نطبق القواعد الرياضية المناسبة.

## الخطوة 3: التحقق
نتحقق من صحة الحل بالتعويض.

---
💡 **ملاحظة:** هذا عرض توضيحي. للحصول على إجابات كاملة، يرجى تفعيل مفتاح OpenAI API.`;
  }

  return `مرحباً! 👋

أنا **مُهم**، مساعدك الذكي للدراسة.

يمكنني مساعدتك في:
- ✅ حل المسائل الرياضية والفيزيائية
- ✅ شرح المفاهيم العلمية
- ✅ تلخيص النصوص
- ✅ كتابة البحوث والتقارير
- ✅ الإجابة على أسئلتك الدراسية

---
⚠️ **ملاحظة:** هذا عرض توضيحي. للحصول على ردود كاملة من الذكاء الاصطناعي، يرجى تكوين مفتاح OpenAI API.

اكتب سؤالك وسأبذل قصارى جهدي لمساعدتك! 🎓`;
}
