<template>
    <div class="home">
        <h1>
            Sorry, the app is not available
        </h1>
        {{ reason }}
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Reasons from '@/constants/unavailableReasons';

export default Vue.extend({
    name: 'unavailable',
    data: () => {
        return {
            reason: '',
        };
    },
    created() {
        this.reason = Reasons[this.$route.query.reason as keyof typeof Reasons];
    },
});
</script>
