import React, { Component } from 'react'
import { getPosts } from './posts-action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PostsListItem from './post-list-item'
import FilterPosts from './filter-posts-container'
import { Link } from 'react-router-dom'
import utils from '../../../utils'
import SectionTitle from '../../shared/section-title'

class PostsList extends Component {
    componentDidMount() {
        if (!this.props.postsList.payload)
            this.props.getPosts();
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
    getFilterList() {
        const filterList = [];
        this.props.postsList.payload.items.map((post) => {
            return post.fields.tags.map((tag) => {
                if (filterList.indexOf(tag) === -1) {
                    filterList.push(tag);
                }
            })
        })
        return filterList;
    }
    renderPosts() {
        let postListItems;
        if (this.props.postsList.filter) {
            postListItems = this.props.postsList.payload.items.filter(post => post.fields.tags.indexOf(this.props.postsList.filter) !== -1);
        } else {
            postListItems = this.props.postsList.payload.items;
        }
        return (
            <div>
                <FilterPosts filterList={this.getFilterList()} />
                <div className="d-flex flex-wrap w-75 m-auto">
                    {postListItems.map((post) => {
                        return (
                            <div key={post.sys.id} className="item-project">
                                <Link to={`/projet/${post.sys.id}/${utils.formatTitleUrl(post.fields.title)}`}>
                                    <PostsListItem asset={this.getAssetUrl(post.fields.pictures[0].sys.id)} data={post.fields} />
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
    render() {
        console.log("render");
        return (
            <section id="project" className="project pt-4 pb-4">
                <SectionTitle data={{ title: "Découvrir mes derniers projets" }} />
                {
                    (this.props.postsList.payload && !this.props.postsList.isLoading) ?
                        this.renderPosts()
                        : null
                }
            </section>
        )
    }
}

function mapStateToProps(state) {
    //console.log(state);
    return {
        postsList: state.postsList,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getPosts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)