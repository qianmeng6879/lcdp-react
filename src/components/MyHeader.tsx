import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Drawer, Dropdown, List, MenuProps, notification } from 'antd'
import { v4 as uuid } from 'uuid'
import messageImage from "@/assets/message.png"
import { useEffect, useState } from 'react';
import { formatDatetime } from '@/utils/date';

const items: MenuProps['items'] = [
    {
        label: '个人信息',
        key: '0',
    },
    {
        label: '修改密码',
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: '退出',
        key: '3',
        danger: true,
    },
];

type Message = {
    id: string
    fromUser: string
    title: string
    content: string
    msgType: string
    isRead: boolean
    createTime: string
}


const initMsgList: Message[] = []
for (let i = 1; i < 10; i++) {
    initMsgList.push({
        id: uuid(),
        title: "消息" + i,
        content: uuid() + "内容" + i,
        fromUser: "系统",
        msgType: i % 3 === 0 ? "系统消息" : "通知消息",
        isRead: i > 4,
        createTime: formatDatetime(new Date).substring(0, 16)
    })
}

const MessageItem = ({ item }: { item: Message }) => {
    return (
        <div>
            {item.title}|{item.createTime}
        </div>
    )
}

const MessageListCompoent = ({ msgList }: { msgList: Message[] }) => {
    return (
        <List
            dataSource={msgList}
            renderItem={item => {
                return (
                    <List.Item>
                        <MessageItem item={item} />
                    </List.Item>
                )
            }}
        />
    )
}

export default function MyHeader({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: Function }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [msgNoReadCount, setMsgNoReadCount] = useState(initMsgList.length)

    useEffect(() => {
        setMsgNoReadCount(initMsgList.filter(item => !item.isRead).length)
    }, [])

    return (
        <div className='flex-between' style={{ paddingRight: '20px' }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '14px',
                    width: 40,
                    height: 40,
                }}
            />
            <div className='flex-center'>
                <a href="#" onClick={() => setDrawerOpen(true)}>
                    <div className={'flex'} style={{ marginRight: "20px" }}>
                        <Badge count={msgNoReadCount} style={{ marginRight: '5px', marginTop: "8px" }}>
                            <img src={messageImage} />
                        </Badge>
                    </div>
                </a>

                <Dropdown menu={{ items }} trigger={['click']} overlayStyle={{
                    height: "42px"
                }}>
                    <div className='flex-center'>
                        <Avatar size={30} src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />
                        <span>Admin</span>
                    </div>
                </Dropdown>
            </div>
            <Drawer onClose={() => setDrawerOpen(false)} open={drawerOpen} title='我的消息'>
                <MessageListCompoent msgList={initMsgList} />
            </Drawer>
        </div>
    )
}
