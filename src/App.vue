<template>
  <div>
    <!-- header. navbar etc -->

    <!-- hero section - Title, logo, landing page etc. For now named Header-->
    <div>
        <unnr-header></unnr-header>
    </div>

    <hr>  
  
    <!-- content section -->
    <!-- <div class="container"> -->
      <div>
        <!-- <unnr-letter-list></unnr-letter-list> -->
        <router-view :to="{ name: 'letterlist'}"></router-view>

      </div>      
      
    <!-- </div> -->

  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import LetterList from "./components/LetterList.vue";
import DrawLetter from "./components/tasks/DrawLetter.vue";

export default {
  components: {
    unnrHeader: Header,
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

<style scoped>


</style>
