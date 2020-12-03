import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  HomeOutlined,
  UploadOutlined,
  BookOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import "./Home.css"

const { Header, Sider, Content } = Layout

const Home = () =>{

  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    console.log(collapsed)
    setCollapsed(!collapsed)
  };

    return (
      <>
        <Layout style={{minHeight: '100vh'}}>
          <Sider trigger={null} collapsible collapsed={collapsed} >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<HomeOutlined />}>
                nav 1
            </Menu.Item>
              <Menu.Item key="2" icon={<BookOutlined />}>
                nav 2
            </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                nav 3
            </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {
                React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: "trigger",
                  onClick: toggle,
                })
              }
            </Header>
            <Content
              className='site-layout-background'
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              Contenido
              
          </Content>
          </Layout>
        </Layout>
      </>
    )
  
}

export default Home

