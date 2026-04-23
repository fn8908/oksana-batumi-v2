"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { SlidersHorizontal, X } from "lucide-react";
import { PROPERTIES, DISTRICTS, type PropertyType, type District } from "@/lib/properties";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { cn } from "@/lib/utils";

const ROOM_OPTIONS = [1, 2, 3, 4];

export default function PropertiesPage() {
  const t = useTranslations("properties");
  const locale = useLocale();

  const [type, setType] = useState<PropertyType | "all">("all");
  const [district, setDistrict] = useState<District | "all">("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rooms, setRooms] = useState<number | "all">("all");
  const [seaView, setSeaView] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      if (type !== "all" && p.type !== type) return false;
      if (district !== "all" && p.district !== district) return false;
      if (minPrice && p.price < Number(minPrice)) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      if (rooms !== "all" && p.rooms !== rooms) return false;
      if (seaView && !p.seaView) return false;
      return true;
    });
  }, [type, district, minPrice, maxPrice, rooms, seaView]);

  function resetFilters() {
    setType("all");
    setDistrict("all");
    setMinPrice("");
    setMaxPrice("");
    setRooms("all");
    setSeaView(false);
  }

  const hasActiveFilters =
    type !== "all" || district !== "all" || minPrice || maxPrice || rooms !== "all" || seaView;

  return (
    <div className="pt-20 min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-navy text-white py-14">
        <div className="container-site">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold">
              {t("badge")}
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-3 gold-line">{t("title")}</h1>
          <p className="font-sans text-white/60 text-base">{t("subtitle")}</p>
        </div>
      </div>

      <div className="container-site py-10">
        {/* Filters bar */}
        <div className="bg-white p-4 md:p-6 mb-8 shadow-sm">
          {/* Mobile toggle */}
          <div className="flex items-center justify-between md:hidden mb-4">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 font-sans text-sm font-medium text-navy"
            >
              <SlidersHorizontal size={16} />
              {t("filters")}
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-gold rounded-full" />
              )}
            </button>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 font-sans text-xs text-navy/50 hover:text-navy"
              >
                <X size={12} />
                {t("reset")}
              </button>
            )}
          </div>

          <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4", !filtersOpen && "hidden md:grid")}>
            {/* Type */}
            <div>
              <label className="font-sans text-xs text-navy/50 uppercase tracking-wider mb-1.5 block">
                {t("filter_type")}
              </label>
              <div className="flex border border-navy/20">
                {(["all", "buy", "rent"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setType(v)}
                    className={cn(
                      "flex-1 font-sans text-xs font-medium py-2 transition-colors",
                      type === v ? "bg-navy text-white" : "text-navy hover:bg-navy/5",
                      v !== "all" && "border-l border-navy/20"
                    )}
                  >
                    {v === "all" ? t("filter_any") : v === "buy" ? t("filter_buy") : t("filter_rent")}
                  </button>
                ))}
              </div>
            </div>

            {/* District */}
            <div>
              <label className="font-sans text-xs text-navy/50 uppercase tracking-wider mb-1.5 block">
                {t("filter_district")}
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value as District | "all")}
                className="w-full border border-navy/20 font-sans text-sm text-navy py-2 px-3 bg-white focus:outline-none focus:border-gold"
              >
                <option value="all">{t("filter_any")}</option>
                {(Object.entries(DISTRICTS) as [District, typeof DISTRICTS[District]][]).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val[locale as keyof typeof val] ?? val.ru}
                  </option>
                ))}
              </select>
            </div>

            {/* Price min */}
            <div>
              <label className="font-sans text-xs text-navy/50 uppercase tracking-wider mb-1.5 block">
                {t("filter_price")} от
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="$ от"
                className="w-full border border-navy/20 font-sans text-sm text-navy py-2 px-3 focus:outline-none focus:border-gold"
              />
            </div>

            {/* Price max */}
            <div>
              <label className="font-sans text-xs text-navy/50 uppercase tracking-wider mb-1.5 block">
                {t("filter_price")} до
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="$ до"
                className="w-full border border-navy/20 font-sans text-sm text-navy py-2 px-3 focus:outline-none focus:border-gold"
              />
            </div>

            {/* Rooms */}
            <div>
              <label className="font-sans text-xs text-navy/50 uppercase tracking-wider mb-1.5 block">
                {t("filter_rooms")}
              </label>
              <div className="flex border border-navy/20">
                <button
                  onClick={() => setRooms("all")}
                  className={cn(
                    "flex-1 font-sans text-xs font-medium py-2 transition-colors",
                    rooms === "all" ? "bg-navy text-white" : "text-navy hover:bg-navy/5"
                  )}
                >
                  {t("filter_any")}
                </button>
                {ROOM_OPTIONS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRooms(r)}
                    className={cn(
                      "flex-1 font-sans text-xs font-medium py-2 border-l border-navy/20 transition-colors",
                      rooms === r ? "bg-navy text-white" : "text-navy hover:bg-navy/5"
                    )}
                  >
                    {r}+
                  </button>
                ))}
              </div>
            </div>

            {/* Sea view */}
            <div>
              <label className="font-sans text-xs text-navy/50 uppercase tracking-wider mb-1.5 block">
                {t("filter_sea_view")}
              </label>
              <button
                onClick={() => setSeaView(!seaView)}
                className={cn(
                  "w-full border font-sans text-xs font-medium py-2 transition-colors",
                  seaView
                    ? "bg-navy text-white border-navy"
                    : "border-navy/20 text-navy hover:bg-navy/5"
                )}
              >
                {seaView ? t("filter_yes") : t("filter_any")}
              </button>
            </div>
          </div>

          {/* Results count + reset */}
          <div className="hidden md:flex items-center justify-between mt-4 pt-4 border-t border-navy/10">
            <span className="font-sans text-sm text-navy/50">
              {t("found_prefix")} <strong className="text-navy">{filtered.length}</strong> {t("found_suffix")}
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 font-sans text-xs text-navy/50 hover:text-navy transition-colors"
              >
                <X size={12} />
                {t("reset_filters")}
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="font-serif text-2xl text-navy/30 mb-3">{t("no_objects")}</div>
            <p className="font-sans text-sm text-navy/40 mb-6">{t("no_results")}</p>
            <button onClick={resetFilters} className="btn-secondary">
              {t("reset_filters")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
