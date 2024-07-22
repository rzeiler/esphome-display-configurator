<template>
  <div class="rounded d-flex flex-column mt-3 mb-3 bg-white shadow-sm ps-3 pe-3 ">
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
      <button type="button" @click="rotate" class="btn btn-warning" >Drehen</button>
    </div>
    <div
      ref="dis"
      :class="cssClass"
      :style="{ scale: display.scale }"
      @mousewheel="handleScroll"
    >
      <div
        id="screen"
        class="shadow position-relative overflow-hidden"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
      >
        <label
          :class="labelClass(item)"
          v-for="(item) in labels"
          :key="item.id"
         :id="item.id"
          :style="labelStyle(item)"
        >
          {{ item.text }} {{ item.id }}
        </label>

        <span
          v-for="(image) in images"
          :key="image.id"
           
          :class="image.image"
          :style="imageStyle(image)"
          :id="image.id"
        >{{ image.id }}</span>
      </div>
    </div>
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
    images: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data: function () {
    return {
      angle: 0,
      displays: [
        {
          name: "OLED",
          class: "oled128x64",
          details: "128x64",
          scale: 1,
        },
        {
          name: "waveshare",
          class: "waveshare250x122 vertical",
          details: "250x122",
          scale: 1,
        },
      ],
      display: {},
    };
  },
  mounted() {
    this.display = this.displays[1];
    this.setTooltip();
    this.mouseUp();
  },
  methods: {
    rotate(){

    },
    mouseMove() {
      if (window.dragEl.target != undefined) {
        const e = window.event;
        const el = window.dragEl;

        var x = e.clientX - el.clientX + el.left;
        var y = e.clientY - el.clientY + el.top;
        const id = el.id;
     
        if (el.target.nodeName == "SPAN") {
          let local_images = [...this.images];
          local_images[id].left = x;
          local_images[id].top = y;
        }
        if (el.target.nodeName == "LABEL") {
          let local_labels = [...this.labels];
          local_labels[id].left = x;
          local_labels[id].top = y;
        }
      }
    },
    mouseUp() {
      window.dragEl = {
        target: undefined,
        clientX: 0,
        clientY: 0,
        left: 0,
        top: 0,
        id: 0,
      };
    },
    mouseDown() {
      const e = window.event;
      const id = parseInt(e.target.getAttribute("data-id"));

      window.dragEl = {
        target: e.target,
        clientX: e.clientX,
        clientY: e.clientY,
        left: e.target.offsetLeft,
        top: e.target.offsetTop,
        id: id,
      };
    },
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
    labelStyle(item) {
      return {
        left: item.left + "px",
        top: item.top + "px",
        "font-size": item.font.size + "px",
        "font-family": item.font.name,
      };
    },
    imageStyle(item) {
      return {
        left: item.left + "px",
        top: item.top + "px",
      };
    },
    labelClass(item) {
      return `${item.style.toLowerCase()} text-nowrap`;
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
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label.top_center {
  transform: translateX(-50%);
}
label.top_right {
  transform: translateX(-100%);
}

.board {
  display: inline-block;
  padding: 20px 10px 30px 10px;
  margin: 100px;
  cursor: zoom-in;
}

#screen:hover > * {
  opacity: 0.5;
}

#screen:hover > label:hover,
#screen:hover > span.mdi:hover {
  opacity: 1;
  border: 1px solid #6f42c1;
  padding: 0;
  cursor: move;
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
  border: 1px solid #eee;
  background-color: #eee;
  box-shadow: 0px 0px 10px #000000;
  margin: -1px 0;
  color: #333333;
  width: 250px;
  height: 122px;
  overflow: hidden;
}

.waveshare250x122.vertical {
  padding: 15px 1px 15px 1px !important;
}

.waveshare250x122.vertical > div:first-child {
  height: 250px !important;
  width: 122px !important;
}

label {
  user-select: none;
  position: absolute;
  border: 1px solid transparent;
  line-height: 0.8;
}

span.mdi {
  user-select: none;
  position: absolute;
  border: 1px solid transparent;
  line-height: 0.8;
}

.hole {
  border: 2px solid #aaa;
  height: 12px;
  width: 12px;
  background-color: rgba(var(--bs-tertiary-bg-rgb), var(--bs-bg-opacity)) !important;
}
</style>
