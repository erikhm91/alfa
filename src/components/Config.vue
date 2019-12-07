<template>
  <div class="container">

    <div class="row">
      <div class="col-1 headertool">
        <span @click="backToList()" class="clickable">
              <unnr-arrow-back></unnr-arrow-back>
        </span>
      </div>
    </div>

    <ul class="row list-group-inline justify-content-center">
      <li
        class="list-group-item rounded-lg col-2 border-primary text-center"
        :class="computedColorActive(letter)"
        v-for="(letter, i) in letters"
        v-bind:key="i"
        @click="selectLetter(letter)"
      >{{ letter.l }} {{ letter.l.toLowerCase() }}</li>
    </ul>
  </div>
</template>

<script>
import ArrowBack from "./icons/ArrowBack.vue";
export default {
  data() {
    return {
      letterClicked: false,
      selectedLetter: {},
      letters : this.$store.getters.letters
    };
  },

  components: {
    unnrArrowBack: ArrowBack
  },

  methods: {
    backToList() {
      this.$router.push({ name: 'letterlist'});
    },

    computedColorActive(letter) {
      if (letter.enabled === true) {
        return "enabledletter";
      } else {
        return "disabledletter";
      }
    },

    selectLetter(letter) {
      this.selectedLetter = letter;
      this.letterClicked = true;

      //enable letter in store so it is visible in letterlist
      this.$store.commit("TOGGLE_ENABLE_LETTER", letter);
    },
  }
};
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";

.headertool {
  height: 6rem;
  position: absolute; top: 1rem; left: 1rem;
  cursor: pointer;
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
  // background-color: $letterlistcolor;
  color: white;
  white-space: nowrap;
}

.enabledletter {
  background-color: $letterlistcolor;
}

.disabledletter {
  background-color: $pencilcolor;
}

</style> 