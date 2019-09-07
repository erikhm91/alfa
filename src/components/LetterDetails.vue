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
      <div class="col-md-3">
        <button v-if="prevTaskExist" @click="prevTask()">Forrige oppgave</button>
      </div>

      <!-- previous: <div class="col-md-6 text-center">
        <unnr-draw-letter :letter="letter"></unnr-draw-letter>
      </div>-->

      <div class="col-md-6 text-center">
        <unnr-draw-letter :task="letter.tasks[taskIndex]"></unnr-draw-letter>
      </div>

      <div class="col-md-3">
        <button v-if="nextTaskExist" @click="nextTask()">Neste oppgave</button>
      </div>
    </div>

    <!-- <div id="letterImage" class="text-center">
      <img type="button" class="clickable" :src="letter.image" :alt="letter.alt" style="height:400px" />
    </div>-->
  </div>
</template>


<script>
import DrawLetter from "./tasks/DrawLetter.vue";
export default {
  props: {
    letter: {
      type: Object,
      default: {
        l: "A",
        // image: require("../assets/apekatt.jpg"),
        alt: "Apekatt"
        /*   sound: "../assets/apekatt.mp3" */
      }
    }
  },
  data() {
    return {
      taskIndex: 0,
      selectedTask: this.letter.tasks[0]
    };
  },
  components: {
    unnrDrawLetter: DrawLetter
  },
  computed: {
    nextTaskExist() {
      if (this.letter.tasks.length > this.taskIndex + 1) {
        return true;
      } else {
        return false;
      }
    },
    prevTaskExist() {
      if (this.taskIndex > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    /*     playSound() {
       var audio = new Audio("../assets/apekatt.mp3");
        audio.play();
    }, */
    backToList() {
      this.$emit("backToList", true);
    },
    //**********************************//can remove these checks as button disappears if not valid************************ */
    prevTask() { 
      if (this.taskIndex > 0) {
        this.taskIndex--;
      }
    },
    nextTask() {
      if (this.letter.tasks.length > this.taskIndex + 1) {
        this.taskIndex++;
      }
    }
    //************************************************************************************************************** */
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

/* div {
  border: 1px solid black;
} */
</style>