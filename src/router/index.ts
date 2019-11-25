import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import Store from '@/store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/challenge',
        name: 'challenge',
        component: () =>
            import(
                /* webpackChunkName: "challenge" */ '../views/Challenge.vue'
            ),
    },
    {
        path: '/unavailable',
        name: 'unavailable',
        component: () =>
            import(
                /* webpackChunkName: "unavailable" */ '../views/Unavailable.vue'
            ),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach(async (from, to, next) => {
    // Ensure that device has Speech Recognition feature

    const routeUnavailableName = 'unavailable';
    const checkDevice = 'device;';
    if (
        from.name !== routeUnavailableName &&
        from.query.reason !== checkDevice &&
        Store.state.hasDeviceSpeechRecognitionFeature === false
    ) {
        return next({
            name: routeUnavailableName,
            query: {
                reason: checkDevice,
            },
        });
    }

    // const checkAudio = 'audio';
    // // Ensure permission to access audio is granted
    // if (
    //     from.name !== routeUnavailableName &&
    //     from.query.reason !== checkAudio
    // ) {
    //     try {
    //         await navigator.mediaDevices.getUserMedia({ audio: true });
    //     } catch (e) {
    //         return next({
    //             name: routeUnavailableName,
    //             query: {
    //                 reason: checkAudio,
    //             },
    //         });
    //     }
    // }

    next();
});

export default router;
