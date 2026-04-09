import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContacts } from "@/components/layout/FloatingContacts";
import { ChatWidget } from "@/components/ui/ChatWidget";

type Locale = "ru" | "uk" | "en" | "ka" | "tr" | "he";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: "Оксана Яценко | Недвижимость в Батуми",
    template: "%s | Оксана Яценко",
  },
  description:
    "Профессиональный агент по недвижимости в Батуми, Грузия. Купля, продажа и аренда квартир. Честно. Прозрачно. С заботой о вас.",
  keywords: ["недвижимость Батуми", "купить квартиру Батуми", "аренда Батуми", "риэлтор Батуми", "Яценко Оксана"],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Оксана Яценко | Недвижимость в Батуми",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "he" ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingContacts />
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
