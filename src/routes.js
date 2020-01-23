import LetterDetails from './components/LetterDetails.vue';
import LetterList from './components/LetterList.vue';
import Footer from './components/Footer.vue';
import LetterTaskMenu from './components/LetterTaskMenu.vue';
import FindOnPicture from './components/tasks/FindOnPicture.vue';
import Config from './components/userconfig/Config.vue';
import WriteWord from './components/WriteWord.vue';
import AppLibrary from './components/userconfig/AppLibrary.vue';
import { store } from './store/store.js';
// const Bar = () => import(/* webpackChunkName: "bar" */ './Bar.vue')
// const Baz = () => import(/* webpackChunkName: "bar" */ './Baz.vue')


// new attempt lazy loading - not working...
// const LetterDetails = () => import(/* webpackChunkName: "letter" */ './components/LetterDetails.vue')


// //lazy loading:
// const LetterDetails = resolve => {
//     require.ensure(['./components/LetterDetails.vue'], () => {
//         resolve(require('./components/LetterDetails.vue'));
//     }
//     );
// }

export const routes = [/* 
    {path: '', component: App }, */

    { path: '', component: LetterList, name: 'letterlist' },
    { path: '/menu', component: LetterTaskMenu, name: 'menu' },
    { path: '/writeword', component: WriteWord, name: 'writeword' },
    {
        path: '/trackletter/:letter', component: LetterDetails, props: true, name: 'trackletter',
        beforeEnter(to, from, next) {
            // // loadImage(next);
            console.log("param:" + to.params.letter);
            // console.log("navigated to trackletter route, beforeEnter");
            store.commit("SET_ACTIVE_LETTER", to.params.letter);
            next();
        },
        beforeUpdate(to, from, next) {
            store.commit("SET_ACTIVE_LETTER", to.params.letter);
            next();
        }
    },
    { path: '/find', component: FindOnPicture, name: 'findonpicture' },
    { path: '/config', component: Config, name: 'config' },
    { path: '/config/apps', component: AppLibrary, name: 'applibrary' }

];