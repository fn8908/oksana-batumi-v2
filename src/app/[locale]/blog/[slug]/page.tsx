import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowLeft, MessageCircle } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getNotionPost } from "@/lib/notion";
import { getWhatsAppLink } from "@/lib/utils";
import type { Metadata } from "next";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  const locales = ["ru", "uk", "en", "ka", "tr", "he"];
  return locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug) ?? (await getNotionPost(slug));
  if (!post) return {};
  const title = post.title[locale] ?? post.title.ru;
  const excerpt = post.excerpt[locale] ?? post.excerpt.ru;
  return {
    title: `${title} — Оксана Яценко`,
    description: excerpt,
    openGraph: { images: [post.image] },
  };
}

const CATEGORY_COLOR: Record<string, string> = {
  market: "bg-blue-50 text-blue-700",
  investment: "bg-emerald-50 text-emerald-700",
  prices: "bg-amber-50 text-amber-700",
  forecast: "bg-violet-50 text-violet-700",
  trends: "bg-rose-50 text-rose-700",
  rental: "bg-cyan-50 text-cyan-700",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const tf = await getTranslations({ locale, namespace: "floating" });

  const post = getPostBySlug(slug) ?? (await getNotionPost(slug));
  if (!post) notFound();

  const title = post.title[locale] ?? post.title.ru;
  const excerpt = post.excerpt[locale] ?? post.excerpt.ru;
  const catColor = CATEGORY_COLOR[post.categoryKey] ?? "bg-gray-50 text-gray-600";
  const categoryLabel = t(`categories.${post.categoryKey}`);

  const dateFormatted = new Date(post.date).toLocaleDateString(
    locale === "ru" ? "ru-RU" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  const blogHref = `/${locale}/blog`;
  const whatsappMsg = tf("whatsapp_message");

  const relatedPosts = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.categoryKey === post.categoryKey)
    .slice(0, 3);

  const otherRelated =
    relatedPosts.length < 3
      ? getAllPosts()
          .filter(
            (p) =>
              p.slug !== post.slug &&
              !relatedPosts.find((r) => r.slug === p.slug)
          )
          .slice(0, 3 - relatedPosts.length)
      : [];

  const suggestedPosts = [...relatedPosts, ...otherRelated].slice(0, 3);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-navy text-white py-16">
        <div className="container-site max-w-4xl">
          <Link
            href={blogHref}
            className="inline-flex items-center gap-1.5 font-sans text-sm text-white/50 hover:text-gold transition-colors mb-8 group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            {t("back")}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`font-sans text-xs font-semibold uppercase tracking-wider px-3 py-1 ${catColor}`}>
              {categoryLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 font-sans text-xs text-white/40">
              <Calendar size={12} />
              {dateFormatted}
            </span>
            <span className="inline-flex items-center gap-1.5 font-sans text-xs text-white/40">
              <Clock size={12} />
              {post.readTime} {t("min_read")}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
            {title}
          </h1>
          <p className="font-sans text-lg text-white/60 leading-relaxed">{excerpt}</p>
        </div>
      </section>

      {/* Cover image */}
      <div className="relative w-full aspect-[21/9] bg-navy/10 overflow-hidden">
        <Image
          src={post.image}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/30 to-transparent" />
      </div>

      {/* Article body */}
      <section className="py-16 bg-cream">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <div className="w-12 h-0.5 bg-gold mb-10" />

            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy text-white">
        <div className="container-site text-center max-w-2xl mx-auto">
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            {t("cta_article_title")}
          </h2>
          <p className="font-sans text-white/60 text-base mb-10">
            {t("cta_article_text")}
          </p>
          <a
            href={getWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <MessageCircle size={16} />
            {t("cta_btn")}
          </a>
        </div>
      </section>

      {/* Related posts */}
      {suggestedPosts.length > 0 && (
        <section className="py-16 bg-cream">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-8 h-px bg-gold" />
              <h2 className="font-serif text-2xl text-navy">{t("related")}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestedPosts.map((rel) => {
                const relTitle = rel.title[locale] ?? rel.title.ru;
                const relExcerpt = rel.excerpt[locale] ?? rel.excerpt.ru;
                const relCatColor =
                  CATEGORY_COLOR[rel.categoryKey] ?? "bg-gray-50 text-gray-600";
                const relHref = `/${locale}/blog/${rel.slug}`;

                return (
                  <Link
                    key={rel.slug}
                    href={relHref}
                    className="group bg-white overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-navy/10">
                      <Image
                        src={rel.image}
                        alt={relTitle}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <span
                        className={`absolute top-3 left-3 font-sans text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 ${relCatColor}`}
                      >
                        {t(`categories.${rel.categoryKey}`)}
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-serif text-base text-navy leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2">
                        {relTitle}
                      </h3>
                      <p className="font-sans text-sm text-navy/50 line-clamp-2 flex-1">
                        {relExcerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
