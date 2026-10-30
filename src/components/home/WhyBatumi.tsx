import { useTranslations } from "next-intl";
import { TrendingUp, Globe, FileCheck, Percent, Users } from "lucide-react";

const ICONS = [TrendingUp, Globe, FileCheck, Percent, Users];

export function WhyBatumi() {
  const t = useTranslations("why_batumi");
  const keys = ["tax", "foreigners", "registry", "yield", "tourism"] as const;

  return (
    <section className="py-20 bg-ink-900">
      <div className="container-site">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold">
              Батуми
            </span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-ivory mb-4">{t("title")}</h2>
          <p className="font-sans text-ivory/50 text-base max-w-lg mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {keys.map((key, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={key}
                className="glass-card text-center group p-8 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full border border-gold/40 group-hover:border-gold shadow-[0_0_20px_-6px_rgba(212,175,98,0.7)] flex items-center justify-center mx-auto mb-5 transition-colors">
                  <Icon size={20} className="text-gold transition-colors" />
                </div>
                <h3 className="font-serif text-lg text-ivory group-hover:text-gold mb-2 transition-colors">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="font-sans text-sm text-ivory/60 leading-relaxed transition-colors">
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
