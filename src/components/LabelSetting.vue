//2,13 '' 250x122px

<template>
  <div class="input-group mb-3">
    <span class="input-group-text">Text</span>
    <input
      type="text"
      class="form-control"
      :value="value.text"
      @input="update('text', $event.target.value)"
      placeholder="Hello world"
      aria-label="Text"
      aria-describedby="Text"
    />
    <span class="input-group-text">Top</span>
    <input
      type="number"
      :value="value.top"
      class="form-control"
      @input="update('top', $event.target.value)"
      style="max-width: 100px"
      min="0"
      :max="value.maxHeight"
    />
    <span class="input-group-text">Left</span>
    <input
      type="number"
      :value="value.left"
      class="form-control"
      @input="update('left', $event.target.value)"
      style="max-width: 100px"
      min="0"
      :max="value.maxWidth"
    />
    <div class="dropdown" data-bs-toggle="tooltip" title="Font">
      <button
        data-bs-toggle="dropdown"
        class="btn btn-light rounded-0"
        style="z-index: unset"
        type="button"
      >
        {{ value.font.name }} ({{ value.font.size }})
      </button>
      <ul class="dropdown-menu">
        <li href="#" v-for="(font, idx) in fonts" :key="idx">
          <a class="dropdown-item">{{ font.name }} ({{ font.size }})</a>
        </li>
      </ul>
    </div>
    <div class="dropdown" data-bs-toggle="tooltip" title="TextAlign">
      <button
        data-bs-toggle="dropdown"
        class="btn btn-light rounded-0"
        style="z-index: unset"
        type="button"
      >
        {{ defaultStyle(value.style) }}
      </button>
      <ul class="dropdown-menu">
        <li
          href="#"
          v-for="(align, idx) in aligns"
          :key="idx"
          @click="update('style', align)"
        >
          <a class="dropdown-item">{{ align }}</a>
        </li>
      </ul>
    </div>

    <button class="btn btn-danger" style="z-index: unset" @click="remove(value.id)">
      <span class="mdi mdi-trash-can-outline me-1"></span>Remove
    </button>
  </div>
</template>

<script>
export default {
  name: "b-label",
  props: ["value", "fonts"],
  data: function () {
    return {
      aligns: [
        //"TOP",
        // "CENTER_VERTICAL",
        // "BASELINE",
        // "BOTTOM",
        // "LEFT",
        // "CENTER_HORIZONTAL",
        // "RIGHT",
        "TOP_LEFT",
        "TOP_CENTER",
        "TOP_RIGHT",
        // "CENTER_LEFT",
        // "CENTER",
        // "CENTER_RIGHT",
        // "BASELINE_LEFT",
        // "BASELINE_CENTER",
        // "BASELINE_RIGHT",
        // "BOTTOM_LEFT",
        // "BOTTOM_CENTER",
        // "BOTTOM_RIGHT",
      ],
    };
  },
  mounted() {
    this.setTooltip();
  },
  methods: {
    defaultStyle(style) {
      if (style == undefined) {
        style = "TOP_LEFT";
        this.update("style", style);
      }
      return style;
    },
    update(key, value) {
      this.$emit("input", { ...this.value, [key]: value });
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

#screen:hover > * {
  opacity: 0.5;
}

#screen:hover > label:hover {
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

.hole {
  border: 2px solid #aaa;
  height: 12px;
  width: 12px;
  background-color: rgba(var(--bs-tertiary-bg-rgb), var(--bs-bg-opacity)) !important;
}
</style>
