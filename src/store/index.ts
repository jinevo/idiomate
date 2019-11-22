import Language from '@/types/language';

import Vue from 'vue';
import Vuex from 'vuex';

import LANGUAGES from '@/constants/languages';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        availableLanguages: LANGUAGES.filter(({ locale }) => {
            return (<Language['locale'][]>['en-EN', 'es-ES', 'fr-FR']).includes(
                locale
            );
        }),
    },
    mutations: {},
    actions: {},
    modules: {},
});
