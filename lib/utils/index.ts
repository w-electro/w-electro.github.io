export * from "./cn";

// Format number with Arabic numerals
export function formatArabicNumber(num: number): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return num
    .toString()
    .split("")
    .map((digit) => arabicNumerals[parseInt(digit)] || digit)
    .join("");
}

// Format price in SAR
export function formatPrice(amount: number, showCurrency = true): string {
  const formatted = new Intl.NumberFormat("ar-SA", {
    style: showCurrency ? "currency" : "decimal",
    currency: "SAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  return formatted;
}

// Format relative time in Arabic
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  const intervals = [
    { label: "سنة", seconds: 31536000 },
    { label: "شهر", seconds: 2592000 },
    { label: "أسبوع", seconds: 604800 },
    { label: "يوم", seconds: 86400 },
    { label: "ساعة", seconds: 3600 },
    { label: "دقيقة", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      if (count === 1) return `منذ ${interval.label}`;
      if (count === 2) return `منذ ${interval.label}ين`;
      if (count <= 10) return `منذ ${count} ${interval.label}ات`;
      return `منذ ${count} ${interval.label}`;
    }
  }

  return "الآن";
}

// Truncate text with ellipsis
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

// Generate initials from name
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Validate Saudi phone number
export function isValidSaudiPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return /^(966|0)?5\d{8}$/.test(cleaned);
}

// Format Saudi phone number
export function formatSaudiPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("966")) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  if (cleaned.startsWith("0")) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  return phone;
}

// Sleep utility
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Check if we're on the client side
export const isClient = typeof window !== "undefined";

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!isClient) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// Download file
export function downloadFile(content: string, filename: string, mimeType = "text/plain") {
  if (!isClient) return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
