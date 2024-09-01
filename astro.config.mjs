import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import steadConfig from "./stead.config";

// https://astro.build/config
export default defineConfig({
  ...steadConfig.astro,
  integrations: [
    starlight(steadConfig.starlight),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
