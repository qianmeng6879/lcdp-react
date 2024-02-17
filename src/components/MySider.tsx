import {
    DashboardFilled,
    UserOutlined,
    CommentOutlined,
    AppstoreOutlined,
    FileOutlined,
    SettingOutlined,
    Html5Outlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { router } from '../router';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'

type MenuItem = {
    label: React.ReactNode
    key: string
    icon: React.ReactNode,
    children?: MenuItem[]
}


function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}


const menus = [
    {
        label: "仪表盘",
        key: '/admin/dashboard',
        icon: <DashboardFilled />,
    },
    {
        label: "系统",
        key: 'system-group',
        icon: <SettingOutlined />,
        sub: [
            {
                label: "用户",
                key: '/admin/user',
            },
            {
                label: "角色",
                key: '/admin/role',
            },
            {
                label: '权限',
                key: '/admin/permission'
            },
            {
                label: 'ACL',
                key: '/admin/acl'
            }
        ]
    },
    {
        label: '应用',
        key: 'app-group',
        icon: <AppstoreOutlined />,
        sub: [
            {
                label: '应用',
                key: '/admin/app'
            },
            {
                label: '数据模型',
                key: '/admin/app/model'
            }
        ]
    },
    {
        label: '评论',
        key: 'comment-group',
        icon: <CommentOutlined />,
        sub: [
            {
                label: '评论',
                key: '/admin/comment'
            },
        ]
    },
    {
        label: '文件上传',
        key: '/admin/file/upload',
        icon: <FileOutlined />
    },
    {
        label: '页面编辑',
        key: '/admin/page/edit',
        icon: <Html5Outlined />
    }

]

const items: MenuItem[] = menus.map(item => {
    // 存在子节点
    if (item.sub && item.sub.length > 0) {
        // 先获取父节点
        return getItem(item.label, item.key, item.icon, item.sub.map(subItem => getItem(subItem.label, subItem.key)))
    }
    return getItem(item.label, item.key, item.icon)
})



export default function MySider() {
    const currentRoute = useLocation()
    let firstOpenMenu = items.filter(item => {
        if (item.children) {
            let data = item.children.find((i) => {
                return i.key === currentRoute.pathname
            })
            if (data) {
                return data.key
            } else {
                return null
            }
        }
    })
    const [openKeys, setOpenKeys] = useState([firstOpenMenu.length > 0 ? firstOpenMenu[0].key : '']);
    const rootSubmenuKeys = items.filter(item => item.children).map(item => item.key)
    const handleOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    return (
        <Menu
            openKeys={openKeys} onOpenChange={handleOpenChange}
            onSelect={e => { router.navigate(e.key) }}
            style={{ height: '100vh', overflow: 'auto' }}
            defaultSelectedKeys={[currentRoute.pathname]}
            mode={'inline'}
            theme={'light'}
            items={items}
        />
    )
}
