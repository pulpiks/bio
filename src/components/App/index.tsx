import { PureComponent, Fragment, createElement, ReactElement } from 'react'
import { Button, Layout, Icon, Menu, List } from 'antd'
import { Link } from 'react-router-dom'
import * as contentful from 'contentful'
import {MenuItems} from '../SocialLinks'

import './styles.css'
import { Categories } from '../CategoriesMenu';

const {
    Header, Footer, Sider, Content,
  } = Layout

const { Item } = Menu

const Logo = () => (
    <img src="./images/logo.svg" alt="Kseniia Lvova"/>
)

const routes = ['work', 'travel', 'explore world', 'minds', 'fun things', 'feedback']


const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "hzozipowq7kx",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "8bf0b2a52f6a78986b977dde3e4af9ff8b976a5e47cf616cc6a56a0ff5d4e54d"
});


export default class App extends PureComponent {
    async componentDidMount() {
        try {
            const res = await client.getEntries({
                content_type: 'category'
            })
            const categories = res.items
            
        }
        catch(e) {
            throw new Error(e)
        }
    }

    render() {
        return (
                <div className="App">
                    <Header>
                        <Icon component={Logo} />
                        <MenuItems />
                    </Header>
                    <Layout>
                        <Sider>
                            <Categories />
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
