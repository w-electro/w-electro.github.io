"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function ElectronicServicesRedirect() {
  useEffect(() => {
    // Redirect to main project's electronic services page
    window.location.href = "https://www.w-electro.com/electronic-services.html";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-orange-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-cyan-600" />
        <p className="text-lg text-gray-600">جاري التحويل إلى صفحة الخدمات الإلكترونية...</p>
      </div>
    </div>
  );
}
