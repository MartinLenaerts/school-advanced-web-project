import Vue from 'vue'
import VueRouter, {NavigationGuardNext, RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import Connection from '../views/Connection.vue'
import Register from '../views/Register.vue'
import Profil from '../views/Profil.vue'
import Ads from '../views/Ads.vue'
import store from "@/utils/store"

Vue.use(VueRouter)

function loggedIn(next: NavigationGuardNext<Vue>) {
    const user = store.state.user;
    if (user) {
        next("/")
    } else next();
}

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/sign-in',
        name: 'SignIn',
        component: Connection,
        beforeEnter(to, from, next) {
            loggedIn(next);
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        beforeEnter(to, from, next) {
            loggedIn(next);
        }
    },
    {
        path: '/profil',
        name: "Profil",
        component: Profil,
        beforeEnter(to, from, next) {
            const user = store.state.user;
            if (user) {
                next()
            } else next("/");
        }
    },
    {
        path: '/ads',
        name: "Ads",
        component: Ads,
        beforeEnter(to, from, next) {
            const user = store.state.user;
            if (user) {
                next()
            } else next("/");
        }
    },
    {
        path: '/product/:id',
        name: "Product",
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductView.vue'),
        props: true
    },
    {
        path: '/messages',
        name: "Messages",
        component: () => import(/* webpackChunkName: "about" */ '../views/Messages.vue'),
        beforeEnter(to, from, next) {
            const user = store.state.user;
            if (user) {
                next()
            } else next("/");
        }
    }

]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
