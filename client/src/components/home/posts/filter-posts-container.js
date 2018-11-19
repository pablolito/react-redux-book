import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setFilterPosts } from './posts-action'
import { bindActionCreators } from 'redux'

class FilterPosts extends Component {
    renderTagsList() {
        return (
            <div>
                <div className={`btn btn-primary mr-2 ${(this.props.postsList.filter === '' ? 'active' : '')}`}
                    onClick={() => this.handleFilterTag('')}>All</div>
                {this.props.filterList.map((tag) => {
                    return (<div key={tag} onClick={() => this.handleFilterTag(tag)}
                        className={`btn btn-primary mr-2 ${(this.props.postsList.filter === tag ? 'active' : '')}`}>
                        {tag}
                    </div>)
                })}
            </div>
        )

    }
    handleFilterTag(tag) {
        this.props.setFilterPosts(tag);
    }
    render() {
        return (
            <div className="d-flex justify-content-center flex-wrap mb-4">
                {this.renderTagsList()}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        postsList: state.postsList
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setFilterPosts }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterPosts)