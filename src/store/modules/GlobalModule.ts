import {Actions, Mutations} from "@/store/enums/StoreEnums";
import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store";
import ApiService from "@/core/services/ApiService";
import {calcChange} from "@/core/helpers/calcChange";
import {numberWithCommas} from "@/core/helpers/numberWithCommas";

export interface currencyType {
    name: string;
    value: string;
}

export interface GlobalModuleInt {
    currencyType: currencyType
}

@Module
export default class GlobalModule extends VuexModule implements GlobalModuleInt  {
    currencyType = {
        name: "$ - USD",
        value: "USD"
    }

    get getCurrencyType(): currencyType {
        let type: any = localStorage.getItem("currencyType");
        if (type && type !== "undefined") {
            type = JSON.parse(type);
            return type;
        }
        return this.currencyType
    }

    @Mutation
    [Mutations.SET_CURRENCY_TYPE](data: currencyType) {
        this.currencyType = data
        localStorage.setItem("currencyType", JSON.stringify(data));
    }
}
