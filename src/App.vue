<template>
  <div id="app" class="overflow-hidden vh-100 vw-100 d-flex  flex-column " >
    <div class="display-6 p-4 bg-dark-subtle">Esphome Display configurator</div>
    <UiEditor msg="Welcome to Your Vue.js App" />
    <div class="p-4 ">rzeiler &#x40; 2024</div>
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
