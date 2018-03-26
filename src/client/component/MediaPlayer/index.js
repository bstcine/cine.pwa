import React, {Component} from 'react';
import './style.less';

class MediaPlayer extends Component {
    static defaultProps = {
        src: null,
        poster: null
    };

    static timeFormat(_time) {
        if (isNaN(_time) || !_time) {
            return '00:00';
        }
        let time = Math.round(_time);
        let h = 0;
        let m = 0;
        let s = 0;
        if (time > 0) {
            s = time % 60;
            if (time >= 3600) {
                h = Math.floor(time / 3600);
                m = Math.floor((time - h * 3600) / 60);
            } else {
                m = Math.floor(time / 60);
            }
        }
        let _h = '00';
        let _m = '00';
        let _s = '00';
        if (h > 0) {
            _h = h > 9 ? h : '0' + h;
        }
        if (m > 0) {
            _m = m > 9 ? m : '0' + m;
        }
        if (s > 0) {
            _s = s > 9 ? s : '0' + s;
        }
        return _h === '00' ? _m + ':' + _s : _h + ':' + _m + ':' + _s;
    }

    constructor(props) {
        super(props);
        this.state = {
            imageUrl: null,
            fullsize: false,
            fullscreen: false,
            active: false,
            loading: false,
            paused: true,
            playProgress: 0,
            loadProgress: 0,
            totalCurrentTimeFormated: '00:00',
            totalDurationFormated: '00:00'
        };
        this.ended = false;
        this.index = 0;
        this.totalDuration = 0;
        this.play = this.play.bind(this);
        this.onPlayerMouseMove = this.onPlayerMouseMove.bind(this);
        this.togglePlayer = this.togglePlayer.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.onFullscreenChangeEvent = this.onFullscreenChangeEvent.bind(this);
        this.onSeekerMouseDown = this.onSeekerMouseDown.bind(this);
        this.onSeekerTouchStart = this.onSeekerTouchStart.bind(this);
        this.onProgessClick = this.onProgessClick.bind(this);
        this.onAudioTimeUpdate = this.onAudioTimeUpdate.bind(this);
    }

    componentDidMount() {
        this.mediasDataFix();
        this.initAudioPlayer();
        this.addKeyEventListener();
    }

    componentWillUnmount() {
        this.removeKeyEventListener();
        let audio = this.audio;
        audio.pause();
        audio.src = '';
        audio.load();
    }

    onSeekerMouseDown(e) {
        console.log('onSeekerMouseDown');
        this.audio.removeEventListener('timeupdate', this.onAudioTimeUpdate);
        let dragStartX = e.clientX;
        let seekerLeft = document.querySelector('.seeker').offsetLeft;
        let playProgress;
        let mousemove = e => {
            let width = String.prototype.replace.call(
                getComputedStyle(document.querySelector('.progress-list')).width,
                'px',
                ''
            );
            let dragOffset = Math.min(Math.max(seekerLeft + e.clientX - dragStartX, 0), width);
            playProgress = dragOffset / width * 100;
            this.onProgressChanging(playProgress);
        };

        document.addEventListener('mousemove', mousemove);

        document.addEventListener(
            'mouseup',
            e => {
                document.removeEventListener('mousemove', mousemove);
                // todo seeking duration
                this.onProgressChanged(playProgress);
            },
            {once: true}
        );
    }

    onSeekerTouchStart(e) {
        console.log('onSeekerTouchStart');
        this.audio.removeEventListener('timeupdate', this.onAudioTimeUpdate);
        let dragStartX = e.touches[0].clientX;
        let seekerLeft = document.querySelector('.seeker').offsetLeft;
        let playProgress;
        let touchmove = e => {
            let width = String.prototype.replace.call(
                getComputedStyle(document.querySelector('.progress-list')).width,
                'px',
                ''
            );
            let dragOffset = Math.min(Math.max(seekerLeft + e.touches[0].clientX - dragStartX, 0), width);
            playProgress = dragOffset / width * 100;
            this.setState({playProgress});
        };

        document.addEventListener('touchmove', touchmove);

        document.addEventListener(
            'touchend',
            e => {
                document.removeEventListener('touchmove', touchmove);
                // todo seeking duration
                this.onProgressChanged(playProgress);
            },
            {once: true}
        );
    }

