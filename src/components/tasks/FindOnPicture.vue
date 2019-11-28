<template>
  <div class="container">
    <div hidden>
      Icons made by
      <a
        href="https://www.flaticon.com/authors/dave-gandy"
        title="Dave Gandy"
      >Dave Gandy</a> from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
    <div class="row">
      <div class="col-1 backbutton">
        <!-- backbutton class overrides bootstrap positioning. -->
        <span @click="backToList()" class="clickable">
          <unnr-arrow-back></unnr-arrow-back>
        </span>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 text-center">
        <img
          src="/assets/apekatt.png"
          alt="Finn ord på bilde"
          usemap="#image-map"
        />
        <map name="image-map">
          <area
            @click="clickMap()" class="clickable"
            target=""
            alt="Apekatt"
            title="Apekatt"
            coords="63, 151, 79, 130, 111, 127, 118, 110, 151, 127, 159, 105, 113, 95, 121, 86, 155, 79, 179, 75, 157, 63, 127, 73, 123, 59, 155, 31, 138, 19, 102, 59, 111, 25, 90, 7, 89, 70, 82, 55, 67, 74, 42, 87, 53, 113, 65, 123, 46, 147, 39, 155, 45, 165, 57, 159, 65, 159"
            shape="poly"
          />
        </map>
      </div>
      <div class="col-4 text-center form-control mt-4">
        <span>
        {{ clickedDescription }}  </span>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowBack from "../icons/ArrowBack.vue";

export default {
  data() {
    return {
      taskIndex: 0,
      selectedTask: this.$store.getters.activeLetter.tasks[0],
      activeLetter: this.$store.getters.activeLetter,
      clickedDescription: "",
      audio : {}
    };
  },
  mounted() {
    this.audio = new Audio();
  },
  components: {
    unnrArrowBack: ArrowBack
  },
  methods: {
    backToList() {
      this.$store.commit("SET_LETTER_VISITED", this.activeLetter.l);
      this.$router.push({ name: "menu" });
    },
    clickMap() {
      this.playSound();
      console.log("image clicked");
      this.clickedDescription = "Apekatt";
    },
      playSound() {
      // var audio = new Audio("../../assets/apekatt.mp3");
      this.audio.src = '../../assets/apekatt.mp3'

      console.log("audio paused: "+ this.audio.paused)
      if (this.audio.paused === true) {
        this.audio.play();
      }
    }
  }
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}

.backbutton {
  height: 6rem;
  position: absolute;
  top: 1rem;
  left: 1rem;
}

.outline {
  border: solid black 1px;
}
</style>