import LetterDetails from './components/LetterDetails.vue';
import LetterList from './components/LetterList.vue';
import Footer from './components/Footer.vue';
import LetterTaskMenu from './components/LetterTaskMenu.vue';

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
    { path: '', component: LetterList, name: 'letterlist'},
    // { path: /menu}
    { path: '/letter', component: LetterDetails, name: 'details' },
    ,
    { path: '/b', component: Footer, name: 'footer' }



];