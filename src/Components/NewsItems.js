import React from 'react'

function NewsItem(props) {
    return (
        <div>
            <div className="card">
                <img src={props.imageUrl} className="card-img-top" alt="" style={{ height: "12rem" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.title}...</h5>
                    <p className="card-text">{props.desc}...</p>
                    <p className="card-text"><small className="text-muted">{props.author} On {new Date(props.publishedAt).toGMTString()}</small></p>
                    <a href={props.newsUrl} target="_new" className="btn btn-sm btn-dark">Read more</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
