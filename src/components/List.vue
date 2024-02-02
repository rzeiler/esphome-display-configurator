<template>
  <div v-if="list" class="d-flex justify-content-center vh-100 vw-100 position-absolute top-0 start-0 align-items-center ">
    <ul class="list-group">
      <li v-for="(item,index) in list" :key="index"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
        @click="$emit('selected', index)">
        <div class="ms-2 me-auto">
          <div class="fw-bold">{{item.title}}</div>
          {{item.text}}
        </div>
        <span class="badge bg-primary rounded-pill">{{item.time}}</span>
      </li>

    </ul>
  </div>
</template>

<script>


export default {
  name: "list",
  data: function () {
    return {
      list: []
    };
  },
  mounted() {
    console.log("list",this.list)
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
