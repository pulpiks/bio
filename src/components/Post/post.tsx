import { State, Dispatch } from "../../store";
import { createElement, PureComponent } from "react";
import { getPost } from "../../actions/post";
import {connect} from 'react-redux'
import {Post, Category} from '../../types/models'
import { RouteComponentProps } from "react-router";
import {Tag} from 'antd'
import { getCategoriesSlug } from "../../selectors/categories";
import { Link } from "react-router-dom";


interface PostProps {
    readonly post: Post
    readonly categories: {
        readonly [id in string]: Category
    }
}

interface PostDispatchProps {
    readonly getPost: (id: string) => any
}

type Props = PostProps & PostDispatchProps & RouterProps


const mapDispatchToProps = (dispatch: Dispatch): PostDispatchProps  => ({
    getPost: (slug) => {
        dispatch(getPost(slug))
    }        
})

interface Params {
    readonly slug: string
}

type RouterProps = RouteComponentProps<Params>

type OwnProps = RouterProps

const mapStateToProps = (state: State, ownProps: OwnProps): PostProps => ({
    post: state.posts[ownProps.match.params.slug],
    categories: getCategoriesSlug(state)
})


class PostComponent extends PureComponent<Props> {
    componentDidMount() {
        const {match} = this.props
        if (this.props.post !== null) {
            this.props.getPost(match.params.slug)
        }
    }

    render() {
        if (!this.props.post) {
            return null
        }
        const {title, body, categories} = this.props.post
        const allCategories = this.props.categories 
        return (
            <div>
                <h1>{title}</h1>
                {categories.map((category) => 
                     <Link to={`/category/${allCategories[category.id].slug}`} key={`post-category-${category.id}`}>
                        <Tag>{allCategories[category.id].title}</Tag> 
                     </Link>
                )}
                <article> {body} </article>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostComponent)

