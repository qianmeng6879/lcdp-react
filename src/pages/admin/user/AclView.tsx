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


const tableLineStyle = {
    width: "80px", textAlign: "center"
}

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
            <Modal maskClosable={false} onCancel={() => setShowModal(false)} destroyOnClose footer={false} title='新增ACL规则' open={showModal} >
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
                    <table>
                        <tr>
                            <th style={tableLineStyle}>GET</th>
                            <th style={tableLineStyle}>POST</th>
                            <th style={tableLineStyle}>PUT</th>
                            <th style={tableLineStyle}>PATCh</th>
                            <th style={tableLineStyle}>DELETE</th>
                            <th style={tableLineStyle}>OPTIONS</th>
                        </tr>
                        <tr>
                            <td style={tableLineStyle}><Form.Item name={'methodGet'}><Switch /></Form.Item></td>
                            <td style={tableLineStyle}><Form.Item name={'methodPost'}><Switch /></Form.Item></td>
                            <td style={tableLineStyle}><Form.Item name={'methodPut'}><Switch /></Form.Item></td>
                            <td style={tableLineStyle}><Form.Item name={'methodPatch'}><Switch /></Form.Item></td>
                            <td style={tableLineStyle}><Form.Item name={'methodDelete'}><Switch /></Form.Item></td>
                            <td style={tableLineStyle}><Form.Item name={'methodOptions'}><Switch /></Form.Item></td>
                        </tr>
                    </table>
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
