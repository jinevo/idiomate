<template>
    <div class="home">
        <h1>Idiomate everywhere with anyone !</h1>
        <p>Who has the best international pronounciation ?</p>
        <v-select
            v-model="selectedLanguage"
            label="Pick-up a language"
            item-text="label"
            item-value="locale"
            :items="availableLanguages"
        />
        <v-btn :disabled="!selectedLanguage" primary @click="play">Play</v-btn>
    </div>
</template>

<script lang="ts">
import Language from '@/types/language';

import Vue from 'vue';
import { mapState } from 'vuex';

import LANGUAGES from '@/constants/languages';

declare global {
    interface Window {
        webkitSpeechRecognition: SpeechRecognition | undefined;
    }
}

export default Vue.extend({
    name: 'home',
    data: () => {
        return {
            selectedLanguage: (null as unknown) as Language['locale'],
        };
    },
    mounted() {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
    },
    methods: {
        play() {
            this.$router.push({
                name: 'challenge',
                query: {
                    language: this.selectedLanguage,
                },
            });
        },
    },
    computed: {
        ...mapState(['availableLanguages']),
    },
});
</script>
