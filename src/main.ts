import Vue from 'vue'
import App from './App.vue'
import Chakra, {CBox, CColorModeProvider, CReset, CThemeProvider} from "@chakra-ui/vue";
import {initializeApp} from 'firebase/app';
import router from './router'
import store from "@/utils/store";
import svgIcons from "@/utils/svgIcons";


const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJET_ID
};

initializeApp(firebaseConfig);

Vue.config.productionTip = false
Vue.use(Chakra, {icons: {extend: {...svgIcons}}});
new Vue({
    store,
    router,
    render: (h) => h(CThemeProvider, [
        h(CColorModeProvider, [
            h(CBox, [
                h(CReset),
                h(App)
            ])
        ])
    ])
}).$mount('#app');
