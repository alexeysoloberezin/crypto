import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import AuthModule from "@/store/modules/AuthModule";
import CryptoCompareModule from "@/store/modules/CryptoCompareModule";
import GlobalModule from "@/store/modules/GlobalModule";

config.rawError = true;

const store = createStore({
  modules: {
    AuthModule,
    CryptoCompareModule,
    GlobalModule
  },
});

export default store;
