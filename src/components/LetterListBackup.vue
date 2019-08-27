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
      <div>
        <div class="row">
          <div class="col-md-2">
            <button type="button" class="btn btn-primary" @click="backToMain">Tilbake</button>
          </div>
          <div class="col-md-10">
            <p>Valgt bokstav: {{selectedLetter.l}}</p>
          </div>
        </div>

        <div id="letterImage" class="text-center">
          <img :src="selectedLetter.image" :alt="selectedLetter" style="height:400px" />
        </div>
      </div>
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
          image: require("../assets/apekatt.jpg"),
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
      console.log("value passed on click:" + letter);
      this.selectedLetter = letter;
      /* this.selectedLetter = value.l; */
      this.selectedImage = letter.image;
      this.letterClicked = true;
    },
    backToMain() {
      this.selectedLetter = "";
      this.letterClicked = false;
    }
  },
  computed: {
    toUpper() {
      return;
    }
  }
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
  font-size: 100px;
  color: red;
  cursor: pointer;
  width: 200px;
  height: fit-content;
}
</style>