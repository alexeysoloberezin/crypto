<template>
  <table class="table">
    <tr >
      <th v-for="row in tableHeader" :key="row.title">{{ row.title }}</th>
    </tr>
    <tr v-for="item in data" :key="item.id">
      <th>{{ item.index }}</th>
      <th>
        <div class="d-flex aic coin-name">
          <span class="coin-icon">
            <img  :src="item.img" alt="">
          </span>
          <span class="coin-title">{{ item.fullName }}</span>
          <span class="coin-minTitle">{{ item.name }}</span>
        </div>
      </th>
      <th>
        {{ item.price }} {{ currency }}
      </th>

      <th  :class="{
        redAll: item.change24h[0] === '-',
        greenAll: item.change24h[0] !== '-',
      }">
        <span class="d-flex aic">
          <span class="material-icons" :class="{rotate180: item.change24h[0] !== '-'}">
            keyboard_arrow_down
          </span>
          {{ item.change24h }} %
        </span>
      </th>

      <th :class="{
        redAll: item.change7d[0] === '-',
        greenAll: item.change7d[0] !== '-',
      }">
        <span class="d-flex aic">
          <span class="material-icons" :class="{rotate180: item.change24h[0] !== '-'}">
            keyboard_arrow_down
          </span>
          {{ item.change7d }} %
        </span>
      </th>
      <th>{{ item.marketcap }} {{currency }}</th>
    </tr>
  </table>
  <div class="table-box">
    <pagination class="pagination" v-model="page" :records="500" :per-page="limit" @paginate="myCallback"/>
    <it-select
        label-bottom="List limit"
        v-model="limit"
        :options="limitOptions"
    />
  </div>
</template>

<script >
import {onBeforeUnmount, onMounted, ref} from "vue";
import {Actions} from "@/store/enums/StoreEnums";
import {useStore} from "vuex";
import {createToast} from "mosha-vue-toastify";
import Pagination from 'v-pagination-3';
import {changerCurrency} from "../core/helpers/changerCurrency";
import {Mutations} from "../store/enums/StoreEnums";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Pagination
  },
  setup() {
    const store = useStore()
    let getCoinListInterval = null;
    const data = ref([])
    const tableHeader = [
      { title: '#' },
      { title: 'Name' },
      { title: 'Price' },
      { title: '24h%' },
      { title: '7d%' },
      { title: 'Market Cap' },
    ]
    const page = ref(1)
    const limit = ref(20)
    const limitOptions = ref([10,15,20, 40, 50, 75, 100])
    const currency = ref(changerCurrency(store.getters.getCurrencyType.value))

    onMounted(() => {
      store.subscribe((mutation => {
        if (mutation.type === Mutations.SET_CURRENCY_TYPE) {
          currency.value = changerCurrency(store.getters.getCurrencyType.value)
        }
      }))


      const getCoinList = () => {
        store.dispatch(Actions.TOTAL_VOL_FULL, {
         page: page.value - 1,
         limit: limit.value
        })
          .then(() => {
            data.value = store.getters.getTotalVol
          })
          .catch(() => {
            createToast(store.getters.CryptoCompareError,
            {
              position: 'bottom-left',
              type: 'danger',
              transition: 'bounce',
              showIcon: true
          })
        })
      }
      getCoinList()
      getCoinListInterval = setInterval( getCoinList, 1000)
    })

    onBeforeUnmount(() => {
      clearInterval(getCoinListInterval)
    })

    const myCallback = (selectPage) => {
      page.value = selectPage
    }

    return {
      data,
      tableHeader,
      myCallback,
      limit,
      limitOptions,
      page,
      currency,
    }
  }
}
</script>

<style scoped>

</style>