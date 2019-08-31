
<template>
  <div class="row">
    <div class="col-md-4 text-right">
      <input type="submit" value="Clear Sketchpad" id="clearbutton" @click="clearCanvas()" />
    </div>

    <div id="container" class="col-md-8 text-left">
      <canvas
        id="canvas"
        v-on:mousedown="mouseDown"
        v-on:mousemove="mouseMove"
        v-on:touchstart="sketchpadTouchStart"
        v-on:touchend="sketchpadTouchEnd"
        v-on:touchmove="sketchpadTouchMove"
        :width="canvas.width"
        :height="canvas.height"
      ></canvas>
      <img
        id="image"
        class="img"
        :src="letter.image"
        :alt="letter.alt"
        :width="canvas.width"
        :height="canvas.height"
      />
    </div>
  </div>
</template>


<script>
export default {
  props: {
    letter: {
      type: Object,
      default: {
        l: "A",
        image: require("../../assets/apekatt.jpg"),
        alt: "Apekatt"
        /*   sound: "../assets/apekatt.mp3" */
      }
    }
  },

  data: function() {
    return {
      // canvasBlank: true,
      canvas: {
        height: 300,
        width: 400
      },

      cursor: {
        current: {
          x: 0,
          y: 0
        },
        previous: {
          x: -1,
          y: -1
        },
        size: 20
      },
      mousePressed: false,
      touchSize: 20,
      touchX : 0,
      touchY : 0,
      lastX : -1,
      lastY : -1
    };
  },

  created: function() {
    //initiate eventlistener on window on startup (as window not available in template)
    window.addEventListener("mouseup", this.handleMouseUp);
  },
  destroyed: function() {
    window.removeEventListener("mouseup", this.handleMouseUp);
  },

  methods: {
    clearCanvas() {
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // this.canvasBlank = true;
    },

    drawLine(event) {
      //   If lastX is not set, set lastX and lastY to the current position
      if (this.cursor.previous.x == -1) {
        this.cursor.previous.x = this.cursor.current.x;
        this.cursor.previous.y = this.cursor.current.y;
      }

      var c = document.getElementById("canvas");

      var ctx = c.getContext("2d");

      // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
      var r = 255;
      var g = 0;
      var b = 0;
      var a = 75;

      // Select a fill style
      ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + a / 255 + ")";
      // Set the line "cap" style to round, so lines at different angles can join into each other
      ctx.lineCap = "round";
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
        this.cursor.previous.x=-1;
        this.cursor.previous.y=-1;
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
        if(event.touches) {
            if (event.touches.length == 1) { // Only deal with one finger

                var rect = event.target.getBoundingClientRect();
              this.cursor.current.x = event.targetTouches[0].pageX - rect.left;
              this.cursor.current.y = event.targetTouches[0].pageY - rect.top;

                // var touch = event.touches[0]; // Get the information for finger #1

                // // this.cursor.current.x=touch.pageX-touch.target.offsetLeft;
                // // this.cursor.current.y=touch.pageY-touch.target.offsetTop;
                
                // this.cursor.current.x=touch.clientX - touch.target.offsetLeft;
                // this.cursor.current.y=touch.clientY - touch.target.offsetTop;

                // console.log("touch.pageX: " + touch.pageX );
                // console.log("touch.pageY: " + touch.pageY);
                // console.log("touch.target: " + touch.target.offsetLeft);
            }
        }
    }
  }
};
</script>

<style scoped>
canvas {
  border: 1px solid black;
  position: absolute;
  z-index: 20;
}

.img {
  position: absolute;
  z-index: 10;
}

#container {
  position: relative;
}
</style>