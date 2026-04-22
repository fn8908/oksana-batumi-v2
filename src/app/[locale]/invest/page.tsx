import { useTranslations } from "next-intl";
import { MessageCircle, CheckCircle, TrendingUp } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Инвесторам — недвижимость в Батуми",
  description: "Как купить недвижимость в Батуми для инвестиций. Доходность, процесс покупки, юридическое сопровождение.",
};

export default function InvestPage() {
  const t = useTranslations("invest");
  const tw = useTranslations("why_batumi");
  const tf = useTranslations("floating");

  const whatsappMsg = tf("whatsapp_message");

  const steps = [
    { num: "01", title: t("step1_title"), desc: t("step1_desc") },
    { num: "02", title: t("step2_title"), desc: t("step2_desc") },
    { num: "03", title: t("step3_title"), desc: t("step3_desc") },
    { num: "04", title: t("step4_title"), desc: t("step4_desc") },
    { num: "05", title: t("step5_title"), desc: t("step5_desc") },
  ];

  const yields = [
    { value: t("yield1_value"), label: t("yield1_label") },
    { value: t("yield2_value"), label: t("yield2_label") },
    { value: t("yield3_value"), label: t("yield3_label") },
  ];

  const whyItems = [
    { title: tw("items.tax.title"), desc: tw("items.tax.desc") },
    { title: tw("items.foreigners.title"), desc: tw("items.foreigners.desc") },
    { title: tw("items.registry.title"), desc: tw("items.registry.desc") },
    { title: tw("items.yield.title"), desc: tw("items.yield.desc") },
    { title: tw("items.tourism.title"), desc: tw("items.tourism.desc") },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative text-white py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-batumi-panorama.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/50" />
        <div className="relative z-10 container-site">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold">
                {t("hero_title")}
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">
              {t("hero_title")}
            </h1>
            <p className="font-sans text-white/60 text-lg leading-relaxed max-w-2xl">
              {t("hero_subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Yield stats */}
      <section className="bg-gold">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
            {yields.map((y, i) => (
              <div key={i} className="py-10 px-8 text-center">
                <div className="font-serif text-4xl text-white font-semibold mb-2">{y.value}</div>
                <div className="font-sans text-xs text-white/80 uppercase tracking-widest">{y.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="container-site">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl text-navy mb-4 gold-line inline-block">
              {t("steps_title")}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-0">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-navy flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors">
                    <span className="font-sans text-xs font-bold text-white tracking-wider">{step.num}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-navy/10 my-2" />
                  )}
                </div>
                <div className={`pb-10 ${i === steps.length - 1 ? "" : ""}`}>
                  <h3 className="font-serif text-xl text-navy mb-2 mt-2.5">{step.title}</h3>
                  <p className="font-sans text-sm text-navy/60 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Batumi */}
      <section className="py-20 bg-cream">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-navy mb-4 gold-line inline-block">
              {tw("title")}
            </h2>
            <p className="font-sans text-navy/50 text-sm mt-4">{tw("subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {whyItems.map((item, i) => (
              <div key={i} className="bg-white border border-navy/10 p-6 hover:border-gold transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-serif text-xl text-navy mb-2 font-semibold">{item.title}</div>
                    <p className="font-sans text-sm text-navy/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yield details */}
      <section className="py-20 bg-navy text-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-white mb-4">{t("yield_title")}</h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {yields.map((y, i) => (
              <div key={i} className="border border-white/10 p-8 text-center hover:border-gold/50 transition-colors">
                <div className="font-serif text-4xl text-gold mb-3">{y.value}</div>
                <div className="font-sans text-sm text-white/60 uppercase tracking-wider">{y.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream">
        <div className="container-site text-center">
          <h2 className="font-serif text-4xl text-navy mb-4">{t("cta_title")}</h2>
          <p className="font-sans text-navy/60 mb-8 max-w-md mx-auto">{t("cta_text")}</p>
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
      </section>
    </div>
  );
}
