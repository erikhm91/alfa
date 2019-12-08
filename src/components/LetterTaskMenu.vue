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
      <div class="col-9">
      <div class="row">
      <div class="col-4 mb-4">
        <button class="btn btn-primary" @click="navigateToRoute('details')">
          <img
            src="../../public/assets/menu-writeletter.png"
            alt="Lær å skrive bokstaven."
            width="100%"
            height="100%"
          />
        </button>
      </div>

      <div class="col-4 mb-4">
        <button class="btn btn-primary" @click="navigateToRoute('findonpicture')">
          <img
            src="../../public/assets/menu-canvas.png"
            alt="Finn ord med bokstaven på bilder."
            width="100%"
            height="100%"
          />
        </button>
      </div>

      <div class="col-4 mb-4">
        <button class="btn btn-primary" @click="navigateToRoute('writeword')">
          <img
            src="../../public/assets/menu-writeword.png"
            alt="Skriv ord med bokstaven."
            width="100%"
            height="100%"
          />
        </button>
      </div>
        <div class="col-4 mb-4">
        <button class="btn btn-primary" @click="navigateToRoute('writeword')">
          <img
            src="../../public/assets/menu-writeword.png"
            alt="Skriv ord med bokstaven."
            width="100%"
            height="100%"
          />
        </button>
      </div>
      </div>
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
    navigateToRoute(route) {
      this.$router.push({
        name: route
      })
    },
     backToList() {
      this.$router.push({ name: 'letterlist'});
    }

  }
};
</script>

<style scoped>
/* .container {
  margin-top: 30px;
} */

.backbutton {
  height: 6rem;
  position: absolute; top: 1rem; left: 1rem; 
}
</style>