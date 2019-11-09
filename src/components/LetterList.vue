<template>
  <div class="container">
    <!-- 
    <div v-if="!letterClicked" class="container">-->

    <ul class="row list-group-inline justify-content-center">
      <!-- "list-unstyled text-center list-group-inline"> -->

      <!-- "letter list-group-item list-group-item-action rounded-circle border-primary" -->
      <li
        class="list-group-item rounded-lg col-2 border-primary text-center"
        :class="computedColor(letter)"
        v-for="(letter, i) in letters"
        v-bind:key="i"
        @click="selectLetter(letter)"
      >{{ letter.l }} {{ letter.l.toLowerCase() }}</li>
      <!--  {{ letter.l }} {{ letter.l.toLowerCase() }} -->
      <!-- <unnr-letter-list-item :text=letter.l></unnr-letter-list-item> -->
    </ul>
    <!-- </div> -->

    <!--  <div v-else>
      <unnr-letter-details  @backToList="backToList()"></unnr-letter-details>    :letter="selectedLetter"
    </div>-->
  </div>
</template>

<script>
export default {
  // components: {
  //   unnrLetterDetails: LetterDetails
  // },
  data() {
    return {
      letterClicked: false,
      selectedLetter: {},
      // letters: Tasks.letters //read from jsonfile
      letters : this.$store.getters.letters
    };
  },

  methods: {
    computedColor(letter) {
      if (letter.visit === true) {
        return "visited";
      } else {
        return "";
      }
    },

    selectLetter(letter) {
      this.selectedLetter = letter;
      this.letterClicked = true;

      //update store with selected letter, so can easily get it in the letterdetails component.
      this.$store.commit("SET_ACTIVE_LETTER", letter);

      //navigate to router programmatically:
      this.$router.push({ name: "menu" });
    },
    // updateLetterStatus() {
    //   if (this.letterClicked == true) {
    //     this.letterClicked = false;
    //     // update lettercolor to visited by setting class:
    //     this.selectedLetter.visit = true;
    //     console.log("Updated color visit: " + this.selectedLetter);
    //   }
    // }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";

li {
  // display: inline;
  margin: 0.5rem;
  cursor: pointer;
  font-size: 2.8rem;
  font-weight: bold;
  // background-color: $primary;
  border: 0.5rem solid;
  height: 7rem;
  -webkit-box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.05);
  background-color: $letterlistcolor;
  color: white;
  white-space: nowrap;
}

.visited {
  background-color: $success;
}
</style> 