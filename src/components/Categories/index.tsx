import { PureComponent, Fragment, createElement, ReactElement } from 'react'
import { Button, Layout, Icon, Menu, List } from 'antd'
import { Link } from 'react-router-dom'
import {MenuItems} from '../SocialLinks'
import {getCategories} from '../../actions/categories'
import { Category } from '../../types/models';
import { connect } from 'net';
import { State, Dispatch } from '../../store';

const { Item } = Menu
const Sections: React.SFC<Category[]> = (props) => {
    return (
        <Menu>
            {props.map((route, i) => {
                return (
                    <Item key={`${i}-section-menu`}>
                        <Link to={`/${route.slug}`}>{route.title}</Link>
                    </Item>
                )
            })}
        </Menu>
    )
}


const mapStateToProps = (state: State) => ({
    categories: state.categories
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getCategories
})


interface CategoriesProps {
    readonly categories: Category[]
}



@(connect(mapStateToProps, null) as any)

export default class Categories extends PureComponent<CategoriesProps> {
    async componentDidMount() {
        this.props.dispatch(getCategories())
    }

    render() {
        return (
            <Sections props={this.props.categories}/>
        )
    }
}
