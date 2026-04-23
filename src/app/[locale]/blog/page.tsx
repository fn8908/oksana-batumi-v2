import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, MessageCircle } from "lucide-react";
import { getAllPosts, CATEGORY_KEYS } from "@/lib/blog";
import { getNotionPosts } from "@/lib/notion";
import { getWhatsAppLink } from "@/lib/utils";
import CategoryFilter from "@/components/blog/CategoryFilter";
import { Suspense } from "react";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("meta_title"), description: t("meta_desc") };
}

const CATEGORY_COLOR: Record<string, string> = {
  market: "bg-blue-50 text-blue-700",
  investment: "bg-emerald-50 text-emerald-700",
  prices: "bg-amber-50 text-amber-700",
  forecast: "bg-violet-50 text-violet-700",
  trends: "bg-rose-50 text-rose-700",
  rental: "bg-cyan-50 text-cyan-700",
};

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category } = await searchParams;
  const t = await getTranslations({ locale, namespace: "blog" });
  const tf = await getTranslations({ locale, namespace: "floating" });

  const [notionPosts, staticPosts] = await Promise.all([
    getNotionPosts(),
    Promise.resolve(getAllPosts()),
  ]);
  const notionSlugs = new Set(notionPosts.map((p) => p.slug));
  const allPosts = [
    ...notionPosts,
    ...staticPosts.filter((p) => !notionSlugs.has(p.slug)),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const validCategory = category && (CATEGORY_KEYS as readonly string[]).includes(category) ? category : null;
  const posts = validCategory
    ? allPosts.filter((p) => p.categoryKey === validCategory)
    : allPosts;

  const activeCategory = validCategory ?? "all";

  const categoryList = [
    { key: "all", label: t("categories.all") },
    ...CATEGORY_KEYS.map((key) => ({ key, label: t(`categories.${key}`) })),
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-navy text-white py-24">
        <div className="container-site text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-gold" />
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold">
              {t("title")}
            </span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h1 className="font-serif text-5xl text-white mb-4">{t("all_posts_title")}</h1>
          <p className="font-sans text-white/60 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      {/* Category filter */}
      <section className="bg-cream border-b border-navy/10 py-5">
        <div className="container-site">
          <Suspense>
            <CategoryFilter categories={categoryList} active={activeCategory} />
          </Suspense>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-20 bg-cream">
        <div className="container-site">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-sans text-navy/40 text-lg">{t("no_posts")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const title = post.title[locale] ?? post.title.ru;
                const excerpt = post.excerpt[locale] ?? post.excerpt.ru;
                const catColor =
                  CATEGORY_COLOR[post.categoryKey] ?? "bg-gray-50 text-gray-600";
                const categoryLabel = t(`categories.${post.categoryKey}`);
                const dateFormatted = new Date(post.date).toLocaleDateString(
                  locale === "ru" ? "ru-RU" : "en-GB",
                  { day: "numeric", month: "long", year: "numeric" }
                );
                const postHref = `/${locale}/blog/${post.slug}`;

                return (
                  <article
                    key={post.slug}
                    className="bg-white flex flex-col overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <Link
                      href={postHref}
                      className="block relative aspect-[16/10] overflow-hidden bg-navy/10"
                    >
                      <Image
                        src={post.image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <span
                        className={`absolute top-4 left-4 font-sans text-xs font-semibold uppercase tracking-wider px-3 py-1 ${catColor}`}
                      >
                        {categoryLabel}
                      </span>
                    </Link>

                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-sans text-xs text-navy/40">{dateFormatted}</span>
                        <span className="w-1 h-1 bg-navy/20 rounded-full" />
                        <span className="inline-flex items-center gap-1 font-sans text-xs text-navy/40">
                          <Clock size={11} />
                          {post.readTime} {t("min_read")}
                        </span>
                      </div>

                      <Link href={postHref}>
                        <h2 className="font-serif text-xl text-navy leading-snug mb-3 group-hover:text-gold transition-colors duration-200 line-clamp-3">
                          {title}
                        </h2>
                      </Link>

                      <p className="font-sans text-sm text-navy/60 leading-relaxed line-clamp-3 flex-1">
                        {excerpt}
                      </p>

                      <Link
                        href={postHref}
                        className="mt-5 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-gold hover:text-gold-600 transition-colors group/link"
                      >
                        {t("read_more")}
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-200 group-hover/link:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy text-white">
        <div className="container-site text-center max-w-2xl mx-auto">
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <h2 className="font-serif text-4xl text-white mb-4">{t("cta_title")}</h2>
          <p className="font-sans text-white/60 text-base mb-10">{t("cta_article_text")}</p>
          <a
            href={getWhatsAppLink(tf("whatsapp_message"))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <MessageCircle size={16} />
            {t("cta_btn")}
          </a>
        </div>
      </section>
    </div>
  );
}
