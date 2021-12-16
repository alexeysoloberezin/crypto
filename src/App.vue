<template>
  <div class="container">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent} from "vue";
import Header from "@/views/Header.vue"

export default defineComponent({
  name: "app",
  components: {
    Header,
  },

});
</script>

<style lang="scss"></style>
