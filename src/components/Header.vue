<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-1 headerbutton">
        <span @click="$router.go(-1)" class="clickable">
          <unnr-arrow-back></unnr-arrow-back>
        </span>
      </div>
      <div class="col-10 mt-4">
         <div class="row justify-content-center">
          <div class="col-3 headerbutton">
            <span @click="navigateToRoute('letterlist')">
              <h1>Mester</h1>
            </span>
          </div>
        </div>
      </div>
      <div v-if="activateConfigButton" class="col-1 headerbutton">
        <span @click="navigateToRoute('config')">
          <unnr-config-symbol height="80px" width="80px"></unnr-config-symbol>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import ConfigSymbol from "./icons/ConfigSymbol.vue";
import ArrowBack from "./icons/ArrowBack.vue";
export default {
  data() {
    return {
      activateConfigButton: false  
    }
  },
  components: {
    UnnrConfigSymbol: ConfigSymbol,
    unnrArrowBack: ArrowBack
  },
  methods: {
    navigateToRoute(route) {
      this.$router.push({
        name: route
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
h1 {
  text-decoration: overline;
  color: $letterlistcolor;
  font-size: 3rem;
  font-weight: bold;
}

.headerbutton {
  height: 6rem;
  // position: absolute; top: 1rem; left: 1rem;
  cursor: pointer;
}
</style>