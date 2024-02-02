<template>
  <ol class="list-group list-group-numbered">
    <li class="list-group-item d-flex justify-content-between align-items-start" @click="$emit('set-history', 44)">
      <div class="ms-2 me-auto">
        <div class="fw-bold">Subheading</div>
        Content for list item
      </div>
      <span class="badge bg-primary rounded-pill">14</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-start" @click="$emit('set-history', 44)">
      <div class="ms-2 me-auto">
        <div class="fw-bold">Subheading</div>
        Content for list item
      </div>
      <span class="badge bg-primary rounded-pill">14</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-start" @click="$emit('set-history', 44)">
      <div class="ms-2 me-auto">
        <div class="fw-bold">Subheading</div>
        Content for list item
      </div>
      <span class="badge bg-primary rounded-pill">14</span>
    </li>
  </ol>
</template>

<script>
import { useListeners } from 'vue';

export default {
  name: "history",
  data: function () {
    return {

    };
  },
  mounted() {

  },
  methods: {

    buildCode() {
      /*
       let _history = [];
 
       if (localStorage.history != undefined) {
         _history = JSON.parse(localStorage.history);
       }
 */



    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
