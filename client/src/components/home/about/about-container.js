import React, { Component } from 'react'
import SectionTitle from '../../shared/section-title'
import { connect } from 'react-redux'
import { getExperiencePosts } from './about-action'
import { goToSection } from '../../shared/ui-action'
import { bindActionCreators } from 'redux'
import InViewMonitor from 'react-inview-monitor'
import XpItem from './experience-item'
import conf from '../../../conf'

class AboutMe extends Component {
    constructor(props) {
        super(props);
        this.aboutSectionRef = React.createRef();
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
        return this.orderExperienceItems(this.props.experiencePosts.items).map((data, index) => {
            return <XpItem key={index} data={data.fields} />
        })
    }
    orderExperienceItems(itemsList){
        return itemsList.sort((a, b) => {
            return a.fields.order - b.fields.order;
          });
    }
    render() {
        if (this.props.scrollToSection && this.aboutSectionRef.current && this.props.scrollToSection === this.aboutSectionRef.current.id) {
            window.scrollTo({
                top: this.aboutSectionRef.current.offsetTop - conf.headerHeightFixed,
                behavior: 'smooth'
            })

        }
        return (
            <section id="about" ref={this.aboutSectionRef} className="about-me pb-4 pt-4">
                <SectionTitle data={{ title: "Profil" }} />
                <div className="content-center">
                    <div className="row mb-4">
                        <div className="col col-xs-12 col-sm-6">
                            <p className="ttl-bis mb-4">{conf.aboutDescription}</p>
                            <p className="ttl-bis">{conf.aboutDescription2}</p>
                        </div>
                        <div className="col col-xs-12 col-sm-6">
                            <InViewMonitor onInView={() => this.displayBarValue()}>
                                {conf.skills.map((item) => {
                                    return this.renderBar(item);
                                })}
                            </InViewMonitor>
                        </div>
                    </div>
                    {
                        (this.props.experiencePosts && this.props.experiencePosts.items.length > 0) ?
                            <div className="d-flex justify-content-around pt-4 mb-4">
                                {this.renderExperienceItems()}
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
        scrollToSection: state.ui.scrollToSection,
        experiencePosts: state.about
        //headerHeight: state.ui.headerHeight
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        goToSection,
        getExperiencePosts
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(AboutMe)