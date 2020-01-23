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
            id="taskImage"
            class="clickanimation center"
            src="https://cdn11.bigcommerce.com/s-in5je/images/stencil/1280x1280/products/6729/21035/banana-sticker__91685.1564864025.jpg?c=2&imbypass=on"
            alt="bilde"
            width="0px"
            height="0px"
     >
  </div>
</template>


<script>
export default {
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
      showImage: true
    };
  },

  created: function() {
    //initiate eventlistener on window on startup (as window not available in template)
    window.addEventListener("mouseup", this.handleMouseUp);
  },

  mounted() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var image = document.getElementById("taskImage");
    console.log(this.canvasWidth + this.canvasHeight);
    context.drawImage(image, 0, 0, 100, 100);
  },

  destroyed: function() {
    window.removeEventListener("mouseup", this.handleMouseUp);
  },

  watch: {
      clearCanvasTrigger(newVal, oldVal) {
        this.clearCanvas();
      }
  },

  methods: {
    clearCanvas() {
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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

      // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
      var r = 33;
      var g = 171;
      var b = 205;
      var a = 255;

      // Select a fill style
      ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + a / 255 + ")";
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
</style>