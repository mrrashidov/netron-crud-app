import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "@/index.css";

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
      sort: "Sort",
    },
    pages: {
      home: "Home",
      todos: "Tasks",
      about: "About",
    },
    buttons: {
      addTask: "Add Task",
    },
    loginPage: {
      header: "Login",
      email: "Email",
      password: "Password",
      registerButton: "Register",
      loginButton: "Login",
      AlreadyRegisterExist: "Have you already signed up?",
      goToRegisterPage: "Go to login page",
      privacyPolice:
        "By continuing with Google, Apple or Email, you agree to Todoist's Terms of Service and Privacy Policy.",
    },
    registerPage: {
      header: "Sign Up",
      email: "Email",
      password: "Password",
      name: "Name",
      surname: "Surname",
      verifyPassword: "Verify Password",
      registerButton: "Sign up",
      AlreadyRegisterExist: "Have you already signed up?",
      goToHomePage: "Go to home page",
      privacyPolice:
        "By continuing with Google, Apple or Email, you agree to Todoist's Terms of Service and Privacy Policy.",
    },
    inboxPage: {
      headerTop: "Inbox",
      addTask: "Add a task",
      sort: "Sort",
      cancel: "Cancel",
      header: "Get a clear view of the day",
      text: "Your tasks due today will appear here.",
    },
    leftBar: {
      labels: "Labels",
      groups: "Groups",
    },
    toggleTag: {
      header: "Add label",
      label: "Label name",
      color: "Label color",
      cancel: "Cancel",
      add: "Add",
      title: "Click to find out about labels and how to use them.",
    },
    todayPage: {
      today: "Today",
      dt: "Tue 19 Oct",
      addTask: "Add a task",
      sort: "Sort",
      cancel: "Cancel",
      header: "Get a clear view of the day",
      text: "Your tasks due today will appear here.",
    },
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
      sort: "Sırala",
    },
    pages: {
      home: "Anasayfa",
      todos: "Görevler",
      about: "Hakkında",
    },
    buttons: {
      addTask: "Görev Ekle",
    },
    loginPage: {
      header: "Giriş",
      email: "E-posta",
      password: "Parola",
      registerButton: "Üye Ol",
      loginButton: "Giriş Yap",
      AlreadyRegisterExist: "Hala Kayıt olmadın mı?",
      goToRegisterPage: "Üye Ol sayfasına git",
      privacyPolice:
        "E-posta ile devam ederek, Todo App'in Hizmet Kullanım Koşulları ve Gizlilik Politikasını kabul etmiş olursun.",
    },
    registerPage: {
      header: "Kaydol",
      email: "E-posta",
      password: "Parola",
      name: "İsim",
      surname: "Soyisim",
      verifyPassword: "Parola Doğrula",
      registerButton: "Kaydol",
      AlreadyRegisterExist: "Zaten kayıt oldun mu?",
      goToHomePage: "Giriş sayfasına git",
      privacyPolice:
        "E-posta ile devam ederek, Todo App'in Hizmet Kullanım Koşulları ve Gizlilik Politikasını kabul etmiş olursun.",
    },
    inboxPage: {
      headerTop: "Klasör",
      dt: "Sal 19 Oct",
      addTask: "Görev ekle",
      sort: "Sırala",
      cancel: "İptal",
      header: "Günün net bir görünümünü edin",
      text: "Bitiş tarihi bugün olan görevlerin burada gözükecek.",
    },
    leftBar: {
      labels: "Etiketler",
      groups: "Gruplar",
    },
    toggleTag: {
      header: "Etiket ekle",
      label: "Etiket adı",
      color: "Etiket rengi",
      cancel: "İptal",
      add: "Ekle",
      title: "Projeleri ve onları nasıl kullanabileceğini öğrenmek için tıkla.",
    },
    todayPage: {
      today: "Bugün",
      dt: "Tue 19 Oct",
      addTask: "Görev ekle",
      sort: "Sırala",
      cancel: "İptal",
      header: "Günün net bir görünümünü edin",
      text: "Bitiş tarihi bugün olan görevlerin burada gözükecek.",
    },
  },
};

const local = localStorage.getItem("local");

const i18n = createI18n({
  // something vue-i18n options here ...
  legacy: false,
  locale: `${local}`, // set locale
  fallbackLocale: "en", // set fallback locale
  globalInjection: true,
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

createApp(App).use(router).use(i18n).use(store).mount("#app");
