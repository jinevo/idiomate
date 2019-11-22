<template>
    <div class="Challenge">
        <div v-if="!isLocaleAvailable($route.query.locale)">
            You are trying to play with a language that is not available now !
        </div>
        <SpeechRecognizer
            v-else
            :grammars="grammars"
            :lang="$route.query.locale"
        />
    </div>
</template>

<script lang="ts">
import Language from '@/types/language';

import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';

import SpeechRecognizer from '@/components/SpeechRecognizer.vue';

import GRAMMARS from '@/constants/grammars';

export default Vue.extend({
    name: 'challenge',
    components: {
        SpeechRecognizer,
    },
    computed: {
        grammars(): string[] {
            return (
                GRAMMARS.get(
                    (this.$route.query.locale as unknown) as Language['locale']
                ) ?? []
            );
        },
        ...mapState(['availableLanguages']),
        ...mapGetters(['isLocaleAvailable']),
    },
});
</script>
