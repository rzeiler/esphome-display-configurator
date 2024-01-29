<template>
  <div class="d-flex align-items-stretch overflow-hidden">
    <div class="d-flex flex-column">
      <div>Lable</div>
    </div>
    <div
      class="d-flex align-items-center justify-content-center bg-light-subtle p-5 display-holder"
    >
      <canvas id="c">display 128x64</canvas>
      <div id="display">128x64</div>
    </div>
    <div>
      <button @click="drawRect">Add Rect</button>
      <button @click="subWidth">-</button>
      <button @click="addWidth">+</button>

      <button @click="drawLable">Add Lable</button>
    </div>

    <div class="bg-light-subtle">asdas</div>
  </div>
</template>

<script>
  export default {
    name: "UiEditor",
    components: {},
    props: {
      msg: String,
    },
    data: function () {
      return {
        message: "Vue + Canvas API",
        vueCanvas: null,
        board: {
          componets: {},
        },
        board_128x64: {
          width: 128,
          height: 64,
        },
      };
    },
    mounted() {
      var c = document.getElementById("c");

      var ctx = c.getContext("2d");
      c.width = 500;
      c.height = 500;
      this.vueCanvas = ctx;
    },
    methods: {
      drawRect() {
        var can = this.vueCanvas;
        // clear canvas
        can.clearRect(0, 0, 500, 500);

        var w = this.board_128x64.width;
        var h = this.board_128x64.height;

        var pcb = { w: 20, h: 60 };

        var s = 250 - parseInt((w + pcb.w) / 2);
        var t = 250 - parseInt((h + pcb.h) / 2);

        // draw rect
        can.beginPath();
        can.rect(s, t, w + pcb.w, h + pcb.h);
        can.fillStyle = "#1367B1";
        can.fill();

        s = 250 - parseInt(w / 2);
        t = 250 - parseInt(h / 2);

        can.beginPath();
        can.rect(s, t, w, h);
        can.fillStyle = "#000";
        can.fill();

        // this.board.componets = can;

        //can.stroke();
      },

      drawLable() {
        var can = this.vueCanvas;

        can.font = "30px Arial";
        can.fillText("Hello World", 10, 50);
      },

      addWidth() {
        this.rectWidth += 10;
        this.drawRect();
      },
      subWidth() {
        this.rectWidth -= 10;
        this.drawRect();
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ui {
  }
  canvas {
    border: 1px solid red;
    cursor: crosshair;
  }
  .display-holder {
  }
  #display {
    border: 2px solid #1b497e;
    background-color: #17599b;
    width: 128px;
    height: 64px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
