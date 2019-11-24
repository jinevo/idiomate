declare global {
    interface Window {
        webkitSpeechRecognition: SpeechRecognition | undefined;
    }
}

import Language from '@/types/language';

import Vue from 'vue';
import Vuex from 'vuex';

import LANGUAGES from '@/constants/languages';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        hasDeviceSpeechRecognitionFeature:
            typeof (
                window.SpeechRecognition ?? window.webkitSpeechRecognition
            ) === 'function',
        availableLanguages: LANGUAGES.filter(({ locale }) => {
            return (<Language['locale'][]>['en-EN', 'es-ES', 'fr-FR']).includes(
                locale
            );
        }),
    },
    getters: {
        isLocaleAvailable: state => (askedLocale: string): boolean => {
            return (
                !!askedLocale &&
                state.availableLanguages.some(
                    ({ locale }) => locale === askedLocale
                )
            );
        },
    },
});
