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
        <span @click="navigateToRoute('letterlist')" class="clickable">
          <unnr-arrow-back></unnr-arrow-back>
        </span>
      </div>
    </div>
    <div class="container">
    <ul class="row list-group-inline list-unstyled justify-content-center">    
      <li class="col-4 mb-4"     
      v-for="(app, i) in enabledApps"
      >
        <button class="btn btn-primary" @click="navigateToRoute(app.route)">
          <img
            :src="getImage(app.icon)"
            :alt="app.alt"
            width="100%"
            height="100%"
          />
        </button>
      </li>
    </ul>

    </div>
  </div>
</template>


<script>
import ArrowBack from "./icons/ArrowBack.vue";
export default {
  // data() {
  //   return {
  //     appList: this.$store.getters.appList
  //   }
  // },
  computed: {
    enabledApps() {
      return this.$store.getters.appList.filter(function(app) {
        return app.enabled;
      })
    }
  },

    components: {
    unnrArrowBack: ArrowBack
  },
  methods: {
    navigateToRoute(route) {
      this.$router.push({
        name: route
      })
    },
    getImage(filename) {
      return require("../../public/assets/" + filename);
    },

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
  cursor: pointer;
}

.unnr-slidein {
    position: absolute;
    transition: all 2s ease-in-out;
    -webkit-transition: all 2s ease-in-out; /** Chrome & Safari **/
    -moz-transition: all 2s ease-in-out; /** Firefox **/
    -o-transition: all 2s ease-in-out; /** Opera **/
}
</style>