<template>
  <div
    class="position-absolute d-flex justify-content-center align-items-center top-0 start-0 vh-100 vw-100 bg-body-secondary"
    style="--bs-bg-opacity: 0.5"
  >
    <div class="bg-white shadow p-0 rounded">
      <div class="input-group m-4" style="width: 400px">
        <label for="exampleDataList" class="input-group-text">Icon</label>
        <span class="input-group-text" :class="icon_class"></span>
        <input
          class="form-control"
          list="datalistOptions"
          id="exampleDataList"
          placeholder="Type to search..."
          v-model="icon_class"
        />
        <datalist id="datalistOptions">
          <option v-for="(icon, idx) in icons" :key="idx" :value="icon.value"></option>
        </datalist>
        <button class="btn btn-danger" style="z-index: unset">
          <span class="mdi mdi-check me-1"></span>Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ListIcon } from "../icon.js";

export default {
  name: "add",
  components: {},
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
    addImage() {},
    onChange: function (event) {
      console.log(event);
    },
  },
};
</script>
