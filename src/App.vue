<template>
  <div id="app" class="overflow-hidden vh-100 vw-100 d-flex flex-column">
    <!--<div class="p-2 bg-dark-subtle d-flex" style="font-size: 30px">
   <div>ESPHome Display configurator</div>
<span class="flex-grow-1"  />
      <a href="https://github.com/rzeiler/esphome-display-configurator" class="mdi mdi-github text-black"></a>
    </div> -->
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
};
</script>

<style></style>
