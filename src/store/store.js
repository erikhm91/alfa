import Vue from 'vue';
import Vuex from 'vuex';
import Tasks from "../components/writing_tasks.json";

Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        activeLetter: {},
        letters: Tasks.letters //read from jsonfile
    },
    mutations: {
        SET_ACTIVE_LETTER(state, activeLetter) {
            state.activeLetter = activeLetter;
        },
        SET_LETTER_VISITED(state, letter) {
            // get index of element:
            var index = state.letters.findIndex(obj => obj.l === letter)
            state.letters[index].visit = true;
        }
    },
    getters: { //se om det fungerer med denne syntaxen
        activeLetter : state => state.activeLetter,
        letters : state => state.letters
    }

})