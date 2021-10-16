import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Chakra, {CBox, CColorModeProvider, CReset, CThemeProvider} from "@chakra-ui/vue";

Vue.config.productionTip = false
Vue.use(Chakra)
new Vue({
    router,
    render: (h) => h(CThemeProvider, [
        h(CColorModeProvider, [
            h(CBox, [
                h(CReset),
                h(App)
            ])
        ])
    ])
}).$mount('#app')
