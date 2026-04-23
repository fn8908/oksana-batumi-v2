import { useTranslations, useLocale } from "next-intl";
import { MessageCircle, Send, MapPin, Clock } from "lucide-react";
import { getWhatsAppLink, getTelegramLink } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты — Оксана Яценко",
  description: "Свяжитесь с Оксаной Яценко — агентом по недвижимости в Батуми. WhatsApp, Telegram, ответ в течение часа.",
};

export default function ContactPage() {
  const t = useTranslations("contact");
  const tf = useTranslations("floating");
  const locale = useLocale();

  const whatsappMsg = tf("whatsapp_message");

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
                <div className="font-sans text-sm text-navy/50 mt-1">{t("subtitle")}</div>
              </div>
              <div className="text-navy/30 group-hover:text-gold transition-colors">→</div>
            </a>

            {/* Telegram */}
            <a
              href={getTelegramLink()}
              target="_blank"
              rel="noopener noreferrer"
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
                <div className="font-sans text-sm text-navy/50 mt-1">{t("subtitle")}</div>
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
                  {locale === "ru" ? "Местонахождение" :
                   locale === "uk" ? "Місцезнаходження" :
                   locale === "ka" ? "მდებარეობა" :
                   locale === "tr" ? "Konum" :
                   locale === "he" ? "מיקום" :
                   "Location"}
                </div>
                <div className="font-serif text-2xl text-navy">Батуми, Грузия</div>
                <div className="font-sans text-sm text-navy/50 mt-1">
                  {locale === "ru" ? "Работаю по всему Батуми и Аджарии" :
                   locale === "uk" ? "Працюю по всьому Батумі та Аджарії" :
                   locale === "ka" ? "ვმუშაობ მთელ ბათუმსა და აჭარაში" :
                   locale === "tr" ? "Batum ve Acara genelinde çalışıyorum" :
                   locale === "he" ? "עובדת בכל בטומי ואג'ריה" :
                   "Working across Batumi and Adjara"}
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
            <h2 className="font-serif text-3xl mb-3">
              {locale === "ru" ? "Напишите прямо сейчас" :
               locale === "uk" ? "Напишіть просто зараз" :
               locale === "ka" ? "დაწერეთ ახლავე" :
               locale === "tr" ? "Hemen yazın" :
               locale === "he" ? "כתבו עכשיו" :
               "Write right now"}
            </h2>
            <p className="font-sans text-white/60 mb-8 text-sm">
              {locale === "ru" ? "Укажите, что вас интересует — подберу варианты" :
               locale === "uk" ? "Вкажіть, що вас цікавить — підберу варіанти" :
               locale === "ka" ? "მითხარით, რა გაინტერესებთ — ვარიანტებს შემოგთავაზებ" :
               locale === "tr" ? "Ne aradığınızı söyleyin — seçenekler bulurum" :
               locale === "he" ? "ספרו מה אתם מחפשים — אמצא אפשרויות" :
               "Tell me what you're looking for — I'll find options"}
            </p>
            <a
              href={getWhatsAppLink(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
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
