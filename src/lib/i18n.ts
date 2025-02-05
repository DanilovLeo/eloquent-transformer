import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "humanize": "Humanize",
      "pricing": "Pricing",
      "signIn": "Sign In",
      "signOut": "Sign Out",
      "inputText": "Enter your text here",
      "uploadFile": "Upload File",
      "download": "Download",
      "copyright": "© 2024 AI Humanizer. All rights reserved."
    }
  },
  es: {
    translation: {
      "humanize": "Humanizar",
      "pricing": "Precios",
      "signIn": "Iniciar Sesión",
      "signOut": "Cerrar Sesión",
      "inputText": "Ingrese su texto aquí",
      "uploadFile": "Subir Archivo",
      "download": "Descargar",
      "copyright": "© 2024 AI Humanizer. Todos los derechos reservados."
    }
  },
  ru: {
    translation: {
      "humanize": "Гуманизировать",
      "pricing": "Цены",
      "signIn": "Войти",
      "signOut": "Выйти",
      "inputText": "Введите текст здесь",
      "uploadFile": "Загрузить файл",
      "download": "Скачать",
      "copyright": "© 2024 AI Humanizer. Все права защищены."
    }
  },
  ar: {
    translation: {
      "humanize": "أنسن",
      "pricing": "التسعير",
      "signIn": "تسجيل الدخول",
      "signOut": "تسجيل الخروج",
      "inputText": "أدخل النص هنا",
      "uploadFile": "تحميل ملف",
      "download": "تنزيل",
      "copyright": "© 2024 AI Humanizer. جميع الحقوق محفوظة."
    }
  },
  de: {
    translation: {
      "humanize": "Humanisieren",
      "pricing": "Preise",
      "signIn": "Anmelden",
      "signOut": "Abmelden",
      "inputText": "Text hier eingeben",
      "uploadFile": "Datei hochladen",
      "download": "Herunterladen",
      "copyright": "© 2024 AI Humanizer. Alle Rechte vorbehalten."
    }
  },
  sv: {
    translation: {
      "humanize": "Humanisera",
      "pricing": "Priser",
      "signIn": "Logga in",
      "signOut": "Logga ut",
      "inputText": "Ange text här",
      "uploadFile": "Ladda upp fil",
      "download": "Ladda ner",
      "copyright": "© 2024 AI Humanizer. Alla rättigheter förbehållna."
    }
  },
  fr: {
    translation: {
      "humanize": "Humaniser",
      "pricing": "Tarifs",
      "signIn": "Se connecter",
      "signOut": "Se déconnecter",
      "inputText": "Entrez votre texte ici",
      "uploadFile": "Télécharger un fichier",
      "download": "Télécharger",
      "copyright": "© 2024 AI Humanizer. Tous droits réservés."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;