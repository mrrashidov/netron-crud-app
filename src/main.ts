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
      general: "General",
      language: "Languages",
      setting: "Settings",
      search: "Search",
      cancel: "Cancel",
      update: "Update",
      name: "Name",
      description: "Description",
      price: "Price",
      status: "Status",
      addTask: "Add Task",
      taskUpdate: "Edit",
      taskDelete: "Delete",
      inbox: "Inbox",
      today: "Today",
      upComing: "Upcoming",
      sort: "Sort"
    },
    pages: {
      home: "Home",
      todos: "Tasks",
      about: "About",
    },
    buttons: {
      addTask: "Add Task"
    }
  },
  tr: {
    message: {
      hello: "merhaba dünya",
      general: "Genel",
      language: "Diller",
      setting: "Ayarlar",
      search: "Ara",
      cancel: "İptal",
      update: "Güncelle",
      name: "İsim",
      description: "Açıklama",
      price: "Miktar",
      status: "Statü",
      addTask: "Görev Ekle",
      taskUpdate: "Düzenle",
      taskDelete: "Sil",
      inbox: "Klasör",
      today: "Bugün",
      upComing: "Yaklaşan",
      sort: "Sırala"
    },
    pages: {
      home: "Anasayfa",
      todos: "Görevler",
      about: "Hakkında",
    },
    buttons: {
      addTask: "Görev Ekle"
    }
  },
};

const local = localStorage.getItem("local");

const i18n = createI18n({
  // something vue-i18n options here ...
  locale: local, // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

createApp(App).use(router).use(i18n).use(client).use(store).mount("#app");
