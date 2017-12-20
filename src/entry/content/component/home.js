import React, {Component} from 'react'
import Slider from 'react-slick'
import * as Service from '@/service/content'
import {Tabs, TabItems, TabItem, TabPanels, TabPanel} from '@/component/tabs'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            banners: [],
            tags: [],
            categorys: []
        }
    }

    async componentDidMount() {
        let homeRes = await Service.getContentHome()
        this.setState({
            banners: homeRes.banners,
            tags: homeRes.tags,
            categorys: homeRes.categorys
        })
    }

    render() {
        return (
            <div className="home-container">
                <BannerSlider banners={this.state.banners}/>
                <GlobalNotice/>
                <Tabs className="home-tabs">
                    <TabItems>
                        <TabItem>视频课程</TabItem>
                        <TabItem>教材教辅</TabItem>
                    </TabItems>
                    <TabPanels>
                        <TabPanel>
                            <TagFilter tags={this.state.tags}/>
                            <CategoryList categorys={this.state.categorys}/>
                        </TabPanel>
                        <TabPanel>222</TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        )
    }
}

class BannerSlider extends Component {
    constructor(props) {
        super(props)
        this.settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            dotsClass: 'slick-dots-orange'
        };
    }

    renderItems() {
        console.log(`this.props.sliders  ${JSON.stringify(this.props.banners)}`)
        return this.props.banners.map((item, i) => {
            return (
                <div className="slider-item" key={i}>
                    <img src={item.img} alt={item.name}/>
                </div>
            )
        })
    }

    render() {
        return (
            <Slider {...this.settings}>
                {this.renderItems()}
            </Slider>
        );
    }
}

class TagFilter extends Component {

    renderP1Tags() {
        return this.props.tags.map((item, i) => {
            return (
                <li key={i} className="p1-tag">
                    {item.name}
                    <ul className="p2-tags">
                        <li key={-1} className="p2-tag">全部</li>
                        {this.renderP2Tags(item.children)}
                    </ul>
                </li>
            )
        })
    }

    renderP2Tags(items) {
        return items.map((item, i) => {
            const label = item.label ? (<span className="label">{item.label}</span>) : ""
            return (
                <li key={i} className="p2-tag">{item.name} {label}</li>
            )
        })
    }

    render() {
        return (
            <div className="tag-filter">
                <ul className="p1-tags">
                    {this.renderP1Tags()}
                </ul>
            </div>
        );
    }

}

class GlobalNotice extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="global-notice">
                <div className="notice-text">公告：</div>
                <ul className="notice-list">

                    <li className="notice-item">
                        <a href="/readingguide">
                            <span className="notice-tag">【阅读指引】</span>
                            <span className="notice-title">如何选择合适的英文原版阅读书籍和精读课程</span>
                        </a>
                    </li>

                    <li className="notice-item">
                        <a href="/newguide">
                            <span className="notice-tag">【新手必知】</span>
                            <span className="notice-title">如何“玩”转善恩课程</span>
                        </a>
                    </li>

                    <li className="notice-item">
                        <a href="http://www.bstcine.com/article/45">
                            <span className="notice-tag">【关于积分】</span>
                            <span className="notice-title">积分就能买课程，如何获得积分？</span>
                        </a>
                    </li>

                    <li className="notice-item">
                        <a href="http://www.bstcine.com/article/51">
                            <span className="notice-tag">【版权申明】</span>
                            <span className="notice-title">欢迎举报侵权行为，必有重奖</span>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }


}

class CategoryList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let {categorys} = this.props
        return (
            <div className="category-list">
                {
                    categorys.map((category, i) => <Category key={i} category={category}/>)
                }
            </div>
        );
    }

}

class Category extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let {category} = this.props
        return (
            <div className="category">
                <div className="category-text">
                    <div id={`cat${category.id}`} className="category-anchor"></div>
                    <i className="i-ball"> </i>{category.name}<span className="category-intro">{category.remark}</span>
                </div>
                <ProductList products={category.children}/>
            </div>
        );
    }
}

class ProductList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {products} = this.props
        return (
            <div className="product-list">
                {products.map((product, i) => <Product key={i} product={product}/>)}
            </div>
        );
    }
}

class Product extends Component {
    constructor(props) {
        super(props);

    }

    displayPrice(product) {
        if (isNaN(product.price)) {
            return <div className="product-price">{product.price}</div>
        } else {
            if (product.original_price) {
                return (
                <div className="product-price">￥{product.price}
                    <span className="old-price-text">原价</span> <span className="old-price">{product.original_price}</span>

                </div>
                )
            } else {
                return <div className="product-price">￥{product.price}</div>
            }
        }
    }

    render() {
        const {product} = this.props

        return (
            <div className="product-wrap">
                <a href={`/content/course?cid=${product.id}`}>
                    <div className="product-item">
                        <div className="product-img"
                             style={{
                                 background: `url(http://www.bstcine.com/f/${product.img}) no-repeat `,
                                 backgroundSize: 'cover'
                             }}>
                        </div>
                        <div className="product-desc">
                            <div className="product-title">
                                {product.name}
                            </div>
                            {/*<div className="product-author">*/}
                                {/*{product.author ? `录课老师：${product.author}` : ""}*/}
                            {/*</div>*/}
                            {/*<div className="product-arrange">*/}
                                {/*{product.time_arrange ? `学习课时：${product.time_arrange}` : ""}*/}
                            {/*</div>*/}

                            {this.displayPrice(product)}

                        </div>
                    </div>
                </a>
            </div>
        );
    }
}