    onProgressChanging(playProgress) {
        console.log('onProgressChanging playProgress', playProgress);
        let seekTime = playProgress / 100 * this.totalDuration;
        let totalCurrentTimeFormated = MediaPlayer.timeFormat(seekTime);
        this.setState({totalCurrentTimeFormated, playProgress});
    }

    onProgressChanged(playProgress) {
        let seekTime = playProgress / 100 * this.totalDuration;
        let seekIndex = 0;
        let mediaTime = 0;
        let seekCurrentTime = 0;
        for (let i = 0; i < this.medias.length; i++) {
            mediaTime += this.medias[i].duration;
            if (mediaTime > seekTime) {
                seekIndex = i;
                seekCurrentTime = seekTime - (mediaTime - this.medias[i].duration);
                break;
            }
        }
        console.log('seekCurrentTime', seekCurrentTime);
        console.log('seekIndex', seekIndex);
        this.index = seekIndex;
        let media = this.medias[this.index];
        let imageUrl = this.currentImage(media.images, seekCurrentTime);
        if (this.state.imageUrl !== imageUrl) {
            this.setState({imageUrl});
        }
        console.log(media);
        this.audio.pause();
        this.audio.src = media.url;
        this.audio.currentTime = seekCurrentTime;
        this.audio.play();
        this.audio.addEventListener('timeupdate', this.onAudioTimeUpdate);
    }

    onProgessClick(e) {
        console.log('onProgessClick');
        this.audio.removeEventListener('timeupdate', this.onAudioTimeUpdate);
        let left = document.querySelector('.progress-list').getBoundingClientRect().left;
        let width = String.prototype.replace.call(
            getComputedStyle(document.querySelector('.progress-list')).width,
            'px',
            ''
        );
        let dragOffset = e.clientX - left;
        let playProgress = dragOffset / width * 100;
        this.setState({playProgress});
        this.onProgressChanged(playProgress);
    }

    addKeyEventListener() {
        document.addEventListener('mousemove', this.onPlayerMouseMove);
        document.addEventListener('touchmove', this.onPlayerMouseMove);
        this.playerElement.addEventListener('webkitfullscreenchange', this.onFullscreenChangeEvent);
        this.playerElement.addEventListener('mozfullscreenchange', this.onFullscreenChangeEvent);
        this.playerElement.addEventListener('fullscreenchange', this.onFullscreenChangeEvent);
    }

    removeKeyEventListener() {
        this.playerElement.removeEventListener('webkitfullscreenchange', this.onFullscreenChangeEvent);
        this.playerElement.removeEventListener('mozfullscreenchange', this.onFullscreenChangeEvent);
        this.playerElement.removeEventListener('fullscreenchange', this.onFullscreenChangeEvent);
        document.removeEventListener('mousemove', this.onPlayerMouseMove);
        document.removeEventListener('touchmove', this.onPlayerMouseMove);
    }

    onFullscreenChangeEvent(e) {
        if (!this.isFullscreen()) {
            if (this.state.fullscreen) {
                this.setState({fullscreen: false});
            }
        }
    }

    mediasDataFix() {
        this.medias = this.props.src.map(item => {
            item.duration = parseInt(item.duration, 10);
            this.totalDuration += item.duration;
            item.images = item.images
                .map(img => {
                    img.time = parseInt(img.time, 10);
                    return img;
                })
                .sort((a, b) => a.time - a.time);
            return item;
        });
        let totalDurationFormated = MediaPlayer.timeFormat(this.totalDuration);
        this.setState({totalDurationFormated});
    }

