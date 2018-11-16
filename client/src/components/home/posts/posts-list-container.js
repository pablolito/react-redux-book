import React, { Component } from 'react'
import { getALLPosts } from './posts-action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PostsListItem from './post-list-item'
import FilterPosts from './filter-posts-container'
import { Link } from 'react-router-dom'
import utils from '../../../utils'
import SectionTitle from '../../shared/section-title'

class PostsList extends Component {
    componentDidMount() {
        this.props.getALLPosts();
    }

    getAssetUrl(itemId) {
        return this.props.postsList.payload.includes.Asset.filter(function (asset) {
            if (asset.sys.id === itemId) {
                return true;
            } else {
                return false;
            }
        });
    }

    render() {
        let postsList;
        if (this.props.filteredPostsList && this.props.filteredPostsList.length > 0) {
            postsList = this.props.filteredPostsList;
        } else {
            if(this.props.postsList && this.props.postsList.payload){
                postsList = this.props.postsList.payload.items;
            }    
        }
        return (
            <section id="project" className="project pt-4 pb-4">
                <SectionTitle data={{ title: "Découvrir mes derniers projets" }} />
                <FilterPosts />
                {
                    (postsList) ?
                        <div className="d-flex flex-wrap w-75 m-auto">
                            {postsList.map((post) => {
                                return (
                                    <div key={post.sys.id} className="item-project">
                                        <Link to={`/projet/${post.sys.id}/${utils.formatTitleUrl(post.fields.title)}`}>
                                            <PostsListItem asset={this.getAssetUrl(post.fields.pictures[0].sys.id)} data={post.fields} />
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                        : null
                }
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        postsList: state.postsList,
        filteredPostsList: state.filteredPostsList.filterPost
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getALLPosts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)