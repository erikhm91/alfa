<template>
  <div>
    <div hidden>
      Icons made by
      <a
        href="https://www.flaticon.com/authors/dave-gandy"
        title="Dave Gandy"
      >Dave Gandy</a> from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
    <div class="row">
      <div class="col-6 toolbaritem">
        <span @click="backToList()" class="clickable">
              <unnr-arrow-back></unnr-arrow-back>
        </span>
      </div>
      <div class="col-6 toolbaritem">
        <!-- <p>Valgt bokstav: {{letter.l}}</p> -->
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-7 col-xs-12">
        <unnr-draw-letter :task="letter.tasks[taskIndex]"></unnr-draw-letter>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-2 col-xs-4">
        <span v-if="prevTaskExist" @click="prevTask()" class="clickable">
          <unnr-arrow-left></unnr-arrow-left>
        </span>
      </div>
      <div class="col-md-2 col-xs-4">
        <span v-if="nextTaskExist" @click="nextTask()" class="clickable">
          <unnr-arrow-right></unnr-arrow-right>
        </span>
      </div>
    </div>
  </div>
</template>


<script>
import DrawLetter from "./tasks/DrawLetter.vue";
import ArrowLeft from "./icons/ArrowLeft.vue";
import ArrowRight from "./icons/ArrowRight.vue";
import ArrowBack from "./icons/ArrowBack.vue";

export default {
  props: {
    letter: {
      type: Object
    }
  },
  data() {
    return {
      taskIndex: 0,
      selectedTask: this.letter.tasks[0]
    };
  },
  components: {
    unnrDrawLetter: DrawLetter,
    unnrArrowLeft: ArrowLeft,
    unnrArrowRight: ArrowRight,
    unnrArrowBack: ArrowBack
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
        console.log("navigating to nexttask, updated taskIndex");
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

.toolbaritem {
  height: 6rem;
}

.arrow {
  height: 6rem;
}

/* 
p {
  font-size: 1px;
} */

/* div {
  border: 1px solid black;
} */
</style>