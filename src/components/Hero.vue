<template>
  <div class="container mb-4 mt-4">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10 text-center">
        <h1>Lær alfabetet!</h1>
      </div>
      <div class="col-1">
        <!-- <button class="btn" @click="navigateToConfig()"><unnr-config-symbol></unnr-config-symbol></button> -->
        </div>
    </div>
  </div>
</template>


<script>
// import ConfigSymbol from "./icons/ConfigSymbol.vue";
// export default {
//   components: {
//     UnnrConfigSymbol: ConfigSymbol
//   },
//   methods: {
//     navigateToConfig() {
//       console.log("navigating to config");
//       this.$store.commit("SET_CONTENT_ROUTE", 'config');
//     }
//   }  
// };
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
h1 {
  text-decoration: overline;
  color: $letterlistcolor;
  font-size: 3.5rem;
  font-weight: bold;
}

/* 
@import "..\styles\global.scss"; */
</style>