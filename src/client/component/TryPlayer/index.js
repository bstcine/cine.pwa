import React, {Component} from 'react';
import './style.less';
import MediaPlayer from '../MediaPlayer';
import classNames from 'classnames';

class TryPlayer extends Component {
    static defaultProps = {
        playList: null,
        poster: null
    };

    constructor(props) {
        super(props);
        let {playList, isShowPlayList, isShowCategory} = this.playerDataInit();
        this.playList = playList;
        this.state = {
            medias: this.playList[this.playListIndex].medias,
            active: false,
            isShowPlayList,
            isShowCategory
        };
        this.choosePlayButton = this.choosePlayButton.bind(this);
        this.playListDrawer = this.playListDrawer.bind(this);
        this.togglePlayListDrawer = this.togglePlayListDrawer.bind(this);
        this.changePlay = this.changePlay.bind(this);
        this.onPlayerEnded = this.onPlayerEnded.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.playList !== nextProps.playList) {
            return true;
        }
        if (this.props.poster !== nextProps.poster) {
            return true;
        }
        // if (this.props.pause) {
        //     return true;
        // }
        if (this.state.medias !== nextState.medias) {
            return true
        }
        return false;
    }

    playerDataInit() {
        let categoryCount = 0;
        let playList = this.props.playList.filter(item => {
            if (item.type !== 'media') {
                categoryCount++
            }
            return item.type === 'media'
        }).map((item, i) => {
            item.index = i;
            item.totalDuration = 0;
            item.medias = item.medias.map(media => {
                media.duration = parseInt(media.duration, 10);
                item.totalDuration += media.duration;
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
        return {playList, isShowPlayList: playList.length > 1, isShowCategory: categoryCount > 1};
    }

    changePlay(i) {
        this.playListIndex = i;
        this.setState({medias: this.playList[this.playListIndex].medias});
    }

    onPlayerEnded() {
        if (this.playListIndex < this.playList.length - 1) {
            this.changePlay(this.playListIndex + 1);
        }
    }

    togglePlayListDrawer() {
        if (this.playlistEle.classList.contains('active')) {
            this.playlistEle.classList.remove('active');
        } else {
            this.playlistEle.classList.add('active');
        }
    }

    playListDrawer() {

        let {playList} = this.props;
        let {isShowPlayList, isShowCategory} = this.state;
        if (!playList || !isShowPlayList) return;
        return (
            <div
                className="playlist"
                ref={ele => {
                    this.playlistEle = ele;
                }}
            >
                <div className="playlist-cover" onClick={this.togglePlayListDrawer}>
                    <div className="playitems">
                        <div className="playitem playtitle">
                            试听列表
                        </div>
                        {playList.map((item, i) => {
                            if (item.type === 'media') {
                                return (
                                    <div
                                        className={item.index === this.playListIndex ? 'playitem active' : 'playitem'}
                                        key={i}
                                        onClick={e => this.changePlay(item.index)}
                                    >
                                        {item.name}
                                    </div>
                                );
                            } else {
                                if (isShowCategory) {
                                    return <div key={i}
                                                className={classNames("playitem playcategory", {'first-child': i === 0})}>{item.name}</div>;
                                }
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }

    choosePlayButton() {
        let {isShowPlayList} = this.state;
        if (!isShowPlayList) return;
        return (
            <div className="control-item chooseplaylist" onClick={this.togglePlayListDrawer}>
                <span>选集</span>
            </div>
        );
    }

    render() {

        let {medias} = this.state;
        let {poster} = this.props;
        let choosePlayButton = this.choosePlayButton;
        let playListDrawer = this.playListDrawer;

        return (
            <MediaPlayer
                medias={medias}
                poster={poster}
                choosePlayButton={choosePlayButton}
                playListDrawer={playListDrawer}
                onPlayerEnded={this.onPlayerEnded}
            />
        );
    }
}

export default TryPlayer;
