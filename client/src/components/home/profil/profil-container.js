import React, { Component } from 'react'
import { getProfil } from './profil-action'
import { goToSection } from '../../shared/ui-action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { debounce } from 'lodash'
import SentenceIncrement from './sentence-increment'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Trianglify from 'react-trianglify'
import ReactMarkdown from 'react-markdown'
import conf from '../../../conf'


class Profil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profilTextAnimComplete: false,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            displaySeeMore : false
        }
        this.sectionRef = React.createRef();
    }
    componentDidMount() {
        this.props.getProfil();
        window.addEventListener("resize", debounce((e) => {
            this.setState({
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight
            })
        }, 200))
    }
    goToSectionId(id) {
        this.props.goToSection(id);
    }
    sentanceIsLoaded = (e) =>{
        setTimeout(()=>{
            this.setState({displaySeeMore:e});
        }, 1000)
    }
    renderProfil() {
        return (
            <div className="text-container">
                <TransitionGroup component={null} appear={true}>
                    <CSSTransition timeout={2000}
                        onEntered={() => {
                            setTimeout(() => {
                                this.setState({ profilTextAnimComplete: true })
                            }, 500)
                        }}
                        classNames="moveX">
                        <h1 className="ttl-bis big">
                            <ReactMarkdown source={this.props.profil.items[0].fields.profilText0} />
                        </h1>
                    </CSSTransition>
                </TransitionGroup>
                {(this.state.profilTextAnimComplete) ?
                    <SentenceIncrement sentenceIsLoadedCallback={this.sentanceIsLoaded} initialSentence={this.props.profil.items[0].fields.profilText2} />
                    : null}
            </div>
        );
    }

    render() {
        const { profil } = this.props;
        if (this.props.scrollToSection && this.sectionRef.current  && this.props.scrollToSection === this.sectionRef.current.id) {
            window.scrollTo({
                top: this.sectionRef.current.offsetTop - conf.headerHeightFixed,
                behavior: 'smooth'
            })

        }
        return (
            <section id="profil" ref={this.sectionRef} className="profil">
                <Trianglify
                    width={this.state.screenWidth}
                    height={this.state.screenHeight}
                    seed={1}
                    cellSize={400}
                    xColors={['17ED78', '0C7F41', '19FF81', '064020', '16E574']}
                />
                {(profil) ? this.renderProfil() : null}
                {(this.state.displaySeeMore) ?
                <div className="see-more">
                    <span className="slowMoveY" onClick={() => this.goToSectionId("about")}>
                        <svg className="icon icon-arrow-down">
                            <use xlinkHref="/images/sprite-icons.svg#icon-arrow-down2" />
                        </svg>
                    </span>
                </div>
                : null
                }
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        profil: state.profil,
        scrollToSection: state.ui.scrollToSection
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getProfil, goToSection }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profil)