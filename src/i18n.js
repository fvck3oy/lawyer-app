// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";

// // the translations
// // (tip move them in a JSON file and import them)
// const resources = {
//   en: {
//     translation: {
//       "Welcome to React": "Welcome to React and react-i18next"
//     }
//   }
// };

// i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     resources,
//     lng: "en",

//     keySeparator: false, // we do not use keys in form messages.welcome

//     interpolation: {
//       escapeValue: false // react already safes from xss
//     }
//   });

//   export default i18n;

import i18n from 'i18next'
import XHR from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

const allowedLanguages = ['en', 'th', 'cn'];

const defaultLng = 'th';
let lng = defaultLng;

const storageLanguage = localStorage.getItem('language');
if (storageLanguage && allowedLanguages.indexOf(storageLanguage) > -1) {
  lng = storageLanguage;
}

i18n
  .use(XHR)
  .use(initReactI18next)
  .init({
		lng,
  	fallbackLng: 'th',
  	ns: ['translations'],
  	defaultNS: 'translations',
  	debug: true,
  	interpolation: {
  		escapeValue: false
  	},
  	react: {
      wait: true,
      useSuspense: false,
  	}
  })

  export default i18n