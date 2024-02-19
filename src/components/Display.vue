//2,13 '' 250x122px

<template>
  <div class="rounded d-flex flex-column mt-3 mb-3 bg-white shadow ps-3 pe-3">
    <div class="p-4 d-flex">
      <span class="ps-0 display-2 mb-4">Display</span>
      <span class="flex-grow-1"></span>
      <div
        class="dropdown d-flex align-items-center"
        data-bs-toggle="tooltip"
        title="Choose Display"
      >
        <button
          class="btn active rounded-circle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="mdi mdi-dots-vertical"></span>
        </button>
        <ul class="dropdown-menu">
          <li>
            <a
              @click="display = item"
              v-for="item in displays"
              :key="item.name"
              class="dropdown-item"
              href="#"
              >{{ item.name }} ({{ item.details }})</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div
      ref="dis"
      data-bs-toggle="tooltip"
      title="Scroll to resize"
      :class="cssClass"
      :style="{ scale: display.scale }"
      @mousewheel="handleScroll"
    >
      <div
        id="screen"
        :style="{
          width: display.width + 'px',
          height: display.height + 'px',
          backgroundColor: display.backgroundColor,
          color: display.color,
        }"
        class="shadow position-relative"
      >
        <label
          v-for="item in labels"
          :key="item.id"
          :style="{
            left: item.left + 'px',
            top: item.top + 'px',
            'font-size': item.font.size + 'px',
            'font-family': item.font.name,
          }"
        >
          {{ item.text }}
        </label>
      </div>
      <div class="hole position-absolute top-0 start-0 rounded-circle" />
      <div class="hole position-absolute top-0 end-0 rounded-circle" />
      <div class="hole position-absolute bottom-0 start-0 rounded-circle" />
      <div class="hole position-absolute bottom-0 end-0 rounded-circle" />
    </div>
    <svg ref="svg" width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <image href="/img/boards/oled128x64.png" height="400" width="400" />
      <text
        x="120"
        y="105"
        style="font-family: 'Open Sans'; fill: #ffffff; font-size: 10px"
      >
        Hello
      </text>
    </svg>
    <canvas ref="canvas" class="border" />
  </div>
</template>

<script>
export default {
  name: "Display",

  props: {
    labels: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data: function () {
    return {
      vueCanvas: {},
      displays: [
        {
          name: "OLED",
          class: "oled128x64",
          details: "128x64",
          width: 128,
          heigth: 64,
          scale: 2,
          src: "./img/boards/oled128x64.png",
        },
        {
          name: "waveshare",
          class: "waveshare250x122",
          details: "250x122",
          width: 250,
          heigth: 122,
          scale: 2,
        },
      ],
      display: {},
    };
  },
  mounted() {
    var c = this.$refs.canvas;
    var ctx = c.getContext("2d");
    this.vueCanvas = ctx;
    this.vueCanvas.imageSmoothingEnabled = false;

    if (localStorage.display != undefined) {
      this.display = JSON.parse(localStorage.display);
    } else {
      this.display = this.displays[0];
    }
    /// test
    this.display = this.displays[0];

    this.drawBoard();

    this.setTooltip();
  },
  methods: {
    onChange(item) {
      this.display = item;
      localStorage.display = JSON.stringify(item);
    },
    handleScroll(event) {
      if (event.deltaY === 120) {
        this.display.scale += 0.1;
      }
      if (event.deltaY === -120) {
        this.display.scale -= 0.1;
      }
    },
    drawBoard() {
      const svg = this.$refs.svg;

      this.vueCanvas.clearRect(0, 0, 400, 200);
      const playerImg = new Image();
      playerImg.src = this.display.src;
      const ctx = this.vueCanvas;
      const c = this.$refs.canvas;
      playerImg.onload = function () {
        c.width = playerImg.naturalWidth;
        c.height = playerImg.naturalHeight;

        c.style.width = playerImg.naturalWidth + "px";
        c.style.height = playerImg.naturalHeight + "px";

        svg.width = playerImg.naturalWidth + "px";
        svg.height = playerImg.naturalHeight + "px";

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(playerImg, 0, 0, playerImg.width, playerImg.height);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "10px Open Sans";
        ctx.fillText("Hello world", 20, 40);
      };
    },
    drawRect() {
      // clear canvas
      this.vueCanvas.clearRect(0, 0, 400, 200);

      // draw rect

      this.vueCanvas.beginPath();

      this.vueCanvas.fillStyle = "#FF0000";
      this.vueCanvas.fillRect(0, 0, 150, 75);

      this.vueCanvas.rect(20, 20, this.rectWidth, 100);
      this.vueCanvas.fillStyle = "#FF0000";
      this.vueCanvas.stroke();
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
  computed: {
    cssClass() {
      return `${this.display.class} board shadow align-self-center`; // {display.oled128x64, true: 'board shadow align-self-center'};
    },
  },
  watch: {
    display() {
      localStorage.display = JSON.stringify(this.display);
    },
    "display.scale"() {
      localStorage.display = JSON.stringify(this.display);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.board {
  display: inline-block;
  padding: 20px 10px 30px 10px;
  margin: 100px;
  cursor: zoom-in;
}

.board > div:first-child {
  position: relative;
}

.oled128x64 {
  border: 5px solid #1b497e;
  background-color: #17599b;
  border-radius: 7px;
}

.oled128x64 > div:first-child {
  border: 3px solid #000000;
  background-color: #000000;
  box-shadow: 0px 0px 10px #000000;
  color: #fff;
  width: 128px;
  height: 64px;
}

.waveshare250x122 {
  border: 2px solid #1b497e;
  background-color: #17599b;
  border-radius: 7px;
  padding: 1px 15px 1px 15px;
}

.waveshare250x122 > div:first-child {
  position: relative;
  border: 2px solid #fafafa;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px #000000;
  margin: -1px 0;
  color: #111111;
  width: 128px;
  height: 64px;
}

label {
  user-select: none;
  position: absolute;
}

.hole {
  border: 2px solid #aaa;
  height: 12px;
  width: 12px;
  background-color: rgba(var(--bs-tertiary-bg-rgb), var(--bs-bg-opacity)) !important;
}
</style>
