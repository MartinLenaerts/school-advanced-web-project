import Vuex from 'vuex'
import {User} from "@/constants";
import Vue from "vue";
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        user: undefined as User | undefined
    },
    mutations: {
        setUser (state,user?: User) {
            state.user = user
        }
    },
    getters: {
        getUser: state => {
            return state.user
        }
    }
})

export default store