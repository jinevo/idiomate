<template>
    <div class="speech-recognizer">
        <v-flex class="flex-column justify-center align-center">
            <!-- <v-btn :disabled="isAudioActive" @click="startAudio">Put the mic on !</v-btn> -->
            <h1>
                <v-icon>mid-microphone</v-icon>
                Say
            </h1>
            <br />
            <v-card elevation="24" class="mx-auto">
                <v-carousel
                    :continuous="false"
                    :cycle="false"
                    :show-arrows="false"
                    hide-delimiter-background
                    delimiter-icon="mdi-minus"
                    height="300"
                    :value="currentGrammerIndex"
                >
                    <v-carousel-item v-for="(grammer, i) in grammars" :key="i">
                        <v-sheet height="100%" tile>
                            <v-row
                                class="fill-height"
                                align="center"
                                justify="center"
                            >
                                <div class="display-3">{{ grammer }}</div>
                            </v-row>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>

                {{ currentSpeech }}
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
            currentAttempts: 0,
            currentGrammerIndex: 0,
            successGrammers: [] as string[],
            isAudioActive: false,
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
            console.log(event.results);
            // Extract the transcript of the speech
            const results = Array.from(event.results)
                // Remove speech recongitions results from previous grammars
                // Remove previous attempts
                .slice(this.currentGrammerIndex + this.currentAttempts);

            // Display current speech to the user
            this.currentSpeech = results
                .map(result => result[0].transcript)
                .join(' ');

            // Check match if has at least of final result
            if (results.some(result => result.isFinal)) {
                const transcript = results
                    .map(result => result[0].transcript)
                    .join(' ');

                // Check if transcript matchs with the expected grammar
                if (this.hasTranscriptionMatched(transcript)) {
                    // If all the grammars have been transcripted
                    // stops the speech recognition

                    // If not
                    // Go the next grammar

                    if (this.currentGrammerIndex === this.grammars.length - 1) {
                        this.speechRecognition.stop();
                    } else {
                        this.currentAttempts = 0;
                        this.currentGrammerIndex++;
                    }
                } else {
                    this.currentAttempts++;
                }
            }
        };

        this.speechRecognition.onnomatch = event => {
            this.isAudioActive = true;
            console.log('no match');
        };

        this.speechRecognition.onaudiostart = event => {
            this.isAudioActive = true;
            console.log('onaudiostart');
        };
        this.speechRecognition.onaudioend = event => {
            this.isAudioActive = false;
            console.log('onaudioend');
        };
        this.speechRecognition.onsoundstart = event => {
            this.isAudioActive = true;
            console.log('onsoundstart');
        };
        this.speechRecognition.onsoundend = event => {
            this.isAudioActive = false;
            console.log('onsoundend');
        };
        this.speechRecognition.onspeechstart = event => {
            console.log('onspeechstart');
        };
        this.speechRecognition.onspeechend = event => {
            console.log('onspeechend');
        };
        this.speechRecognition.onerror = error => {
            this.isAudioActive = false;
            console.log(error);
        };
        this.speechRecognition.onnomatch = event => {
            this.isAudioActive = false;
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
                this.grammars[this.currentGrammerIndex].toLowerCase()
            );
        },
    },
});
</script>
