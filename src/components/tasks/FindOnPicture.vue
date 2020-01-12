<template>
  <div class="container">
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
  methods: {
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

.outline {
  border: solid black 1px;
}
</style>