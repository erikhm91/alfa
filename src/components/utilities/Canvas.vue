<template>
  <div>
    <!-- <div>Score: {{score}}</div> -->
    <canvas
      id="canvas"
      v-on:mousedown="mouseDown"
      v-on:mousemove="mouseMove"
      v-on:touchstart="sketchpadTouchStart"
      v-on:touchend="sketchpadTouchEnd"
      v-on:touchmove="sketchpadTouchMove"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>

      <!-- <img
        class="animationPicture animpic1"
        src="\assets\fleeting-star.svg"
        alt="illustration.alt"
        width="70px"
        height="70px"
      />

           <img
        class="animationPicture animpic2"
        src="\assets\fleeting-star.svg"
        alt="illustration.alt"
        width="70px"
        height="70px"
      /> -->

    <transition name="validation1">
      <img
        v-if="traceAnimateActive"
        class="animationPicture animpic1"
        src="\assets\fleeting-star.svg"
        alt="illustration.alt"
        width="100px"
        height="100px"
      />
    </transition>
       <transition name="validation1">
      <img
        v-if="traceAnimateActive"
        class="animationPicture animpic2"
        src="\assets\fleeting-star.svg"
        alt="illustration.alt"
        width="80px"
        height="80px"
      />
    </transition>
    <transition name="validation2">
      <img
        v-if="traceAnimateActive"
        class="animationPicture animpic3"
        src="\assets\fleeting-star.svg"
        alt="illustration.alt"
        width="70px"
        height="70px"
      />
    </transition>
    <transition name="validation2">
      <img
        v-if="traceAnimateActive"
        class="animationPicture animpic4"
        src="\assets\fleeting-star.svg"
        alt="illustration.alt"
        width="95px"
        height="95px"
      />
    </transition>

    <img hidden id="pencilsvg" src="\assets\pencil.svg" alt="pencil" width="50px" height="50px" />
    
    <button hidden class="animationPicture" @click="outputAnimationRecording()">output tegnerecording</button>


  </div>
</template>


