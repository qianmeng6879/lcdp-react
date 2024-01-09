import { Button, Form, Input, Modal, Switch, Table, Tag } from "antd"
import { useState } from "react"
import { v4 as uuid } from 'uuid'
type AclType = {
    id: string
    route: string
    userGroup: string
    methodGet: boolean
    methodPost: boolean
    methodPut: boolean
    methodPatch: boolean
    methodDelete: boolean
    methodOptions: boolean
    notes?: string
}


const initData: AclType[] = [
    {
        id: uuid(),
        route: "/users/.*",
        userGroup: "user",
        methodGet: true,
        methodPost: true,
        methodPut: false,
        methodPatch: false,
        methodDelete: false,
        methodOptions: true,
    }
]


const AclItem = ({ flag }: { flag: boolean }) => {
    return <Tag color={flag ? "success" : 'error'}>{flag ? '允许' : '禁止'}</Tag>
}

const columns = [
    {
        key: "id",
        dataIndex: 'id',
        title: "编号"
    },
    {
        key: "route",
        dataIndex: 'route',
        title: "规则"
    },
    {
        key: "userGroup",
        dataIndex: 'userGroup',
        title: "用户组"
    },
    {
        key: "methodGet",
        dataIndex: 'methodGet',
        title: "GET",
        render: (row: boolean) => <AclItem flag={row} />
    },
    {
        key: "methodPost",
        dataIndex: 'methodPost',
        title: "POST",
        render: (row: boolean) => <AclItem flag={row} />
    },
    {
        key: "methodPut",
        dataIndex: 'methodPut',
        title: "PUT",
        render: (row: boolean) => <AclItem flag={row} />
    },
    {
        key: "methodPatch",
        dataIndex: 'methodPatch',
        title: "PATCh",
        render: (row: boolean) => <AclItem flag={row} />
    },
    {
        key: "methodDelete",
        dataIndex: 'methodDelete',
        title: "DELETE",
        render: (row: boolean) => <AclItem flag={row} />
    },
    {
        key: "methodOptions",
        dataIndex: 'methodOptions',
        title: "OPTIONS",
        render: (row: boolean) => <AclItem flag={row} />
    },
    {
        key: "notes",
        dataIndex: 'notes',
        title: "备注"
    },
]

export default function AclView() {
    const [dataSource, setDataSource] = useState(initData)
    const [showModal, setShowModal] = useState(false)
    const actionOnFinish = (result: AclType) => {
        setDataSource([...dataSource, { ...result, id: uuid() }])
        setShowModal(false)
    }
    return (
        <div className="bg-white p-10">
            <div>
                <Button type="primary" onClick={() => setShowModal(true)}>新增</Button>
            </div>
            <Table dataSource={dataSource} rowKey={"id"} columns={columns} />
            <Modal onCancel={() => setShowModal(false)} destroyOnClose footer={false} title='新增ACL规则' open={showModal} mask>
                <Form onFinish={actionOnFinish} labelCol={{ span: 4 }} autoComplete="off" initialValues={{
                    methodGet: true,
                    methodOptions: true,
                    methodPost: false,
                    methodPut: false,
                    methodPatch: false,
                    methodDelete: false,
                    notes: ""
                }}>
                    <Form.Item name={'route'} label='访问规则' rules={[{ required: true, message: "访问规则为空" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={'userGroup'} label='用户组' rules={[{ required: true, message: "用户组为空" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={'methodGet'} label='GET'><Switch /></Form.Item>
                    <Form.Item name={'methodPost'} label='POST'><Switch /></Form.Item>
                    <Form.Item name={'methodPut'} label='PUT'><Switch /></Form.Item>
                    <Form.Item name={'methodPatch'} label='PATCh'><Switch /></Form.Item>
                    <Form.Item name={'methodDelete'} label='DELETE'><Switch /></Form.Item>
                    <Form.Item name={'methodOptions'} label='OPTIONS'><Switch /></Form.Item>
                    <Form.Item name={'notes'} label='备注'>
                        <Input />
                    </Form.Item>
                    <div className="flex" style={{ justifyContent: 'end' }}>
                        <Button htmlType="submit" type={'primary'}>新增</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}
