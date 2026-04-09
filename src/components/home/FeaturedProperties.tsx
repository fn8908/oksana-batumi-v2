"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFeaturedProperties } from "@/lib/properties";
import { PropertyCard } from "@/components/ui/PropertyCard";

export function FeaturedProperties() {
  const t = useTranslations("featured");
  const locale = useLocale();
  const [tab, setTab] = useState<"buy" | "rent">("buy");

  const properties = getFeaturedProperties(tab, 3);

  return (
    <section className="py-20 bg-cream">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="section-title gold-line">{t("title")}</h2>
            <p className="section-subtitle">{t("subtitle")}</p>
          </div>

          {/* Tabs */}
          <div className="flex border border-navy/20 self-start">
            <button
              onClick={() => setTab("buy")}
              className={cn(
                "font-sans text-sm font-semibold px-6 py-2.5 uppercase tracking-wider transition-colors",
                tab === "buy"
                  ? "bg-navy text-white"
                  : "text-navy hover:bg-navy/5"
              )}
            >
              {t("buy_tab")}
            </button>
            <button
              onClick={() => setTab("rent")}
              className={cn(
                "font-sans text-sm font-semibold px-6 py-2.5 uppercase tracking-wider transition-colors border-l border-navy/20",
                tab === "rent"
                  ? "bg-navy text-white"
                  : "text-navy hover:bg-navy/5"
              )}
            >
              {t("rent_tab")}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} locale={locale} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/properties?type=${tab}`}
            className="btn-secondary inline-flex"
          >
            {t("view_all")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
