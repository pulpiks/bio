import { PureComponent, Fragment, createElement, ReactElement } from 'react'
import { Button, Layout, Icon, Menu, List } from 'antd'
import { Link } from 'react-router-dom'
import {MenuItems} from '../SocialLinks'

import './styles.css'

const {
    Header, Footer, Sider, Content,
  } = Layout

const { Item } = Menu

const Logo = () => (
    <img src="./images/logo.svg" alt="Kseniia Lvova"/>
)

const routes = ['work', 'travel', 'explore world', 'minds', 'fun things', 'feedback']

const Sections = () => {
  return (
    <Menu>
        {routes.map((route, i) => {
            return (
                <Item key={`${i}-section-menu`}>
                    <Link to={`/${route}`}>{route}</Link>
                </Item>
            )
        })}
    </Menu>
  )
}

export default class App extends PureComponent {
  render() {
    return (
            <div className="App">
                <Header>
                    <Icon component={Logo} />
                    <MenuItems />
                </Header>
                <Layout>
                    <Sider>
                        <Sections />
                    </Sider>
                    <Content>
                        {this.props.children}
                    </Content>
                </Layout>
                <Footer>Ksenia Lvova ©{new Date().getFullYear()}</Footer>
            </div>
    )
  }
}
