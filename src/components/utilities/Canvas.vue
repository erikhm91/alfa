<template>
  <div>
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

    <img
      class="picture"
      id="taskImage"
      src="https://cdn11.bigcommerce.com/s-in5je/images/stencil/1280x1280/products/6729/21035/banana-sticker__91685.1564864025.jpg?c=2&imbypass=on"
      alt="illustration.alt"
      width="100px"
      height="100px"
    />
  </div>
</template>


<script>
import CoordinatesMixin from "../mixins/CoordinatesMixin.js";
export default {
  mixins : [CoordinatesMixin],
  
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
    drawImage: {
      type: String
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
      animationDrawingSpeed: 4.2
    };
  },
  computed: {
    canvasHeightAsNumber() {
      return parseInt(this.canvasHeight, 10);
    },

    coordinates() {
      return this.$store.getters.letterCoordinatesOfActiveLetter;
    }
  },
  


  created: function() {
    //initiate eventlistener on window on startup (as window not available in template)
    window.addEventListener("mouseup", this.handleMouseUp);
  },

  mounted() {
    // var canvas = document.getElementById("canvas");
    // var context = canvas.getContext("2d");
    // var image = document.getElementById("taskImage");
    // console.log(this.canvasWidth + this.canvasHeight);
    // context.drawImage(image, 0, 0, 100, 100);
  },

  destroyed: function() {
    window.removeEventListener("mouseup", this.handleMouseUp);
  },

  watch: {
    clearCanvasTrigger(newVal, oldVal) {
      this.clearCanvas();
    },
    drawAnimationTrigger(newVal, oldVal) {
      this.animateTracing("A");
    }
  },

  methods: {
    clearCanvas() {
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },

    async animateTracing(letter) {
      //get letter tracing coordinates from store
      if (this.animationRequestId != null) {
      }
      // console.log(coordinateObj);
      var i;
      for (i = 0; i < this.coordinates.coordinateList.length; i++) {
        console.log("entered loop");
        //deep copy object value to translate scaling (without mutating the vuex state!)
        let rowObj = JSON.parse(JSON.stringify(this.coordinates.coordinateList[i]));

        console.log("Row obj: " + rowObj);
        if (rowObj.type === "line") {
          //translate coordinates to match canvas size:
          // console.log("startX before translate" + rowObj.data.startX);
          const translatedCoordinates = this.translateCoordinates(rowObj.data, this.canvasHeightAsNumber);
          // console.log("startX after translate" + translatedRowObj.startX);
          await this.animateLine(translatedCoordinates);

        // } else if (rowObj.type === "arc") {
        //   rowObj.data = this.translateArcCoordinates(rowObj.data, this.canvasHeightAsNumber);
        //   await this.animateArc(rowObj.data);
        }
      }
    },

    async writeA() {
      if (this.animationRequestId != null) {
      }
      let A = [
        { startX: 200, startY: 300, endX: 300, endY: 100 },

        { startX: 300, startY: 100, endX: 400, endY: 300 },

        { startX: 250, startY: 200, endX: 350, endY: 200 }
      ];

      var i;
      for (i = 0; i < A.length; i++) {
        await this.animateLine(A[i]);
      }
    },

    async writeO() {
      if (this.animationRequestId != null) {
      }
      let endAngle = 1.5*Math.PI;

      let O = [
        { centerX: 200, centerY: 300, radius: 50, startAngle: 0, endAngle: endAngle }
      ];
      console.log(O[0]);

      this.animateArc(O[0]);

            // let centerX = 200;
      // let centerY = 300;
      // let radius = 50;
      // let startAngle = 0; // in radians, 0 is 3 o'clock
      // let endAngle = Math.PI; // full circle

      // var i;
      // for (i = 0; i < O.length; i++) {
      //   await this.animateArc(O[i]);
      // }
    },

    animateLine(lineObj) {
      //async function
      return new Promise((resolve, reject) => {
        console.log("drawing triggered");
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        let startX = lineObj.startX;
        let startY = lineObj.startY;
        let endX = lineObj.endX;
        let endY = lineObj.endY;

        //calculate number of iterations for drawing loop
        const diffX = Math.abs(endX - startX);
        const diffY = Math.abs(endY - startY);
        let iterations = 0;
        if (diffX >= diffY) {
          iterations = diffX / this.animationDrawingSpeed;
        } else {
          iterations = diffY / this.animationDrawingSpeed;
        }
        console.log("iterations: " + iterations);
        let maxCount = Math.round(iterations);
        console.log("maxCount: " + maxCount);

        let xIncrement = (endX - startX) / maxCount;
        console.log("xIncrement: " + xIncrement);

        let yIncrement = (endY - startY) / maxCount;
        console.log("yIncrement: " + yIncrement);

        endX = startX + xIncrement;
        endY = startY + yIncrement;

        let count = 0;
        let framesPerSecond = 60;
        let requestId;

        function animate() {
          // ctx.clearRect(0, 0, innerWidth, innerHeight);
          setTimeout(function() {
            requestId = requestAnimationFrame(animate);

            if (count >= maxCount) {
              cancelAnimationFrame(requestId);
              console.log(
                "execution of method complete! requestID: " + requestId
              );
              resolve("completed");
            }

            // console.log(
            //   "startX: " +
            //     startX +
            //     ", endX:" +
            //     endX +
            //     ", startY:" +
            //     startY +
            //     ", endY" +
            //     endY
            // );

            // console.log("iterationnr: " + count + " out of " + maxCount);
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);

            ctx.lineWidth = 12;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.strokeStyle = "#000";
            ctx.stroke();

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
      // return new Promise((resolve, reject) => {

      console.log("drawing triggered");
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");

      let centerX = arcObj.centerX;
      let centerY = arcObj.centerY;
      let radius = arcObj.radius;
      let startAngle = arcObj.startAngle; // in radians, 0 is 3 o'clock
      let endAngle = arcObj.endAngle; // full circle 

      // let angleDiff = endAngle - startAngle;

      let count = 0;
      let requestId;

      console.log("drawing arc: " + arcObj);

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);

      ctx.strokeStyle = "#000";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = this.cursor.size;
      ctx.stroke();

      function animate() {
        // ctx.clearRect(0, 0, innerWidth, innerHeight);
        requestId = requestAnimationFrame(animate);

        if (count >= maxCount) {
          cancelAnimationFrame(requestId);
          console.log("execution of method complete! requestID: " + requestId);
          resolve("completed");
        }

        // console.log(
        //   "startX: " +
        //     startX +
        //     ", endX:" +
        //     endX +
        //     ", startY:" +
        //     startY +
        //     ", endY" +
        //     endY
        // );

        // console.log("iterationnr: " + count + " out of " + maxCount);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);

        ctx.strokeStyle = "#000";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = this.cursor.size;
        ctx.stroke();

        // startX += xIncrement;
        // endX += xIncrement;
        // startY += yIncrement;
        // endY += yIncrement;
        // count += 1;
      }
      // animate();
      // });
    },

    // removed event param (just to know, it exists as for all callbacks)
    drawLine() {
      //   If lastX is not set, set lastX and lastY to the current position
      if (this.cursor.previous.x == -1) {
        this.cursor.previous.x = this.cursor.current.x;
        this.cursor.previous.y = this.cursor.current.y;
      }

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
    },
    handleMouseUp: function() {
      this.mousePressed = false;

      //for drawline method, reset tracking when mouse released
      this.cursor.previous.x = -1;
      this.cursor.previous.y = -1;
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

      // Prevents an additional mousedown event being triggered
      event.preventDefault();
    },

    sketchpadTouchEnd() {
      // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
      this.cursor.previous.x = -1;
      this.cursor.previous.y = -1;
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
  // border: 3px solid #73AD21;
}
</style>