    initAudioPlayer() {
        console.log(this.props.poster);
        let media = this.medias[this.index];
        let audio = (this.audio = new Audio());
        audio.addEventListener('playing', () => {
            console.log('playing');
            this.setState({paused: false, loading: false});
        });
        audio.addEventListener('pause', () => {
            console.log('pause');
        });
        audio.addEventListener('ended', () => {
            console.log('ended');
            this.nextMedia();
        });
        audio.addEventListener('timeupdate', this.onAudioTimeUpdate);
        audio.addEventListener('durationchange', () => {
            console.log('ondurationchange', audio.duration);
            this.onAudioLoading();
        });
        audio.addEventListener('progress', () => {
            console.log('onprogress');
            this.onAudioLoading();
        });
        audio.addEventListener('abort', () => {
            console.log('onabort');
        });
        audio.addEventListener('canplay', () => {
            console.log('oncanplay');
        });
        audio.addEventListener('canplaythrough', () => {
            console.log('oncanplaythrough');
            this.setState(prevState => {
                if (prevState.loading) return {loading: false};
            });
        });
        audio.addEventListener('emptied', () => {
            console.log('onemptied');
        });
        audio.addEventListener('error', () => {
            console.log('onerror');
        });
        audio.addEventListener('loadeddata', () => {
            console.log('onloadeddata');
        });
        audio.addEventListener('loadedmetadata', () => {
            console.log('onloadedmetadata');
            this.setState(prevState => {
                if (!prevState.loading) return {loading: true};
            });
        });
        audio.addEventListener('loadstart', () => {
            console.log('onloadstart');
            this.setState(prevState => {
                if (!prevState.loading) return {loading: true};
            });
        });
        audio.addEventListener('play', () => {
            console.log('onplay');
        });
        audio.addEventListener('ratechange', () => {
            console.log('onratechange');
        });
        audio.addEventListener('readystatechange', () => {
            console.log('onreadystatechange');
        });
        audio.addEventListener('seeked', () => {
            console.log('onseeked');
        });
        audio.addEventListener('seeking', () => {
            console.log('onseeking');
        });
        audio.addEventListener('stalled', () => {
            console.log('onstalled');
        });
        audio.addEventListener('suspend', () => {
            console.log('onsuspend');
        });
        audio.addEventListener('volumechange', () => {
            console.log('onvolumechange', audio.volume);
        });
        audio.addEventListener('waiting', () => {
            console.log('onwaiting');
            this.setState(prevState => {
                if (!prevState.loading) return {loading: true};
            });
        });

        audio.src = media.url;
        let image = this.props.poster || this.currentImage(media.images, 0);
        this.setState({imageUrl: image});
    }

    onAudioTimeUpdate() {
        let currentTime = this.audio.currentTime;
        let media = this.medias[this.index];
        let totalCurrentTime = currentTime;
        for (let i = 0; i < this.medias.length; i++) {
            if (i < this.index) {
                totalCurrentTime += this.medias[i].duration;
            }
        }
        let totalCurrentTimeFormated = MediaPlayer.timeFormat(totalCurrentTime);
        const playProgress = totalCurrentTime / this.totalDuration * 100;
        this.setState({totalCurrentTimeFormated, playProgress});
        let imageUrl = this.currentImage(media.images, currentTime);
        if (this.state.imageUrl !== imageUrl) {
            this.setState({imageUrl});
        }
    }

    onAudioLoading() {
        let audio = this.audio;
        if (audio.buffered && audio.buffered.length) {
            if (audio.buffered.end(audio.buffered.length - 1) !== this.bufferedDuration) {
                let currentBufferedDuration = audio.buffered.end(audio.buffered.length - 1);
                console.info('currentBufferedDuration', currentBufferedDuration);
                let totalBufferedDuration = currentBufferedDuration;
                for (let i = 0; i < this.medias.length; i++) {
                    if (i < this.index) {
                        totalBufferedDuration += this.medias[i].duration;
                    }
                }
                let loadProgress = totalBufferedDuration / this.totalDuration * 100;
                console.log('loadProgress', loadProgress);
                this.setState({loadProgress});
            }
        }
    }

    currentImage(images, currentTime) {
        let expectedImage = images[0].url;
        for (let index = 0; index < images.length; index++) {
            const imageObj = images[index];
            if (currentTime >= imageObj.time) {
                expectedImage = imageObj.url;
            } else {
                break;
            }
        }
        return expectedImage;
    }

    nextMedia() {
        console.log('nextmedia');
        if (this.index < this.props.src.length - 1) {
            console.log('nextmedia');
            this.index++;
            let media = this.medias[this.index];
            let imageUrl = this.currentImage(media.images, 0);
            if (this.state.imageUrl !== imageUrl) {
                this.setState({imageUrl});
            }
            this.audio.pause();
            this.audio.src = media.url;
            this.audio.play();
        } else {
            this.endMedia();
        }
    }

    endMedia() {
        console.log('endMedia');
        this.setState({paused: true});
        this.ended = true;
        return null;
    }

