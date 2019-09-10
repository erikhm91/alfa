<template>
  <div>
    <div v-if="!letterClicked">
      <ul class="list-unstyled text-center">
        <li
          class="letter list-group-item list-group-item-action rounded-circle border-primary"
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
      letters: Tasks.letters
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

<style scoped>
ul {
  list-style: none;
}

li {
  display: inline;
  margin: 10px;
  cursor: pointer; 
  font-size: 1.5rem;
  }
</style>