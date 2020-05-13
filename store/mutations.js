import * as types from "./mutation-types";
const matutaions = {
    [types.SET_USER_INFO](state, data) {
        console.log('state',state)
        console.log('data',data)
        state.userInfo = data;
    },
    [types.SET_RESET](state) {
        state.userInfo = {};
    }
};
export default matutaions;
