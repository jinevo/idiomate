import Language from '@/types/language';

import Vue from 'vue';
import Vuex from 'vuex';

import LANGUAGES from '@/constants/languages';
console.log(LANGUAGES);
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        availableLanguages: LANGUAGES.filter(({ locale }) => {
            return (<Language['locale'][]>['en_EN', 'es_ES', 'fr_FR']).includes(
                locale
            );
        }),
    },
    mutations: {},
    actions: {},
    modules: {},
});
