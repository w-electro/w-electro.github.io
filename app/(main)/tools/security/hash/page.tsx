"use client";

import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ToolNavigation } from "@/components/tools/ToolNavigation";
import { Hash, Copy, Check, Key, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const securityTools = [
  { name: "كلمات المرور", href: "/tools/security/password", icon: Key },
  { name: "Hash", href: "/tools/security/hash", icon: Hash },
  { name: "تشفير", href: "/tools/security/encode", icon: Lock },
];

type HashType = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<HashType, string>>({
    'MD5': '',
    'SHA-1': '',
    'SHA-256': '',
    'SHA-384': '',
    'SHA-512': '',
  });
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const generateHashes = async () => {
    if (!input) return;

    setIsProcessing(true);

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);

      const results: Record<HashType, string> = {
        'MD5': '',
        'SHA-1': '',
        'SHA-256': '',
        'SHA-384': '',
        'SHA-512': '',
      };

      // MD5 (using a simple implementation since Web Crypto doesn't support it)
      results['MD5'] = await md5(input);

      // SHA hashes using Web Crypto API
      const sha1 = await crypto.subtle.digest('SHA-1', data);
      results['SHA-1'] = arrayBufferToHex(sha1);

      const sha256 = await crypto.subtle.digest('SHA-256', data);
      results['SHA-256'] = arrayBufferToHex(sha256);

      const sha384 = await crypto.subtle.digest('SHA-384', data);
      results['SHA-384'] = arrayBufferToHex(sha384);

      const sha512 = await crypto.subtle.digest('SHA-512', data);
      results['SHA-512'] = arrayBufferToHex(sha512);

      setHashes(results);
    } catch (error) {
      console.error('Hash generation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const arrayBufferToHex = (buffer: ArrayBuffer): string => {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  // Simple MD5 implementation
  const md5 = async (str: string): Promise<string> => {
    const md5Module = await import('crypto-js/md5');
    return md5Module.default(str).toString();
  };

  const copyHash = async (hashType: HashType) => {
    const hash = hashes[hashType];
    if (!hash) return;

    try {
      await navigator.clipboard.writeText(hash);
      setCopiedHash(hashType);
      setTimeout(() => setCopiedHash(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const hashTypes: HashType[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
              <Hash className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              مولد Hash
            </h1>
            <p className="text-gray-600 text-lg">حول النصوص إلى تشفيرات Hash مختلفة</p>
          </div>

          <ToolNavigation tools={securityTools} category="الأمان" />

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Input */}
                <div>
                  <Label htmlFor="input">النص المراد تشفيره</Label>
                  <Textarea
                    id="input"
                    placeholder="أدخل النص هنا..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={generateHashes}
                  disabled={!input || isProcessing}
                >
                  <Hash className="ml-2 h-5 w-5" />
                  {isProcessing ? "جاري التحويل..." : "تحويل إلى Hash"}
                </Button>

                {/* Results */}
                {Object.values(hashes).some(h => h) && (
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold">النتائج:</h3>
                    {hashTypes.map((type) => (
                      <div key={type} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-purple-600">{type}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyHash(type)}
                            disabled={!hashes[type]}
                          >
                            {copiedHash === type ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <p className="font-mono text-sm break-all text-gray-700" dir="ltr">
                          {hashes[type] || '-'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">ما هو Hash؟</h2>
              <p className="text-gray-700 mb-4">
                Hash هو تحويل أي نص إلى سلسلة ثابتة الطول من الأحرف والأرقام. يُستخدم للتحقق من سلامة البيانات وتخزين كلمات المرور بشكل آمن.
              </p>
              <div className="grid gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold">MD5:</span>
                  <span className="text-gray-600 mr-2">32 حرف - سريع لكن غير آمن للتشفير</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold">SHA-256:</span>
                  <span className="text-gray-600 mr-2">64 حرف - الأكثر استخداماً وأماناً</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold">SHA-512:</span>
                  <span className="text-gray-600 mr-2">128 حرف - أعلى مستوى من الأمان</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
