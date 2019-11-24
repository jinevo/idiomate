<template>
    <div class="speech-recognizer">
        <v-flex class="flex-column justify-center align-center">
            <!-- <v-btn :disabled="isAudioActive" @click="startAudio">Put the mic on !</v-btn> -->
            <h1>
                Just say the sentence the best as you can !
            </h1>
            <br />
            <v-card elevation="24" class="mx-auto">
                <v-carousel
                    :continuous="false"
                    :show-arrows="false"
                    delimiter-icon="mdi-check"
                    height="300"
                    :value="currentGrammarIndex"
                >
                    <v-carousel-item v-for="(grammar, i) in grammars" :key="i">
                        <v-sheet height="100%" tile>
                            <v-row
                                class="fill-height"
                                align="center"
                                justify="center"
                            >
                                <div class="display-1 pa-6">
                                    <div>
                                        <v-icon>mdi-microphone</v-icon>
                                        {{ grammar }}
                                    </div>
                                    <div
                                        style="position: absolute;"
                                        class="subtitle-1 red--text"
                                    >
                                        {{ currentSpeech || ' ' }}
                                    </div>
                                </div>
                            </v-row>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </v-card>
        </v-flex>
    </div>
</template>

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
            currentSpeech: '',
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
            this.currentSpeech = results
                .map(result => result[0].transcript)
                .join(' ');

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
                    } else {
                        this.currentAttemptsCount = 0;
                        this.currentGrammarIndex++;
                    }
                } else {
                    this.currentAttemptsCount++;
                }

                this.currentSpeech = '';
            }
        };

        this.speechRecognition.start();
    },
    methods: {
        startAudio() {
            this.speechRecognition.start();
        },
        hasTranscriptionMatched(transcription: string): boolean {
            return (
                transcription.trim().toLowerCase() ===
                this.grammars[this.currentGrammarIndex].toLowerCase()
            );
        },
    },
});
</script>
