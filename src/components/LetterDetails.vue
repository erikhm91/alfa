<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-12 col-xs-12">
        <unnr-draw-letter :task="tasks[taskIndex]" :imagekey="activeLetter.imagekey"></unnr-draw-letter>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-1"></div>
      <div class="col-md-3 col-4 arrow">
        <span v-show="prevTaskExist" @click="prevTask()" class="clickable">
          <unnr-arrow-left height="150px" width="150px"></unnr-arrow-left>
        </span>
      </div>
      <div class="col-md-3 col-4 arrow">
        <span v-show="nextTaskExist" @click="nextTask()" class="clickable">
          <unnr-arrow-right height="150px" width="150px"></unnr-arrow-right>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import DrawLetter from "./tasks/DrawLetter.vue";
import ArrowLeft from "./icons/ArrowLeft.vue";
import ArrowRight from "./icons/ArrowRight.vue";
// import store from '../store/store';
export default {
  props: ["letter"],

  data() {
    return {
      taskIndex: 0,
      activeLetter : this.$store.getters.activeLetter,
      // this.$store.getters['letterObject'](this.letter),
      selectedTask: this.$store.getters.activeLetter.tasks[0],
      // selectedTask: activeLetter.tasks[0],
      tasks : this.$store.getters.taskImages

      // 
    };
  },
  components: {
    unnrDrawLetter: DrawLetter,
    unnrArrowLeft: ArrowLeft,
    unnrArrowRight: ArrowRight
  },
  created() {
    this.$store.commit("SET_LOWER_CASE_LETTER", false);
  },

  computed: {
    nextTaskExist() {
      if ( this.$store.getters.activeLetter.tasks.length > this.taskIndex + 1) {   //should implement better reading of values. map getters.
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

  watch: {
    taskIndex() {
      let bool;
      if (this.taskIndex === 1) {
        bool = true;
      } else {
        bool = false;
      }
      this.$store.commit("SET_LOWER_CASE_LETTER", bool);
    }
  },
  methods: {
    //**********************************//can remove these checks as button disappears if not valid************************ */
    prevTask() {
      if (this.taskIndex > 0) {
        this.taskIndex--;
      }
    },
    nextTask() {
      if (this.activeLetter.tasks.length > this.taskIndex + 1) {
        this.taskIndex++;
        //sets letter visited/green when navigating to new task
        this.$store.commit("SET_LETTER_VISITED", this.activeLetter.l);
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
.outline {
  border: solid black 1px;
}

div {
  overflow: hidden;
}
</style>