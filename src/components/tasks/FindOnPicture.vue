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
      <div class="col-1 backbutton"> <!-- backbutton class overrides bootstrap positioning. -->
        <span @click="backToList()" class="clickable">
              <unnr-arrow-back></unnr-arrow-back>
        </span>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-12 col-xs-12">
        Finn på bilde kommer her
      </div>
    </div>
  </div>
</template>

<script>
import DrawLetter from "./DrawLetter.vue";
import ArrowBack from "../icons/ArrowBack.vue";

export default {
  data() {
    return {
      taskIndex: 0,
      selectedTask: this.$store.getters.activeLetter.tasks[0],
      activeLetter : this.$store.getters.activeLetter
    };
  },
  components: {
    unnrDrawLetter: DrawLetter,
    unnrArrowBack: ArrowBack
  },
  methods: {
    backToList() {
      this.$store.commit("SET_LETTER_VISITED", this.activeLetter.l);
      this.$router.push({ name: 'menu'});
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
  position: absolute; top: 1rem; left: 1rem; 
}

.outline {
  border: solid black 1px;
}
</style>