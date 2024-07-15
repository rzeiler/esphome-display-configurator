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

      <button class="btn btn-danger" style="z-index: unset" @click="remove">
        <span class="mdi mdi-trash-can-outline me-1"></span>Remove
      </button>
    </div>
  </div>
</template>

<script>
import { ListIcon } from "./icon.js";

export default {
  name: "add",
  components: {},
  props: ["value"],
  data: function () {
    return {
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

    this.setTooltip();
  },
  methods: {
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
