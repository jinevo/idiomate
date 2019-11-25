<template>
    <div class="Challenge">
        <div v-if="!isLocaleAvailable($route.query.locale)">
            You are trying to play with a language that is not available now !
        </div>
        <div v-else>
            <v-slide-x-transition mode="out-in">
                <div v-if="!isLanguageDone" key="todo">
                    <h1>
                        Just say the sentence the best as you can !
                    </h1>
                    <SpeechRecognizer
                        :grammars="grammars"
                        :lang="$route.query.locale"
                        @grammar:success="onGrammarSuccess"
                        @speech="onSpeech"
                        @language:done="onLanguageDone"
                    />
                    <ChallengeCarousel
                        :speech="speech"
                        :position="grammarSuccessPosition"
                        :grammars="grammars"
                    />
                </div>
                <div v-else key="done">
                    <h1>
                        <v-icon>mdi-check</v-icon>
                        ! You have just completed the
                        {{ languageLabel }} language !
                    </h1>
                    <h2>Try with an other language</h2>
                    <ChallengeLauncher />
                </div>
            </v-slide-x-transition>
        </div>
    </div>
</template>

<script lang="ts">
import Language from '@/types/language';

import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';

import SpeechRecognizer from '@/components/SpeechRecognizer.vue';
import ChallengeCarousel from '@/components/ChallengeCarousel.vue';
import ChallengeLauncher from '@/components/ChallengeLauncher.vue';

import GRAMMARS from '@/constants/grammars';
import LANGUAGES from '@/constants/languages';

export default Vue.extend({
    name: 'challenge',
    data: () => {
        return {
            speech: '',
            grammarSuccessPosition: 0,
            isLanguageDone: false,
        };
    },
    watch: {
        $route(to, from) {
            // Rest if new language is asked
            this.isLanguageDone = false;
            this.speech = '';
            this.grammarSuccessPosition = 0;
        },
    },
    components: {
        ChallengeCarousel,
        ChallengeLauncher,

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
        languageLabel(): string {
            return (LANGUAGES.find(
                ({ locale }) => locale === this.$route.query.locale
            ) as Language).label;
        },
        ...mapState(['availableLanguages']),
        ...mapGetters(['isLocaleAvailable']),
    },
    methods: {
        onGrammarSuccess(position: number): void {
            this.grammarSuccessPosition = position;
            this.speech = '';
        },
        onLanguageDone(): void {
            this.isLanguageDone = true;
        },
        onSpeech(speech: string): void {
            this.speech = speech;
        },
    },
});
</script>
