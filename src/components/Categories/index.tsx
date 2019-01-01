import { State, Dispatch } from "../../store";
import {Post, Category as CategoryType} from '../../types/models'
import { createElement, PureComponent } from "react";
import { connect } from "react-redux";
import {getCategory} from '../../actions/category'
import { RouteComponentProps } from "react-router";
import { category } from "../../reducers/category";


interface CategoryProps {
    readonly category: Post[]
    readonly categories: CategoryType[]
}

interface CategoryDispatchProps {
    readonly getCategory: (slug: string) => any
}

interface RouterProps {
    readonly slug: string
}

type Props = CategoryProps & CategoryDispatchProps & OwnProps

type OwnProps = RouteComponentProps<RouterProps>


const mapDispatchToProps = (dispatch: Dispatch): CategoryDispatchProps  => ({
    getCategory: (slug) => {
        dispatch(getCategory(slug))
    }        
})


const mapStateToProps = (state: State, ownProps: OwnProps): CategoryProps => ({
    categories: state.categories,
    category: state.category[ownProps.match.params.slug]
})

class Category extends PureComponent<Props> {
    componentWillReceiveProps(nextProps: Props) {
        const {match} = this.props
        if (!nextProps.category && nextProps.categories.length) {
            this.props.getCategory(match.params.slug)
        }
    }

    render() {
        console.log(this.props.category)
        return (
            <div>
                {JSON.stringify(this.props.category)}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)