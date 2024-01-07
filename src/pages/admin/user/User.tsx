import { Button } from 'antd'
import { v4 as uuid } from 'uuid'
import PubSub from 'pubsub-js'
import { Column } from '@/components/view/types'
import TreeView from '@/components/view/TreeView'
interface UserData {
    id: number
    username: string
    email: string
    sex: string
}

const initData: UserData[] = []

for (let i = 1; i < 10; i++) {
    initData.push({
        id: uuid(),
        username: "用户" + i,
        email: i % 3 == 0 ? "test" + i + "@qq.com" : "",
        sex: i % 4 == 0 ? '男' : '女'
    })
}


const editAciotn = (data: any) => {
    PubSub.publish("viewChange", {
        name: "form",
        data
    })
}

const columns: Column[] = [
    {
        label: "id",
        key: 'id'
    },
    {
        label: "用户名",
        key: "username"
    },
    {
        label: '邮箱',
        key: "email"
    },
    {
        label: "性别",
        key: "sex"
    },
    {
        label: "编辑",
        render: (row: UserData) => (<Button onClick={() => editAciotn(row)}>编辑</Button>)
    }
]

export default function User() {

    const actionAdd = (data: UserData, onSuccess: Function) => {
        setTimeout(() => {
            console.log(data)
            initData.push({ ...data, id: uuid() })
            onSuccess(true)
        }, 500);
    }
    return (
        <TreeView name='用户列表' actionAdd={actionAdd} datas={initData} columns={columns} rowKey='id' />
    )
}
