"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Calendar, Shield } from "lucide-react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-orange-50 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">جاري التحميل...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-orange-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-full mb-6">
              <User className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-orange-500">
              الملف الشخصي
            </h1>
            <p className="text-gray-600 text-lg">معلوماتك وإعداداتك</p>
          </div>

          <div className="grid gap-6">
            {/* User Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الشخصية</CardTitle>
                <CardDescription>بياناتك الأساسية في المنصة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">الاسم</p>
                    <p className="font-semibold text-gray-900">
                      {user.user_metadata?.full_name || "غير محدد"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">البريد الإلكتروني</p>
                    <p className="font-semibold text-gray-900 break-all">{user.email}</p>
                    {user.email_confirmed_at && (
                      <p className="text-xs text-green-600 mt-1">✓ البريد مؤكد</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">تاريخ التسجيل</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(user.created_at)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">معرّف المستخدم</p>
                    <p className="font-mono text-sm text-gray-600 break-all">{user.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>نشاطك</CardTitle>
                <CardDescription>إحصائيات استخدامك للمنصة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-cyan-600">قريباً</p>
                    <p className="text-sm text-gray-600 mt-1">الأدوات المستخدمة</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-orange-600">قريباً</p>
                    <p className="text-sm text-gray-600 mt-1">المحادثات مع AI</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-purple-600">قريباً</p>
                    <p className="text-sm text-gray-600 mt-1">الملفات المحفوظة</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Notice */}
            <Card className="bg-gradient-to-r from-cyan-50 to-orange-50 border-cyan-200">
              <CardContent className="p-6">
                <p className="text-sm text-gray-700 text-center">
                  💡 نعمل على إضافة المزيد من الميزات لملفك الشخصي قريباً! ستتمكن من تحديث معلوماتك، وحفظ الملفات، وتتبع نشاطك.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
