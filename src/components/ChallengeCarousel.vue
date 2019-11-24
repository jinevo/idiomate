<template>
    <div class="speech-recognizer">
        <v-flex class="flex-column justify-center align-center">
            <!-- <v-btn :disabled="isAudioActive" @click="startAudio">Put the mic on !</v-btn> -->
            <v-card elevation="24" class="mx-auto">
                <v-carousel
                    :continuous="false"
                    :show-arrows="false"
                    delimiter-icon="mdi-check"
                    height="300"
                    :value="position"
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
                                        class="speech-content subtitle-1"
                                    >
                                        {{ speech || ' ' }}
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
import Vue from 'vue';

export default Vue.extend({
    name: 'challenge-carousel',
    props: {
        grammars: {
            default: [],
            type: Array as () => string[],
        },
        speech: {
            default: '',
            type: String,
        },
        position: {
            default: 0,
            type: Number,
        },
    },
});
</script>
