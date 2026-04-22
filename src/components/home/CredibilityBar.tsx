import { useTranslations } from "next-intl";

const STATS = [
  { value: "50+", key: "deals" },
  { value: "3", key: "years" },
  { value: "5", key: "languages" },
] as const;

export function CredibilityBar() {
  const t = useTranslations("credibility");

  return (
    <section className="bg-white border-y border-gray-100">
      <div className="container-site">
        <div className="grid grid-cols-3 divide-x divide-gray-100">
          {STATS.map((stat) => (
            <div
              key={stat.key}
              className="flex flex-col items-center justify-center py-10 px-4 text-center"
            >
              <span className="font-serif text-3xl md:text-4xl font-light text-gold">
                {stat.value}
              </span>
              <span className="font-sans text-xs text-gray-400 mt-2 leading-snug max-w-[120px] uppercase tracking-wider">
                {t(stat.key)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
