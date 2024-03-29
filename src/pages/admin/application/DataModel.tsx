import { Button, Divider, Table, Tabs } from 'antd'
import { useEffect, useState } from 'react';
import PubSub from 'pubsub-js'
import DataModelForm from './DataModelForm';
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const DataModeList = () => {

    const columns = [
        {
            title: "编号",
            key: "id",
            dataIndex: "id"
        },
        {
            title: "模型",
            key: "name",
            dataIndex: "name"
        },
        {
            title: "名称",
            key: "label",
            dataIndex: "label"
        },
        {
            title: "操作",
            render: (row: any) => {
                return (
                    <Button onClick={() => { PubSub.publish('showAppModel', row) }}>查看</Button>
                )
            }
        }
    ]
    const datas = [
        {
            id: 1,
            name: "user",
            label: '用户表'
        },
        {
            id: 2,
            name: "role",
            label: '角色表'
        },
        {
            id: 3,
            name: "permission",
            label: '权限表'
        }
    ]
    return (
        <Table columns={columns} dataSource={datas} rowKey={'id'} />
    )
}

const initialItems = [
    {
        label: '数据模型',
        children: <DataModeList />,
        key: 'model_list',
        closable: false,
    }
];

export interface DataModelMeta {
    min?: number
    max?: number
}

export interface DataModelLine {
    id: string
    name: string
    type: string
    label: string
    required?: boolean
    nullTips?: string
    readonly?: boolean
    maxlength?: number
    note?: string,
    default?: any,
    options?: any[],
    meta?: DataModelMeta
}

const dataModelLineDatSource: DataModelLine[] = [
    {
        id: '1',
        name: "name",
        type: 'char',
        label: '用户名',
        required: true,
        maxlength: 10,
        note: "用户名"
    },
    {
        id: '2',
        name: "phone",
        type: 'char',
        label: '手机号码',
        required: true,
        maxlength: 11,
        note: '手机号码'
    },
    {
        id: '3',
        name: "sex",
        type: 'select',
        label: '性别',
        required: true,
        default: "male",
        maxlength: 11,
        note: '性别',
        options: [
            {
                label: "男",
                value: 'male'
            },
            {
                label: "女",
                value: "female"
            }
        ]
    },
    {
        id: '4',
        name: "age",
        type: 'number',
        label: "年龄",
        required: false,
        note: '年龄',
        meta: {
            min: 1,
            max: 99
        }
    },
    {
        id: "5",
        name: "isAdmin",
        type: 'boolean',
        label: "是否管理员",
        note: "是否管理员"
    },
    {
        id: "6",
        name: "createTime",
        type: "datetime",
        label: "创建时间",
        required: true,
        note: "创建时间"
    }
]

export default function DataModel() {
    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const [items, setItems] = useState(initialItems);
    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };

    const actionSubmit = (data: any) => {
        console.log(data)
    }

    useEffect(() => {
        const token = PubSub.subscribe("showAppModel", (_: any, data: any) => {
            const newActiveKey = `${data.name}(${data.label})`;
            for (let item of items) {
                if (item.key == newActiveKey) {
                    setActiveKey(newActiveKey);
                    return
                }
            }
            const newPanes = [...items];
            if (newPanes.length > 9) {
                newPanes.slice(1, 2)
            }
            newPanes.push({
                label: `${data.name}(${data.label})`,
                children: <DataModelForm onSubmit={actionSubmit} data={dataModelLineDatSource} />,
                key: newActiveKey,
                closable: true
            });
            setItems(newPanes);
            setActiveKey(newActiveKey);
        })

        return () => {
            PubSub.unsubscribe(token)
        }
    }, [items])

    const remove = (targetKey: TargetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
    ) => {
        if (action === 'remove') {
            remove(targetKey);
        }
    };
    return (
        <div className='bg-white p-10'>
            <Tabs
                hideAdd
                type="editable-card"
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                items={items}
            />
        </div>
    )
}
