"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface ToolNavigationProps {
  tools: ToolLink[];
  category: string;
}

export function ToolNavigation({ tools, category }: ToolNavigationProps) {
  const pathname = usePathname();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
      <h3 className="text-sm font-semibold text-gray-500 mb-3">أدوات {category}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {tools.map((tool) => {
          const isActive = pathname === tool.href;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-gradient-to-r from-cyan-500 to-orange-500 text-white shadow-md"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-cyan-600"
              )}
            >
              <tool.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tool.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