    resetPlayer() {
        this.setState({
            playProgress: 0,
            loadProgress: 0,
            totalCurrentTimeFormated: '00:00'
        });
        this.ended = false;
        this.index = 0;
        let media = this.medias[this.index];
        this.audio.src = media.url;
        this.audio.load();
    }

    play() {
        if (this.ended) {
            this.resetPlayer();
        }
        this.setState({loading: true, paused: false});
        let audio = this.audio;
        audio.play();
    }

    onPlayerMouseMove(e) {
        // console.log('onPlayerMouseMove');
        let target = e.target || e.touches[0].target;
        if (target === this.playerElement || this.playerElement.contains(target)) {
            this.setState({active: true});
            this.activeTimer && clearTimeout(this.activeTimer);
            this.activeTimer = setTimeout(() => {
                this.setState({active: false});
            }, 3000);
        } else {
            this.activeTimer && clearTimeout(this.activeTimer);
            this.setState({active: false});
        }
    }

    togglePlayer() {
        if (this.audio.paused) {
            this.setState({paused: false});
            this.audio.play();
        } else {
            this.setState({paused: true});
            this.audio.pause();
        }
    }

    toggleFullscreen() {
        if (this.fullscreenEnabled()) {
            this.setState(
                prevState => ({fullscreen: !prevState.fullscreen}),
                () => {
                    if (this.state.fullscreen) {
                        this.launchIntoFullscreen(this.playerElement);
                    } else {
                        this.exitFullscreen();
                    }
                }
            );
        } else {
            this.setState(prevState => ({fullsize: !prevState.fullsize}));
        }
    }

    fullscreenEnabled() {
        return (
            document.fullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.msFullscreenEnabled
        );
    }

    launchIntoFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    isFullscreen() {
        return (
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement
        );
    }

    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    render() {
        let {
            imageUrl,
            fullscreen,
            fullsize,
            loading,
            paused,
            active,
            playProgress,
            loadProgress,
            totalCurrentTimeFormated,
            totalDurationFormated
        } = this.state;
        let mpClazzName = 'media-player';
        if (active) mpClazzName += ' active';
        if (fullsize) mpClazzName += ' fullsize';
        return (
            <div
                className={mpClazzName}
                // onMouseMove={this.onPlayerMouseMove}
                // onMouseOut={this.onPlayerMouseOut}
                ref={ele => {
                    this.playerElement = ele;
                }}
            >
                <div className="overlay">
                    <div className="visual-container">
                        <div
                            className="visual-image"
                            style={{
                                background: `url(${imageUrl}) center center / contain no-repeat`
                            }}
                        />
                        <div className="cover">
                            {!loading && paused ? <div className="cover-play" onClick={this.play} /> : null}
                            {loading ? <div className="cover-loading" /> : null}
                        </div>
                        {fullscreen || fullsize ? (
                            <div className="top">
                                <div className="controls">
                                    <div className="left-controls">
                                        <div className="close">
                                            <i className="mpj-btn mpj-btn-close" onClick={this.toggleFullscreen} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        <div className="bottom">
                            <div className="progress">
                                <div className="progress-list" onClick={this.onProgessClick}>
                                    <div className="play-progress" style={{width: `${playProgress}%`}}>
                                        <div
                                            className="seeker"
                                            onMouseDown={this.onSeekerMouseDown}
                                            onTouchStart={this.onSeekerTouchStart}
                                        />
                                    </div>
                                    <div className="load-progress" style={{width: `${loadProgress}%`}} />
                                </div>
                            </div>
                            <div className="controls">
                                <div className="left-controls">
                                    <div className="play">
                                        <i
                                            className={paused ? 'mpj-btn mpj-btn-play' : 'mpj-btn mpj-btn-pause'}
                                            onClick={this.togglePlayer}
                                        />
                                    </div>
                                    <div className="time">
                                        <span className="current">{totalCurrentTimeFormated}</span>/<span className="total">
                                            {totalDurationFormated}
                                        </span>
                                    </div>
                                </div>
                                <div className="right-controls">
                                    <div className="fullscreen">
                                        <i
                                            className={
                                                fullscreen || fullsize
                                                    ? 'mpj-btn mpj-btn-fullscreen-exit'
                                                    : 'mpj-btn mpj-btn-fullscreen'
                                            }
                                            onClick={this.toggleFullscreen}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MediaPlayer;
