import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import './Admin.css'
import { Route } from 'react-router-dom'
import ManageBanners from '../components/Manage/ManageBanners';
import ManageLands from '../components/Manage/ManageLands';
import ManageArticles from '../components/Manage/ManageArticles';
import ManageUsers from '../components/Manage/ManageUsers';
import { Container, Row, Col } from 'reactstrap'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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
      <Container>
        <Row>
          <Col>
            <div className="pt-5">
              <Menu onClick={this.handleClick} selectedKeys={[this.state.menu]} mode="horizontal">
                <Menu.Item key={1} onClick={() => this.menuOnClick(1)}>
                  Manage Banners
                </Menu.Item>

                <Menu.Item key={2} onClick={() => this.menuOnClick(2)}>
                  Manage Lands
                </Menu.Item>

                <Menu.Item key={3} onClick={() => this.menuOnClick(3)}>
                  Manage Articles
                </Menu.Item>

                <Menu.Item key={4} onClick={() => this.menuOnClick(4)}>
                  Manage Users
                </Menu.Item>

              </Menu>
            </div>
          </Col>
        </Row>
        <div>
          {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
              {this.state.menu === 1 && <ManageBanners />}
              {this.state.menu === 2 && <ManageLands />}
              {this.state.menu === 3 && <ManageArticles />}
              {this.state.menu === 4 && <ManageUsers/>}
            </div>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </div>

      </Container>
    )
  }
}

