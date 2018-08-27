export let isFullscreenEnabled = () => {
    return (
        document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.msFullscreenEnabled
    );
};

export let isFullscreen = () => {
    return (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    );
};

export let requestFullscreen = element => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
};

export let exitFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
};

export let timeFormat = _time => {
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
};
