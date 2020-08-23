<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <!-- Modal - triggered from click on card button -->
      <div>
        <b-modal ok-only id="unnr-modal" :title="'#'+selectedApp.id+' '+selectedApp.name">
          <unnrAppModal :app="selectedApp"></unnrAppModal>
        </b-modal>
      </div>
      <b-card-group deck>
        <div v-for="(app, i) in appList" v-bind:key="i">
          <b-card
            :title="app.name"
            :img-src="getImage(app.icon)"
            :img-alt="app.alt"
            img-top
            tag="article"
            style="max-width: 17rem;"
            class="mb-2 text-center"
          >
            <div class="text-left">
              <hr>
              <p>{{app.desc}}</p>
            </div>
            <button class="btn btn-primary w-100"  @click="showModal(app)">Les mer</button>
            <hr />
            <div class="custom-control custom-switch text-center">
            <!-- Consider implementing 'npm install bootstrap4-toggle' for a better tool for this   v-b-modal.modal -->
              <input
                :checked="getAppEnabled(app.id)"
                type="checkbox"
                class="custom-control-input"
                :id="i"
                @click="toggleApp(app.id)"/>
              <label class="custom-control-label w-100" :for="i">Aktiver/deaktiver</label>
            </div>
          </b-card>
        </div>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import AppModal from './AppModal.vue';
export default {
  data() {
    return {
      selectedApp: {},
      appList: this.$store.getters.appList
    };
  },
  components: {
    unnrAppModal: AppModal
  },

  methods: {
    showModal(app)  {
      this.selectedApp = app;
      this.$bvModal.show('unnr-modal')
    },
    printValue(value) {
      console.log("value: " + value);
    },
    getImage(filename) {
      return require("../../../public/assets/" + filename);
    },
    getAppEnabled(appId) {
      const index = this.appList.findIndex(obj => obj.id === appId);
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
</style> 