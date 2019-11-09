<template>
  <div class="container">
    <div hidden>
      Icons made by
      <a
        href="https://www.flaticon.com/authors/smashicons"
        title="Smashicons"
      >Smashicons</a> from
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
      <div class="col-2">
        <button class="btn btn-primary" @click="navigateToDraw()">
          <img
            src="../../public/assets/menu-writing.png"
            alt="Lær å skrive bokstaven"
            width="100%"
            height="100%"
          />
        </button>
      </div>

      <div class="col-2">
        <button class="btn btn-primary" @click="navigateToFindOnPicture()">
          <img
            src="../../public/assets/menu-canvas.png"
            alt="Lær å skrive bokstaven"
            width="100%"
            height="100%"
          />
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import ArrowBack from "./icons/ArrowBack.vue";
export default {
    components: {
    unnrArrowBack: ArrowBack
  },
  methods: {
    navigateToDraw() {
      this.$router.push({ name: "details" });
    },
    navigateToFindOnPicture() {
      this.$router.push({ name: "findonpicture" });
    },
     backToList() {
      this.$router.push({ name: 'letterlist'});
    }

  }
};
</script>

<style scoped>
.container {
  margin-top: 30px;
}

.backbutton {
  height: 6rem;
  position: absolute; top: 1rem; left: 1rem; 
}
</style>