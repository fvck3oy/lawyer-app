import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import './Admin.css'
import { Route } from 'react-router-dom'
import ManageBanners from '../components/Manage/ManageBanners';
import ManageLands from '../components/Manage/ManageLands';
import ManageArticles from '../components/Manage/ManageArticles';

const { Header, Content, Footer, Sider } = Layout;

export default class Admin extends Component {
  state = {
    menu: 1
  }

  menuOnClick = (menu) => {
    console.log('Click', menu);
    this.setState({ menu: menu })

  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          style={{
            overflow: 'auto',
            height: '100%',
            position: 'fixed',
            left: 0,
            // backgroundColor: 'rgb()'
          }}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item onClick={() => this.menuOnClick(1)} key="1">
              <Icon type="user" />
              <span className="nav-text">Manage Banners</span>
            </Menu.Item>
            <Menu.Item onClick={() => this.menuOnClick(2)} key="2">
              <Icon type="video-camera" />
              <span className="nav-text">Manage Lands</span>
            </Menu.Item>
            <Menu.Item onClick={() => this.menuOnClick(3)} key="3">
              <Icon type="upload" />
              <span className="nav-text">Manage Articles</span>
            </Menu.Item>
            <Menu.Item onClick={() => this.menuOnClick(4)} key="4">
              <Icon type="bar-chart" />
              <span className="nav-text">nav 4</span>
            </Menu.Item>
            <Menu.Item onClick={() => this.menuOnClick(5)} key="5">
              <Icon type="cloud-o" />
              <span className="nav-text">nav 5</span>
            </Menu.Item>
            <Menu.Item onClick={() => this.menuOnClick(6)} key="6">
              <Icon type="appstore-o" />
              <span className="nav-text">nav 6</span>
            </Menu.Item>
            <Menu.Item onClick={() => this.menuOnClick(7)} key="7">
              <Icon type="team" />
              <span className="nav-text">nav 7</span>
            </Menu.Item>
            <Menu.Item onClick={() => this.menuOnClick(8)} key="8">
              <Icon type="shop" />
              <span className="nav-text">nav 8</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200, paddingBottom: 24 }}>
          {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
              {this.state.menu == 1 && <ManageBanners />}
              {this.state.menu == 2 && <ManageLands />}
              {this.state.menu == 3 && <ManageArticles />}
            </div>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
      </Layout>
    )
  }
}

