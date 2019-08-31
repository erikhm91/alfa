<template>
  <div>
    <div class="row">
      <div class="text-right col-md-3">
        <button type="button" class="btn btn-primary" @click="backToList">Tilbake</button>
      </div>
      <div class="text-left col-md-9">
        <p>Valgt bokstav: {{letter.l}}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-center">
        <unnr-draw-letter :letter="letter"></unnr-draw-letter>
      </div>
    </div>

    <!-- <div id="letterImage" class="text-center">
      <img type="button" class="clickable" :src="letter.image" :alt="letter.alt" style="height:400px" />
    </div> -->
  </div>
</template>


<script>
import DrawLetter from './tasks/DrawLetter.vue'
export default {
  props: {
    letter: {
      type: Object,
      default: {
        l: "A",
        image: require("../assets/apekatt.jpg"),
        alt: "Apekatt"
      /*   sound: "../assets/apekatt.mp3" */
      }
    }
  },
  components: {
    unnrDrawLetter : DrawLetter
  },
  methods: {
/*     playSound() {
       var audio = new Audio("../assets/apekatt.mp3");
        audio.play();
    }, */
    backToList() {
      this.$emit("backToList", true);
    }
  }
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}

p {
    font-size: 25px;
}
</style>