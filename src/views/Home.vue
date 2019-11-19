<template>
  <div class="home">
    <h1>Idiomate everywhere with anyone !</h1>
    <p>Who has the best international pronounciation ?</p>
    <v-select label="Pick-up a language" :items="[{text: 'French', value: 'fr_FR'}]" />
    <v-btn primary @click="play">Play</v-btn>
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
      text: "",
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

    this.recognition.interimResults = true;
    this.recognition.lang = "es-PE";

    this.recognition.onresult = event => {
      this.text = event.results[0][0].transcript;
      console.log(event.results[0][0].transcript);
    };
  },
  methods: {
    play() {
      this.$router.replace({ name: "challenge" });
    }
  }
});
</script>
