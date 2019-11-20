<template>
  <div class="Challenge">
    <v-flex class="flex-column justify-center align-center">
      <!-- <v-btn :disabled="audioActive" @click="startAudio">Put the mic on !</v-btn> -->
      <h1>
        <v-icon>mid-microphone</v-icon>Say
      </h1>
      <br />
      <strong>"{{ sentencesToMath[currentSentenceIndex] }}"</strong>
      <v-chip
        v-for="(transcript, index) of transcriptions"
        :key="index"
        :color="transcriptionMatched(transcript) ? 'green' : 'red'"
        class="ma-2"
      >{{transcript}}</v-chip>
    </v-flex>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

declare global {
  interface Window {
    webkitSpeechRecognition: SpeechRecognition | undefined;
  }
}

export default Vue.extend({
  name: "home",
  data: () => {
    return {
      currentSentenceIndex: 0,
      sentencesToMath: [
        "Oui",
        "Voiture",
        "Je suis le meilleur",
        "Je collectionne les papillons",
        "Hier je suis allé voir un film au cinéma"
      ],
      successSentences: [] as string[],
      transcriptions: [] as string[],
      audioActive: false,
      recognition: (null as unknown) as SpeechRecognition
    };
  },
  components: {
    // HelloWorld
  },
  mounted() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    //this.recognition.interimResults = true;
    this.recognition.lang = "fr-FR";
    this.recognition.continuous = true;

    this.recognition.onresult = event => {
      const lastSpeechResult = Array.from(event.results).pop();

      if (!lastSpeechResult) return;

      const lastTranscription = lastSpeechResult[0].transcript;
      this.transcriptions.push(lastTranscription);

      if (this.transcriptionMatched(lastTranscription)) {
        if (this.currentSentenceIndex === this.sentencesToMath.length - 1) {
          this.recognition.stop();
        } else {
          this.successSentences.push(lastTranscription);
          this.currentSentenceIndex++;
          this.transcriptions = [];
        }
      }
    };

    this.recognition.onaudiostart = event => {
      this.audioActive = true;
    };
    this.recognition.onaudioend = event => {
      this.audioActive = false;
      console.log("onaudioend");
    };
    this.recognition.onspeechend = event => {};
    this.recognition.onerror = error => {
      this.audioActive = false;
      console.log(error)
    };
    this.recognition.onnomatch = event => {
      this.audioActive = false;
    };

    this.recognition.start();
  },
  methods: {
    startAudio() {
      this.recognition.start();
    },
    transcriptionMatched(transcription: string): boolean {
      return (
        transcription.trim() ===
        this.sentencesToMath[this.currentSentenceIndex].toLowerCase()
      );
    }
  }
});
</script>
