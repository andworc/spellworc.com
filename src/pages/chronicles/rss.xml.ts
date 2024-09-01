import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import config from "stead.config";
import type { RSSOptions } from "@astrojs/rss";
const context = config.starlight;

import { getBlogEntries, type StarlightBlogEntry } from "@libs/content";
import { renderMarkdownToHTML, stripMarkdown } from "@libs/markdown";
import { getPathWithBase } from "@libs/page";

export function getStaticPaths() {
  return getRSSStaticPaths();
}

export const GET: APIRoute = async ({ site }) => {
  return rss(await getRSSOptions(site));
};

export function getRSSStaticPaths() {
  return [{ params: { prefix: config.blog.prefix } }];
}

export async function getRSSOptions(site: URL | undefined) {
  const entries = await getBlogEntries();
  entries.splice(20);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- The route is only injected if `site` is defined in the user Astro config.
  const feedSite = site!;

  const options: RSSOptions = {
    title: getRSSTitle(),
    stylesheet: "/rss/styles.xsl",
    description: context.description ?? "",
    site: feedSite,
    items: await Promise.all(
      entries.map(async (entry) => {
        const link = getPathWithBase(`/${entry.slug}`);

        return {
          title: entry.data.title,
          link,
          pubDate: entry.data.date,
          categories: entry.data.tags,
          description: await getRSSDescription(entry),
          content: await getRSSContent(entry, new URL(link, feedSite)),
        };
      }),
    ),
    customData: `<language>${context.defaultLocale}</language>`,
  };

  if (config.astro.trailingSlash !== "ignore") {
    options.trailingSlash = config.astro.trailingSlash === "always";
  }

  return options;
}

function getRSSTitle() {
  let title =
    typeof context.title === "string"
      ? context.title
      : (context.title["en"] ?? "");

  if (title.length > 0) {
    title += ` ${context.titleDelimiter ?? "|"} `;
  }

  title += config.blog.title;

  return title;
}

function getRSSDescription(
  entry: StarlightBlogEntry,
): Promise<string> | undefined {
  if (!entry.data.excerpt) return;

  return stripMarkdown(entry.data.excerpt);
}

function getRSSContent(entry: StarlightBlogEntry, link: URL): Promise<string> {
  return renderMarkdownToHTML(entry.body, link);
}
