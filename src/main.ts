import { createApp } from "vue";
import { createClient } from "villus";
import { createI18n } from "vue-i18n";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "@/index.css";

const client = createClient({
  url: "http://localhost:4000/", // your endpoint.
});

const messages = {
  en: {
    message: {
      hello: "hello world",
    },
  },
  tr: {
    message: {
      hello: "merhaba dünya",
    },
  },
};

const i18n = createI18n({
  // something vue-i18n options here ...
  locale: "tr", // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

createApp(App).use(router).use(i18n).use(client).use(store).mount("#app");
