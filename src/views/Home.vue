<template>
  <table class="table">
    <tr >
      <th v-for="row in tableHeader" :key="row.title">{{ row.title }}</th>
    </tr>
    <tr v-for="(item, inx) in data" :key="item.id">
      <th>{{ inx }}</th>
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
        {{ item.price }} $
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
      <th>{{ item.marketcap }}  $</th>
    </tr>
  </table>
</template>

<script lang="ts">
import {onBeforeUnmount, onMounted, ref} from "vue";
import {TotalVol} from "../store/modules/CryptoCompareModule";
import {Actions} from "@/store/enums/StoreEnums";
import {useStore} from "vuex";
import {createToast} from "mosha-vue-toastify";

export default {
  name: "Home",
  setup() {
    const store = useStore()
    let getCoinListInterval: any = null;
    const data = ref<TotalVol[] | []>([])
    const tableHeader = [
      { title: '#' },
      { title: 'Name' },
      { title: 'Price' },
      { title: '24h%' },
      { title: '7d%' },
      { title: 'Market Cap' },
    ]
    const baseIndex = ref(0)

    onMounted(() => {
      const getCoinList = () => {
        store.dispatch(Actions.TOTAL_VOL_FULL)
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

    return {
      data,
      tableHeader
    }
  }
}
</script>

<style scoped>

</style>