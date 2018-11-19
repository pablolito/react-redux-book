import React, { Component } from 'react'
import { getFilteredPosts } from './posts-action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class FilterPosts extends Component {
    renderTagsList() {
        return (
            <div>
                <div className={`btn btn-primary mr-2 ${(this.props.currentFilterId === '' || !this.props.currentFilterId ? 'active' : '')}`}
                    onClick={() => this.handleFilterTag('')}>All</div>
                {this.filterList().map((tag) => {
                    return (<div key={tag} onClick={() => this.handleFilterTag(tag)}
                        className={`btn btn-primary mr-2 ${(this.props.currentFilterId === tag ? 'active' : '')}`}>
                        {tag}
                    </div>)
                })}
            </div>
        )

    }
    handleFilterTag(tag) {
        this.props.getFilteredPosts(this.props.postsList.payload.items, tag);
    }
    filterList() {
        const { postsList } = this.props;
        const filterList = [];
        postsList.payload.items.map((post) => {
            return post.fields.tags.map((tag) => {
                if (filterList.indexOf(tag) === -1) {
                    filterList.push(tag);
                }
            })

        })
        return filterList;

    }
    render() {
        return (
            (this.props.postsList && this.props.postsList.payload) ?
                <div className="d-flex justify-content-center flex-wrap mb-4">
                    {this.renderTagsList()}
                </div>
                : null
        )
    }
}


function mapStateToProps(state) {
    return {
        postsList: state.postsList,
        currentFilterId: state.filteredPostsList.currentFilterId
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getFilteredPosts }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterPosts)