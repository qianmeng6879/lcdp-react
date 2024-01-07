import store from "."
import { ADD_COUNT, SET_USER, SUB_COUNT } from "./const"
import { Userinfo } from "./types"


export function setUserInfo(value: Userinfo) {
    store.dispatch({
        type: SET_USER,
        value
    })
}

export function addCount(value: number) {
    store.dispatch({
        type: ADD_COUNT,
        value
    })
}

export function subCount(value: number) {
    store.dispatch({
        type: SUB_COUNT,
        value
    })
}