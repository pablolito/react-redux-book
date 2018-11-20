import React, { Component } from 'react'
import SectionTitle from '../../shared/section-title'
import { connect } from 'react-redux'
import { getExperiencePosts } from './about-action'
import { bindActionCreators } from 'redux'
import ReactMarkdown from 'react-markdown'
import XpItem from './experience-item'
import conf from '../../../conf'

class AboutMe extends Component {
    constructor(props) {
        super(props);
        this.state = { displayBarValue: false }
    }
    componentDidMount() {
        this.props.getExperiencePosts();
    }
    displayBarValue() {
        this.setState({ displayBarValue: true });
    }
    renderBar(item) {
        const itemValue = (this.state.displayBarValue) ? item.value : '0%';
        return (
            <div key={item.name} className="bar">
                <div style={{ 'width': itemValue }} className="fill"></div>
                <div className="caption">{item.name}</div>
                <div className="perc">{itemValue}</div>
            </div>
        )
    }
    renderExperienceItems() {
        return this.orderExperienceItems(this.props.experiencePosts.payload.items).map((data, index) => {
            return <XpItem key={index} data={data.fields} />
        })
    }
    orderExperienceItems(itemsList) {
        return itemsList.sort((a, b) => {
            return a.fields.order - b.fields.order;
        });
    }
    render() {
        return (
            <section id="about" className="about-me pb-4 pt-4">
                <SectionTitle data={{ title: "Profil" }} />
                <div className="content-center">
                    {
                        (this.props.experiencePosts.payload && !this.props.experiencePosts.isLoading && !this.props.experiencePosts.isInError) ?
                            <div>
                                <div className="d-flex justify-content-center">
                                    <ReactMarkdown className="mb-4 hipster-text text-center" source={conf.aboutDescription} />
                                </div>
                                <div className="d-flex justify-content-center text-center">
                                    <ReactMarkdown className="hipster-text" source={conf.aboutDescription2} />
                                </div>
                                <div className="d-flex justify-content-around flex-wrap pt-4 mb-4">
                                    {this.renderExperienceItems()}
                                </div>
                            </div>
                        : null
                    }
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        experiencePosts: state.about
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getExperiencePosts }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AboutMe)