import { MenuFoldOutlined, MenuUnfoldOutlined, MessageOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Dropdown, Flex, MenuProps } from 'antd'



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

export default function MyHeader({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: Function }) {
    return (
        <Flex justify={'space-between'} align={'center'} style={{ paddingRight: '20px' }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
            <Flex>
                <div style={{ marginRight: '20px', cursor: 'pointer' }}>
                    <Badge count={5}>
                        <MessageOutlined style={{ fontSize: "22px" }} />
                    </Badge>
                </div>

                <Dropdown menu={{ items }} trigger={['click']}>
                    <Flex justify={'center'} align={'center'} >
                        <Avatar size={50} src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />
                        <span style={{ fontSize: '16px' }}>Admin</span>
                    </Flex>
                </Dropdown>
            </Flex>
        </Flex>
    )
}
