import React, { Component } from 'react'

export default class Loader extends Component {
    render() {
        return (
            <div className="loader-container">
                {(! this.props.isInError) ? 
                    <svg className="icon icon-loader">
                        <use xlinkHref="/images/sprite-icons.svg#icon-spinner11" />
                    </svg>
                    :
                    <p className="error">:( impossible de charger les données !!</p>
                }
            </div>
        );
    }
}