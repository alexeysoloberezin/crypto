<template>
  <header class="header">
    <img class="logo" src="img/logot.svg" alt="" />
    <ul class="nav">
      <li>Coins</li>
      <li>Coins</li>
      <li>Coins</li>
      <li>Coins</li>
    </ul>
   <div class="header__right">
     <div class="btns-login d-flex" v-if="!isAuth">
       <it-button type="success" outlined>
         <router-link
             to="/sign-in"
         >Sign-in</router-link>
       </it-button>
       <it-button type="success">
         <router-link
             to="/sign-up"
         >Sign-up</router-link>
       </it-button>
     </div>
     <div class="btns-logout d-flex" v-else>
       <it-button type="success" outlined>
         <router-link
             to="/logout"
         >Logout</router-link>
       </it-button>
     </div>

<!--     <div class="avatar">-->
<!--       <it-avatar />-->
<!--     </div>-->
<!--     <ul class="dropdown">-->
<!--       <li>Account</li>-->
<!--       <li>Account</li>-->
<!--     </ul>-->
   </div>
  </header>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watchEffect} from "vue";
import {useStore} from "vuex";
import {Mutations} from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "Header",
  setup() {
    const store = useStore();
    const isAuth = ref(store.getters.currentUser);

    onMounted(() => {
      store.subscribe((mutation => {
        if (mutation.type === Mutations.PURGE_AUTH || mutation.type === Mutations.SET_AUTH) {
          isAuth.value = store.getters.currentUser
        }
      }))
    })

    return {
      isAuth
    };
  },
});
</script>

<style scoped></style>
