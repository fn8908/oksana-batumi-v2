"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { SlidersHorizontal, X } from "lucide-react";
import { PROPERTIES, DISTRICT_OPTIONS, PROPERTY_TYPES, type PropertyType } from "@/lib/properties";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { cn } from "@/lib/utils";

const ROOM_OPTIONS = [1, 2, 3, 4];
// Коммерческие вкладки показываем, только если такие объекты есть
const TYPE_OPTIONS = PROPERTY_TYPES.filter(
  (t) => !t.startsWith("commercial") || PROPERTIES.some((p) => p.type === t)
);
const TYPE_KEY: Record<PropertyType, string> = {
  buy: "filter_buy",
  rent: "filter_rent",
  "commercial-buy": "filter_commercial_buy",
  "commercial-rent": "filter_commercial_rent",
};

export default function PropertiesPage() {
  const t = useTranslations("properties");
  const locale = useLocale();

  const [type, setType] = useState<PropertyType | "all">("all");
  const [district, setDistrict] = useState<string>("all");
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
    <div className="pt-20 min-h-screen bg-ink-900">
      {/* Header */}
      <div className="bg-ink-950 text-white py-14">
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
        <div className="glass-card !overflow-visible p-4 md:p-6 mb-8">
          {/* Mobile toggle */}
          <div className="flex items-center justify-between md:hidden mb-4">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 font-sans text-sm font-medium text-ivory"
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
                className="flex items-center gap-1 font-sans text-xs text-ivory/50 hover:text-ivory"
              >
                <X size={12} />
                {t("reset")}
              </button>
            )}
          </div>

          <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4", !filtersOpen && "hidden md:grid")}>
            {/* Type */}
            <div>
              <label className="font-sans text-xs text-ivory/50 uppercase tracking-wider mb-1.5 block">
                {t("filter_type")}
              </label>
              <div className="flex flex-wrap border border-ivory/20">
                {(["all", ...TYPE_OPTIONS] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setType(v)}
                    className={cn(
                      "flex-1 font-sans text-xs font-medium py-2 px-2 whitespace-nowrap transition-colors",
                      type === v ? "bg-gold text-ink-950" : "text-ivory hover:bg-ivory/5",
                      v !== "all" && "border-l border-ivory/20"
                    )}
                  >
                    {v === "all" ? t("filter_any") /* i18n-dup-ok: type/district/rooms/sea all use same label */ : t(TYPE_KEY[v])}
                  </button>
                ))}
              </div>
            </div>

            {/* District */}
            <div>
              <label className="font-sans text-xs text-ivory/50 uppercase tracking-wider mb-1.5 block">
                {t("filter_district")}
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full border border-ivory/20 font-sans text-sm text-ivory py-2 px-3 bg-ink-800 focus:outline-none focus:border-gold"
              >
                <option value="all">{t("filter_any")}{/* i18n-dup-ok: district select */}</option>
                {DISTRICT_OPTIONS.map(({ key, label }) => (
                  <option key={key} value={key}>
                    {label[locale as keyof typeof label] ?? label.ru}
                  </option>
                ))}
              </select>
            </div>

            {/* Price min */}
            <div>
              <label className="font-sans text-xs text-ivory/50 uppercase tracking-wider mb-1.5 block">
                {t("filter_price")} от
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="$ от"
                className="w-full border border-ivory/20 font-sans text-sm text-ivory py-2 px-3 focus:outline-none focus:border-gold"
              />
            </div>

            {/* Price max */}
            <div>
              <label className="font-sans text-xs text-ivory/50 uppercase tracking-wider mb-1.5 block">
                {t("filter_price")}{/* i18n-dup-ok: min/max price labels */} до
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="$ до"
                className="w-full border border-ivory/20 font-sans text-sm text-ivory py-2 px-3 focus:outline-none focus:border-gold"
              />
            </div>

            {/* Rooms */}
            <div>
              <label className="font-sans text-xs text-ivory/50 uppercase tracking-wider mb-1.5 block">
                {t("filter_rooms")}
              </label>
              <div className="flex border border-ivory/20">
                <button
                  onClick={() => setRooms("all")}
                  className={cn(
                    "flex-1 font-sans text-xs font-medium py-2 transition-colors",
                    rooms === "all" ? "bg-gold text-ink-950" : "text-ivory hover:bg-ivory/5"
                  )}
                >
                  {t("filter_any")}{/* i18n-dup-ok: rooms filter */}
                </button>
                {ROOM_OPTIONS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRooms(r)}
                    className={cn(
                      "flex-1 font-sans text-xs font-medium py-2 border-l border-ivory/20 transition-colors",
                      rooms === r ? "bg-gold text-ink-950" : "text-ivory hover:bg-ivory/5"
                    )}
                  >
                    {r}+
                  </button>
                ))}
              </div>
            </div>

            {/* Sea view */}
            <div>
              <label className="font-sans text-xs text-ivory/50 uppercase tracking-wider mb-1.5 block">
                {t("filter_sea_view")}
              </label>
              <button
                onClick={() => setSeaView(!seaView)}
                className={cn(
                  "w-full border font-sans text-xs font-medium py-2 transition-colors",
                  seaView
                    ? "bg-gold text-ink-950 border-gold/50"
                    : "border-ivory/20 text-ivory hover:bg-ivory/5"
                )}
              >
                {seaView ? t("filter_yes") : t("filter_any") /* i18n-dup-ok: sea view toggle */}
              </button>
            </div>
          </div>

          {/* Results count + reset */}
          <div className="hidden md:flex items-center justify-between mt-4 pt-4 border-t border-ivory/10">
            <span className="font-sans text-sm text-ivory/50">
              {t("found_prefix")} <strong className="text-ivory">{filtered.length}</strong> {t("found_suffix")}
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 font-sans text-xs text-ivory/50 hover:text-ivory transition-colors"
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
            <div className="font-serif text-2xl text-ivory/30 mb-3">{t("no_objects")}</div>
            <p className="font-sans text-sm text-ivory/40 mb-6">{t("no_results")}</p>
            <button onClick={resetFilters} className="btn-secondary">
              {t("reset_filters")}{/* i18n-dup-ok: empty-state reset button */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
