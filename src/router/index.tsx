import { createBrowserRouter, RouteObject } from 'react-router-dom'
import HomeIndex from '@/pages/HomeIndex'
import Login from '@/pages/Login'
import AdminHome from '@/pages/admin/AdminHome'
import Dashboard from '@/pages/admin/Dashboard'
import User from '@/pages/admin/user/User'
import Role from '@/pages/admin/user/Role'
import Permission from '@/pages/admin/user/Permission'
import Application from '@/pages/admin/application/Application'
import Error404 from '@/pages/error/Error404'
import DataModel from '@/pages/admin/application/DataModel'
import CommentView from '@/pages/admin/comment/CommentView'
import AclView from '@/pages/admin/user/AclView'
import FileUploadPage from '@/pages/admin/FileUploadPage'
import EditPage from '@/pages/viewPage/EditPage'


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
                path: 'acl',
                element: <AclView />
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
                path: "comment",
                element: <CommentView />
            },
            {
                path: 'file/upload',
                element: <FileUploadPage />
            },
            {
                path: 'page/edit',
                element: <EditPage />
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