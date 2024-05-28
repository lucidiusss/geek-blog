// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@pinia/nuxt",
    "@nuxt/ui",
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "nuxt-time",
    "@morev/vue-transitions/nuxt",
    "@vueuse/motion/nuxt",
    "nuxt-tiptap-editor",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "nuxt-anchorscroll",
  ],
  tiptap: {
    prefix: "Tiptap",
  },

  css: ["~/assets/css/tailwind.css"],
  googleFonts: {
    families: {
      Roboto: true,
    },
  },
  supabase: {
    redirect: false,
  },
  pages: true,
});
