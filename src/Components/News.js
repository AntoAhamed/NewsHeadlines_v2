import React, { useState, useEffect } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component"
import PropTypes from 'prop-types'

function News(props) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const category = props.category;

    document.title = `NewsHeadlines_v2 - ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`;

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=4d567079a1cb496c88f4b7221987541f&page=${page}&pageSize=6`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [category]);

    //const handlePrevClick = () => {
    //    setPage(page - 1);
    //    updateNews();
    //}

    //const handleNextClick = () => {
    //    setPage(page + 1);
    //    updateNews();
    //}

    const fetchMoreData = async () => {
        setPage(page + 1);
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=4d567079a1cb496c88f4b7221987541f&page=${page + 1}&pageSize=6`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };

    return (
        <div className='container' style={{ marginTop: "70px" }}>
            <h1 className='text-center mx-4 my-4'>NewsHeadlines_v2 - Top News Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((e) => {
                            return <div className="col-md-4 my-2" key={e.url}>
                                <NewsItems title={e.title ? e.title.slice(0, 30) : " "} desc={e.description ? e.description.slice(0, 80) : " "} imageUrl={e.urlToImage ? e.urlToImage : "https://source.unsplash.com/3tYZjGSBwbk"} newsUrl={e.url} author={e.author ? e.author : "Unknown"} publishedAt={e.publishedAt} />
                            </div>
                        })}
                    </div>
                </div>

            </InfiniteScroll>
            {/*<div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-info" onClick={this.handlePrevClick}>Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 18)} type="button" className="btn btn-info" onClick={this.handleNextClick}>Next</button>
                </div>*/}

        </div>
    )
}

News.defaultProps = {
    category: "general"
}

News.propTypes = {
    category: PropTypes.string
}

export default News
