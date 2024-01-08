import React, {useState} from 'react';
import {Outlet} from 'react-router-dom'
import {Layout, theme,} from 'antd';
import MySider from '@/components/MySider';
import MyHeader from '@/components/MyHeader';

const {Header, Sider, Content} = Layout;


const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <MySider/>
            </Sider>
            <Layout style={{height: '100vh'}}>
                <Header style={{padding: 0, background: colorBgContainer}}>
                    <MyHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        borderRadius: borderRadiusLG,
                        overflow: 'auto'
                    }}
                >
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;