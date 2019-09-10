<template>
  <div>
    <!-- header. navbar etc -->

    <!-- hero section - Title, logo, landing page etc. For now named Header-->
    <div>
        <unnr-hero></unnr-hero>
    </div>

    <!-- content section -->
    <div class="container">
      <div>
        <unnr-letter-list></unnr-letter-list>
      </div>
    </div>

    <!-- <div class="row">
      <footer class="col-md-12 text-center">
        <unnr-footer></unnr-footer>
      </footer>
    </div>-->
  </div>
</template>

<script>
import Hero from "./components/Hero.vue";
import Footer from "./components/Footer.vue";
import LetterList from "./components/LetterList.vue";
import DrawLetter from "./components/tasks/DrawLetter.vue";

export default {
  components: {
    unnrHero: Hero,
    unnrFooter: Footer,
    unnrLetterList: LetterList,
    unnrDrawLetter: DrawLetter
  },

  methods: {
    clickLetter() {
      console.log("bokstav ble trykket på!");
    },
    letterUpper(param) {
      return param.toUpperCase();
    }
  }
};
</script>

<style>
/* div {
  font-family: "Comic Sans MS", cursive, sans-serif;
} */
/* @import './styles/global.scss' */

</style>
