import { PureComponent, Fragment, createElement, ReactElement } from 'react'
import { Button, Layout, Icon, Menu, List } from 'antd'
import { Link } from 'react-router-dom'
import {MenuItems} from '../SocialLinks'
import {getCategories} from '../../actions/categoriesMenu'
import { Category } from '../../types/models';
import { State, Dispatch } from '../../store';
import { connect } from 'react-redux';

const { Item } = Menu
const Sections: React.SFC<CategoriesProps> = ({categories}) => {
    return (
        <Menu>
            {categories && categories.map((route, i) => {
                return (
                    <Item key={`${i}-section-menu`}>
                        <Link to={`/category/${route.slug}`}>{route.title}</Link>
                    </Item>
                )
            })}
            <Item key={`feedback-section-menu`}>
                <Link to={`/feedback`}>Feedback</Link>
            </Item>
        </Menu>
    )
}


const mapStateToProps = (state: State) => ({
    categories: state.categories
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getCategories: () => {
        dispatch(getCategories())
    }
})


interface CategoriesProps {
    readonly categories: Category[]
}

interface CategoriesDispatchProps {
    readonly getCategories: () => any
}

type AllProps = CategoriesProps & CategoriesDispatchProps

class CategoriesList extends PureComponent<AllProps, {}, any> {
    componentDidMount() {
        this.props.getCategories()
    }

    render() {
        return (
            <Sections categories={this.props.categories}/>
        )
    }
}

export const Categories = connect(mapStateToProps, mapDispatchToProps)(CategoriesList) as any
