import type { BlogPost } from "./blog";

// Lazy-import so the build doesn't fail when env vars are absent
async function getClient() {
  if (!process.env.NOTION_TOKEN) return null;
  const { Client } = await import("@notionhq/client");
  return new Client({ auth: process.env.NOTION_TOKEN });
}

type RichText = { plain_text: string };

function richText(arr: RichText[]): string {
  return arr.map((t) => t.plain_text).join("");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pageToPost(page: any): BlogPost | null {
  try {
    const props = page.properties;
    const slug = richText(props.slug?.rich_text ?? []);
    if (!slug) return null;

    const locales = ["ru", "uk", "en", "ka", "tr", "he"] as const;
    const title: Record<string, string> = {};
    const excerpt: Record<string, string> = {};

    for (const loc of locales) {
      const titleProp = props[`title_${loc}`];
      const excerptProp = props[`excerpt_${loc}`];
      if (titleProp?.rich_text?.length) title[loc] = richText(titleProp.rich_text);
      if (excerptProp?.rich_text?.length) excerpt[loc] = richText(excerptProp.rich_text);
    }

    // fallback: use the native Notion title field as ru
    if (!title.ru && props.Name?.title?.length) {
      title.ru = richText(props.Name.title);
    }

    return {
      slug,
      date: props.date?.date?.start ?? new Date().toISOString().split("T")[0],
      categoryKey: props.category?.select?.name ?? "market",
      readTime: props.readTime?.number ?? 5,
      image: props.image?.url ?? "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800",
      title,
      excerpt,
      content: "", // populated separately via blocks
    };
  } catch {
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function blocksToHtml(blocks: any[]): string {
  const parts: string[] = [];
  let listOpen = false;

  for (const block of blocks) {
    const type: string = block.type;

    if (type !== "bulleted_list_item" && listOpen) {
      parts.push("</ul>");
      listOpen = false;
    }

    switch (type) {
      case "heading_2": {
        const text = richText(block.heading_2.rich_text);
        parts.push(`<h2>${text}</h2>`);
        break;
      }
      case "heading_3": {
        const text = richText(block.heading_3.rich_text);
        parts.push(`<h3>${text}</h3>`);
        break;
      }
      case "paragraph": {
        const text = richText(block.paragraph.rich_text);
        if (text.trim()) parts.push(`<p>${text}</p>`);
        break;
      }
      case "bulleted_list_item": {
        if (!listOpen) {
          parts.push("<ul>");
          listOpen = true;
        }
        const text = richText(block.bulleted_list_item.rich_text);
        parts.push(`<li>${text}</li>`);
        break;
      }
      case "quote": {
        const text = richText(block.quote.rich_text);
        parts.push(`<blockquote>${text}</blockquote>`);
        break;
      }
      case "divider": {
        parts.push(`<hr />`);
        break;
      }
      case "callout": {
        const text = richText(block.callout.rich_text);
        parts.push(`<blockquote>${text}</blockquote>`);
        break;
      }
    }
  }

  if (listOpen) parts.push("</ul>");
  return parts.join("\n");
}

export async function getNotionPosts(): Promise<BlogPost[]> {
  const client = await getClient();
  if (!client || !process.env.NOTION_DATABASE_ID) return [];

  try {
    const response = await client.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: { property: "published", checkbox: { equals: true } },
      sorts: [{ property: "date", direction: "descending" }],
    });

    return response.results
      .map(pageToPost)
      .filter((p): p is BlogPost => p !== null);
  } catch {
    return [];
  }
}

export async function getNotionPost(slug: string): Promise<BlogPost | null> {
  const client = await getClient();
  if (!client || !process.env.NOTION_DATABASE_ID) return null;

  try {
    const response = await client.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        and: [
          { property: "slug", rich_text: { equals: slug } },
          { property: "published", checkbox: { equals: true } },
        ],
      },
    });

    const page = response.results[0];
    if (!page) return null;

    const post = pageToPost(page);
    if (!post) return null;

    const blocksResponse = await client.blocks.children.list({
      block_id: page.id,
      page_size: 100,
    });

    post.content = blocksToHtml(blocksResponse.results);
    return post;
  } catch {
    return null;
  }
}
