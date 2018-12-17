export const animation = (ele, property, from, to, callback) => {
    requestAnimationFrame(() => {
        ele.style[property] = from;
        requestAnimationFrame(() => {
            ele.style[property] = to;
            callback && callback();
        });
    });
};
