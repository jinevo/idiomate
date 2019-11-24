<template>
    <div class="home">
        <h1>Idiomate everywhere with anyone !</h1>
        <p>Who has the best international pronounciation ?</p>
        <ChallengeLauncher />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ChallengeLauncher from '@/components/ChallengeLauncher.vue';

export default Vue.extend({
    name: 'home',
    components: {
        ChallengeLauncher,
    },
});
</script>
