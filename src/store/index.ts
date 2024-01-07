import { legacy_createStore as createStore } from 'redux'
import { ADD_COUNT, SET_USER, SUB_COUNT } from './const'
import { DispatchAction } from './types'

const defaultState = {
    userinfo: {},
    count: 0
}


function mainReducer(state = defaultState, action: DispatchAction) {
    switch (action.type) {
        case ADD_COUNT:
            return { count: state.count + action.value }
        case SUB_COUNT:
            return { count: state.count - action.value }
        case SET_USER:
            return { userinfo: action.value }
        default:
            return state
    }
}


const store = createStore(mainReducer)


export default store