<script>
import CoordinatesMixin from "../mixins/CoordinatesMixin.js";
import ValidationMixin from "../mixins/ValidationMixin.js";
export default {
  mixins: [CoordinatesMixin, ValidationMixin],
  props: {
    canvasWidth: {
      type: String,
      required: true
    },
    canvasHeight: {
      type: String,
      required: true
    },
    clearCanvasTrigger: {
      type: Boolean,
      default: false
    },
    drawAnimationTrigger: {
      type: Boolean,
      default: false
    },
    validationTrigger: {
      type: Boolean,
      default: false
    },
    drawImage: {
      type: String
    },
    taskIndex: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      cursor: {
        current: {
          x: 0,
          y: 0
        },
        previous: {
          x: -1,
          y: -1
        },
        size: 9
      },
      mousePressed: false,
      showImage: true,
      animationRequestId: null,
      animationDrawingSpeed: 4.2, //note: when increasing speed lines become slightly longer!
      traceAnimateRelevant: true,
      traceAnimateActive: false,
      traceValidationTolerancePx: 20,
      canvasBack: null,
      animationRecording: [],
      animationBuildLine: {},
      animationBuildCounter: 0,
      animationBuildStep: 2,
      score: 0
    };
  },
  computed: {
    canvasHeightAsNumber() {
      return parseInt(this.canvasHeight, 10);
    },
    relevantCoordinateList() {
      if (this.$store.getters.lowerCaseLetter === true) {
        return this.coordinates.coordinateListLower;
      } else {
        return this.coordinates.coordinateListUpper;
      }
    },
    coordinates() {
      return this.$store.getters.letterCoordinatesOfActiveLetter;
    }
  },

  created: function() {
    //initiate eventlistener on window on startup (as window not available in template)
    window.addEventListener("mouseup", this.handleMouseUp);
  },

  destroyed: function() {
    window.removeEventListener("mouseup", this.handleMouseUp);
  },

  watch: {
    clearCanvasTrigger(newVal, oldVal) {
      this.clearCanvas();
      this.$store.commit("SET_VALIDATION_SCORE", 0);
    },
    drawAnimationTrigger(newVal, oldVal) {
      this.animateTracing();
    },
    validationTrigger(){
      this.validateDrawing()
    }
  },

  methods: {
    clearCanvas() {
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      this.traceAnimateRelevant = true;
      this.animationRecording = [];
      this.animationBuildLine = {},
      this.animationBuildCounter = 0;

      this.cursor.previous.x = -1;
      this.cursor.previous.y = -1;
    },

    //letter animation methods
    async animateTracing() {
      //get letter tracing coordinates from store
      if (this.animationRequestId != null) {
      }

      //make backup of canvasdocument
      this.canvasBack = document.createElement("canvas");
      // console.log(coordinateObj);
      let coordinateList = this.relevantCoordinateList;

      var i;
      for (i = 0; i < coordinateList.length; i++) {
        // console.log("entered loop");
        //deep copy object value to translate scaling (without mutating the vuex state!)
        let rowObj = JSON.parse(
          JSON.stringify(coordinateList[i])
        );
        const translatedCoordinates = this.translateCoordinates(
          rowObj.data,
          rowObj.type,
          this.canvasHeightAsNumber
        );
        // console.log("Row obj: " + rowObj);
        if (rowObj.type === "line") {
          await this.animateLine(translatedCoordinates);
        } else if (rowObj.type === "arc") {
          await this.animateArc(translatedCoordinates);
        }
      }
    },

    animateLine(lineObj) {
      //async function, return Promise
      return new Promise((resolve, reject) => {
        // console.log("drawing triggered");
        let startX = lineObj.startX;
        let startY = lineObj.startY;
        let endX = lineObj.endX;
        let endY = lineObj.endY;
        // console.log("drawing: startx: " + startX + " startY: "+ startY + " endX: "+ endX+ " endY: "+ endY);

        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        //make initial canvasbackup and draw first pencil
        var canvasBack = document.createElement("canvas");
        canvasBack.width = ctx.canvas.width;
        // console.log("width: " + ctx.canvas.width + ", canvasWidth: " + this.canvasHeight);

        
        // canvasBack.height = ctx.canvas.height;
        // canvasBack.ctx = canvasBack.getContext("2d");
        // canvasBack.ctx.drawImage(canvas, 0, 0);
        // var img = document.getElementById("pencilsvg");
        // ctx.drawImage(img, startX, startY - 45, 50, 50);



        //calculate number of iterations for drawing loop
        const diffX = Math.abs(endX - startX);
        const diffY = Math.abs(endY - startY);

        //test - hardcode maxcount to 1.
        let iterations = 0;
        // if (diffX >= diffY) {
        //   iterations = diffX / this.animationDrawingSpeed;
        // } else {
        //   iterations = diffY / this.animationDrawingSpeed;
        // }
        // // console.log("iterations: " + iterations);
        // let maxCount = Math.round(iterations);
        // if (maxCount === 0) { maxCount = 1 };
        let maxCount = 1;

        //TO BE REMOVED, avoid waiting on animation
        // maxCount = 1;


        // console.log("maxCount: " + maxCount);
        let xIncrement = (endX - startX) / maxCount;
        // console.log("xIncrement: " + xIncrement);
        let yIncrement = (endY - startY) / maxCount;
        // console.log("yIncrement: " + yIncrement);

        endX = startX + xIncrement;
        endY = startY + yIncrement;

        let count = 0;
        let framesPerSecond = 60;
        let requestId;

        function animate() {
          setTimeout(function() {
            requestId = requestAnimationFrame(animate);

            if (count >= maxCount) {
              cancelAnimationFrame(requestId);
              // console.log(
              //   "execution of method complete! requestID: " + requestId
              // );
              // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
              // ctx.drawImage(canvasBack, 0, 0);
              resolve("completed");
              return;
            }

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);

            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.strokeStyle = "#000";
            

            // //clear canvas to overwrite pencil with existing drawings (treat the canvasbackup as an image)
            // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            // // ctx.globalAlpha = 0.997;
            // ctx.drawImage(canvasBack, 0, 0);

            // ctx.globalAlpha = 0.50;
            ctx.stroke();
            

            // //backup canvas again after stroke
            // canvasBack.width = ctx.canvas.width;
            // canvasBack.height = ctx.canvas.height;
            // canvasBack.ctx = canvasBack.getContext("2d");
            // canvasBack.ctx.drawImage(canvas, 0, 0);

            // ctx.globalAlpha = 1;
            //add pencil
            // ctx.drawImage(img, endX, endY - 45, 50, 50);

            startX += xIncrement;
            endX += xIncrement;
            startY += yIncrement;
            endY += yIncrement;
            count += 1;
          }, 1000 / framesPerSecond);
        }
        animate();
      });
    },

    animateArc(arcObj) {
      //async function
      return new Promise((resolve, reject) => {
        console.log("drawing triggered");
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        //     "coordinateList": [
        //      {"type": "line", "data": { "startX": 40, "startY": 20, "endX": 40, "endY": 80 }},
        //      {"type": "arc", "data": { "centerX": 40, "centerY":35, "radius": 30,
        //                                "startAngleDeg": 90, "endAngleDeg": 270, "counterClockwise": false }}
        // ]

        let centerX = arcObj.centerX;
        let centerY = arcObj.centerY;
        let radius = arcObj.radius;
        let startAngle = arcObj.startAngleDeg * 0.01745329252; // convert to radians
        let endAngle = arcObj.endAngleDeg * 0.01745329252;
        let counterClockwise = arcObj.counterClockwise;
        // arcObj.counterClockwise;

        console.log("drawing arc: " + arcObj);

        let diffAngles;
        //calculate number of iterations for drawing loop
        if (counterClockwise === false) {
          diffAngles = Math.abs(endAngle - startAngle);
        } else {
          //negative number
          diffAngles = -Math.abs(endAngle - startAngle);
        }

        let iterations = diffAngles;

        // console.log("iterations: " + iterations);
        let maxCount = 50;
        // maxCount = 1;
        const angleIncrement = diffAngles / maxCount;

        let count = 0;
        let framesPerSecond = 60;
        let requestId;

        endAngle = startAngle + angleIncrement;

        var img = document.getElementById("pencilsvg");
        let pencilCoordinates;

        //assign vue instance to const in order to access from callback function:
        const vm = this;

        //make initial canvasbackup
        var canvasBack = document.createElement("canvas");
        canvasBack.width = ctx.canvas.width;
        // console.log("width: " + ctx.canvas.width + ", canvasWidth: " + this.canvasHeight);
        canvasBack.height = ctx.canvas.height;
        canvasBack.ctx = canvasBack.getContext("2d");
        canvasBack.ctx.drawImage(canvas, 0, 0);

        function animate() {
          requestId = requestAnimationFrame(animate);

          if (count >= maxCount) {
            cancelAnimationFrame(requestId);
            // console.log(
            //   "execution of method complete! requestID: " + requestId
            // );
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.drawImage(canvasBack, 0, 0);
            resolve("completed");
            return;
          }

          //prepare coordinates for drawing the pencil:
          pencilCoordinates = vm.getCoordinatesOfArc(
            centerX,
            centerY,
            radius,
            endAngle
          );

          ctx.beginPath();
          ctx.arc(
            centerX,
            centerY,
            radius,
            startAngle,
            endAngle,
            counterClockwise
          );

          ctx.strokeStyle = "#000";
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = 7;

          //clear canvas to overwrite pencil with existing drawings (treat the canvasbackup as an image)
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.drawImage(canvasBack, 0, 0);

          ctx.stroke();

          //backup canvas again after stroke
          canvasBack.width = ctx.canvas.width;
          canvasBack.height = ctx.canvas.height;
          canvasBack.ctx = canvasBack.getContext("2d");
          canvasBack.ctx.drawImage(canvas, 0, 0);

          //add pencil
          ctx.drawImage(
            img,
            pencilCoordinates[0],
            pencilCoordinates[1] - 45,
            50,
            50
          );

          startAngle += angleIncrement;
          endAngle += angleIncrement;
          count += 1;

          // startX += xIncrement;
          // endX += xIncrement;
          // startY += yIncrement;
          // endY += yIncrement;
          // count += 1;
        }

        animate();
      });
    },
    //end letter animation methods

    // removed event param (just to know, it exists as for all callbacks)
    drawLine() {
      //   If lastX is not set, set lastX and lastY to the current position
      if (this.cursor.previous.x == -1) {
        this.cursor.previous.x = this.cursor.current.x;
        this.cursor.previous.y = this.cursor.current.y;
      }
      
      //record for letter animation
      this.recordAnimateCoordinates(false);


      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
      var r = 33;
      var g = 171;
      var b = 205;
      var a = 255;

      // Select a fill style
      // ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + a / 255 + ")";
      ctx.strokeStyle = "#ff0000";
      // Set the line "cap" style to round, so lines at different angles can join into each other
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      // Draw a filled line
      ctx.beginPath();
      // First, move to the old (previous) position
      ctx.moveTo(this.cursor.previous.x, this.cursor.previous.y);
      // Now draw a line to the current touch/pointer position
      ctx.lineTo(this.cursor.current.x, this.cursor.current.y);
      // Set the line thickness and draw the line
      ctx.lineWidth = this.cursor.size;
      ctx.stroke();
      ctx.closePath();

      // Update the last position to reference the current position
      this.cursor.previous.x = this.cursor.current.x;
      this.cursor.previous.y = this.cursor.current.y;
      
    },
    mouseDown: function(event) {
      this.mousePressed = true;
      this.setCurrentMousePosition(event);
      this.drawLine(event);
      this.validatePosition(event);
    },
    printCoordinates() {
      //calculate ratio with 1/1.7 height/width
      let ratio = this.canvasHeightAsNumber / 100;

      let y = this.cursor.current.y / ratio;
      let x = this.cursor.current.x / ratio;
      
      console.log('('+ x +','+ y +')');
    },
    recordAnimateCoordinates(isMouseup) {
      let ratio = this.canvasHeightAsNumber / 100;

      let startX;
      let startY;
      if (this.cursor.previous.x != -1 && this.cursor.previous.y != -1 ) {
        startX = this.cursor.previous.x / ratio;    
        startY = this.cursor.previous.y / ratio;
      } else {
        startX = this.cursor.current.x / ratio;
        startY = this.cursor.current.y / ratio;
      }
      
      let endX = this.cursor.current.x / ratio;
      let endY = this.cursor.current.y / ratio;
      
      // console.log('('+ endX +','+ endY +')');

      //       animationRecording: [],
      // animationBuildLine: {},
      // animationBuildCounter: 0;
      // animationBuildStep: 3

      if (this.animationBuildCounter === 0) {        

          this.animationBuildLine = { type : "line",
                        data : { 
                          startX: startX,
                          startY: startY,
                          endX: endX,
                          endY: endY
                        }};

                        // console.log("adding data : " + this.animationBuildLine.data);
      }

      if ( (this.animationBuildCounter >= this.animationBuildStep) || (isMouseup === true) ) {
          this.animationBuildLine.data.endX = endX;
          this.animationBuildLine.data.endY = endY;
          
          // this.animationRecording.push(JSON.stringify(this.animationBuildLine));
          this.animationRecording.push(this.animationBuildLine);
          // console.log("line pushed");
          
          this.animationBuildLine = {};
          this.animationBuildCounter = 0;
      } else {
        this.animationBuildCounter += 1;
      }

      // let line = '{"type": "line", "data": { "startX": '+x+', "startY": '+y+', "endX": '+x+', "endY": '+y+'}}';



    },
    outputAnimationRecording() {
      console.log(document.write(this.animationRecording));
    },

    validateDrawing() {
      //call to ValidationMixin
      this.score = this.validateCoordinates(this.animationRecording, this.relevantCoordinateList);
      this.$store.commit("SET_VALIDATION_SCORE", this.score);
    },
    validatePosition(event) {
      //check if position is correct starting point
      if (this.traceAnimateRelevant) {
        //get the coordinate data for comparison
        let rowObj;
        if (this.$store.getters.lowerCaseLetter === true) {
          rowObj = JSON.parse(
          JSON.stringify(this.coordinates.coordinateListLower[0])
          );
        } else {
          rowObj = JSON.parse(
          JSON.stringify(this.coordinates.coordinateListUpper[0])
          );
        }

        const translatedCoordinates = this.translateCoordinates(
          rowObj.data,
          rowObj.type,
          this.canvasHeightAsNumber
        );

        //set tolerances for comparison - always require first object to be a line (for easy mapping to coordinates)
        const lowerX =
          translatedCoordinates.startX - this.traceValidationTolerancePx;
        const upperX =
          translatedCoordinates.startX + this.traceValidationTolerancePx;
        const lowerY =
          translatedCoordinates.startY - this.traceValidationTolerancePx;
        const upperY =
          translatedCoordinates.startY + this.traceValidationTolerancePx;

        //compare to mouse position
        if (
          this.cursor.current.x > lowerX &&
          this.cursor.current.x < upperX &&
          this.cursor.current.y > lowerY &&
          this.cursor.current.y < upperY
        ) {
          this.traceAnimateRelevant = false; //disable new animation until clear canvas
          this.traceAnimateActive = true;
          setTimeout(() => {
            this.traceAnimateActive = false;
          }, 100);
        }
      }
    },

    handleMouseUp: function() {
      this.mousePressed = false;

      //for drawline method, reset tracking when mouse released
      this.cursor.previous.x = -1;
      this.cursor.previous.y = -1;

      //end recording
      // this.recordAnimateCoordinates(true);
    },

    mouseMove(event) {
      // Update the mouse co-ordinates when moved (best practice to take from event, computed is not right here)
      this.setCurrentMousePosition(event);

      // Draw a dot if the mouse button is currently being pressed
      //   console.log("mousemove event triggered");
      if (this.mousePressed == true) {
        this.drawLine(event); //remove event? Not used.
      }
    },

    setCurrentMousePosition(event) {
      if (event.offsetX) {
        this.cursor.current = {
          x: event.offsetX,
          y: event.offsetY
        };
        // console.log('cursor: ('+event.offsetX+','+event.offsetY+')');
      }
      // to support firefox, but not perfect i think. Be wary..
      else if (event.layerX) {
        this.cursor.current = {
          x: event.layerX,
          y: event.layerY
        };
      }
    },

    //*****************touchpad methods******************************** */

    // Draw something when a touch start is detected
    sketchpadTouchStart(event) {
      // Update the touch co-ordinates
      this.getTouchPos(event);

      this.drawLine();
      this.validatePosition(event);

      //always record the touch start:
      this.recordAnimateCoordinates(true);

      // Prevents an additional mousedown event being triggered
      event.preventDefault();
    },

    sketchpadTouchEnd() {
      // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
      this.cursor.previous.x = -1;
      this.cursor.previous.y = -1;

      //end recording
      this.recordAnimateCoordinates(true);
    },

    // Draw something and prevent the default scrolling when touch movement is detected
    sketchpadTouchMove(event) {
      // Update the touch co-ordinates
      this.getTouchPos(event);
      // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
      this.drawLine();

      // Prevent a scrolling action as a result of this touchmove triggering.
      event.preventDefault();
    },

    // Get the touch position relative to the top-left of the canvas
    // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
    // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
    // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
    getTouchPos(event) {
      // console.log("reading touch");
      if (event.touches) {
        if (event.touches.length == 1) {
          // Only deal with one finger
          // var canvas = document.getElementById("canvas");

          var rect = event.target.getBoundingClientRect();

          //use the highest offset value to handle ipad/mobile browsers as well as desktop
          const scrollTop = Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          );
          const scrollLeft = Math.max(
            window.pageXOffset,
            document.documentElement.scrollLeft,
            document.body.scrollLeft
          );

          this.cursor.current.x =
            event.targetTouches[0].pageX - rect.left - scrollLeft;
          this.cursor.current.y =
            event.targetTouches[0].pageY - rect.top - scrollTop;
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.picture {
  position: absolute;
  left: 0px;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  // border: 3px solid #73AD21;
}
.animationPicture {
  position: absolute;
  // left: 150;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

.animpic1 {
  left: 93%;
}

.animpic2 {
  left: 85%; 
  top: 40%;
}

.animpic3 {
  top: 40%;
  left: 2%;
}

.animpic4 {
  left: 5%; 
  top: 80%;
}

//validation animation
.validation1-enter {
  opacity: 1;
}

.validation1-enter-active {
  transition: opacity 0.3s;
}

.validation1-leave {
}

.validation1-leave-active {
  transition: opacity 1s;
  animation: slide1 1s;
  opacity: 0;
}

@keyframes slide1 {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(10%, -10%);
  }
}

.validation2-enter {
  opacity: 0;
}

.validation2-enter-active {
  transition: opacity 0.1s;
}

.validation2-leave {
}

.validation2-leave-active {
  transition: opacity 0.7s;
  animation: slide2 0.7s;
  opacity: 0;
}

@keyframes slide2 {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-10%, -8%);
  }
}
</style>