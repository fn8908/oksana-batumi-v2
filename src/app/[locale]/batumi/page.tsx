import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { MessageCircle, TrendingUp, Users, Building2, MapPin } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "batumi" });
  return { title: t("meta_title"), description: t("meta_desc") };
}

export default function BatumiPage() {
  const t = useTranslations("batumi");
  const tw = useTranslations("why_batumi");
  const tf = useTranslations("floating");

  const whatsappMsg = tf("whatsapp_message");

  const facts = [
    { value: t("fact1_value"), label: t("fact1_label"), icon: Users },
    { value: t("fact2_value"), label: t("fact2_label"), icon: TrendingUp },
    { value: t("fact3_value"), label: t("fact3_label"), icon: Building2 },
    { value: t("fact4_value"), label: t("fact4_label"), icon: TrendingUp },
  ];

  const districts = [
    { name: t("d1_name"), desc: t("d1_desc") },
    { name: t("d2_name"), desc: t("d2_desc") },
    { name: t("d3_name"), desc: t("d3_desc") },
    { name: t("d4_name"), desc: t("d4_desc") },
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
      <PageHero
        badge={t("hero_badge")}
        title={t("hero_title")}
        subtitle={t("hero_subtitle")}
        withImage
      />

      {/* Stats */}
      <section className="bg-white border-b border-navy/10">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-navy/10">
            {facts.map((f, i) => (
              <div key={i} className="py-10 px-6 text-center">
                <div className="font-serif text-4xl text-gold font-semibold">{f.value}</div>
                <div className="font-sans text-xs text-navy/50 mt-2 uppercase tracking-wider leading-tight">
                  {f.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City overview */}
      <section className="py-20 bg-cream">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl text-navy mb-6 gold-line">{t("city_title")}</h2>
              <p className="font-sans text-navy/70 leading-relaxed text-base">{t("city_text")}</p>
            </div>
            <div className="bg-navy text-white p-10">
              <div className="font-sans text-xs font-semibold uppercase tracking-widest text-gold mb-6">
                {t("facts_title")}
              </div>
              <div className="space-y-6">
                {facts.map((f, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="font-serif text-3xl text-gold font-semibold w-24 flex-shrink-0">
                      {f.value}
                    </div>
                    <div className="font-sans text-sm text-white/60">{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Districts */}
      <section className="py-20 bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-navy mb-4 gold-line inline-block">
              {t("districts_title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {districts.map((d, i) => (
              <div
                key={i}
                className="flex gap-5 p-8 border border-navy/10 hover:border-gold hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={18} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-navy mb-2">{d.name}</h3>
                  <p className="font-sans text-sm text-navy/60 leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Batumi */}
      <section className="py-20 bg-navy text-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-white mb-4">{t("why_title")}</h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyItems.map((item, i) => (
              <div key={i} className="border border-white/10 p-8 hover:border-gold/50 transition-colors">
                <div className="font-serif text-2xl text-gold mb-3">{item.title}</div>
                <p className="font-sans text-sm text-white/60 leading-relaxed">{item.desc}</p>
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
