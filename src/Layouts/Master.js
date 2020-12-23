import React, { useEffect, useState } from 'react'
import { Layout, Menu, Button } from 'antd'
import {
  HomeOutlined,
  UploadOutlined,
  BookOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import "./Master.css"
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { comicActions } from '../services/comics/comicSlice';

const { Header, Sider, Content, Footer } = Layout

const Master = ({ children }) => {

  const [collapsed, setCollapsed] = useState(false)
  let history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(comicActions.getComics());
  }, []);

  const toggle = () => setCollapsed(!collapsed)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme='light'>
        <div className="logo" onClick={() => history.push('/')}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/MarvelLogo.svg/250px-MarvelLogo.svg.png"
            alt="Marvel Comics"
          />
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" onClick={() => history.push('/')} icon={<HomeOutlined />}>
            Inicio
          </Menu.Item>
          <Menu.Item key="2" onClick={() => history.push("/Comics")} icon={<BookOutlined />}>
            Comics
          </Menu.Item>
          <Menu.Item key="3" onClick={() => history.push("/comics/manage")} icon={<UploadOutlined />}>
            Administrar Comics
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
            minHeight: 180,
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>#ReactChallenge - ©2020 </Footer>
      </Layout>
    </Layout>
  )

}

export default Master

