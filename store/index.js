import Vue from "vue";
import Vuex from "vuex";
import * as getters from "./getters";
import state from "./state";
import mutations from "./mutations";
import createLogger from "vuex/dist/logger";
const debug = process.env.NODE_ENV !== "production";

Vue.use(Vuex);
export default new Vuex.Store({
    getters,
    state,
    mutations,
    strice: debug,
    plugins: debug ? [createLogger()] : []
});
