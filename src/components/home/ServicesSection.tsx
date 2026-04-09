import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Home, Key, Building2, MapPin, FileText, Tractor, ArrowRight } from "lucide-react";

const SERVICES = [
  { key: "buy", icon: Home, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80" },
  { key: "rent", icon: Key, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80" },
  { key: "newbuild", icon: Building2, image: "/images/newbuild.webp" },
  { key: "land", icon: MapPin, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80" },
  { key: "registration", icon: FileText, image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=600&q=80" },
  { key: "agri", icon: Tractor, image: "/images/agri.jpg" },
] as const;

export function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale();

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold">
                {t("badge")}
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] leading-tight">
              {t("title")}
            </h2>
          </div>
          <Link
            href={`/${locale}/properties`}
            className="inline-flex items-center gap-2 font-sans text-sm text-[#1A1A1A] hover:text-gold transition-colors group flex-shrink-0"
          >
            {t("all_link")}
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
          {SERVICES.map(({ key, icon: Icon, image }) => (
            <Link
              key={key}
              href={key === "buy" || key === "rent" || key === "newbuild"
                ? `/${locale}/properties`
                : `/${locale}/properties`}
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
              <div className="p-5 flex items-center justify-between border-b border-gray-100">
                <div>
                  <h3 className="font-serif text-lg text-[#1A1A1A] group-hover:text-gold transition-colors">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="font-sans text-xs text-gray-400 mt-1 leading-relaxed">
                    {t(`items.${key}.desc`)}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-gray-300 group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0 ml-4"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
