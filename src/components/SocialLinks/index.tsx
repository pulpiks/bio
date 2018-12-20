import { createElement, Fragment, ReactElement } from "react";
import { Icon } from 'antd'
import { Link } from 'react-router-dom'
import {cnClass} from '../../utils/cnClass'

import './socialLinks.css'

interface SocialMediaLinksInterface {
    readonly href: string, 
    readonly component: ReactElement<{}>
}

const socialMediaLinks: SocialMediaLinksInterface[] = [
    {
        href: '/asdasd',
        component:  <Icon type="github" style={{ fontSize: '36px', color: '#333' }}/>
    },
    {
        href: 'facebook',
        component: <Icon type="facebook"  style={{ fontSize: '36px', color: '#3b5998' }} />,
    }, 
    {
        href: '/sdsdf',
        component: <Icon type="twitter"  style={{ fontSize: '36px', color: '#38A1F3' }} />,
    }, 
    {
        href: '/sdsdf',
        component: <Icon type="youtube"  style={{ fontSize: '36px', color: '#ED3833' }} />,
    }, 
    {
        href: '/sdsdf',
        component: <Icon type="instagram"  style={{ fontSize: '36px', color: '#231F20' }} />,
    }, 
    {
        href: '/sdsdf',
        component: <Icon type="skype"  style={{ fontSize: '36px', color: '#00AFF0' }} />,
    }, 
    {
        href: '/sdsdf',
        component: <Icon type="medium"  style={{ fontSize: '36px', color: '#00ab6c' }} />,
    }, 
    {
        href: '/sdsdf',
        component: <Icon type="linkedin"  style={{ fontSize: '36px', color: '#0077B5' }} />,
    }, 
    {
        href: '/sdsdf',
        component: <Icon type="mail" style={{ fontSize: '36px' }}/>,
    }, 
]

const cn = cnClass('social-links')

export const MenuItems: React.SFC<{}> = () => {
    return (
        <ul className={cn()}>
            {/* <List
            itemLayout="horizontal"
            dataSource={Icons}
            renderItem={(item: typeof Icon) => (
                <List.Item>
                    <List.Item.Meta title={item} />
                </List.Item>
            )}
        /> */}
            {
                socialMediaLinks.map((icon, i) => (
                    <li key={`${i}-menu-item`} className={cn('item')} >
                        <Link to={icon.href} className={cn('link')}>{icon.component}</Link> 
                    </li>
                ))
            }
            {/* <Menu mode="horizontal" theme="light">
            {Icons.map((IconComponent, i) => (
                <Item key={`${i}-menu-item`} >
                    {IconComponent}
                </Item>
            ))}
        </Menu> */}
        </ul>
    )
}
