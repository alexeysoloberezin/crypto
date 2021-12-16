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

<script>
import {onBeforeUnmount, onMounted, ref} from "vue";
import axios from "axios";
import { calcChange } from "../core/helpers/calcChange"
import { numberWithCommas } from "../core/helpers/numberWithCommas"

export default {
  name: "Home",
  setup() {
    const apiKey = 'b71df4c1842f49d6f5652e044f9ea698aed44c890f10d1565ffedce3599a98ed'
    let getCoinListInterval = null;
    const data = ref(null)
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
        axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD', {
          authorization: `Apikey ${process.env.VUE_APP_API_KEY_CRYPTO_COMPARE}`
        }).then((res) => {
          data.value =  res.data.Data.map(item => {
            return {
              id: item.CoinInfo.ImageUrl,
              img: 'https://www.cryptocompare.com' + item?.CoinInfo?.ImageUrl,
              fullName: item?.CoinInfo?.FullName ? item.CoinInfo.FullName : "-",
              name: item?.CoinInfo?.Name ? item.CoinInfo.Name : "-",
              price: item?.RAW?.USD?.PRICE ? item.RAW.USD.PRICE : "-",
              change24h: item?.RAW?.USD?.CHANGE24HOUR && item?.RAW?.USD?.PRICE ? calcChange( item.RAW.USD.CHANGE24HOUR , item.RAW.USD.PRICE ) : "-",
              change7d: item?.RAW?.USD?.CHANGEDAY && item?.RAW?.USD?.PRICE ? calcChange(item.RAW.USD.CHANGEDAY, item.RAW.USD.PRICE ) : "-",
              maxSupply: item?.CoinInfo?.MaxSupply ? item.CoinInfo.MaxSupply : "-",
              marketcap: item?.RAW?.USD?.MKTCAP ? numberWithCommas(item.RAW.USD.MKTCAP) : "-"
            }
          })
        }).catch((res) => {
          debugger
        })
      }
      getCoinList()
      getCoinListInterval = setInterval( getCoinList, 2000)
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