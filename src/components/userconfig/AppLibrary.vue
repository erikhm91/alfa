<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-1 headertool">
        <span @click="navigateToRoute('config')" class="clickable">
          <unnr-arrow-back></unnr-arrow-back>
        </span>
      </div>
    </div>
    <div class="row justify-content-center">
      <!-- <div class="col-9"> -->
      <!-- bootstrap cards -->
      <!-- :img-src="imgurl(app.icon)" -->
      <!-- img-src="../../../public/assets/menu-writeword.png"  doesn't work -->
      <b-card-group deck>
        <div v-for="(app, i) in appList" v-bind:key="i">
          <b-card
            :title="app.name"
            :img-src="getImage(app.icon)"
            :img-alt="app.alt"
            img-top
            tag="article"
            style="max-width: 17rem;"
            class="mb-2"
          >
            <b-card-text>
              <p>{{app.desc}}</p>
              <p>Læringsmål: {{app.goal}}</p>
              <p>Læringsfase: {{app.phase}}</p>
            </b-card-text>

              <!-- Consider implementing 'npm install bootstrap4-toggle' for a better framework for this -->
              <div class="custom-control custom-switch">
                <input :checked="getAppEnabled(app.id)" type="checkbox" class="custom-control-input" :id="i" 
                @click="toggleApp(app.id)"
                />
                <label class="custom-control-label" :for="i">Aktiver/deaktiver</label>
              </div>
            
          </b-card>
        </div>
      </b-card-group>
      <!-- <li class v-for="(app, i) in appList" v-bind:key="i">{{ app.appname }}</li> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import ArrowBack from "@/components/icons/ArrowBack.vue";
// import AppListIcon from "@/components/icons/AppListIcon.vue";

export default {
  data() {
    return {
      letterClicked: false,
      selectedLetter: {},
      appList: this.$store.getters.appList
    };
  },
  components: {
    unnrArrowBack: ArrowBack,
    // unnrAppListIcon: AppListIcon
  },

  methods: {
    printValue(value) {
      console.log("value: " + value);
    },
    getImage(filename) {
      return require("../../../public/assets/" + filename);
    },
    backToList() {
      this.$router.push({ name: "config" });
    },
    navigateToRoute(route) {
      this.$router.push({
        name: route
      });
    },
    getAppEnabled(appId) {
      const index = this.appList.findIndex(obj => obj.id === appId)
      if (this.appList[index].enabled == true) {
        return "checked";
      } else {
        return "";
      }
    },

    toggleApp(appId) {
      //enable letter in store so it is visible in letterlist
      this.$store.commit("TOGGLE_ENABLE_APP", appId);
      console.log(this.appList);
      
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.headertool {
  height: 6rem;
  position: absolute;
  top: 1rem;
  left: 1rem;
  cursor: pointer;
}
</style> 