
export interface DispatchAction<T = any> {
    type: string,
    value: T
}


export interface Userinfo {
    id: string
    username: string
    avatar: string
}