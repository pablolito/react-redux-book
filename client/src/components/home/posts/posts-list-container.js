import React, { Component } from 'react'
import { getALLPosts } from './posts-action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PostsListItem from './post-list-item'
import FilterPosts from './filter-posts-container'
import { Link } from 'react-router-dom'
import SectionTitle from '../../shared/section-title';
import conf from '../../../conf'

class PostsList extends Component {
    constructor(props){
        super(props);
        this.sectionRef = React.createRef();
    }
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
        if (this.props.scrollToSection && this.sectionRef.current && this.props.scrollToSection === this.sectionRef.current.id) {
            window.scrollTo({
                top: this.sectionRef.current.offsetTop - conf.headerHeightFixed,
                behavior: 'smooth'
            })

        }
        return (
            <section id="project" ref={this.sectionRef} className="project pt-4 pb-4">
                <SectionTitle data={{ title: "Découvrir mes derniers projets" }} />
                <FilterPosts />
                {
                    (postsList) ?
                        <div className="d-flex flex-wrap w-75 m-auto">
                            {postsList.map((post) => {
                                return (
                                    <div key={post.sys.id} className="w-50">
                                        <Link to={`/post/${post.sys.id}`}>
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
        filteredPostsList: state.filteredPostsList.filterPost,
        scrollToSection : state.ui.scrollToSection
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getALLPosts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)