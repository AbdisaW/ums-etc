import i18n from "i18n";
import path from "path";

i18n.configure({
    locales: ['en', 'am', 'or'], // English, Amharic, Afaan Oromoo
    directory: path.join(process.cwd(), 'locals'),
    defaultLocale: 'en',
    queryParameter: 'lang', // optional: ?lang=am
    objectNotation: true,
    autoReload: true,
});

export default i18n;
