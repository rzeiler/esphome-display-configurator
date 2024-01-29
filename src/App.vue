<template>
  <div id="app" class="d-flex align-items-stretch overflow-hidden vh-100 vw-100" >
    <UiCode msg="Welcome to Your Vue.js App" style="width: 20vw;" />
    <UiEditor msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import UiEditor from './components/Editor.vue'
import UiCode from './components/Code.vue'

export default {
  name: 'App',
  components: {
    UiEditor,
    UiCode
  }
}
</script>

<style>
 
 
</style>
