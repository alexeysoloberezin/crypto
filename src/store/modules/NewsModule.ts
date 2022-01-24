import {Actions, Mutations} from "@/store/enums/StoreEnums";
import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import axios from "axios";
import moment from "moment";

export interface itemNews {
    title: string,
    description: string,
    urlToImage: string,
    author: string,
    date: string,
}

interface NewsModuleInt {
    news: itemNews[] | []
}

@Module
export default class NewsModule extends VuexModule implements NewsModuleInt  {
    news = []

    get getNews(): itemNews[] | [] {
        return this.news
    }

    @Mutation
    [Mutations.SET_NEWS](data) {
        this.news = data
    }

    @Action
    [Actions.GET_NEWS](data) {
        return new Promise<void>((resolve, reject) => {
            axios.get(`https://newsapi.org/v2/everything?q=${data.tag}&sortBy=publishedAt&language=en&apiKey=${data.APIKEY}`)
                  .then(({data}) => {
                      const baseArr = data.articles

                      if (baseArr){
                        const news: itemNews[] =  baseArr.map(base => {
                          return {
                            title: base?.title ? base.title : '',
                            description: base?.description ? base.description : '',
                            urlToImage: base?.urlToImage ? base.urlToImage : '',
                            author: base?.author ? base.author.split(' ').slice(0, 4).join(' ') : '',
                            date: base?.publishedAt ? moment(base.publishedAt).format("LLL") : ''
                          }
                        })
                        this.context.commit(Mutations.SET_NEWS, news)
                        resolve()
                      }
                  })
                  .catch((res) => {
                      reject()
                  })
        })
    }
}
