import React from 'react'
import Slider from 'react-slick'
import * as Service from '../service'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            banners: [],
            tags:[]
        }
    }

    async componentDidMount() {
        let homeRes = await Service.getContentHome()
        this.setState({
            banners: homeRes.banners,
            tags: homeRes.tags,
        })
    }

    render() {
        return (
            <div className="home-container">
                <BannerSlider banners={this.state.banners}/>
                <TagFilter tags={this.state.tags}/>
            </div>
        )
    }
}

class BannerSlider extends React.Component {
    constructor(props) {
        super(props)
        this.settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
    }

    renderItems() {
        console.log(`this.props.sliders  ${JSON.stringify(this.props.banners)}`)
        return this.props.banners.map((item,i) => {
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

class TagFilter extends React.Component{

    renderP1Tags(){
        return  this.props.tags.map((item,i)=>{
                return (
                    <li key={i} className="p1-tag">
                        {item.name}
                        <ul className="p2-tags">
                            {this.renderP2Tags(item.children)}
                        </ul>
                    </li>
                )
            })

    }

    renderP2Tags(items){
        return items.map((item,i)=>{
            return (
                <li key={i} className="p2-tag">{item.name}</li>
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