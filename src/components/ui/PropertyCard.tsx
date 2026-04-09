"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Waves, Building2, Flame, CheckCircle } from "lucide-react";
import { cn, formatPrice, getWhatsAppLink } from "@/lib/utils";
import type { Property } from "@/lib/properties";

interface PropertyCardProps {
  property: Property;
  locale: string;
}

export function PropertyCard({ property, locale }: PropertyCardProps) {
  const t = useTranslations("featured");
  const loc = locale as keyof Property["title"];

  const title = property.title[loc] ?? property.title.ru;
  const district = property.districtLabel[loc] ?? property.districtLabel.ru;

  const waMessage = `Здравствуйте! Интересует объект: ${property.title.ru}. Хочу узнать подробности.`;

  return (
    <div className="property-card group">
      {/* Image */}
      <Link href={`/${locale}/properties/${property.slug}`} className="block relative overflow-hidden aspect-[4/3]">
        <Image
          src={property.image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {property.isHot && (
            <span className="flex items-center gap-1 bg-red-500 text-white font-sans text-xs font-semibold px-2 py-0.5">
              <Flame size={10} />
              {t("hot")}
            </span>
          )}
          {property.seaView && (
            <span className="flex items-center gap-1 bg-navy text-white font-sans text-xs font-semibold px-2 py-0.5">
              <Waves size={10} />
              {t("sea_view")}
            </span>
          )}
          {property.isNewBuild && (
            <span className="flex items-center gap-1 bg-gold text-white font-sans text-xs font-semibold px-2 py-0.5">
              <Building2 size={10} />
              {t("new_build")}
            </span>
          )}
          {property.isReady && (
            <span className="flex items-center gap-1 bg-green-600 text-white font-sans text-xs font-semibold px-2 py-0.5">
              <CheckCircle size={10} />
              {t("ready")}
            </span>
          )}
        </div>
        {/* Yield badge */}
        {property.yield && (
          <div className="absolute top-3 right-3 bg-navy/90 text-gold font-sans text-xs font-semibold px-2 py-0.5">
            ~{property.yield}% / год
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <p className="font-sans text-xs text-gold uppercase tracking-wider mb-1">
          {district}
        </p>
        <h3 className="font-serif text-lg text-navy leading-snug mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Stats row */}
        <div className="flex items-center gap-3 font-sans text-xs text-navy/60 mb-4">
          <span>{property.area} {t("sqm")}</span>
          <span className="w-px h-3 bg-navy/20" />
          <span>{property.rooms} {t("rooms")}</span>
          <span className="w-px h-3 bg-navy/20" />
          <span>{property.floor}/{property.totalFloors} {t("floor")}</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-serif text-xl font-semibold text-navy">
              {formatPrice(property.price)}
              {property.type === "rent" && (
                <span className="font-sans text-xs text-navy/50 font-normal ml-1">
                  {t("monthly" as never) ?? "/мес"}
                </span>
              )}
            </div>
            {property.pricePerSqm && (
              <div className="font-sans text-xs text-navy/50">
                {formatPrice(property.pricePerSqm)} {t("per_sqm" as never) ?? "за м²"}
              </div>
            )}
          </div>
          <a
            href={getWhatsAppLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-1.5 bg-[#25D366] text-white font-sans text-xs font-semibold px-3 py-2 hover:bg-[#1ebe5a] transition-colors"
            )}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t("ask_whatsapp")}
          </a>
        </div>
      </div>
    </div>
  );
}
