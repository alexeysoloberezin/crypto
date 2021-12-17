import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import {calcChange} from "@/core/helpers/calcChange";
import {numberWithCommas} from "@/core/helpers/numberWithCommas";
import ApiService from "@/core/services/ApiService";
import store from "@/store";

const users = [{
    login:'',
    password: ""
}]

export interface TotalVol {
    id: string,
    img: string,
    fullName: string,
    name: string,
    price: number,
    change24h: string,
    change7d: string,
    maxSupply: string,
    marketcap: string
}

export interface CryptoCompareType {
    totalVol: TotalVol[] | [];
    error: string
}

@Module
export default class CryptoCompareModule extends VuexModule implements CryptoCompareType {
    totalVol = []
    error = ''

    get getTotalVol(): TotalVol[] | [] {
        return this.totalVol;
    }

    get CryptoCompareError(): string {
        return this.error;
    }

    @Mutation
    [Mutations.SAVE_TOTAL_VOL_FULL](data) {
        this.totalVol = data;
    }

    @Mutation
    [Mutations.SET_CRYPTO_COMPARE_ERROR](error) {
        this.error = error;
    }

    @Action
    [Actions.TOTAL_VOL_FULL](data) {
        const currencyType = store.getters.getCurrencyType.value

        return new Promise<void>((resolve, reject) => {
            (<any>ApiService).get(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=${data.limit}&tsym=${currencyType}&page=${data.page}&api_key=${process.env.VUE_APP_API_KEY_CRYPTO_COMPARE}`)
                .then((res) => {
                    console.log('res', res)
                    const tableData =  res.data.Data.map((item, inx) => {
                        return {
                            id: item.CoinInfo.Id,
                            index: inx + (data.limit * data.page) + 1,
                            img: 'https://www.cryptocompare.com' + item?.CoinInfo?.ImageUrl,
                            fullName: item?.CoinInfo?.FullName ? item.CoinInfo.FullName : "-",
                            name: item?.CoinInfo?.Name ? item.CoinInfo.Name : "-",
                            price: item?.RAW[currencyType]?.PRICE ? numberWithCommas(item.RAW[currencyType].PRICE) : "-",

                            change24h: item?.RAW[currencyType]?.CHANGE24HOUR && item?.RAW[currencyType]?.PRICE ?
                                calcChange( item.RAW[currencyType].CHANGE24HOUR , item.RAW[currencyType].PRICE ) : "-",

                            change7d: item?.RAW[currencyType]?.CHANGEDAY && item?.RAW[currencyType]?.PRICE ?
                                calcChange(item.RAW[currencyType]?.CHANGEDAY, item.RAW[currencyType].PRICE ) : "-",

                            maxSupply: item?.CoinInfo?.MaxSupply ? item.CoinInfo.MaxSupply : "-",
                            marketcap: item?.RAW[currencyType]?.MKTCAP ? numberWithCommas(item.RAW[currencyType].MKTCAP) : "-"
                        }
                    })
                    this.context.commit(Mutations.SAVE_TOTAL_VOL_FULL, tableData)
                    resolve()
                }).catch((res) => {
                    debugger
                    console.log('res 2', res)
                     this.context.commit(Mutations.SET_CRYPTO_COMPARE_ERROR, res.message)
                    reject()
                })
        })
    }
}
