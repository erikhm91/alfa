import Vue from 'vue';
import Vuex from 'vuex';
import Tasks from "../components/letterlist.json";
import AppList from "../components/userconfig/appconfig.json";
import LetterCoordinates from "../data/letter_coordinates.json";

Vue.use(Vuex);

export const store = new Vuex.Store({

    strict:true,
    state: {
        activeLetter: {},
        letters: Tasks.letters, //read from jsonfile
        appList: AppList.apps,
        taskImages: [],
        letterCoordinates: LetterCoordinates.letters,
        lowerCaseLetter: false

    },
    mutations: {
        TOGGLE_ENABLE_LETTER(state, letterObj) {
            var index = state.letters.findIndex(obj => obj.l === letterObj.l)
            state.letters[index].enabled = !state.letters[index].enabled;
        },
        SET_ACTIVE_LETTER_BY_OBJ(state, activeLetter) {
            state.activeLetter = activeLetter;
            console.log("updated active letter by obj");
        },
        SET_ACTIVE_LETTER(state, letter) {
        var index = state.letters.findIndex(obj => obj.l === letter)
            state.activeLetter = state.letters[index];
            console.log("updated active letter");
        },
        SET_LETTER_VISITED(state, letter) {
            // get index of element:
            var index = state.letters.findIndex(obj => obj.l === letter)
            state.letters[index].visit = true;
        },
        TOGGLE_ENABLE_APP(state, appId) {
            // console.log("toggle enable app triggered");
            var index = state.appList.findIndex(obj => obj.id === appId)
            state.appList[index].enabled = !state.appList[index].enabled;
        },
        SET_TASK_IMAGES(state, taskImages) {
            state.taskImages = taskImages;
        },
        CLEAR_TASK_IMAGES(state) {
            state.taskImages = [];
        },
        SET_LOWER_CASE_LETTER(state, bool) {
            state.lowerCaseLetter = bool;
        }

    },
    getters: {
        activeLetter : state => state.activeLetter,
        letters : state => state.letters,
        appList : state => state.appList,
        letterObject : state => letterParam => state.letters.find(obj => obj.l == letterParam),
        taskImages : state => state.taskImages,
        allLetterCoordinates : state => letterCoordinates,
        letterCoordinates : state => letterParam => state.letterCoordinates.find(obj => obj.l == letterParam),
        letterCoordinatesOfActiveLetter : state => state.letterCoordinates.find(obj => obj.l == state.activeLetter.l),
        lowerCaseLetter : state => state.lowerCaseLetter
    }

})