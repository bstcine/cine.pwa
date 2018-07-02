let timeUtil = {
    durationFormat: (duration, format = 1) => {
        let sec_num = parseInt(duration, 10);
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - hours * 3600) / 60);
        let seconds = sec_num - hours * 3600 - minutes * 60;

        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        if (format === 1) {
            return hours + ':' + minutes + ':' + seconds;
        } else {
            let time = '';
            if (hours !== '00') {
                time += hours + '时';
            }
            if (minutes !== '00') {
                time += minutes + '分';
            }
            if (seconds !== '00') {
                time += seconds + '秒';
            }
            return time;
        }
    },
    durationShortFormat: duration => {
        let number = parseInt(duration, 10);
        let sec = number % 60;
        let min = (number - sec) / 60;
        let str = '';
        min && (str += min + "'");
        sec && (str += sec + "''");
        return str;
    },
    shortTime: timeStr => {
        return timeStr.substring(0, 10);
    },
};

export default timeUtil;
