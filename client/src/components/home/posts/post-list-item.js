import React from 'react'



const PostListItem = (props) => {
    const { data, asset } = props;
    return (
        <div className="mea-project">
            <span className="contain">
                <span className="year">{data.year}</span>
                <h3 className="ttl">{data.title}</h3>
            </span>
            <div className="img-container">
                <img alt={asset[0].fields.title} src={asset[0].fields.file.url} />
            </div>
        </div>
    )
}

export default PostListItem