<template>
    <div class="challenge-launcher">
        <v-select
            v-model="selectedLanguage"
            label="Pick-up a language"
            item-text="label"
            item-value="locale"
            :items="availableLanguages"
            return-object
        />
        <v-btn :disabled="!selectedLanguage" primary @click="play">Play</v-btn>
    </div>
</template>

<script lang="ts">
import Language from '@/types/language';

import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
    name: 'challenge-launcher',
    data: () => {
        return {
            selectedLanguage: (null as unknown) as Language,
        };
    },
    methods: {
        play() {
            this.$router.push({
                name: 'challenge',
                query: {
                    locale: this.selectedLanguage.locale,
                },
            });
        },
    },
    computed: {
        ...mapState(['availableLanguages']),
    },
});
</script>
