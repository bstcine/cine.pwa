import React, {Component} from 'react';
import './style.less';

var medias = [
    {
        id: 'd011516603122414XbQn6akXWU',
        type: 'html',
        url: 'http://oss.bstcine.com/kj/2016/11/08/170317263S1SX4Aw.mp3',
        duration: 190,
        size: 5963,
        images: [
            {
                time: '0',
                url:
                    'http://oss.bstcine.com/img/18614461034287085904103296/2016/11/08/170323617SEtfJk3.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10'
            },
            {
                time: '17',
                url:
                    'http://oss.bstcine.com/img/18614461034287085904103296/2016/11/08/170730975S2GNubG.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10'
            },
            {
                time: '33',
                url:
                    'http://oss.bstcine.com/img/18614461034287085904103296/2016/11/08/17074160S5U9tJ4.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10'
            },
            {
                time: '52',
                url:
                    'http://oss.bstcine.com/img/18614461034287085904103296/2016/11/08/17075396SvhF9xT.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10'
            },
            {
                time: '72',
                url:
                    'http://oss.bstcine.com/img/18614461034287085904103296/2016/11/08/170801436ST7XfDf.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10'
            },
            {
                time: '105',
                url:
                    'http://oss.bstcine.com/img/18614461034287085904103296/2016/11/08/170809426SrxxjME.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10'
            },
            {
                time: '157',
                url:
                    'http://oss.bstcine.com/img/18614461034287085904103296/2016/11/08/170829972SZN9rRN.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10'
            }
        ],
        is_free: '1'
    },
    {
        id: 'd011516603122417Yx3SP9DqDa',
        type: 'html',
        url: 'http://oss.bstcine.com/kj/2016/11/08/170505643Sb7tHv4.mp3',
        duration: 59,
        size: 1865,
        images: [
            {
                time: '0',
                url:
                    'http://oss.bstcine.com/img/18614461034287085904103296/2016/11/08/170519178S3abcsp.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10'
            }
        ]
    }
];

class MediaPlayer extends Component {
    static defaultProps = {
        src: null,
        poster: null
    };

    constructor(props) {
        super(props);
        this.state = {
            image_time:0,
            image_url:null,
            loading: false,
            imageTime: 0
        };
        this.index = 0;
    }

    componentDidMount() {
        this.initAudioPlayer();
    }

    initAudioPlayer() {
        let media = this.props.src[this.index];
        let images = media.images;
        let audio = this.audio = new Audio();
        audio.src = media.url;
        audio
            .addEventListener('playing', () => {
                this.setState({loading: false});
            })
            .addEventListener('timeupdate', () => {
                let image = this.currentImage(images, audio.currentTime, this.state.image.time)
                image && this.setState({image_time:image.time,image_url:image.url})
            });
        let image = this.currentImage(images, 0, this.state.image.time)
        this.setState({image_time:image.time,image_url:image.url});
    }

    currentImage(images, currentTime, imageTime) {
        let expectedImageTime = 0;
        let image;
        for (let index = 0; index < images.length; index++) {
            const imageObj = images[index];
            if (currentTime <= Number(imageObj.time)) {
                expectedImageTime = Number(imageObj.time);
                image = imageObj.url;
            } else {
                break;
            }
        }

        if(expectedImageTime !== imageTime){
            return {
                time:expectedImageTime,
                url:image
            }
        }
    }

    play() {
        this.setState({loading: true});
        let audio = this.audio;
        audio.play();
    }

    render() {
        let {image} = this.state;
        return (
            <div className="media-player">
                <div className="visual-container">
                    <div
                        className="visual-image"
                        style={{
                            background: `url(${image}) center center / contain no-repeat`
                        }}
                    />
                </div>
                <div className="cover">
                    <div className="cover-play" onClick={this.play()} />
                    <div className="cover-loading" />
                </div>
                <div className="bottom">
                    <div className="progress">
                        <div className="progress-list">
                            <div className="play-progress" />
                            <div className="load-progress" />
                            <div className="seeker-container">
                                <div className="seeker" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="controls">
                    <div className="left-controls">
                        <div className="play">
                            <i className="mpj-btn mpj-btn-play" />
                        </div>
                        <div className="time">
                            <span className="current" />/<span className="total" />
                        </div>
                    </div>
                    <div className="right-controls">
                        <div className="mute">
                            <i className="mpj-btn mpj-btn-volume-on" />
                        </div>
                        <div className="volume">
                            <div className="volume-bar" />
                        </div>
                        <div className="fullscreen">
                            <i className="mpj-btn mpj-btn-fullscreen" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MediaPlayer;
