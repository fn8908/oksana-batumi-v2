"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { cn, getWhatsAppLink } from "@/lib/utils";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  ru: "RU",
  uk: "UA",
  en: "EN",
  ka: "GE",
  tr: "TR",
  he: "HE",
};

const LOCALE_NAMES: Record<string, string> = {
  ru: "Русский",
  uk: "Українська",
  en: "English",
  ka: "ქართული",
  tr: "Türkçe",
  he: "עברית",
};

export function Header() {
  const t = useTranslations("nav");
  const tf = useTranslations("floating");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [pathname]);

  function switchLocale(newLocale: string) {
    // Replace current locale prefix in pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setLangOpen(false);
  }

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/properties`, label: t("properties") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/invest`, label: t("invest") },
    { href: `/${locale}/batumi`, label: t("batumi") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const whatsappMsg = tf("whatsapp_message");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-white/95 backdrop-blur-sm",
        scrolled ? "shadow-sm" : "shadow-none"
      )}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex flex-col leading-none group"
          >
            <span className="font-serif text-xl font-semibold tracking-tight text-navy transition-colors">
              Оксана Яценко
            </span>
            <span className="font-sans text-xs tracking-widest uppercase text-gold transition-colors">
              Batumi Real Estate
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans text-sm font-medium text-navy transition-colors hover:text-gold",
                  pathname === link.href && "text-gold"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Lang + CTA */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 font-sans text-sm font-medium text-navy transition-colors hover:text-gold"
              >
                {LOCALE_LABELS[locale]}
                <ChevronDown
                  size={14}
                  className={cn("transition-transform", langOpen && "rotate-180")}
                />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white shadow-lg border border-cream-100 py-1 min-w-[140px]">
                  {routing.locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={cn(
                        "w-full text-left px-4 py-2 font-sans text-sm hover:bg-cream transition-colors",
                        loc === locale ? "text-gold font-semibold" : "text-navy"
                      )}
                    >
                      {LOCALE_NAMES[loc]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={getWhatsAppLink(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-gold text-white font-sans text-xs font-semibold px-4 py-2.5 uppercase tracking-wider hover:bg-gold-600 transition-colors"
            >
              <MessageCircle size={14} />
              {t("cta")}
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-navy transition-colors hover:text-gold"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-cream-100 shadow-lg">
          <div className="container-site py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans text-base font-medium py-3 border-b border-cream-100 text-navy hover:text-gold transition-colors",
                  pathname === link.href && "text-gold"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Language switcher mobile */}
            <div className="flex gap-2 pt-4 flex-wrap">
              {routing.locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={cn(
                    "font-sans text-sm px-3 py-1.5 border transition-colors",
                    loc === locale
                      ? "bg-navy text-white border-navy"
                      : "border-navy-200 text-navy hover:border-navy"
                  )}
                >
                  {LOCALE_LABELS[loc]}
                </button>
              ))}
            </div>

            <a
              href={getWhatsAppLink(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 btn-primary justify-center"
            >
              <MessageCircle size={16} />
              {t("cta")}{/* i18n-dup-ok: desktop/mobile nav */} WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
