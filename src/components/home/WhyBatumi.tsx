import { useTranslations } from "next-intl";
import { TrendingUp, Globe, FileCheck, Percent, Users } from "lucide-react";

const ICONS = [TrendingUp, Globe, FileCheck, Percent, Users];

export function WhyBatumi() {
  const t = useTranslations("why_batumi");
  const keys = ["tax", "foreigners", "registry", "yield", "tourism"] as const;

  return (
    <section className="py-20 bg-[#F8F7F5]">
      <div className="container-site">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold">
              Батуми
            </span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4">{t("title")}</h2>
          <p className="font-sans text-gray-400 text-base max-w-lg mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-gray-200">
          {keys.map((key, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={key}
                className="text-center group bg-white p-8 hover:bg-gold transition-colors duration-300"
              >
                <div className="w-12 h-12 border border-gray-200 group-hover:border-white/30 flex items-center justify-center mx-auto mb-5 transition-colors">
                  <Icon size={20} className="text-gold group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-lg text-[#1A1A1A] group-hover:text-white mb-2 transition-colors">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="font-sans text-sm text-gray-600 group-hover:text-white/70 leading-relaxed transition-colors">
                  {t(`items.${key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
