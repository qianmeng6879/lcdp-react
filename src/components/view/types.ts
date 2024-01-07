export interface Column {
    label: string
    key?: string
    render?: any
    type?: string
    readonly?: boolean
    required?: boolean
    noField?: boolean
}

export interface TreeViewProps {
    name: string
    datas: any
    columns: Column[]
    rowKey?: string
    actionAdd?: Function
    create?: boolean
    edit?: boolean
    remove?: boolean
}

export interface FormViewProps {
    columns: Column[]
    onFinish: Function
    actionOnSuccess: Function
    initData?: object
    isEdit?: boolean
}