import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ka", "en", "tr", "ru", "uk", "he"],
  defaultLocale: "ru",
  localePrefix: "always",
});
