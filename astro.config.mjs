import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import tsconfigPaths from "vite-tsconfig-paths";

import vtbot from "astro-vtbot";

// https://astro.build/config
export default defineConfig({
  site: "https://spellworc.com",
  vite: {
    plugins: [tsconfigPaths()],
  },
  integrations: [
    starlight({
      title: "Spellworc",
      description:
        "Rekindling the fires of Europe's folkloric heritage through storytelling, fellowship, and myth-crafting. Spellworc is a home for those who seek to explore and celebrate our traditions.",
      logo: {
        light: "./src/assets/sw-wordmark.svg",
        dark: "./src/assets/sw-wordmark-ondark.svg",
        alt: "Spellworc logo",
        replacesTitle: true,
      },
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
      },
      customCss: ["./src/tailwind.css"],
      components: {
        Head: "./src/components/Head.astro",
      },
      head: [
        {
          tag: "link",
          attrs: {
            rel: "preconnect",
            href: "https://rsms.me/",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: "https://rsms.me/inter/inter.css",
          },
        },
      ],
      social: {
        youtube: "https://youtube.com/@spellworc",
        "x.com": "https://x.com/Spellworc",
        discord: "https://discord.gg/ytuBJmqamb",
      },
      sidebar: [
        {
          label: "Start Here",
          collapsed: true,
          items: ["getting-settled", "about"],
        },
        {
          label: "Neawist",
          autogenerate: {
            directory: "neawist",
          },
        },
        {
          label: "Lorehouse",
          autogenerate: {
            directory: "lorehouse",
          },
        },
        // TODO
        // {
        //   label: "Blog",
        //   link: "https://blog.spellworc.com",
        // },
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
