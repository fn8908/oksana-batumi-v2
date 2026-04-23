import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { MessageCircle, Send, MapPin, Clock } from "lucide-react";
import { getWhatsAppLink, getTelegramLink } from "@/lib/utils";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("meta_title"), description: t("meta_desc") };
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const tf = useTranslations("floating");

  const whatsappMsg = tf("whatsapp_message");
  const whatsappAria = t("whatsapp_aria");
  const telegramAria = t("telegram_aria");

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-navy text-white py-20">
        <div className="container-site text-center">
          <h1 className="font-serif text-5xl text-white mb-4 gold-line">{t("title")}</h1>
          <p className="font-sans text-white/60 text-lg flex items-center justify-center gap-2">
            <Clock size={16} className="text-gold" />
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-cream">
        <div className="container-site">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* WhatsApp */}
            <a
              href={getWhatsAppLink(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={whatsappAria}
              className="flex items-center gap-6 bg-white border border-navy/10 p-8 hover:border-gold hover:shadow-lg transition-all group"
            >
              <div className="w-16 h-16 bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <MessageCircle size={28} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="font-sans text-xs font-semibold uppercase tracking-widest text-gold mb-1">
                  WhatsApp
                </div>
                <div className="font-serif text-2xl text-navy">+995 591 025 632</div>
                <div className="font-sans text-sm text-navy/50 mt-1">{t("whatsapp_desc")}</div>
              </div>
              <div className="text-navy/30 group-hover:text-gold transition-colors">→</div>
            </a>

            {/* Telegram */}
            <a
              href={getTelegramLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={telegramAria}
              className="flex items-center gap-6 bg-white border border-navy/10 p-8 hover:border-gold hover:shadow-lg transition-all group"
            >
              <div className="w-16 h-16 bg-[#229ED9] flex items-center justify-center flex-shrink-0">
                <Send size={28} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="font-sans text-xs font-semibold uppercase tracking-widest text-gold mb-1">
                  Telegram
                </div>
                <div className="font-serif text-2xl text-navy">@Oksana_Iatsenko</div>
                <div className="font-sans text-sm text-navy/50 mt-1">{t("telegram_desc")}</div>
              </div>
              <div className="text-navy/30 group-hover:text-gold transition-colors">→</div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-6 bg-white border border-navy/10 p-8">
              <div className="w-16 h-16 bg-navy flex items-center justify-center flex-shrink-0">
                <MapPin size={28} className="text-gold" />
              </div>
              <div className="flex-1">
                <div className="font-sans text-xs font-semibold uppercase tracking-widest text-gold mb-1">
                  {t("location_label")}
                </div>
                <div className="font-serif text-2xl text-navy">{t("location_city")}</div>
                <div className="font-sans text-sm text-navy/50 mt-1">
                  {t("location_desc")}
                </div>
              </div>
            </div>
          </div>

          {/* Divider with text */}
          <div className="max-w-2xl mx-auto mt-12 text-center">
            <p className="font-sans text-navy/40 text-sm uppercase tracking-widest">{t("or_directly")}</p>
          </div>

          {/* Quick message via WhatsApp */}
          <div className="max-w-2xl mx-auto mt-8 bg-navy text-white p-10 text-center">
            <h2 className="font-serif text-3xl mb-3">{t("cta_title")}</h2>
            <p className="font-sans text-white/60 mb-8 text-sm">{t("cta_desc")}</p>
            <a
              href={getWhatsAppLink(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={whatsappAria}
              className="btn-primary inline-flex"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
