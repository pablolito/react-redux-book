import React, { Component } from 'react'

export default class Loader extends Component {
    render() {
        return (
            <div className="loader-container">
                <svg className="icon icon-loader">
                    <use xlinkHref="/images/sprite-icons.svg#icon-spinner11" />
                </svg>
            </div>
        );
    }
}