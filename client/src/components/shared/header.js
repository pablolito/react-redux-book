import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { bindActionCreators } from 'redux'
import { sendHeaderHeight, enableBacktotop, goToSection } from './ui-action'
import utils from '../../utils'
import conf from '../../conf'


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = { enableFadingBar: false }
    }
    componentDidMount() {
        window.addEventListener("scroll", debounce((e) => {
            if (utils.scrollTop() > this.refHeader.clientHeight) {
                if (!this.state.enableFadingBar) {
                    this.setState({ enableFadingBar: true });
                }
            } else {
                this.setState({ enableFadingBar: false });
            }
            // enable backtotop or not
            if (utils.scrollTop() > conf.minScrollBacktotop) {
                this.props.enableBacktotop(true);
            } else {
                this.props.enableBacktotop(false);
            }
        }, 100));
    }

    goToSection(id) {
        this.props.goToSection(id);
    }

    render() {
        const enableFadingBar = (this.state.enableFadingBar) ? ' fading-on' : '';
        const homeClass = (this.props.router.location.pathname === "/") ? ' home' : '';
        return (
            <header ref={c => this.refHeader = c} className={`${homeClass} ${enableFadingBar}`}>
                <TransitionGroup appear={true}>
                    <CSSTransition classNames="fade" timeout={0}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="logo">
                                {<Link to="/">
                                    <span>{`${'<'}`}</span>MaximeFalguier<span>{`${'/>'}`}</span>
                                </Link>}
                            </div>
                            <nav>
                                <ul className="d-flex align-items-center">
                                    <li>
                                        <span className={(this.props.scrollToSection === 'profil' || this.props.scrollToSection === null) ? 'active' : ''}
                                            onClick={() => this.goToSection('profil')}>Home</span>
                                    </li>
                                    <li>
                                        <span className={(this.props.scrollToSection === 'about') ? 'active' : ''}
                                            onClick={() => this.goToSection('about')}>Profil</span>
                                    </li>
                                    <li>
                                        <span className={(this.props.scrollToSection === 'project') ? 'active' : ''}
                                            onClick={() => this.goToSection('project')}>Réalisations</span>
                                    </li>
                                    <li>
                                        <span className={(this.props.scrollToSection === 'contact') ? 'active' : ''}
                                            onClick={() => this.goToSection('contact')}>Contact</span>
                                    </li>
                                    <li>
                                        <a target="_blank" href="https://github.com/pablolito">
                                            <svg className="icon icon-github">
                                                <use xlinkHref="/images/sprite-icons.svg#icon-github" />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </header>
        )
    }
}
function mapStateToProps(state) {
    return {
        router: state.router,
        scrollToSection: state.ui.scrollToSection
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ sendHeaderHeight, enableBacktotop, goToSection }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)