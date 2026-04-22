import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const alt = "Blog — Оксана Яценко";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CATEGORY_LABEL: Record<string, Record<string, string>> = {
  ru: { market: "Рынок", investment: "Инвестиции", prices: "Цены", forecast: "Прогнозы", trends: "Тренды", rental: "Аренда" },
  uk: { market: "Ринок", investment: "Інвестиції", prices: "Ціни", forecast: "Прогнози", trends: "Тренди", rental: "Оренда" },
  en: { market: "Market", investment: "Investment", prices: "Prices", forecast: "Forecast", trends: "Trends", rental: "Rental" },
  ka: { market: "ბაზარი", investment: "ინვესტიცია", prices: "ფასები", forecast: "პროგნოზი", trends: "ტენდენციები", rental: "იჯარა" },
  tr: { market: "Piyasa", investment: "Yatırım", prices: "Fiyatlar", forecast: "Tahmin", trends: "Eğilimler", rental: "Kiralama" },
  he: { market: "שוק", investment: "השקעות", prices: "מחירים", forecast: "תחזית", trends: "מגמות", rental: "השכרה" },
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);
  if (!post) return new Response("Not found", { status: 404 });

  const title = post.title[locale] ?? post.title.ru;
  const categoryLabels = CATEGORY_LABEL[locale] ?? CATEGORY_LABEL.ru;
  const category = categoryLabels[post.categoryKey] ?? post.categoryKey;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1B2B4B",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Gold accent bar top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: "#C9A84C",
          }}
        />

        {/* Category badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "rgba(201,168,76,0.15)",
            border: "1px solid rgba(201,168,76,0.4)",
            color: "#C9A84C",
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "8px 20px",
            marginBottom: 36,
            width: "fit-content",
          }}
        >
          {category}
        </div>

        {/* Title */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              color: "#FFFFFF",
              fontSize: title.length > 60 ? 44 : 52,
              fontWeight: 400,
              lineHeight: 1.25,
              maxWidth: 900,
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 16 }}>
            oksana-batumi.com
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#C9A84C",
              }}
            />
            {post.readTime} мин
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
