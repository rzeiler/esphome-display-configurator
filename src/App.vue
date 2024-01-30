<template>
  <div id="app" class="overflow-hidden vh-100 vw-100 d-flex  flex-column " >
    <div class=" p-2 bg-dark-subtle" style="font-size: 30px;">ESPHome Display configurator</div>
    <UiEditor msg="Welcome to Your Vue.js App" />
    <div class="p-4 ">rzeiler &#x40; 2024 | <a href="https://esphome.io/components/display/" title="Display Component">esphome</a></div>
  </div>
</template>

<script>
import UiEditor from './components/Editor.vue'
  
export default {
  name: 'App',
  components: {
    UiEditor
  }
}
</script>

<style>
 
 
</style>
