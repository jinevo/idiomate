<template><div></div></template>

<script lang="ts">
import Language from '@/types/language';

import Vue from 'vue';

import GRAMMARS from '@/constants/grammars';

declare global {
    interface Window {
        webkitSpeechRecognition: SpeechRecognition | undefined;
    }
}

export default Vue.extend({
    name: 'speech-recognizer',
    props: {
        grammars: {
            default: [],
            type: Array as () => string[],
        },
        lang: {
            default: '',
            type: String,
        },
    },
    data: () => {
        return {
            isCurrentSpeechFail: false,
            currentAttemptsCount: 0,
            currentGrammarIndex: 0,
            speechRecognition: (null as unknown) as SpeechRecognition,
        };
    },
    mounted() {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        this.speechRecognition = new SpeechRecognition();

        // Settings for speech recognition
        this.speechRecognition.interimResults = true;
        this.speechRecognition.lang = this.lang;
        this.speechRecognition.continuous = true;
        this.speechRecognition.maxAlternatives = 1;

        this.speechRecognition.onresult = event => {
            // Extract the transcript of the speech
            const results = Array.from(event.results)
                // Remove speech recongitions results from previous grammars
                // Remove previous attempts
                .slice(this.currentGrammarIndex + this.currentAttemptsCount);

            // The current speech of the user
            const currentSpeech = results
                .map(result => result[0].transcript)
                .join(' ');
            this.$emit('speech', currentSpeech);

            // Check match if has at least one final result
            if (results.some(result => result.isFinal)) {
                const transcript = results
                    .map(result => result[0].transcript)
                    .join(' ');

                // If transcript matchs with the expected grammar
                if (this.hasTranscriptionMatched(transcript)) {
                    // If all the grammars have been transcripted
                    // aborts the speech recognition

                    // If not
                    // Go the next grammar

                    if (this.currentGrammarIndex === this.grammars.length - 1) {
                        this.speechRecognition.abort();
                        this.$emit('language:done');
                    } else {
                        this.currentAttemptsCount = 0;
                        ++this.currentGrammarIndex;

                        this.$emit('grammar:success', this.currentGrammarIndex);
                    }
                } else {
                    this.currentAttemptsCount++;
                }
            }
        };

        this.speechRecognition.start();
    },
    methods: {
        hasTranscriptionMatched(transcription: string): boolean {
            return (
                transcription.trim().toLowerCase() ===
                this.grammars[this.currentGrammarIndex].toLowerCase()
            );
        },
    },
});
</script>
