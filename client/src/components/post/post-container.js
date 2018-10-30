
import React, { Component } from 'react'
import { getPost, resetPost } from '../home/posts/posts-action'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loader from '../shared/loader'


class Post extends Component {

    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
    }
    componentWillUnmount() {
        this.props.resetPost();
    }

    renderPost() {
        const { post, postAsset } = this.props;
        const assetUrl = postAsset.fields.file.url;
        return <div>
            <div className="post-cover" style={{ 'backgroundImage': `url(${assetUrl})` }}>
                <div className="contain">
                    <div className="ttl big">{post.fields.title}</div>
                    <div className="ttl medium">{post.fields.year}</div>
                </div>
            </div>
            <div className="container-page">
                {post.fields.description}
            </div>
        </div>

    }
    render() {
        if (this.props.postAsset == null) {
            return <Loader isInError={false} />
        }
        return (
            <div>
                {this.renderPost()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        post: state.post,
        postAsset: state.postAsset
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getPost, resetPost }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)