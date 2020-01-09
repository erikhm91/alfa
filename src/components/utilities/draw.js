export default class UnnrDrawTool {
  
  constructor(canvasContext) {
    this.ctx = canvasContext;
    this.cursorCurrent = {
      x: 0,
      y: 0
    };
    this.cursorPrev = {
      x: -1,
      y: -1
    };
    this.size = 9
    this.mousePressed = false
  }

  helloWorld() {
    return 'blabla';
  }

  assignContext(context) {
    console.log(this.ctx);
    this.ctx = context;
    console.log(this.ctx);
  }

  clearCanvas() {
    // var c = document.getElementById("canvas");
    // var ctx = c.getContext("2d");
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawLine() {
    //   If lastX is not set, set lastX and lastY to the current position
    if (this.cursorPrev.x == -1) {
      this.cursorPrev.x = this.cursorCurrent.x;
      this.cursorPrev.y = this.cursorCurrent.y;
    }

    // var c = document.getElementById("canvas");

    // var ctx = c.getContext("2d");

    // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
    var r = 33;
    var g = 171;
    var b = 205;
    var a = 255;

    // Select a fill style
    this.ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + a / 255 + ")";
    // Set the line "cap" style to round, so lines at different angles can join into each other
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    // Draw a filled line
    this.ctx.beginPath();
    // First, move to the old (previous) position
    this.ctx.moveTo(this.cursorPrev.x, this.cursorPrev.y);
    // Now draw a line to the current touch/pointer position
    this.ctx.lineTo(this.cursorPrev.x, this.cursorCurrent.y);
    // Set the line thickness and draw the line
    this.ctx.lineWidth = this.size;
    this.ctx.stroke();
    this.ctx.closePath();

    // Update the last position to reference the current position
    this.cursorPrev.x = this.cursorCurrent.x;
    this.cursorPrev.y = this.cursorCurrent.y;
  }
  mouseDown(event) {
    this.mousePressed = true;
    this.setCurrentMousePosition(event);
    this.drawLine(event);
  }
  handleMouseUp() {
    this.mousePressed = false;

    //for drawline method, reset tracking when mouse released
    this.cursorPrev.x = -1;
    this.cursorPrev.y = -1;
  }

  mouseMove(event) {
    // Update the mouse co-ordinates when moved (best practice to take from event, computed is not right here)
    this.setCurrentMousePosition(event);

    // Draw a dot if the mouse button is currently being pressed
    //   console.log("mousemove event triggered");
    if (this.mousePressed == true) {
      this.drawLine(event); //remove event? Not used.
    }
  }

  setCurrentMousePosition(event) {
    if (event.offsetX) {
      this.cursorCurrent = {
        x: event.offsetX,
        y: event.offsetY
      };
    }
    // to support firefox, but not perfect i think. Be wary..
    else if (event.layerX) {
      this.cursorCurrent = {
        x: event.layerX,
        y: event.layerY
      };
    }
  }

  //*****************touchpad methods******************************** */

  // Draw something when a touch start is detected
  sketchpadTouchStart(event) {
    // Update the touch co-ordinates
    this.getTouchPos(event);

    this.drawLine();

    // Prevents an additional mousedown event being triggered
    event.preventDefault();
  }

  sketchpadTouchEnd() {
    // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
    this.cursorPrev.x = -1;
    this.cursorPrev.y = -1;
  }

  // Draw something and prevent the default scrolling when touch movement is detected
  sketchpadTouchMove(event) {
    // Update the touch co-ordinates
    this.getTouchPos(event);
    // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
    this.drawLine();

    // Prevent a scrolling action as a result of this touchmove triggering.
    event.preventDefault();
  }

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

        // var p = $("body");

        // const html = document.querySelector("html");
        // $(".info").text("scrollTop:" + p.scrollTop());

        // const container = document.querySelector(".drawcontainer");
        // var scrollTop = html.scrollTop;
        // var scrollLeft = html.scrollLeft;

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

        // console.log("event.target: " + event.target);
        // console.log("scrolltop: " + scrollTop);
        // console.log("scrollLeft: " + scrollLeft);

        this.cursorCurrent.x =
          event.targetTouches[0].pageX - rect.left - scrollLeft;
        this.cursorCurrent.y =
          event.targetTouches[0].pageY - rect.top - scrollTop;

        // var touch = event.touches[0]; // Get the information for finger #1

        // this.cursorCurrent.x = event.targetTouches[0].pageX - canvas.clientLeft;
        // this.cursorCurrent.y = event.targetTouches[0].pageY - canvas.clientTop;

        // this.cursorCurrent.x = touch.pageX-touch.target.offsetLeft;
        // this.cursorCurrent.y = touch.pageY-touch.target.offsetTop;

        // this.cursorCurrent.x=touch.clientX - touch.target.offsetLeft;
        // this.cursorCurrent.y=touch.clientY - touch.target.offsetTop;

        // console.log("touch.pageX: " + touch.pageX );
        // console.log("touch.pageY: " + touch.pageY);
        // console.log("touch.target: " + touch.target.offsetLeft);
      }
    }
  }

}