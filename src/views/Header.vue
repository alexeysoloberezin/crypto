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
       <template v-if="prices.USD && prices.USD !== 1">
         <it-divider vertical />
         <div >
           USD/{{ сurrencyType.value }}: {{ prices.USD }}
         </div>
       </template>
       <template v-if="prices.EUR && prices.EUR !== 1">
         <it-divider vertical />
         <div >
           EUR/{{ сurrencyType.value }}: {{ prices.EUR }}
         </div>
       </template>
       <template  v-if="prices.RUB && prices.RUB !== 1">
         <it-divider vertical />
         <div>
           RUB/{{ сurrencyType.value }}: {{ prices.RUB }}
         </div>
       </template>
       <it-divider vertical />
     </div>

     <it-select
         v-model="сurrencyType"
         :options="сurrencyTypes"
     />
     <div class="btns-login d-flex" v-if="!isAuth">
       <it-button type="success" outlined>
         <router-link
             to="/sign-in"
         >Sign-in</router-link>
       </it-button>
       <it-button type="success" >
         <router-link
             to="/sign-up"
         >Sign-up</router-link>
       </it-button>
     </div>
     <div class="btns-logout d-flex aic" v-else>
       <it-divider vertical />
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
import { defineComponent, onMounted, ref, watchEffect} from "vue";
import {useStore} from "vuex";
import {Mutations} from "@/store/enums/StoreEnums";
import { Menu } from "@/store/enums/MenuEnums"
import { сurrencyTypes } from "@/core/helpers/сurrencyTypes"
import {currencyType} from "@/store/modules/GlobalModule";
import axios from "axios";

export default defineComponent({
  name: "Header",
  setup() {
    const store = useStore();
    const isAuth = ref(store.getters.currentUser);
    const menu = ref(Menu)
    const сurrencyType = ref<currencyType>(store.getters.getCurrencyType)

    const prices = ref({
      EUR: null,
      RUB: null,
      USD: null,
    })

    watchEffect(() => {
      store.commit(Mutations.SET_CURRENCY_TYPE, сurrencyType.value)
    })

    onMounted(() => {
      сurrencyType.value = store.getters.getCurrencyType

      const setPrices = () => {
        const arr = ['USD', 'RUB', 'EUR']

        arr.forEach(item => {
          axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${item}&tsyms=${store.getters.getCurrencyType.value}&api_key=${process.env.VUE_APP_API_KEY_CRYPTO_COMPARE}`)
            .then(({ data }) => {
              prices.value[item] = data[store.getters.getCurrencyType.value]
            })
        })
      }
      setPrices()


      store.subscribe((mutation => {
        if (mutation.type === Mutations.PURGE_AUTH || mutation.type === Mutations.SET_AUTH) {
          isAuth.value = store.getters.currentUser
        }
        if (mutation.type === Mutations.SET_CURRENCY_TYPE ) {
          setPrices()
        }
      }))
    })

    return {
      isAuth,
      сurrencyType,
      сurrencyTypes,
      prices,
      menu
    };
  },
});
</script>

<style scoped></style>
