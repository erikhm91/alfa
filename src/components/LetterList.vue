<template>
  <!-- clouds, test -->
  <div>
    <div id="background-wrap">
      <div class="x1">
        <div class="cloud"></div>
      </div>

      <div class="x2">
        <div class="cloud"></div>
      </div>

      <div class="x3">
        <div class="cloud"></div>
      </div>

      <div class="x4">
        <div class="cloud"></div>
      </div>

      <div class="x5">
        <div class="cloud"></div>
      </div>
    </div>

    <!-- clouds test end Html -->
    <!-- <div>
      <unnrAudioFactory></unnrAudioFactory>
    </div> -->
    <div class="container">
      <ul class="row list-group-inline justify-content-center">
        <li
          class="list-group-item rounded-lg col-2 border-primary text-center"
          :class="computedColor(letter)"
          v-for="(letter, i) in enabledLetters"
          v-bind:key="i"
          @click="selectLetter(letter)"
        >{{ letter.l }} {{ letter.l.toLowerCase() }}</li>
      </ul>
    </div>

    <transition name="clickletter">
      <unnr-letter-image
       v-if="animation"
        id="taskImage"
        class="center"
        :capitalLetter="selectedLetter.imagekey"
        :height="letterIllustrationSize"
        :width="letterIllustrationSize"
      ></unnr-letter-image>
    </transition>

  </div>
</template>

