<template>
  <div class="row justify-content-center">
    <div class="col-lg-2 col-md-2 col-12">
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
        <div class="col-md-12 mt-md-2 col-s-12 col-3">
          <button class="btn btn-primary" @click="triggerDrawAnimation()">
            <unnr-question></unnr-question>
          </button>
        </div>
      </div>
    </div>
    <div class="col-lg-8 col-md-8 col-xs-9">
      <div class="drawcontainer mt-1" :style="{ height: canvasHeight, width: canvasWidth}">
        <!-- :style="{ height: canvasHeight, width: canvasWidth}" -->
        <div class="illustrationImage">
          <unnrLetterImage
          :capitalLetter="imagekey"
          width="150px"
          height="150px"
        ></unnrLetterImage>
        </div>
        <unnrCanvas
          class="canvas"
          :canvasHeight="canvasHeight"
          :canvasWidth="canvasWidth"
          :clearCanvasTrigger="clearCanvasTrigger"
          :drawAnimationTrigger="drawAnimationTrigger"
          :drawImage="task.url"
        ></unnrCanvas>
        <div>
          <img
            id="taskImage"
            class="img"
            :src="task.src"
            :alt="task.alt"
            :width="canvasWidth"
            :height="canvasHeight"
          />
        </div>
      </div>
    </div>
    <div class="col-lg-1 col-md-1 col-xs-0"></div>
  </div>
</template>

<script>
import Speaker from "../icons/Speaker.vue";
import Eraser from "../icons/Eraser.vue";
import Question from "../icons/Question.vue";
import Canvas from "../utilities/Canvas.vue";
import letterImage from "../icons/illustrations/LetterImage.vue";

export default {
  // props: {
  //   task: {
  //     type: HTMLImageElement
  //   }
  // },
  props: ["task", "imagekey"],
  components: {
    unnrSpeaker: Speaker,
    unnrEraser: Eraser,
    unnrQuestion: Question,
    unnrCanvas: Canvas,
    unnrLetterImage: letterImage
  },

  data: function() {
    return {
      // canvas sizes here not in use atm****
      canvas: {
        height: "300px",
        width: "400px"
      },
      // *************************************
      clearCanvasTrigger: false,
      drawAnimationTrigger: false
    };
  },
  computed: {
    canvasHeightOrWidthRule() {
      if (window.innerWidth / window.innerHeight < 1.5) {
        return "width";
      } else {
        return "height";
      }
    },
    maxCanvasHeight() {
      var reduction = window.innerHeight / 2.5;
      var height = window.innerHeight - reduction;
      // console.log("Height: " + height);
      return height;
    },
    maxCanvasWidth() {
      var reduction = window.innerWidth / 3.7;
      var width = window.innerWidth - reduction;
      return width;
    },

    canvasHeight() {
      if (this.canvasHeightOrWidthRule === "height") {
        return this.maxCanvasHeight + "px";
      }
      let height = this.maxCanvasWidth / 2;
      return height + "px";
    },

    canvasWidth() {
      if (this.canvasHeightOrWidthRule === "width") {
        return this.maxCanvasWidth + "px";
      }
      let width = this.maxCanvasHeight * 2;
      return width + "px";
    }
  },
  mounted() {
    this.audio = new Audio();
    console.log("task.src: " + this.task.src);
  },
  watch: {
    task() {
      this.clearCanvas();
    }
  },
  methods: {
    playSound() {
      // this.audio.src = "../../assets/apekatt.mp3";
      // this.audio.play();
    },

    clearCanvas() {
      //change value to trigger update in child component
      this.clearCanvasTrigger = !this.clearCanvasTrigger;
    },

    triggerDrawAnimation() {
      this.drawAnimationTrigger = !this.drawAnimationTrigger;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.illustrationImage {
  z-index: 100;
  position: absolute;
  top: 1%;
  left: 1%;
}

.canvas {
  position: absolute;
  z-index: 20;
  display: block;
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

.outline {
  border: solid black 1px;
}
</style>