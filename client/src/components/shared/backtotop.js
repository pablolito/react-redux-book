import React from 'react'
import { connect } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const renderBacktotop = () => {
    return (
        <TransitionGroup appear={true}>
            <CSSTransition classNames="fade-fast" timeout={0}>
                <div onClick={(e) => handleClick(e)} className="backtotop">
                    <svg className="icon icon-arrow-up">
                        <use xlinkHref="/images/sprite-icons.svg#icon-arrow-down2" />
                    </svg>
                </div>
            </CSSTransition>
        </TransitionGroup>
    )
}

const Backtotop = (props) => {
    const { enableBacktotop } = props;

    return (
        (enableBacktotop) ? renderBacktotop() : null
    )
}

const handleClick = (e) => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

function mapStateToProps(state) {
    return {
        enableBacktotop: state.ui.enableBacktotop,
    }
}

export default connect(mapStateToProps)(Backtotop)