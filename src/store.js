import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        notes: ["a" , "b"]
    },
    actions: {
        addNote({commit}, note) {
            commit('ADD_NOTE', note)
        }
    },
    mutations: {
        ADD_NOTE(state, note) {
            state.notes.push(note)
        }
    },
    getters: {
        notes(state) {
            return state.notes
        }
    },  
    modules: {
        // Это приложение слишком маленькое для модулей...
    }
 })
 