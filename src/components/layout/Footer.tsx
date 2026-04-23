import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Mail, MapPin, Instagram, Send, Youtube } from "lucide-react";
import { getWhatsAppLink, getTelegramLink, INSTAGRAM_URL, YOUTUBE_URL } from "@/lib/utils";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const tf = useTranslations("floating");
  const locale = useLocale();

  const year = new Date().getFullYear();

  const navLinks = [
    { href: `/${locale}/properties`, label: tn("properties") },
    { href: `/${locale}/about`, label: tn("about") },
    { href: `/${locale}/invest`, label: tn("invest") },
    { href: `/${locale}/batumi`, label: tn("batumi") },
    { href: `/${locale}/blog`, label: tn("blog") },
    { href: `/${locale}/contact`, label: tn("contact") },
  ];

  return (
    <footer className="bg-navy text-white">
      {/* Main footer */}
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="inline-block mb-4">
              <div className="font-serif text-2xl font-semibold text-white">
                Оксана Яценко
              </div>
              <div className="font-sans text-xs tracking-widest uppercase text-gold mt-1">
                Batumi Real Estate
              </div>
            </Link>
            <p className="font-sans text-sm text-white/60 max-w-xs leading-relaxed mt-4">
              {t("tagline")}
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              <a
                href={getWhatsAppLink(tf("whatsapp_message"))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-gold transition-colors"
              >
                {/* WhatsApp icon via SVG */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href={getTelegramLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-gold transition-colors"
              >
                <Send size={14} />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-gold transition-colors"
              >
                <Instagram size={14} />
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-gold transition-colors"
              >
                <Youtube size={14} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-gold mb-6">
              {t("nav_title")}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-gold mb-6">
              {t("contact_title")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-gold mt-0.5 flex-shrink-0" />
                <a
                  href={`tel:${t("phone")}`}
                  className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t("phone")}{/* i18n-dup-ok: same value reused in href + visible text */}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-gold mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${t("email")}`}
                  className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t("email")}{/* i18n-dup-ok: same value reused in href + visible text */}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="font-sans text-sm text-white/60">{t("address")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-site py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-sans text-xs text-white/40">
            © {year} Яценко Оксана. {t("rights")}.
          </p>
          <Link
            href={`/${locale}/privacy`}
            className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            {t("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
