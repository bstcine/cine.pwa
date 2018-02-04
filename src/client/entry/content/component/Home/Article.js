import React, {Component} from 'react';

export default class Article extends Component {
    static defaultProps = {
        newsCategorys: []
    };

    constructor(props) {
        super(props);
    }

    render() {
        console.log(`Article`);
        let {newsCategorys} = this.props;
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
                                <div
                                    className="article-img"
                                    style={{
                                        background: `url(http://www.bstcine.com/f/${
                                            newsCategory.img
                                        }) no-repeat center`,
                                        backgroundSize: 'cover'
                                    }}
                                />
                                <ul className="article-list">
                                    {newsCategory.children.map((item, i) => {
                                        return (
                                            <li className="article" key={i}>
                                                <a href={`/news/${item.id}`}>{item.name}</a>
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
