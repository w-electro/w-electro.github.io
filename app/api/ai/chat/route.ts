import { NextRequest, NextResponse } from "next/server";

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
  let userMessage = "";

  try {
    const body = await req.json();
    const { message, history = [] } = body;
    userMessage = message || "";

    if (!message || typeof message !== "string") {
      return NextResponse.json({
        content: getDemoResponse(""),
        demo: true,
      });
    }

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.log("OPENAI_API_KEY not found in environment variables");
      // Return a demo response if API key is not configured
      return NextResponse.json({
        content: getDemoResponse(message),
        demo: true,
      });
    }

    // Log that we found the key (first 8 chars only for security)
    console.log("OPENAI_API_KEY found:", apiKey.substring(0, 8) + "...");

    // Dynamically import OpenAI only when needed
    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey });

    // Build messages array
    const messages = [
      { role: "system" as const, content: ARABIC_TUTOR_PROMPT },
      ...history.slice(-10).map((msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user" as const, content: message },
    ];

    // Create streaming response
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
          console.error("Streaming error:", error);
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
  } catch (error: unknown) {
    console.error("Chat API error:", error);

    // Return user-friendly error message
    return NextResponse.json({
      content: `# عذراً، الخدمة غير متوفرة حالياً 😔

نعتذر، خدمة الذكاء الاصطناعي غير متاحة في الوقت الحالي.

## في هذه الأثناء، يمكنك:
- 📚 استخدام أدوات الحاسبة والمحولات المتاحة
- 🔍 البحث عن إجابات في محركات البحث
- 📝 تجربة السؤال مرة أخرى لاحقاً

نعمل على حل المشكلة في أقرب وقت. شكراً لصبرك! 🙏`,
      error: true,
    });
  }
}

// Demo response for when API key is not configured
function getDemoResponse(input: string): string {
  const lowerInput = input.toLowerCase();

  // Check for quadratic equations (x² or x^2)
  if (lowerInput.includes("x²") || lowerInput.includes("x^2") || (lowerInput.includes("معادلة") && lowerInput.includes("درجة ثانية"))) {
    return `# حل المعادلة التربيعية 🧮

لحل معادلة من الدرجة الثانية مثل: **ax² + bx + c = 0**

## الطريقة: القانون العام (صيغة الجذور)
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

## خطوات الحل:
1. **تحديد المعاملات**: حدد قيم a و b و c
2. **حساب المميز (Δ)**: $Δ = b² - 4ac$
3. **إيجاد الجذور**: طبق القانون العام

### مثال: x² + 5x + 6 = 0
- a = 1, b = 5, c = 6
- Δ = 25 - 24 = 1
- x₁ = (-5 + 1) / 2 = **-2**
- x₂ = (-5 - 1) / 2 = **-3**

---
⚠️ **وضع تجريبي**: للحصول على حل كامل لمعادلتك المحددة، أضف مفتاح OpenAI API.`;
  }

  if (lowerInput.includes("معادلة") || lowerInput.includes("حل") || lowerInput.includes("x")) {
    return `# حل المعادلة 🧮

سأساعدك في حل هذه المعادلة خطوة بخطوة.

## الخطوة 1: تحديد نوع المعادلة
أولاً، نحدد نوع المعادلة ونختار الطريقة المناسبة للحل.

## الخطوة 2: تطبيق الحل
نطبق القواعد الرياضية المناسبة.

## الخطوة 3: التحقق
نتحقق من صحة الحل بالتعويض.

---
⚠️ **وضع تجريبي**: للحصول على إجابات كاملة، أضف مفتاح OpenAI API.`;
  }

  if (lowerInput.includes("فيثاغورس")) {
    return `# نظرية فيثاغورس

نظرية فيثاغورس هي إحدى أهم النظريات في الهندسة:

> في المثلث القائم الزاوية، مربع طول الوتر يساوي مجموع مربعي طولي الضلعين الآخرين.

## الصيغة الرياضية
$$a² + b² = c²$$

حيث:
- **c** = الوتر (الضلع المقابل للزاوية القائمة)
- **a** و **b** = الضلعان القائمان

---
💡 **ملاحظة:** هذا عرض توضيحي. للحصول على شرح كامل، يرجى تفعيل مفتاح OpenAI API.`;
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
⚠️ **ملاحظة:** هذا الوضع التجريبي. للحصول على ردود كاملة من الذكاء الاصطناعي، يرجى إضافة مفتاح OpenAI API في إعدادات Vercel.

اكتب سؤالك وسأبذل قصارى جهدي لمساعدتك! 🎓`;
}
