<template>
  <div
    class="rounded bg-white shadow p-3 mt-3 d-flex justify-content-center align-items-center"
  >
    <div ref="dis" class="shadow" @mousewheel="handleScroll">
      <div
        v-if="settings"
        id="screen"
        class="shadow position-relative overflow-hidden"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
        :style="{
          scale: settings.scale,
          height: settings.height + 'px',
          width: settings.width + 'px',
          backgroundColor: `${settings.background}`,
          color: `${settings.text}`,
        }"
      >
        <label
          :class="labelClass(item)"
          v-for="(item, idx) in labels"
          :key="item.id"
          :id="idx"
          :style="labelStyle(item)"
        >
          {{ item.text }}
        </label>

        <span
          v-for="(image, idx) in images"
          :key="image.id"
          :id="idx"
          :class="image.image"
          :style="imageStyle(image)"
        />
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
    settings: {
      type: Object,
      default() {
        return {
          height: 122,
          width: 255,
          background: "#eeeeee",
          text: "#333333",
          rotation: 0,
        };
      },
    },
  },
  mounted() {
    this.mouseUp();
  },
  methods: {
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
      
      if (window.dragEl != undefined) {
        this.$emit("changed");
      }
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
      const id = parseInt(e.target.getAttribute("id"));

      window.dragEl = {
        target: e.target,
        clientX: e.clientX,
        clientY: e.clientY,
        left: e.target.offsetLeft,
        top: e.target.offsetTop,
        id: id,
      };
    },
    handleScroll(event) {
      /*
      if (event.deltaY === 120) {
        this.display.scale += 0.1;
      }
      if (event.deltaY === -120) {
        this.display.scale -= 0.1;
      }
        */
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
      return `${this.settings.class} board shadow align-self-center`; // {display.oled128x64, true: 'board shadow align-self-center'};
    },
    cssStyle() {
      return "";
    },
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
</style>