<script>
// import {cachingUtil} from './utilites/cachingUtil';
import letterImage from "./icons/illustrations/LetterImage.vue";
import audioFactory from "./audio/AudioFactory.vue";
import Amp3 from '../assets/A.mp3';
export default {
  data() {
    return {
      animationImg: null,
      animation: false,
      letterClicked: false,
      selectedLetter: {},
      letters: this.$store.getters.letters,
      letterIllustrationSize: "300px"
    };
  },
  mounted() {
    this.audio = new Audio();
    this.audio1 = new Audio();
    this.audio1.src = '../../assets/apekatt.mp3';
    this.audio2 = new Audio();
    this.audio2.src = '../../assets/bsang.mp3';

    this.audio3 = new Audio(Amp3);
  },

  components: {
    unnrLetterImage: letterImage,
    unnrAudioFactory: audioFactory
  },

  computed: {
    enabledLetters() {
      return this.$store.getters.letters.filter(function(letter) {
        return letter.enabled;
      });
    }
  },
  methods: {
    computedColor(letter) {
      if (letter.visit === true) {
        return "visited";
      } else {
        return "";
      }
    },
    selectLetter(letter) {
      this.playSound(letter.audio);
      this.selectedLetter = letter;
      console.log("selectLetter: " + letter);
      this.letterClicked = true;
      //update store with selected letter, so can easily get it in the letterdetails component. Should really be route/url parameter
      this.$store.commit("SET_ACTIVE_LETTER_BY_OBJ", letter);

      // if (letter.l === "E") {
      //   this.animationImg =
      //     "https://i.pinimg.com/564x/7a/5f/17/7a5f17afbb8faf096dde75cd04012e62.jpg";
      // } else {
      //   this.animationImg =
      //     "https://cdn11.bigcommerce.com/s-in5je/images/stencil/1280x1280/products/6729/21035/banana-sticker__91685.1564864025.jpg?c=2&imbypass=on";
      // }
      this.animation = true;

      //image is preloaded within router guard with timeout set to 2 seconds (while animation plays)
      this.$router.push({
        name: "trackletter",
        params: { letter: this.selectedLetter.l }
      });
    },

    playSound(filename) {
      this.audio.src = '../../assets/audio/' + filename ;
      this.audio.play();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
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
  background-color: $letterlistcolor;
  color: white;
  white-space: nowrap;
}

.visited {
  background-color: $success;
}

// illustration image animation <<<

.clickletter-enter {
  opacity: 0;
}

.clickletter-enter-active {
  transition: opacity 1.5s;
}

// .clickletter-leave {
// }

// .clickletter-leave-active {
//   transition: opacity 0.7s;
//   animation: slide 0.7s;
//   opacity: 0;
// }

// .clickanimation {
//   //animations
//   animation: lettermove 3s;

//   //keyframes
//   @keyframes lettermove {
//     from {
//       margin-left: -100%;
//       width: 20%;
//     }
//     to {
//       margin-left: 100%;
//       width: 20%;
//     }
//   }
// }
// illustration image animation >>>

.center {
  z-index: 100;
  position: fixed;
  top: 30%;
  left: 40%;
}

//cloud <<<

#background-wrap {
  bottom: 0;
  left: 0;
  padding-top: 50px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: -1;
}

/* KEYFRAMES */

@-webkit-keyframes animateCloud {
  0% {
    margin-left: -1000px;
  }
  100% {
    margin-left: 100%;
  }
}

@-moz-keyframes animateCloud {
  0% {
    margin-left: -1000px;
  }
  100% {
    margin-left: 100%;
  }
}

@keyframes animateCloud {
  0% {
    margin-left: -1000px;
  }
  100% {
    margin-left: 100%;
  }
}

/* ANIMATIONS */

.x1 {
  -webkit-animation: animateCloud 35s linear infinite;
  -moz-animation: animateCloud 35s linear infinite;
  animation: animateCloud 35s linear infinite;

  -webkit-transform: scale(0.65);
  -moz-transform: scale(0.65);
  transform: scale(0.65);
}

.x2 {
  -webkit-animation: animateCloud 20s linear infinite;
  -moz-animation: animateCloud 20s linear infinite;
  animation: animateCloud 20s linear infinite;

  -webkit-transform: scale(0.3);
  -moz-transform: scale(0.3);
  transform: scale(0.3);
}

.x3 {
  -webkit-animation: animateCloud 30s linear infinite;
  -moz-animation: animateCloud 30s linear infinite;
  animation: animateCloud 30s linear infinite;

  -webkit-transform: scale(0.5);
  -moz-transform: scale(0.5);
  transform: scale(0.5);
}

.x4 {
  -webkit-animation: animateCloud 18s linear infinite;
  -moz-animation: animateCloud 18s linear infinite;
  animation: animateCloud 18s linear infinite;

  -webkit-transform: scale(0.4);
  -moz-transform: scale(0.4);
  transform: scale(0.4);
}

.x5 {
  -webkit-animation: animateCloud 25s linear infinite;
  -moz-animation: animateCloud 25s linear infinite;
  animation: animateCloud 25s linear infinite;

  -webkit-transform: scale(0.55);
  -moz-transform: scale(0.55);
  transform: scale(0.55);
}

/* OBJECTS */

.cloud {
  background: #fff;
  background: -moz-linear-gradient(top, #fff 5%, #f1f1f1 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(5%, #fff),
    color-stop(100%, #f1f1f1)
  );
  background: -webkit-linear-gradient(top, #fff 5%, #f1f1f1 100%);
  background: -o-linear-gradient(top, #fff 5%, #f1f1f1 100%);
  background: -ms-linear-gradient(top, #fff 5%, #f1f1f1 100%);
  background: linear-gradient(top, #fff 5%, #f1f1f1 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fff', endColorstr='#f1f1f1',GradientType=0 );

  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;

  -webkit-box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);

  height: 120px;
  position: relative;
  width: 350px;
}

.cloud:after,
.cloud:before {
  background: #fff;
  content: "";
  position: absolute;
  z-index: -1;
}

.cloud:after {
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;

  height: 100px;
  left: 50px;
  top: -50px;
  width: 100px;
}

.cloud:before {
  -webkit-border-radius: 200px;
  -moz-border-radius: 200px;
  border-radius: 200px;

  width: 180px;
  height: 180px;
  right: 50px;
  top: -90px;
}

// cloud >>>
</style> 