import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import CommonUtil from '@/util/common';

export default class Article extends Component {
    static defaultProps = {
        newsCategorys: [],
    };

    render() {
        console.log(`Article`);
        let { newsCategorys } = this.props;
        return (
            <div className="article-container">
                <div className="title">
                    <span className="text-blue">•</span> 善恩精彩文章
                </div>
                <div className="article-category-wrap">
                    {newsCategorys.map((newsCategory, i) => {
                        return (
                            <div className="article-category" key={i}>
                                <div className="article-category-title">
                                    {newsCategory.name}
                                    <a className="more" href="/news-17">
                                        更多 &gt;
                                    </a>
                                </div>
                                <LazyLoad offset={100} height={200}>
                                    <div
                                        className="article-img"
                                        style={{
                                            background: CommonUtil.getImageBackground(newsCategory.img),
                                            backgroundSize: 'cover',
                                        }}
                                    />
                                </LazyLoad>
                                <ul className="article-list">
                                    {newsCategory.children.map((item, i) => {
                                        return (
                                            <li className="article" key={i}>
                                                <a href={`/news/${item.id}`}>
                                                    {item.name}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
