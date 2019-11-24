<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-toolbar-title class="headline">
                <v-row align="center" class="ml-0">
                    <v-col class="font-weight-light">
                        Idiomate
                        <v-chip
                            class="ma-0"
                            small
                            color="blue"
                            text-color="white"
                        >
                            beta
                        </v-chip>
                    </v-col>
                </v-row>
            </v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container>
                <router-view />
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'App',
});
</script>
