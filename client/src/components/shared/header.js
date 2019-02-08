import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { bindActionCreators } from 'redux'
import { enableBacktotop } from './ui-action'
import utils from '../../utils'
import conf from '../../conf'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = { enableFadingBar: false, activeItemId: '' }
        this.goBack = this.goBack.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (this.props.activeSection !== prevProps.activeSection) {
            this.setState({ activeItemId: this.props.activeSection });
        }
    }
    componentDidMount() {

        window.addEventListener("scroll", debounce((e) => {
            // if(this.state.activeItemId !==""){
            //     this.setState({activeItemId:""});
            // }
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

    goBack() {
        this.props.history.goBack();
    }

    goToSection(id) {
        if (document.getElementById(id)) {
            window.scrollTo({
                top: document.getElementById(id).offsetTop - conf.headerHeightFixed, // to do : find a way to store section ref 
                behavior: 'smooth'
            })
            this.setState({ activeItemId: id })
        }
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
                                    Maxime Falguier
                                </Link>}
                            </div>
                            {(this.props.router.location.pathname === "/") ?
                                <nav>
                                    <ul className="d-flex align-items-center">
                                        <li className="d-none d-md-block">
                                            <span className={(this.state.activeItemId === 'about') ? 'active' : ''}
                                                onClick={() => this.goToSection('about')}>Profil</span>
                                        </li>
                                        <li className="d-none d-md-block">
                                            <span className={(this.state.activeItemId === 'project') ? 'active' : ''}
                                                onClick={() => this.goToSection('project')}>Réalisations</span>
                                        </li>
                                        <li className="d-none d-md-block">
                                            <span className={(this.state.activeItemId === 'contact') ? 'active' : ''}
                                                onClick={() => this.goToSection('contact')}>Contact</span>
                                        </li>
                                        <li>
                                            <a rel="noopener noreferrer" target="_blank" href="https://github.com/pablolito">
                                                <svg className="icon icon-github">
                                                    <use xlinkHref="/images/sprite-icons.svg#icon-github" />
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                                : <div>
                                    <div onClick={this.goBack} className="close"></div>
                                </div>
                            }
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
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ enableBacktotop }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))