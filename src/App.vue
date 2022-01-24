<template>
  <div class="container" >
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import Header from "@/views/Header.vue"
import {Mutations} from "@/store/enums/StoreEnums";
import {useStore} from "vuex";

export default defineComponent({
  name: "app",
  components: {
    Header,
  },
  setup() {
    const store = useStore()
    const keyRefresh = ref<number>(0)

    return {
      keyRefresh
    }
  }
});
</script>

<style lang="scss"></style>
