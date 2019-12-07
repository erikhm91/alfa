<template>
  <div class="container">

        <div class="row">
      <div class="col-1 headertool"> <!-- backbutton class overrides bootstrap positioning. -->
        <span @click="navigateToConfig()">
              <unnr-config-symbol height="100px" width="100px"></unnr-config-symbol>
        </span>
      </div>
    </div>
    <!-- 
    <div v-if="!letterClicked" class="container">-->

    <ul class="row list-group-inline justify-content-center">
      <!-- "list-unstyled text-center list-group-inline"> -->

      <!-- "letter list-group-item list-group-item-action rounded-circle border-primary" -->
      <li
        class="list-group-item rounded-lg col-2 border-primary text-center"
        :class="computedColor(letter)"
        v-for="(letter, i) in enabledLetters"
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
import ConfigSymbol from "./icons/ConfigSymbol.vue";
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

  components: {
    UnnrConfigSymbol: ConfigSymbol
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

      //update store with selected letter, so can easily get it in the letterdetails component.
      this.$store.commit("SET_ACTIVE_LETTER", letter);
      //navigate to router programmatically:
      this.$router.push({ name: "menu" });
    },
    navigateToConfig() {
      console.log("navigating to config");
      this.$router.push({ name: "config" });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";

.headertool {
  height: 6rem;
  position: absolute; top: 1rem; right: 1rem; 
}

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