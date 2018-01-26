import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Video extends Component {
    static defaultProps = {
        src: null,
        poster: null,
        className: 'content',
        pauseVideo:false
    };

    constructor(props) {
        super(props);
    }

    pause() {
        let video = ReactDOM.findDOMNode(this.refs.video);
        video.pause();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.pauseVideo) {
            this.pause()
        }
    }

    render() {
        let {src, poster, className} = this.props;
        return (
            <video
                ref="video"
                className={className}
                src={src}
                poster={poster}
                preload="auto"
                controls
                playsinline=""
                webkit-playsinline=""
            />
        );
    }
}
