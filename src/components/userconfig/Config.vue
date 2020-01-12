<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <div class="row justify-content-center">
          <div class="col-9">
            <button class="btn" @click="navigateToRoute('applibrary')"><unnr-app-list-icon height="100%" width="100%"></unnr-app-list-icon>
            Tilpass oppgavetyper
            </button>
            </div>
        </div>
      </div>
      <div class="col-9">
        <ul class="row list-group-inline justify-content-center">
          <li
            class="transform list-group-item rounded-lg col-2 border-primary text-center"
            :class="computedColorActive(letter)"
            v-for="(letter, i) in letters"
            v-bind:key="i"
            @click="selectLetter(letter)"
          >{{ letter.l }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AppListIcon from "@/components/icons/AppListIcon.vue";
export default {
  data() {
    return {
      letterClicked: false,
      selectedLetter: {},
      letters: this.$store.getters.letters
    };
  },
  components: {
    unnrAppListIcon: AppListIcon
  },
  methods: {
    navigateToRoute(route) {
      this.$router.push({
        name: route
      })
    },
    computedColorActive(letter) {
      if (letter.enabled === true) {
        return "enabledletter";
      } else {
        return "disabledletter";
      }
    },
    selectLetter(letter) {
      this.selectedLetter = letter;
      this.letterClicked = true;
      //enable letter in store so it is visible in letterlist
      this.$store.commit("TOGGLE_ENABLE_LETTER", letter);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";
li {
  // display: inline;
  margin: 0.5rem;
  cursor: pointer;
  font-size: 2.8rem;
  font-weight: bold;
  // background-color: $primary;
  border: 0.5rem solid;
  height: 7rem;
  -webkit-box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.05);
  // background-color: $letterlistcolor;
  color: white;
  white-space: nowrap;
}

.enabledletter {
  background-color: $letterlistcolor;
}

.disabledletter {
  background-color: $disabledcolor;
}

.transform {
  -webkit-transition: all 0.17s ease-out;
  -moz-transition: all 0.17s ease-out;
  -o-transition: all 0.17s ease-out;
  -ms-transition: all 0.17s ease-out;
  transition: all 0.17s ease-out;
}
</style> 