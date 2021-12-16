import { createI18n } from "vue-i18n";

export const languages = [
  {
    name: 'English',
    value: "English",
  },
  {
    name: 'Русский',
    value: "Русский",
  }
]

const messages = {
  en: {
    signUp: "Sign-up sisiisisis",
    sign: "Sign-up12231223 sisiisisis",
    message: {
      hello: 'hello world'
    }
  },
  ru: {
    signUp: "Регистрация",
    sign: "Sign-up12231223 sisiisisis",

  },
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  globalInjection: true,
  messages,
});

export default i18n;
