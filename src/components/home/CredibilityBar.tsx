import { useTranslations } from "next-intl";

const LANGUAGES = ["ru", "uk", "en", "ka", "tr"] as const;

const STATS = [
  { value: "50+", key: "deals", hasSub: true },
  { value: "3", key: "years", hasSub: false },
  { value: String(LANGUAGES.length), key: "languages", hasSub: false },
] as const;

export function CredibilityBar() {
  const t = useTranslations("credibility");

  return (
    <section className="bg-white border-y border-gray-100">
      <div className="container-site">
        <p className="font-sans text-xs font-semibold uppercase tracking-widest text-center text-gold pt-6 pb-0">
          {t("heading")}
        </p>
        <div className="grid grid-cols-3 divide-x divide-gray-100">
          {STATS.map((stat) => (
            <div
              key={stat.key}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
            >
              <span className="font-serif text-3xl md:text-4xl font-light text-gold">
                {stat.value}
              </span>
              <span className="font-sans text-xs text-gray-400 mt-2 leading-snug max-w-[140px] uppercase tracking-wider">
                {t(stat.key)}
              </span>
              {stat.hasSub && (
                <span className="font-sans text-xs text-gold/70 mt-1 leading-snug max-w-[160px] normal-case">
                  {t("deals_sub")}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
