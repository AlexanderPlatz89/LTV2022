import { createI18n } from 'vue-i18n';
import en from '@/lang/en.json';
import it from '@/lang/it.json';

export const i18n = createI18n({
    locale: navigator.language,
    fallbackLocale: 'en',
    silentTranslationWarn:true,
    silentFallbackWarn: true,
    messages: { en: en, it: it}
})
