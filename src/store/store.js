import Vue from 'vue';
import Vuex from 'vuex';
import Tasks from "../components/letterlist.json";
import AppList from "../components/userconfig/appconfig.json";

Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        activeLetter: {},
        letters: Tasks.letters, //read from jsonfile
        appList: AppList.apps
    },
    mutations: {
        TOGGLE_ENABLE_LETTER(state, letterObj) {
            var index = state.letters.findIndex(obj => obj.l === letterObj.l)
            state.letters[index].enabled = !state.letters[index].enabled;
        },
        SET_ACTIVE_LETTER(state, activeLetter) {
            state.activeLetter = activeLetter;
        },
        SET_LETTER_VISITED(state, letter) {
            // get index of element:
            var index = state.letters.findIndex(obj => obj.l === letter)
            state.letters[index].visit = true;
        },
        TOGGLE_ENABLE_APP(state, appObj) {
            var index = state.appList.findIndex(obj => obj.id === appObj.id)
            state.appList[index].enabled = !state.appList[index].enabled;
        }
    },
    getters: {
        activeLetter : state => state.activeLetter,
        letters : state => state.letters,
        appList : state => state.appList,
        
    }

})