import React from 'react'

const XpItem = (props) => {
    const { data } = props;
    return (
        <div className="xp-item">
            <div className="hexagon-wrapper">
                <div className="hexagon"></div>
                <div className="icon-wraper">
                    <svg className="icon icon-lab">
                        <use xlinkHref={`/images/sprite-icons.svg#${data.icon[0]}`} />
                    </svg>
                </div>
            </div>
            <h3 className="ttl text-center mb-2 font-weight-bold">{data.title}</h3>
            <p className="text-center">{data.description}</p>
        </div>
    )
}

export default XpItem

