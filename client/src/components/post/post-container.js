
import React, { Component } from 'react'
import { getPost, resetPost, getAdditionalAssets } from '../home/posts/posts-action'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loader from '../shared/loader'
import InViewMonitor from 'react-inview-monitor'


class Post extends Component {
    componentDidMount() {
        this.props.getPost(this.props.match.params.id);
    }
    componentWillUnmount() {
        this.props.resetPost();
    }
    getAdditionalAsset() {
        if(!this.props.post.additionalAssets){
            this.props.getAdditionalAssets(this.props.post.payload.data.fields.pictures[0].sys.id);
        }
    }
    renderPost() {
        const { post } = this.props;
        const postData = post.payload.data;
        const postAssetsData = post.payload.assetsData;
        return <div>
            <div className="post-cover" style={{ 'backgroundImage': `url(${postAssetsData.fields.file.url})` }}>
                <div className="contain">
                    <div className="ttl big">{postData.fields.title}</div>
                    <div className="ttl medium">{postData.fields.year}</div>
                </div>
            </div>
            <div className="container-page">
                {postData.fields.description}

            </div>
        </div>

    }
    renderItemAsset(asset, index){
        return <div className="d-inline-block mb-big w-75 light-shadow" key={index}>
                <img width="100%" height="auto" src={asset.fields.file.url} />
            </div>
    }
    render() {
        if (this.props.post.isLoading) {
            return <Loader />
        }
        return (
            <div>
                {(this.props.post.payload) ?
                    this.renderPost()
                    :
                    (this.props.post.isInError) ?
                        <div className="vh-100 d-flex justify-content-center align-items-center">
                            <div>
                                <h1>Oups !!!</h1>
                                <h3>Erreur lors du chargement des données !!!</h3>
                            </div>
                        </div>
                        : null
                }
                <div style={{minHeight: '200px'}}>
                    <InViewMonitor onInView={() => this.getAdditionalAsset()}>
                        <div className="text-center">
                            {
                                (this.props.post.additionalAssets) ?
                                this.props.post.additionalAssets.map((asset, i)=>{
                                    return (
                                        (this.props.post.payload.data.fields.cover.sys.id !== asset.sys.id) ?
                                        this.renderItemAsset(asset, i) 
                                        : null
                                        )
                                })
                                : null
                            }
                        </div>
                    </InViewMonitor>
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        post: state.post
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getPost, resetPost, getAdditionalAssets }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)