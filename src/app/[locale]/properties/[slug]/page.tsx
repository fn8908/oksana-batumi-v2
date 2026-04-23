import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, MapPin, Waves, Building2, Flame, CheckCircle } from "lucide-react";
import { getPropertyBySlug, PROPERTIES } from "@/lib/properties";
import { formatPrice, getWhatsAppLink, getTelegramLink } from "@/lib/utils";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return PROPERTIES.flatMap((property) =>
    routing.locales.map((locale) => ({ locale, slug: property.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};

  const loc = locale as keyof typeof property.title;
  const title = property.title[loc] ?? property.title.ru;
  const description = property.description[locale === "en" ? "en" : "ru"];

  return {
    title,
    description,
    openGraph: { images: [property.image] },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const t = await getTranslations({ locale, namespace: "property_detail" });
  const tFeatured = await getTranslations({ locale, namespace: "featured" });
  const tProperties = await getTranslations({ locale, namespace: "properties" });

  const loc = locale as keyof typeof property.title;
  const title = property.title[loc] ?? property.title.ru;
  const district = property.districtLabel[loc] ?? property.districtLabel.ru;
  const description = property.description[locale === "en" ? "en" : "ru"];

  const waMessage = `Здравствуйте! Интересует объект: ${property.title.ru}. Хочу узнать подробности.`;

  return (
    <div className="pt-20 min-h-screen bg-[#FAF8F5]">
      {/* Breadcrumb bar */}
      <div className="bg-[#1B2B4B] text-white py-5">
        <div className="container-site">
          <Link
            href={`/${locale}/properties`}
            className="inline-flex items-center gap-2 font-sans text-sm text-white/70 hover:text-[#C9A84C] transition-colors"
          >
            <ArrowLeft size={14} />
            {t("back")}
          </Link>
        </div>
      </div>

      <div className="container-site py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Main image */}
            <div className="relative aspect-[16/9] overflow-hidden mb-3">
              <Image
                src={property.images[0] ?? property.image}
                alt={title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {property.isHot && (
                  <span className="flex items-center gap-1 bg-red-500 text-white font-sans text-xs font-semibold px-2 py-0.5">
                    <Flame size={10} /> {tFeatured("hot")}
                  </span>
                )}
                {property.seaView && (
                  <span className="flex items-center gap-1 bg-[#1B2B4B] text-white font-sans text-xs font-semibold px-2 py-0.5">
                    <Waves size={10} /> {tFeatured("sea_view")}
                  </span>
                )}
                {property.isNewBuild && (
                  <span className="flex items-center gap-1 bg-[#C9A84C] text-white font-sans text-xs font-semibold px-2 py-0.5">
                    <Building2 size={10} /> {tFeatured("new_build")}
                  </span>
                )}
                {property.isReady && (
                  <span className="flex items-center gap-1 bg-green-600 text-white font-sans text-xs font-semibold px-2 py-0.5">
                    <CheckCircle size={10} /> {tFeatured("ready")}
                  </span>
                )}
              </div>
              {property.yield && (
                <div className="absolute top-3 right-3 bg-[#1B2B4B]/90 text-[#C9A84C] font-sans text-xs font-semibold px-2 py-0.5">
                  ~{property.yield}% {t("yield_label")}
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {property.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2 mb-8">
                {property.images.slice(1).map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={img}
                      alt={`${title} ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 33vw, 22vw"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-4xl text-[#1B2B4B] mb-2 leading-tight">
              {title}
            </h1>
            <div className="flex items-center gap-2 text-[#C9A84C] font-sans text-sm font-medium mb-6">
              <MapPin size={14} />
              {district}
            </div>

            {/* Description */}
            <p className="font-sans text-base text-gray-700 leading-relaxed">{description}</p>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Price card */}
            <div className="bg-white p-6 shadow-sm">
              <div className="font-serif text-3xl text-[#1B2B4B] font-semibold mb-1">
                {formatPrice(property.price)}
                {property.type === "rent" && (
                  <span className="font-sans text-sm text-[#1B2B4B]/50 font-normal ml-1">
                    {tProperties("monthly")}
                  </span>
                )}
              </div>
              {property.pricePerSqm && (
                <div className="font-sans text-sm text-[#1B2B4B]/50">
                  {formatPrice(property.pricePerSqm)} {tProperties("per_sqm")}
                </div>
              )}
              <div className="mt-3 inline-block bg-[#1B2B4B]/10 text-[#1B2B4B] font-sans text-xs font-semibold px-2 py-0.5">
                {property.type === "buy" ? t("type_buy") : t("type_rent")}
              </div>
            </div>

            {/* Details card */}
            <div className="bg-white p-6 shadow-sm">
              <h2 className="font-serif text-lg text-[#1B2B4B] mb-4">{t("details")}</h2>
              <dl className="space-y-1">
                {[
                  { label: tFeatured("sqm"), value: `${property.area} м²` },
                  { label: tFeatured("rooms"), value: String(property.rooms) },
                  { label: tFeatured("floor"), value: `${property.floor}/${property.totalFloors}` },
                  ...(property.yield
                    ? [{ label: t("yield_label") /* i18n-dup-ok: also shown in image badge */, value: `~${property.yield}%`, gold: true }]
                    : []),
                ].map(({ label, value, gold }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-2.5 border-b border-[#1B2B4B]/10 last:border-0"
                  >
                    <dt className="font-sans text-sm text-[#1B2B4B]/60">{label}</dt>
                    <dd
                      className={`font-sans text-sm font-semibold ${gold ? "text-[#C9A84C]" : "text-[#1B2B4B]"}`}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* CTA card */}
            <div className="bg-[#1B2B4B] p-6 text-white">
              <h2 className="font-serif text-xl mb-2">{t("contact_title")}</h2>
              <p className="font-sans text-sm text-white/70 mb-5">{t("contact_desc")}</p>
              <div className="space-y-3">
                <a
                  href={getWhatsAppLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-sans text-sm font-semibold py-3 hover:bg-[#1ebe5a] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {tFeatured("ask_whatsapp")}
                </a>
                <a
                  href={getTelegramLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#229ED9] text-white font-sans text-sm font-semibold py-3 hover:bg-[#1a8bbf] transition-colors"
                >
                  {t("telegram_cta")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
