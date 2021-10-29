import Vuex from 'vuex'
import {User} from "@/constants";
import Vue from "vue";

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        user: undefined as User | undefined,
        error: undefined as Error | undefined
    },
    mutations: {
        setUser(state, user?: User) {
            state.user = user
        },
        setError(state, error?: Error) {
            state.error = error
        }
    },
    getters: {
        getUser: state => {
            return state.user
        },
        getError: state => {
            return state.error
        }
    }
})

export default store