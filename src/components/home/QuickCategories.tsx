import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { cn, getWhatsAppLink } from "@/lib/utils";

const CATEGORIES = [
  { key: "purchase", path: "/properties?type=buy", image: "/images/categories/key.jpg", labelTop: false },
  { key: "sale", path: "/contact", image: "/images/categories/pen.jpg", labelTop: true },
  { key: "rent", path: "/properties?type=rent", image: "/images/categories/sofa.jpg", labelTop: false },
  { key: "investment", path: "/invest", image: "/images/categories/hourglass.jpg", labelTop: true },
] as const;

export function QuickCategories() {
  const t = useTranslations("quick_categories");
  const tf = useTranslations("floating");
  const locale = useLocale();

  return (
    <section className="py-12 md:py-16 bg-[linear-gradient(180deg,#0E0C0A_0%,#070D0E_40%,#070D0E_100%)]">
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          {CATEGORIES.map(({ key, path, image, labelTop }) => (
            <Link
              key={key}
              href={`/${locale}${path}`}
              className="group relative aspect-[2.3/1] rounded-[4px] overflow-hidden border border-white/[0.07] bg-[#0B1415] transition-colors duration-500 hover:border-gold/40"
            >
              <div
                className="absolute inset-0 bg-cover bg-right transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                style={{ backgroundImage: `url('${image}')` }}
              />
              {/* Darken the text side so the label always reads */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#070D0E]/70 via-[#070D0E]/10 to-transparent" />
              {/* Warm glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_70%_50%,rgba(212,175,98,0.18),transparent_60%)]" />
              <span
                className={cn(
                  "absolute left-5 md:left-6 font-serif font-semibold uppercase text-[22px] md:text-[26px] lg:text-[19px] xl:text-[22px] leading-none tracking-[0.02em] text-[#F5F1EA] [text-shadow:0_2px_16px_rgba(0,0,0,0.7)]",
                  labelTop ? "top-5 md:top-6" : "bottom-5 md:bottom-6"
                )}
              >
                {t(`items.${key}`)}
              </span>
            </Link>
          ))}
        </div>

        <a
          href={getWhatsAppLink(tf("whatsapp_message"))}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center rounded-[4px] py-5 md:py-6 font-sans text-[13px] md:text-sm font-medium uppercase tracking-[0.12em] text-white bg-[linear-gradient(180deg,#C6AA80_0%,#B89A6E_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 hover:brightness-110 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_40px_-12px_rgba(198,170,128,0.6)]"
        >
          {t("cta")}
        </a>
      </div>
    </section>
  );
}
