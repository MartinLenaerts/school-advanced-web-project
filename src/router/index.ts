import Vue from 'vue'
import VueRouter, {NavigationGuardNext, RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

function loggedIn(next : NavigationGuardNext<Vue>){
    const session = Vue.prototype.$session;
    if (session.exists()) {
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
        component: () => import(/* webpackChunkName: "about" */ '../views/Connection.vue'),
        beforeEnter(to, from, next) {
            loggedIn(next);
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
        beforeEnter(to, from, next) {
            loggedIn(next);
        }
    },
    {
        path: '/profil',
        name: "Profil",
        component: () => import(/* webpackChunkName: "about" */ '../views/Profil.vue'),
        beforeEnter(to, from, next) {
            const session = Vue.prototype.$session;
            if (session.exists()) {
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
