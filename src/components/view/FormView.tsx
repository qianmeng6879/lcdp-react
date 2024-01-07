import { Button, Flex, Form, Input } from 'antd'
import { FormViewProps } from './types'
import { Fragment, useEffect, useState } from 'react'
import PubSub from 'pubsub-js'
import { useSearchParams } from 'react-router-dom'


export default function FormView({ columns, onFinish, actionOnSuccess, isEdit }: FormViewProps) {
    let initData = {}
    const [params, _] = useSearchParams()
    const dataId = params.get("id")
    if (params.get("id")) {
        const dataStr = sessionStorage.getItem("initData")
        if (dataStr) {
            const localData = JSON.parse(dataStr)
            if (localData.id == dataId) {
                initData = localData
            }
        }
    }


    const [isLoading, setLoading] = useState(false)

    const actionOnFinish = (data: any) => {
        setLoading(true)
        console.log("isEdit", isEdit)
        onFinish(data, actionOnSuccess)
    }

    useEffect(() => {
        const dataId = params.get("id")
        console.log(dataId)

        const token = PubSub.subscribe("formHandleSuccess", () => {
            setLoading(false)
        })

        return () => {
            PubSub.unsubscribe(token)
        }
    }, [])


    return (
        <Flex justify='center'>
            <Form initialValues={initData} style={{
                width: "400px"
            }} autoComplete='off' layout={'vertical'} onFinish={actionOnFinish}>
                {columns.map((item, index) => {
                    if (!item.key || item.key === 'id' || item.noField) return
                    return (
                        <Fragment key={index}>
                            <Form.Item name={item.key} label={item.label}>
                                <Input disabled={item.readonly} />
                            </Form.Item>
                        </Fragment>
                    )
                })}
                <Form.Item>
                    <Button loading={isLoading} htmlType='submit' type={'primary'}>确认</Button>
                </Form.Item>
            </Form>
        </Flex>
    )
}
