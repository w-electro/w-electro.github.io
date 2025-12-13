import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0891b2" },
    { media: "(prefers-color-scheme: dark)", color: "#0e7490" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "نجاح | منصة الطلاب الذكية في السعودية",
    template: "%s | نجاح",
  },
  description:
    "منصة نجاح - رفيقك الذكي في رحلة النجاح الأكاديمي. أدوات مجانية، مساعد ذكي بالذكاء الاصطناعي، خدمات طلابية احترافية. استخراج نصوص OCR، أدوات PDF، مولد QR والمزيد.",
  keywords: [
    "خدمات طلابية",
    "مساعد ذكي",
    "ذكاء اصطناعي",
    "OCR",
    "استخراج نصوص",
    "أدوات PDF",
    "مشاريع تخرج",
    "بحوث جامعية",
    "السعودية",
    "طلاب جامعة",
  ],
  authors: [{ name: "نجاح", url: "https://www.w-electro.com" }],
  creator: "نجاح - Najah Platform",
  publisher: "نجاح",
  metadataBase: new URL("https://www.w-electro.com"),
  alternates: {
    canonical: "/",
    languages: {
      "ar-SA": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://www.w-electro.com",
    siteName: "نجاح",
    title: "نجاح | منصة الطلاب الذكية في السعودية",
    description:
      "رفيقك الذكي في رحلة النجاح الأكاديمي - أدوات مجانية ومساعد ذكي بالذكاء الاصطناعي",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "نجاح - منصة الطلاب الذكية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "نجاح | منصة الطلاب الذكية في السعودية",
    description:
      "رفيقك الذكي في رحلة النجاح الأكاديمي - أدوات مجانية ومساعد ذكي بالذكاء الاصطناعي",
    images: ["/og-image.png"],
    creator: "@WFor_ES",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/Najah.webp",
    shortcut: "/Najah.webp",
    apple: "/Najah.webp",
  },
  manifest: "/manifest.json",
  category: "education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${cairo.variable} font-sans antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-center" richColors closeButton />
          </ThemeProvider>
        </AuthProvider>

        {/* Analytics - loaded after hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                setTimeout(function() {
                  // Google Analytics
                  if ('${process.env.NEXT_PUBLIC_GA_ID}') {
                    var script = document.createElement('script');
                    script.async = true;
                    script.src = 'https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}';
                    document.head.appendChild(script);
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    window.gtag = gtag;
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                  }

                  // Microsoft Clarity
                  if ('${process.env.NEXT_PUBLIC_CLARITY_ID}') {
                    (function(c,l,a,r,i,t,y){
                      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+'${process.env.NEXT_PUBLIC_CLARITY_ID}';
                      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window,document,"clarity","script");
                  }
                }, 2000);
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
