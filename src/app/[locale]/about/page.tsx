import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { MessageCircle, CheckCircle, Send } from "lucide-react";
import { getWhatsAppLink, getTelegramLink } from "@/lib/utils";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("meta_title"), description: t("meta_desc") };
}

export default function AboutPage() {
  const t = useTranslations("about");
  const tf = useTranslations("floating");
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-batumi-panorama.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/50" />
        <div className="relative z-10 container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-px bg-gold" />
                <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold">
                  {t("subtitle")}
                </span>
              </div>
              <h1 className="font-serif text-5xl text-white mb-6 gold-line">{t("title")}</h1>
              <p className="font-sans text-white/60 text-base leading-relaxed max-w-md">
                {t("story")}
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href={getWhatsAppLink(tf("whatsapp_message"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex"
                >
                  <MessageCircle size={16} />
                  {t("cta")}
                </a>
                <a
                  href={getTelegramLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex"
                >
                  <Send size={16} />
                  {t("cta_telegram")}
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] relative overflow-hidden max-w-xs sm:max-w-sm mx-auto">
                <Image
                  src="/images/oksana-about.png"
                  alt="Оксана Яценко — риэлтор в Батуми"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 400px"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-2/3 h-2/3 border border-gold/30 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-cream border-b border-navy/10">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-navy/10">
            {[
              { value: "50+", label: t("stat_deals") },
              { value: "$15M+", label: t("stat_volume") },
              { value: "3+", label: t("stat_years") },
              { value: "5", label: t("stat_languages") },
            ].map((s) => (
              <div key={s.label} className="py-10 px-6 text-center">
                <div className="font-serif text-4xl text-gold font-semibold">{s.value}</div>
                <div className="font-sans text-xs text-navy/50 mt-2 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + Approach */}
      <section className="py-20 bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Story */}
            <div>
              <h2 className="font-serif text-3xl text-navy mb-6 gold-line">{t("story_title")}</h2>
              <p className="font-sans text-navy/70 leading-relaxed mb-4">{t("story_p1")}</p>
              <p className="font-sans text-navy/70 leading-relaxed mb-4">{t("story_p2")}</p>
              <p className="font-sans text-navy/70 leading-relaxed">{t("story_p3")}</p>
            </div>

            {/* Approach */}
            <div>
              <h2 className="font-serif text-3xl text-navy mb-6 gold-line">{t("approach_title")}</h2>
              <div className="space-y-4">
                {([
                  t("approach_1"),
                  t("approach_2"),
                  t("approach_3"),
                  t("approach_4"),
                  t("approach_5"),
                  t("approach_6"),
                ]).map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className="font-sans text-sm text-navy/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream">
        <div className="container-site text-center">
          <h3 className="font-serif text-3xl text-navy mb-4">{t("cta_bottom_title")}</h3>
          <p className="font-sans text-navy/60 mb-8 max-w-md mx-auto">
            {t("cta_bottom_text")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={getWhatsAppLink(tf("whatsapp_message"))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              <MessageCircle size={16} />
              {t("cta_bottom_btn")}
            </a>
            <a
              href={getTelegramLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex"
            >
              <Send size={16} />
              {t("cta_telegram")}{/* i18n-dup-ok: desktop/mobile CTA */}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
