import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, locale: string = "ru"): string {
  return new Intl.NumberFormat(locale === "ru" ? "ru-RU" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export const WHATSAPP_NUMBER = "995591025632";
export const TELEGRAM_USERNAME = "Oksana_Iatsenko";
export const INSTAGRAM_URL = "https://www.instagram.com/oks.iatsenko";
export const YOUTUBE_URL = "https://www.youtube.com/@Oksana_Iatsenko";

export function getWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function getTelegramLink(): string {
  return `https://t.me/${TELEGRAM_USERNAME}`;
}
