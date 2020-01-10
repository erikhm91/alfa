
<template>
  <div class="row justify-content-center">
    <div class="col-lg-2 col-md-2 col-12">
      <!--  -->
      <div class="row mb-2 mb-md-0 justify-content-center">
        <div class="col-md-12 col-s-12 col-3">
          <button class="btn btn-primary" @click="playSound()">
            <unnr-speaker></unnr-speaker>
          </button>
        </div>
        <div class="col-md-12 mt-md-2 col-s-12 col-3">
          <button class="btn btn-primary" @click="clearCanvas()">
            <unnr-eraser></unnr-eraser>
          </button>
        </div>
      </div>
    </div>
    <div class="col-lg-8 col-md-8 col-xs-9">
      <!--  -->
      <div class="row drawcontainer mt-1 whitebackground" :style="{ height: canvasHeight, width: canvasWidth}">
        <unnrCanvas class="canvas"
          :canvasHeight="canvasHeight"
          :canvasWidth="canvasWidth"
          :clearCanvasTrigger="clearCanvasTrigger"
        ></unnrCanvas>
      
        <div class="col-12 text-center align-self-center ">
          <span class="trace-text">{{word}}</span>
        </div>   
      </div>
    </div>
    <div class="col-lg-1 col-md-1 col-xs-0"></div>
  </div>
</template>


<script>
import Speaker from "../icons/Speaker.vue";
import Eraser from "../icons/Eraser.vue";
import variables from '@/styles/_variables.scss';
import Canvas from "../utilities/Canvas.vue";
export default {
  props: {
    word: {
      type: String
    }
  },
  components: {
    unnrSpeaker: Speaker,
    unnrEraser: Eraser,
    unnrCanvas: Canvas
  },

  data: function() {
    return {
       clearCanvasTrigger: false
    };
  },
  computed: {
    canvasHeight() {
      var reduction = window.innerHeight / 2.5;
      var height = window.innerHeight - reduction;
      return height + "px";
    },
    canvasWidth() {
      var reduction = window.innerWidth / 3;
      var width = window.innerWidth - reduction;
      return width + "px";
    }
  },

  // created: function() {
  //   //initiate eventlistener on window on startup (as window not available in template)
  //   window.addEventListener("mouseup", this.handleMouseUp);
  // },
  mounted() {
    this.audio = new Audio();
  },
  // destroyed: function() {
  //   window.removeEventListener("mouseup", this.handleMouseUp);
  // },
  watch: {
    word() {
      this.clearCanvas();
    }
  },

  methods: {
    playSound() {
      this.audio.src = "../../assets/apekatt.mp3";
      this.audio.play();
    },
    clearCanvas() {
      //change value to trigger update in child component
      this.clearCanvasTrigger = !this.clearCanvasTrigger;
    },
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.canvas {
  position: absolute;
  z-index: 20;
  display: block;
}

.whitebackground {
  background-color: white;
}

.img {
  position: absolute;
  z-index: 10;
}

.drawcontainer {
  -webkit-box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.05);
  outline: 0.25rem solid $primary;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

.trace-text {
  font-family: $tracefont;
  font-size: 15rem;
  text-decoration: underline;
  text-decoration-color: $pencilcolor;
}

.trace-textcolor {
  color : $pencilcolor;
}

.outline {
  border: solid black 1px;
}
</style>