<template>
  <header class="header">
    <router-link to="/">
      <img class="logo" src="img/logot.svg" alt="" />
    </router-link>
    <ul class="nav">
      <li v-for="item in menu" :key="item">
        <router-link :to="item.path">
          {{ item.title }}
        </router-link>
      </li>
    </ul>
   <div class="header__right">
     <div class="header__currency d-flex aic">
      <div>
        USD/RUB: 79
      </div>
       <it-divider vertical />
       <div>
         EUR/RUB: 83
       </div>
     </div>
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
       <router-link class="avatar" to="/account">
         <it-avatar />
       </router-link>
       <it-button type="success" outlined>
         <router-link
             to="/logout"
         >Logout</router-link>
       </it-button>
     </div>
   </div>
  </header>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watchEffect} from "vue";
import {useStore} from "vuex";
import {Mutations} from "@/store/enums/StoreEnums";
import { Menu } from "@/store/enums/MenuEnums"

export default defineComponent({
  name: "Header",
  setup() {
    const store = useStore();
    const isAuth = ref(store.getters.currentUser);
    const menu = ref(Menu)
    onMounted(() => {
      store.subscribe((mutation => {
        if (mutation.type === Mutations.PURGE_AUTH || mutation.type === Mutations.SET_AUTH) {
          isAuth.value = store.getters.currentUser
        }
      }))
    })

    return {
      isAuth,
      menu
    };
  },
});
</script>

<style scoped></style>
