import { createBrowserRouter, RouteObject } from 'react-router-dom'
import HomeIndex from '@/pages/HomeIndex'
import Login from '@/pages/Login'
import AdminHome from '@/pages/admin/AdminHome'
import Dashboard from '@/pages/admin/Dashboard'
import User from '@/pages/admin/user/User'
import Role from '@/pages/admin/user/Role'
import Permission from '@/pages/admin/user/Permission'
import Application from '@/pages/admin/application'
import Error404 from '@/pages/error/Error404'
import DataModel from '@/pages/admin/application/DataModel'


const routes: RouteObject[] = [
    {
        path: '/',
        element: <HomeIndex />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: "/admin",
        element: <AdminHome />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'user',
                element: <User />
            },
            {
                path: 'role',
                element: <Role />
            },
            {
                path: 'permission',
                element: <Permission />
            },
            {
                path: "app",
                element: <Application />
            },

            {
                path: "app/model",
                element: <DataModel />
            },
            {
                path: '*',
                element: <Error404 />
            },
        ]
    },
    {
        path: '*',
        element: <Error404 />
    },
]

export const router = createBrowserRouter(routes)