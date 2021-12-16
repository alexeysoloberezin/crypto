<template>
  <div></div>
</template>

<script>
import {useStore} from "vuex";
import {onMounted} from "vue";
import {Actions} from "../../store/enums/StoreEnums";

export default {
  name: "Logout",
  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch(Actions.LOGOUT)
    })

  }
}
</script>

<style scoped>

</style>