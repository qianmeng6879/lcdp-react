import { useEffect, useState } from 'react'

import store from '@/store'
import { Button, Form, Input, Radio, Select } from 'antd'
import { addCount, subCount } from '@/store/handle'


const DemoCount = () => {
    return (
        <div>
            <Button onClick={() => addCount(1)}>+1</Button>
            <Button onClick={() => subCount(2)}>-2</Button>
        </div>
    )
}


const FormDemo = () => {

    const actionOnFinish = (data: any) => {
        console.log(data)
    }
    return (
        <Form autoComplete='off' style={{ width: '300px' }} onFinish={actionOnFinish}
            initialValues={{ sex: 'male' }}
        >
            <Form.Item name={'name'} rules={[{ required: true, message: "name is blank" }]}>
                <Input />
            </Form.Item>
            <Form.Item name={'lang'} rules={[{ required: true, message: "name is blank" }]}>
                <Select options={[
                    { label: 'Python', value: "1" },
                    { label: 'Java', value: "2" },
                    { label: 'Golang', value: "3" },
                    { label: 'React', value: "4" },
                ]} />
            </Form.Item>
            <Form.Item name='sex'>
                <Radio.Group>
                    <Radio value={'male'}>男</Radio>
                    <Radio value={'female'}>女</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item>
                <Button htmlType={'submit'}>确认</Button>
            </Form.Item>
        </Form>
    )
}

export default function Permission() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setCount(store.getState().count)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <div>
            <h3>Permission</h3>

            <h2>count:{count}</h2>

            <DemoCount />
            <FormDemo />
        </div>
    )
}
