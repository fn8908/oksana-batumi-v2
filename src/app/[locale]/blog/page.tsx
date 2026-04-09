import { useTranslations } from "next-intl";
import { MessageCircle, Instagram, Youtube } from "lucide-react";
import { getWhatsAppLink, INSTAGRAM_URL, YOUTUBE_URL } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог — Оксана Яценко",
  description: "Полезные статьи о рынке недвижимости Батуми: районы, застройщики, доходность, юридические нюансы.",
};

export default function BlogPage() {
  const t = useTranslations("blog");
  const tf = useTranslations("floating");

  const whatsappMsg = tf("whatsapp_message");

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-navy text-white py-24">
        <div className="container-site text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-gold" />
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold">
              {t("title")}
            </span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h1 className="font-serif text-5xl text-white mb-4">{t("title")}</h1>
          <p className="font-sans text-white/60 text-lg">{t("subtitle")}</p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-28 bg-cream">
        <div className="container-site max-w-2xl mx-auto text-center">
          {/* Decorative element */}
          <div className="w-16 h-px bg-gold mx-auto mb-12" />

          <h2 className="font-serif text-4xl text-navy mb-6">{t("coming_title")}</h2>
          <p className="font-sans text-navy/60 leading-relaxed mb-10 text-base">
            {t("coming_text")}
          </p>

          <div className="bg-white border border-navy/10 p-10">
            <p className="font-sans text-sm text-navy/50 mb-8">{t("subscribe_text")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 justify-center"
              >
                <Instagram size={16} />
                {t("instagram_btn")}
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 justify-center"
              >
                <Youtube size={16} />
                {t("youtube_btn")}
              </a>
            </div>
          </div>

          <div className="mt-14 pt-14 border-t border-navy/10">
            <h3 className="font-serif text-2xl text-navy mb-6">{t("cta_title")}</h3>
            <a
              href={getWhatsAppLink(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              <MessageCircle size={16} />
              {t("cta_btn")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
