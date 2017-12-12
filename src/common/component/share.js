import React,{Component} from 'react';
const img = require('../asset/image/pic_share_arr@2x.png')
import uaUtil from '../util/uaUtil'

export default class Share extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        let device = uaUtil.
        this.props.ua = uaUtil.
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="share-mask">
                <div className="share-tip">请点击右上角 ...，选择分享到朋友圈</div>
                <div className="share-icon"><img src={img} alt=""/></div>
            </div>
        )
    }

}