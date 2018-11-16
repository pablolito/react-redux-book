
import React, { Component } from 'react'
import { getPost } from '../home/posts/posts-action'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loader from '../shared/loader'


class Post extends Component {

    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
    }
    componentWillUnmount() {
        //this.props.resetPost();
    }

    renderPost() {
        const { post, postAsset } = this.props;
        //console.log('postasset', postAsset);
        const assetUrl = postAsset.payload.fields.file.url;
        return <div>
            <div className="post-cover" style={{ 'backgroundImage': `url(${assetUrl})` }}>
                <div className="contain">
                    <div className="ttl big">{post.payload.fields.title}</div>
                    <div className="ttl medium">{post.payload.fields.year}</div>
                </div>
            </div>
            <div className="container-page">
                {post.payload.fields.description}
            </div>
        </div>

    }
    render() {
        if (this.props.post.isLoading || this.props.postAsset.isLoading) {
            return <Loader />
        }
        return (
            <div>
                {(this.props.post && this.props.postAsset && !this.props.post.isInError && !this.props.postAsset.isInError) ?
                    this.renderPost()
                : 
                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <div>
                    <h1>Oups !!!</h1>
                    <h3>Erreur lors du chargement des données !!!</h3>
                    </div>
                </div>
                }
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
    return bindActionCreators({ getPost }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)