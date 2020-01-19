<template>
  <div class>
    <!-- <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">Mesmer</a>
    </nav> -->

<!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav> -->


    <div class="row text-center">
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
      <div class="col-1 headerbutton">
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