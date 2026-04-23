import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
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

const BASE_URL = "https://www.oksana-batumi.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const siteTitle = t("default_title"); // i18n-dup-ok: used for both title and og:site_name

  const hdrs = await headers();
  const pathname = hdrs.get("x-pathname") ?? `/${locale}`;
  const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "") || "";

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${BASE_URL}/${l}${pathWithoutLocale}`])
  );

  return {
    title: {
      default: siteTitle,
      template: t("template"),
    },
    description: t("default_desc"),
    openGraph: {
      type: "website",
      locale,
      siteName: siteTitle,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}${pathWithoutLocale}`,
      languages,
    },
  };
}

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
