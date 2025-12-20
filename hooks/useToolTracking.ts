"use client";

import { useEffect, useRef } from "react";
import { trackToolUsage } from "@/lib/activity-tracker";

export function useToolTracking(toolId: string) {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per mount
    if (!hasTracked.current) {
      trackToolUsage(toolId);
      hasTracked.current = true;
    }
  }, [toolId]);
}
