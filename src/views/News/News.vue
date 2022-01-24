<template>
  <div class="news-panel d-flex ">
    <it-input v-model="search"  @keyup="searchNews" placeholder="Search in news" />

    <ul class="d-flex news-panel-tags" @click="changeTag">
      <li v-for="item in tags" :key="item" :class="{active: item === tag}"><it-tag type="success">{{ item }}</it-tag></li>
    </ul>
  </div>
  <div class="center scale7">
    <it-loading  color="#39FF00C4"  v-if="loading"></it-loading>
  </div>
  <div class="news">
    <template v-for="item in filterNews" :key="item.title">
      <div class="news__card" v-if="item.urlToImage">
        <div class="news__topline">
          <div class="news__author" v-if="item.author">{{ item.author }}</div>
          <div class="news__date" v-if="item.date">{{ item.date }}</div>
        </div>
        <div class="news__img" v-if="item.urlToImage">
          <img :src="item.urlToImage" :alt="item.title">
        </div>
        <div class="news__info">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {Actions} from "@/store/enums/StoreEnums";
import {createToast} from "mosha-vue-toastify";
import {itemNews} from "@/store/modules/NewsModule";

export default {
  name: "News",
  setup() {
    const store = useStore()
    const news = ref<itemNews[] | []>(store.getters.getNews)
    const filterNews = ref<itemNews[] | []>(store.getters.getNews);
    const APIKEY = 'ddb9048999cf4684af917e2a79544e21'
    const loading = ref<boolean>(false)
    const search = ref<string>('')
    const tag = ref<string>('Crypto')
    const tags = ref<string[]>(['Crypto', 'BTC', 'Tesla', 'USA', 'frs'])


    const searchNews = () => {
      filterNews.value = news.value.filter((item: itemNews) => {
        const title =  item.title.toLowerCase().includes(search.value.toLowerCase())
        const description =  item.description.toLowerCase().includes(search.value.toLowerCase())
        const author =  item.author.toLowerCase().includes(search.value.toLowerCase())
        const date =  item.date.toLowerCase().includes(search.value.toLowerCase())

        if (title || description || author || date){
          return true
        }
      })
    }


    const getNews = () => {
      loading.value = true
      filterNews.value = []
      news.value = []

      store.dispatch(Actions.GET_NEWS, {
        tag: tag.value,
        APIKEY: APIKEY
      }).then(() => {
        loading.value = false

        news.value = store.getters.getNews
        filterNews.value = store.getters.getNews.filter((item: itemNews) => {
          return item.title.toLowerCase().includes(search.value.toLowerCase())
        })
      }).catch(() => {
        loading.value = false
        createToast('Error when receiving news',
        {
          position: 'bottom-left',
          type: 'danger',
          transition: 'bounce',
          showIcon: true
        })
      })
    }

    const changeTag = (e) => {
      if (tag.value !== e.target.textContent){
        tag.value = e.target.textContent
        getNews()
      }
    }

    onMounted(() => {
      getNews()
    })


    return {
      news,
      loading,
      changeTag,
      searchNews,
      tag,
      filterNews,
      tags,
      search
    }
  }
}
</script>

<style scoped>

</style>