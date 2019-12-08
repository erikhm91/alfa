<template>
  <div class="container-fluid">
    <div hidden>
      Icons made by
      <a
        href="https://www.flaticon.com/authors/dave-gandy"
        title="Dave Gandy"
      >Dave Gandy</a> from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
    <div class="row">
      <div class="col-1 headertool"> <!-- backbutton class overrides bootstrap positioning. -->
        <span @click="backToList()" class="clickable">
              <unnr-arrow-back></unnr-arrow-back>
        </span>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-12 col-xs-12">

        <!-- pass text for writing here: -->
        <unnr-draw-word :word="tasks[taskIndex]"></unnr-draw-word>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-1"></div>
      <div class="col-md-3 col-4 arrow">
        <span v-if="prevTaskExist" @click="prevTask()" class="clickable">
          <unnr-arrow-left height="200px" width="200px"></unnr-arrow-left>
        </span>
      </div>
      <div class="col-md-3 col-4 arrow">
        <span v-if="nextTaskExist" @click="nextTask()" class="clickable">
          <unnr-arrow-right height="200px" width="200px"></unnr-arrow-right>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import DrawWord from "./tasks/DrawWord.vue";
import ArrowLeft from "./icons/ArrowLeft.vue";
import ArrowRight from "./icons/ArrowRight.vue";
import ArrowBack from "./icons/ArrowBack.vue";

export default {
  data() {
    return {
      taskIndex: 0,
      tasks: ['SE', 'SOL', 'SÅ', 'Si'],
      activeLetter : this.$store.getters.activeLetter
      // selectedTask: this.$store.getters.activeLetter.tasks[0],
    };
  },
  components: {
    unnrDrawWord: DrawWord,
    unnrArrowLeft: ArrowLeft,
    unnrArrowRight: ArrowRight,
    unnrArrowBack: ArrowBack
  },
  computed: {
    nextTaskExist() {
      if ( this.tasks.length > this.taskIndex + 1) {   //should implement better reading of values. map getters.
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
    backToList() {
      this.$store.commit("SET_LETTER_VISITED", this.activeLetter.l);
      this.$router.push({ name: 'menu'});
    },
    //**********************************//can remove these checks as button disappears if not valid************************ */
    prevTask() {
      if (this.taskIndex > 0) {
        this.taskIndex--;
      }
    },
    nextTask() {
      if (this.tasks.length > this.taskIndex + 1) {
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

.headertool {
  height: 6rem;
  position: absolute; top: 1rem; left: 1rem; 
}

/* .arrow {
  height: 12rem;
} */

.outline {
  border: solid black 1px;
}

/* 
p {
  font-size: 1px;
} */

</style>