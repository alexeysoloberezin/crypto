import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import AuthModule from "@/store/modules/AuthModule";
import CryptoCompareModule from "@/store/modules/CryptoCompareModule";
import GlobalModule from "@/store/modules/GlobalModule";
import NewsModule from "@/store/modules/NewsModule";

config.rawError = true;

const store = createStore({
  modules: {
    AuthModule,
    CryptoCompareModule,
    GlobalModule,
    NewsModule,
  },
});

export default store;
