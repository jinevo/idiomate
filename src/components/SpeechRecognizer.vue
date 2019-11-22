<template>
    <div class="speech-recognizer">
        <v-flex class="flex-column justify-center align-center">
            <!-- <v-btn :disabled="isAudioActive" @click="startAudio">Put the mic on !</v-btn> -->
            <h1>
                <v-icon>mid-microphone</v-icon>
                Say
            </h1>
            <br />
            <strong>"{{ grammars[currentGrammerIndex] }}"</strong>
            <v-chip
                v-for="(transcript, index) of receivedTranscriptions"
                :key="index"
                :color="hasTranscriptionMatched(transcript) ? 'green' : 'red'"
                class="ma-2"
            >
                {{ transcript }}
            </v-chip>
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
            currentGrammerIndex: 0,
            successGrammers: [] as string[],
            receivedTranscriptions: [] as string[],
            isAudioActive: false,
            speechRecognition: (null as unknown) as SpeechRecognition,
        };
    },
    components: {
        // HelloWorld
    },
    mounted() {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        this.speechRecognition = new SpeechRecognition();

        // Settings for speech recognition
        this.speechRecognition.lang = this.lang;
        this.speechRecognition.continuous = true;

        this.speechRecognition.onresult = event => {
            //Get last speech
            const lastSpeechResult = Array.from(event.results).pop();

            if (!lastSpeechResult) return;

            // Extract the transcript of the speech
            const lastTranscription = lastSpeechResult[0].transcript;

            // Add the transcription to the list
            this.receivedTranscriptions.push(lastTranscription);

            // Check if transcript matchs with the expected grammar
            if (this.hasTranscriptionMatched(lastTranscription)) {
                // If it is the very last one
                // stops the speech recognition

                // If not
                // Go the next grammar

                if (this.currentGrammerIndex === this.grammars.length - 1) {
                    this.speechRecognition.stop();
                } else {
                    this.successGrammers.push(lastTranscription);
                    this.currentGrammerIndex++;
                    this.receivedTranscriptions = [];
                }
            }
        };

        this.speechRecognition.onaudiostart = event => {
            this.isAudioActive = true;
        };
        this.speechRecognition.onaudioend = event => {
            this.isAudioActive = false;
            console.log('onaudioend');
        };
        this.speechRecognition.onspeechend = event => {};
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
