<template>
  <div>
    <div v-if="!letterClicked">
      <ul class="row list-group-inline justify-content-center">
        <!-- "list-unstyled text-center list-group-inline"> -->

        <!-- "letter list-group-item list-group-item-action rounded-circle border-primary" -->
        <li
          class="list-group-item rounded-lg col-2 border-primary text-center"
          v-for="(letter, i) in letters"
          v-bind:key="i"
          @click="selectLetter(letter)"
        >{{ letter.l }} {{ letter.l.toLowerCase() }}</li>
      </ul>
    </div>

    <div v-else>
      <unnr-letter-details :letter="selectedLetter" @backToList="backToList()"></unnr-letter-details>
    </div>
  </div>
</template>


<script>
import Tasks from "./tasks.json";
import LetterDetails from "./LetterDetails.vue";
export default {
  components: {
    unnrLetterDetails: LetterDetails
  },
  data() {
    return {
      letterClicked: false,
      selectedLetter: {},
      letters: Tasks.letters //read from jsonfile
    };
  },
  methods: {
    selectLetter(letter) {
      this.selectedLetter = letter;
      this.letterClicked = true;
    },
    backToList() {
      this.letterClicked = false;
    }
  }
};
</script>

<style scoped lang="scss">
// @import '@/styles/app.scss';

li {
  // display: inline;
  margin: 1rem;
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
  // background-color: $primary;
  border: 0.25rem solid;
  height: 5rem;
  -webkit-box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.05);
}
</style> 