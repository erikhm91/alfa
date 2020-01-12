<template>
  <div class="container">
    <ul class="row list-group-inline justify-content-center">
      <li
        class="list-group-item rounded-lg col-2 border-primary text-center"
        :class="computedColor(letter)"
        v-for="(letter, i) in enabledLetters"
        v-bind:key="i"
        @click="selectLetter(letter)"
      >{{ letter.l }} {{ letter.l.toLowerCase() }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      letterClicked: false,
      selectedLetter: {},
      letters : this.$store.getters.letters
    };
  },
  computed: {
    enabledLetters() {
      return this.$store.getters.letters.filter(function(letter) {
        return letter.enabled;
      })
    }
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
      //update store with selected letter, so can easily get it in the letterdetails component. Should really be route/url parameter
      this.$store.commit("SET_ACTIVE_LETTER", letter);
      //navigate to router programmatically:
      this.$router.push({ name: "menu" });
    }
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