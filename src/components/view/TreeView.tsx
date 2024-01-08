import {Button, Divider, Flex, Table, notification} from "antd"
import {Fragment, useEffect, useState} from "react"
import {TreeViewProps} from "./types"
import FormView from "./FormView"
import {useLocation, useSearchParams} from "react-router-dom"
import {router} from "@/router"
import PubSub from 'pubsub-js'

function TreeView(props: TreeViewProps) {
    const currentRoute = useLocation()
    const [params, _] = useSearchParams()
    const [viewType, setViewType] = useState<string>('')
    const columns = props.columns.map(item => {
        const result = {
            title: item.label,
            key: item.key,
            dataIndex: item.key,
            render: item.render
        }
        return result
    })

    const [initData, setInitData] = useState({})
    const [isEdit, setEdit] = useState(false)

    useEffect(() => {
        const vt = params.get("type") || 'tree'
        setViewType(vt)

        const token = PubSub.subscribe("viewChange", (_: string, {name, data}: { name: string, data: any }) => {
            setViewType(name)
            console.log(data)
            setInitData(data)
            sessionStorage.setItem("initData", JSON.stringify(data))
            setEdit(true)
            router.navigate(router.state.location.pathname + "?type=form&id=" + data.id)
        })

        return () => {
            PubSub.unsubscribe(token)
        }
    }, [])

    const openAddForm = () => {
        router.navigate(currentRoute.pathname + "?type=form")
        setViewType("form")
    }

    const actionFallback = () => {
        router.navigate(currentRoute.pathname + '?type=tree')
        setInitData({})
        setViewType("tree")
    }

    const actionOnSuccess = (flag: boolean) => {
        if (flag) {
            PubSub.publish("formHandleSuccess", {result: true})
            notification.success({message: "操作成功"})
            router.navigate(currentRoute.pathname + '?type=tree')
            setViewType("tree")
        } else {
            notification.error({message: "操作失败"})
        }
    }

    return (
        <Fragment>
            <Flex align={'center'}>
                <h3>User</h3>
                <div style={{marginLeft: '15px'}}>
                    {props.actionAdd && viewType === 'tree' ?
                        <Button onClick={openAddForm} type={"primary"}>新增</Button> : <></>}
                    {viewType === 'form' ? <Button onClick={actionFallback}>返回</Button> : <></>}
                </div>
            </Flex>
            <Divider/>
            {
                viewType == 'tree' &&
                <Table dataSource={props.datas} columns={columns} rowKey={props.rowKey ? props.rowKey : 'id'}/>
            }
            {
                viewType == 'form' && props.actionAdd ?
                    <FormView isEdit={isEdit} initData={initData} columns={props.columns} onFinish={props.actionAdd}
                              actionOnSuccess={actionOnSuccess}/> : <></>
            }
        </Fragment>
    )
}

export default TreeView

