<template>
  <div>
    <div v-if="!letterClicked">
      <ul class="row list-unstyled text-center">
        <li
          class="letter list-group-item"
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
import LetterDetails from './LetterDetails.vue';
export default {
    components: {
        unnrLetterDetails: LetterDetails
    },
  data() {
    return {
      letterClicked: false,
      selectedLetter: {},
      selectedImage: "",
      letters: [
        {
          l: "A",
          image: require("../assets/apekatt.png"),
          alt: "Apekatt"
        },
        {
          l: "B",
          image: require("../assets/bil.png"),
          alt: "Bil"
        },
        {
          l: "C",
          image: require("../assets/cola.jpg"),
          alt: "Cola"
        }
      ]
    };
  },
  methods: {
    selectLetter(letter) {
      this.selectedLetter = letter;
      /* this.selectedLetter = value.l; */
      this.selectedImage = letter.image;
      this.letterClicked = true;
    },
    backToList() {
        this.letterClicked = false;
    }
    
  },
};
</script>

<style scoped>
.container {
  margin-top: 30px;
}
/* 
div {
    border: solid 1px black;
} */

ul {
  list-style: none;
}

li {
  display: inline;
}

.letter {
  margin: 10px;
  font-size: 20px;
  color: red;
  cursor: pointer;
  width: 100px;
  height: fit-content;
}
</style>