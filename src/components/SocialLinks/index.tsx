import { createElement, Fragment, ReactElement } from "react";
import { Icon } from 'antd'
import { Link } from 'react-router-dom'
import {cnClass} from '../../utils/cnClass'

import './socialLinks.css'

interface SocialMediaLinksInterface {
    readonly href: string, 
    readonly component: ReactElement<{}>
}

const cn = cnClass('social-links')


const iconClasses = cn('icon')

const socialMediaLinks: SocialMediaLinksInterface[] = [
    {
        href: '/asdasd',
        component:  <Icon type="github" style={{ color: '#f5f5f5' }}  className={iconClasses}/>
    },
    {
        href: 'facebook',
        component: <Icon type="facebook"  style={{ color: '#3b5998' }}  className={iconClasses}/>,
    }, 
    {
        href: '/sdsdf',
        component: <Icon type="twitter"  style={{ color: '#38A1F3' }}  className={iconClasses}/>,
    }, 
    {
        href: '/sdsdf',
        component: <Icon type="youtube"  style={{ color: '#ED3833' }} className={iconClasses}/>,
    }, 
    {
        href: '/sdsdf',
        component: <Icon type="instagram"  style={{ color: '#bc2a8d' }} className={iconClasses}/>,
    }, 
    {
        href: '/sdsdf',
        component: <Icon type="skype"  style={{ color: '#00AFF0' }} className={iconClasses}/>,
    }, 
    {
        href: '/sdsdf',
        component: <Icon type="medium"  style={{ color: '#00ab6c' }} className={iconClasses}/>,
    }, 
    {
        href: '/sdsdf',
        component: <Icon type="linkedin"  style={{ color: '#0077B5' }} className={iconClasses}/>,
    }, 
    {
        href: '/sdsdf',
        component: <Icon type="mail" className={iconClasses}/>,
    }, 
]


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
