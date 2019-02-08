import React from 'react'

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer>
            <div className="square"></div>
            <div className="abs-text">
                <p className="text-center mb-2">Ce portfolio a été conçu avec ES6, ReactJS, Redux, NodeJs, Contenful et beaucoup d'amour...</p>
                <p className="text-center">Certifié Made in France {year} &nbsp;
                <svg className="icon icon-fr">
                    <use xlinkHref="/images/sprite-icons.svg#icon-fr" />
                </svg></p>
            </div>
        </footer>
    )
}

export default Footer