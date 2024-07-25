<template>
  <div id="app" class="overflow-hidden vh-100 vw-100 d-flex flex-column">
    <UiEditor />
    <div class="p-4">
      display configuration UI by rzeiler &#x40; 2024 |
      <a href="https://esphome.io/components/display/" title="Display Component">
        esphome
      </a>

      <a href="https://pictogrammers.com/library/mdi/">pictogrammers</a>
    </div>
  </div>
</template>

<script>
import UiEditor from "./components/Editor.vue";

export default {
  name: "App",
  components: {
    UiEditor,
  },
  mounted() {
    this.setTooltip();
  },
};
</script>

<style>
.overlay {
  margin: -8px 5px !important;
  font-size: 10px !important;
}
</style>
