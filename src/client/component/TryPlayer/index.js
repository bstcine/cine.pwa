import React, {Component} from 'react';
import './style.less';
import MediaPlayer from '../MediaPlayer';

class TryPlayer extends Component {
    static defaultProps = {
        playList: null,
        poster: null
    };

    constructor(props) {
        super(props);
        let {playList} = this.playerDataInit();
        this.playList = playList;
        this.state = {
            medias: this.playList[this.playListIndex].medias,
            active: false
        };
        this.changePlayList = this.changePlayList.bind(this);
        this.renderBottom = this.renderBottom.bind(this);
        this.renderTogglePlayListButton = this.renderTogglePlayListButton.bind(this);
        this.onPlayerEnded = this.onPlayerEnded.bind(this);
        this.togglePlayList = this.togglePlayList.bind(this);
    }

    playerDataInit() {
        let playList = this.props.playList.filter(item => item.type === 'media').map(item => {
            item.totalDuration = 0;
            item.medias = item.medias.map(media => {
                media.duration = parseInt(media.duration, 10);
                item.totalDuration += item.duration;
                media.images = media.images
                    .map(img => {
                        img.time = parseInt(img.time, 10);
                        return img;
                    })
                    .sort((a, b) => a.time - b.time);
                return media;
            });
            return item;
        });
        this.playListIndex = 0;
        return {playList};
    }

    changePlayList(i) {
        this.playListIndex = i;
        this.setState({medias: this.playList[this.playListIndex].medias});
    }

    onPlayerEnded() {
        if (this.playListIndex < this.playList.length - 1) {
            this.changePlayList(this.playListIndex + 1);
        }
    }

    togglePlayList() {
        if (this.playlistEle.classList.contains('active')) {
            this.playlistEle.classList.remove('active');
        } else {
            this.playlistEle.classList.add('active');
        }
    }

    renderBottom() {
        let {playList} = this.props;
        if (!playList) return;
        return (
            <div
                className="playlist"
                ref={ele => {
                    this.playlistEle = ele;
                }}
            >
                <div className="playlist-cover" onClick={this.togglePlayList}>
                    <div className="playitems">
                        <div className="playitem playtitle">
                        试听选集
                        </div>
                        {playList.map((item, i) => {
                            if (item.type === 'media') {
                                return (
                                    <div
                                        className={i === this.playListIndex ? 'playitem active' : 'playitem'}
                                        key={i}
                                        onClick={e => this.changePlayList(i)}
                                    >
                                        {item.name}
                                    </div>
                                );
                            } else {
                                return <div key={i} className="playitem playcategory">{item.name}</div>;
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }

    renderTogglePlayListButton() {
        return (
            <div className="control-item chooseplaylist">
                <span onClick={this.togglePlayList}>选集</span>
            </div>
        );
    }

    render() {
        let {medias} = this.state;
        let {poster} = this.props;
        return (
            <MediaPlayer
                medias={medias}
                poster={poster}
                renderBottomPlugin={this.renderBottom}
                renderTogglePlayListButton={this.renderTogglePlayListButton}
                onPlayerEnded={this.onPlayerEnded}
            />
        );
    }
}

export default TryPlayer;
