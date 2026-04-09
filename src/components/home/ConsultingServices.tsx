import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { CheckCircle2, Scale, Briefcase, ArrowRight } from "lucide-react";

const CONSULTING_SERVICES = [
  {
    key: "audit",
    icon: CheckCircle2,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80"
  },
  {
    key: "legal",
    icon: Scale,
    image: "https://images.unsplash.com/photo-1521318898602-ecbc66ff144c?w=600&q=80"
  },
  {
    key: "management",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
  },
] as const;

export function ConsultingServices() {
  const t = useTranslations("consulting");
  const locale = useLocale();

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-gold-500" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-500">
                {t("badge")}
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] leading-tight">
              {t("title")}
            </h2>
            <p className="font-sans text-base text-gray-600 mt-3 max-w-2xl">
              {t("subtitle")}
            </p>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 font-sans text-sm text-[#1A1A1A] hover:text-gold-500 transition-colors group flex-shrink-0"
          >
            {t("cta")}
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
          {CONSULTING_SERVICES.map(({ key, icon: Icon, image }) => (
            <Link
              key={key}
              href={`/${locale}/contact`}
              className="group relative bg-white overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${image}')` }}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <Icon size={18} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-serif text-lg text-[#1A1A1A] group-hover:text-gold-500 transition-colors">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="font-sans text-sm text-gray-600 mt-2 leading-relaxed">
                    {t(`items.${key}.desc`)}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-sans text-xs font-semibold text-gold-500">
                    {t(`items.${key}.benefit`)}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-gray-300 group-hover:text-gold-500 group-hover:translate-x-1 transition-all flex-shrink-0"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
