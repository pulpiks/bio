import { State, Dispatch } from "../../store";
import { createElement, PureComponent } from "react";
import { getPost } from "../../actions/post";
import {connect} from 'react-redux'
import {Post} from '../../types/models'
import { RouteComponentProps } from "react-router";


interface PostProps {
    readonly post: Post
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
    post: state.posts[ownProps.match.params.slug]
})


class PostComponent extends PureComponent<Props> {
    componentDidMount() {
        const {match} = this.props
        if (this.props.post !== null) {
            this.props.getPost(match.params.slug)
        }
    }

    render() {
        console.log(this.props.post)
        return (
            <div>
                {JSON.stringify(this.props.post)}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostComponent)

