"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AcademicServicesRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main project's academic services page
    window.location.href = "https://www.w-electro.com/academic-services.html";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-orange-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-cyan-600" />
        <p className="text-lg text-gray-600">جاري التحويل إلى صفحة الخدمات الطلابية...</p>
      </div>
    </div>
  );
}
