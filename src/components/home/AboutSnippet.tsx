import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Award, Users, MapPin } from "lucide-react";

export function AboutSnippet() {
  const t = useTranslations("about_snippet");
  const locale = useLocale();

  return (
    <section className="py-20 bg-[#F8F7F5]">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image column */}
          <div className="relative">
            {/* Main photo */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
              <Image
                src="/images/hero-oksana.png"
                alt="Яценко Оксана — агент по недвижимости в Батуми"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 45vw"
                priority
              />
            </div>
            {/* Gold accent frame */}
            <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border-2 border-gold -z-10" />
            {/* Floating stats card */}
            <div className="absolute -bottom-6 left-6 bg-[#1A1A1A] text-white px-6 py-4 shadow-xl">
              <div className="font-serif text-3xl font-semibold text-gold">3+</div>
              <div className="font-sans text-xs text-white/70 mt-0.5 uppercase tracking-wider">
                {t("years_label")}
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="lg:pl-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold">
                {t("name")}
              </span>
            </div>
            <h2 className="section-title mb-6">{t("title")}</h2>
            <p className="font-sans text-base text-navy/70 leading-relaxed mb-8">
              {t("text")}
            </p>

            {/* Feature icons */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cream flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-gold" />
                </div>
                <div>
                  <div className="font-sans font-semibold text-sm text-navy">{t("fact1_title")}</div>
                  <div className="font-sans text-xs text-navy/60 mt-0.5">{t("fact1_desc")}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cream flex items-center justify-center flex-shrink-0">
                  <Users size={18} className="text-gold" />
                </div>
                <div>
                  <div className="font-sans font-semibold text-sm text-navy">{t("fact2_title")}</div>
                  <div className="font-sans text-xs text-navy/60 mt-0.5">{t("fact2_desc")}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cream flex items-center justify-center flex-shrink-0">
                  <Award size={18} className="text-gold" />
                </div>
                <div>
                  <div className="font-sans font-semibold text-sm text-navy">{t("fact3_title")}</div>
                  <div className="font-sans text-xs text-navy/60 mt-0.5">{t("fact3_desc")}</div>
                </div>
              </div>
            </div>

            <Link href={`/${locale}/about`} className="btn-primary inline-flex">
              {t("link")}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
