import LetterDetails from './components/LetterDetails.vue';
import LetterList from './components/LetterList.vue';
import Footer from './components/Footer.vue';
import LetterTaskMenu from './components/LetterTaskMenu.vue';
import FindOnPicture from './components/tasks/FindOnPicture.vue';
import Config from './components/userconfig/Config.vue';
import WriteWord from './components/WriteWord.vue';
import AppLibrary from './components/userconfig/AppLibrary.vue';
import { store } from './store/store.js';
import { FormSelectPlugin } from 'bootstrap-vue';
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
            // console.log("param:" + to.params.letter);
            store.commit("SET_ACTIVE_LETTER", to.params.letter);
            //preload taskImages
            const loadedImages = preloadArrayOfImages(store.getters.letterObject(to.params.letter).tasks);
            store.commit("SET_TASK_IMAGES", loadedImages);
            setTimeout(() => {
                next();
            }, 2000);
            
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

function preloadArrayOfImages(images) {
    let loadedImages = [];
    images.forEach(element => {
        console.log(element);
        loadedImages.push(preloadImage(element.image, element.alt));
    });
    return loadedImages;
}

function preloadImage(url, alt) {
    var image = new Image();
    image.onload = function() {
        console.log("image is now loaded");
    }
    image.src = url;
    image.alt = alt;
    console.log("image loaded: " + url);
    return image;
}