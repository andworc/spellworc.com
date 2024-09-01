import tsconfigPaths from "vite-tsconfig-paths";

import type { StarlightUserConfig } from "@astrojs/starlight/types";
import type { StarlightBlogConfig } from "@libs/config";
import type { AstroUserConfig } from "astro";

interface SteadConfig {
  astro: AstroUserConfig;
  // astro: any;
  blog: StarlightBlogConfig;
  starlight: StarlightUserConfig;
}

const steadConfig: SteadConfig = {
  astro: {
    site: "https://spellworc.com",
    vite: { plugins: [tsconfigPaths()] },
  },
  blog: {
    authors: {
      oswine: {
        name: "Oswine",
        title: "Lord of Spellworc",
        picture: "/oswine.jpg",
      },
    },
    prefix: "chronicles",
    prevNextLinksOrder: "reverse-chronological",
    postCount: 5, // Per page
    recentPostCount: 10,
    title: "Chronicles",
  },
  starlight: {
    title: "Spellworc",
    description:
      "Rekindling the fires of Europe's folkloric heritage through storytelling, fellowship, and myth-crafting. Spellworc is a home for those who seek to explore and celebrate our traditions.",
    logo: {
      light: "@assets/sw-wordmark.svg",
      dark: "@assets/sw-wordmark-ondark.svg",
      alt: "Spellworc logo",
      replacesTitle: true,
    },
    defaultLocale: "en-GB",
    locales: { root: { label: "English", lang: "en" } },
    customCss: ["@src/tailwind.css"],
    components: {
      Head: "@components/overrides/Head.astro",
      SocialIcons: "@components/overrides/SocialIcons.astro",
      Sidebar: "@components/overrides/Sidebar.astro",
      MarkdownContent: "@components/overrides/MarkdownContent.astro",
    },
    head: [
      { tag: "link", attrs: { rel: "preconnect", href: "https://rsms.me/" } },
      {
        tag: "link",
        attrs: { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
      },
      { tag: "link", attrs: { rel: "sitemap", href: "/sitemap-index.xml" } },
    ],
    social: {
      youtube: "https://youtube.com/@spellworc",
      "x.com": "https://x.com/Spellworc",
      discord: "https://discord.gg/ytuBJmqamb",
    },
    sidebar: [
      { label: "Chronicles", autogenerate: { directory: "chronicles" } },
      { label: "Lorebook", autogenerate: { directory: "lorebook" } },
    ],
  },
};

export default steadConfig;
