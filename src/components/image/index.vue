<template>
  <div>
    <div class="input-group mt-4 mb-4">
      <span class="input-group-text" style="max-width: 100px" :class="value.image"></span>
      <input
        class="form-control flex-fill"
        list="datalistOptions"
        id="exampleDataList"
        placeholder="Type to search..."
        :value="value.image"
        @input="update('image', $event.target.value)"
      />
      <datalist id="datalistOptions">
        <option v-for="(icon, idx) in icons" :key="idx" :value="icon.value"></option>
      </datalist>

      <span class="input-group-text">Top</span>
      <input
        type="number"
        :value="value.top"
        class="form-control"
        @input="update('top', $event.target.value)"
        style="max-width: 100px"
      />
      <span class="input-group-text">Left</span>
      <input
        type="number"
        :value="value.left"
        class="form-control"
        @input="update('left', $event.target.value)"
        style="max-width: 100px"
      />
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
      <button class="btn btn-danger" style="z-index: unset" @click="remove">
        <span class="mdi mdi-trash-can-outline me-1"></span>Remove
      </button>
    </div>
  </div>
</template>

<script>
import { ListIcon } from "./icon.js";
import { ListAlign } from "../align.js";

export default {
  name: "add",
  components: {},
  props: ["value","index"],
  data: function () {
    return {
      aligns: ListAlign,
      icons: [],
      icon_class: "mdi mdi-abjad-arabic",
    };
  },
  mounted() {
    ListIcon.forEach((i) => {
      this.icons.push({
        value: i,
      });
    });
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
      console.log(key, value);

      this.$emit("input", { ...this.value, [key]: value });
    },
    remove() {
      this.$emit("delete");
    },
  },
};
</script>
