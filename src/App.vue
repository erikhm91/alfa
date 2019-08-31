<template>
  <div class="container">
    <div class="row">
      <header class="col-md-12 text-center">
        <unnr-header></unnr-header>
      </header>
    </div>

    <div class="row">
      <div class="col-md-12 text-center">
        <unnr-letter-list></unnr-letter-list>
      </div>
    </div>

    <!-- <div class="row">
      <footer class="col-md-12 text-center">
        <unnr-footer></unnr-footer>
      </footer>
    </div> -->
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

.container {
  margin-top: 30px;
}

</style>
