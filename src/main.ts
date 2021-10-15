import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Chakra, {CThemeProvider} from "@chakra-ui/vue";

Vue.config.productionTip = false
Vue.use(Chakra)
new Vue({
    router,
    render: (h) => h(CThemeProvider, [h(App)])
}).$mount('#app')
