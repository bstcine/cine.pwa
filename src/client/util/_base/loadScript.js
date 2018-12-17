let cache = {};

export default url => {
    return new Promise((resolve, reject) => {
        if (cache[url]) return resolve();

        const script = document.createElement('script');
        script.src = url;
        document.body.appendChild(script);

        if (script.readyState) {
            // IE
            script.onreadystatechange = function() {
                if (
                    this.readyState === 'complete' ||
                    script.readyState === 'loaded'
                ) {
                    script.onreadystatechange = null;
                    cache[url] = true;
                    resolve();
                }
            };
        } else {
            // 其他浏览器
            script.onload = function() {
                cache[url] = true;
                resolve();
            };
        }
    });
};
