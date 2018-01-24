import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Video extends Component {
    static defaultProps = {
        src: null,
        poster: null,
        className: 'content'
    };

    constructor(props) {
        super(props);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    componentDidMount() {
        if (typeof document.hidden !== 'undefined') {
            // Opera 12.10 and Firefox 18 and later support
            this.hidden = 'hidden';
            this.visibilityChange = 'visibilitychange';
        } else if (typeof document.msHidden !== 'undefined') {
            this.hidden = 'msHidden';
            this.visibilityChange = 'msvisibilitychange';
        } else if (typeof document.webkitHidden !== 'undefined') {
            this.hidden = 'webkitHidden';
            this.visibilityChange = 'webkitvisibilitychange';
        }
        document.addEventListener(this.visibilityChange, this.handleVisibilityChange, false);
    }

    handleVisibilityChange() {
        let video = ReactDOM.findDOMNode(this.refs.video);
        if (document[this.hidden]) {
            video.pause();
        } else {
            video.play();
        }
    }

    render() {
        let {src, poster, className} = this.props;
        return <video ref="video" className={className} src={src} poster={poster} controls webkit-playsinline playsinline/>;
    }
}
