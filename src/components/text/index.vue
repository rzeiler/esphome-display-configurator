//2,13 '' 250x122px

<template>
  <div class="input-group mb-3">
    <div class="border">
      <span class="border border-0 rounded-0 position-absolute fs-7 overlay">Text</span>
      <input
        type="text"
        class="form-control border border-0 rounded-0"
        :value="value.text"
        @input="update('text', $event.target.value)"
        placeholder="Hello world"
        aria-label="Text"
        aria-describedby="Text"
      />
    </div>
    <div class="border">
      <span class="border border-0 rounded-0 position-absolute fs-7 overlay">Top</span>
      <input
        type="number"
        :value="value.top"
        class="form-control border border-0 rounded-0"
        @input="update('top', $event.target.value)"
        style="max-width: 100px"
        min="0"
        :max="value.maxHeight"
      />
    </div>
    <div class="border">
      <span class="border border-0 rounded-0 position-absolute fs-7 overlay">Left</span>
      <input
        type="number"
        :value="value.left"
        class="form-control border border-0 rounded-0"
        @input="update('left', $event.target.value)"
        style="max-width: 100px"
        min="0"
        :max="value.maxWidth"
      />
    </div>
    <div class="dropdown" data-bs-toggle="tooltip" title="Font">
      <button
        data-bs-toggle="dropdown"
        class="btn btn-light rounded-0 border"
        style="z-index: unset"
        type="button"
      >
        {{ value.font.name }} ({{ value.font.size }})
      </button>
      <ul class="dropdown-menu">
        <li href="#" v-for="(font, idx) in fonts" :key="idx">
          <a @click="update('font', font)" class="dropdown-item"
            >{{ font.name }} ({{ font.size }})</a
          >
        </li>
      </ul>
    </div>
    <div class="dropdown" data-bs-toggle="tooltip" title="TextAlign">
      <button
        data-bs-toggle="dropdown"
        class="btn btn-light rounded-0 border"
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

    <button class="btn btn-danger" style="z-index: unset" @click="remove(value)">
      <span class="mdi mdi-trash-can-outline me-1"></span>Remove
    </button>
  </div>
</template>

<script>
import { ListAlign } from "../align.js";

export default {
  name: "TextItem",
  props: ["value", "fonts"],
  data: function () {
    return {
      aligns: ListAlign,
    };
  },
  mounted() {},
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
    remove() {
      this.$emit("delete");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
