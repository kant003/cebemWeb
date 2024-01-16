import es from './es.json';
import en from './en.json';
const LANGUAGES = {
    es: 'es',
    en: 'en'
};

/* interface Locale {
    name: string;
    flag: string;
} */
export const getI18N = ({currentLocale = 'es'}: {currentLocale: string}) => {
    if(currentLocale === LANGUAGES.es) return es
    if(currentLocale === LANGUAGES.en) return en
}
