let cookieUtil = {
    set: (key, value, exp = 48 * 3600 * 1000) => {
        let expires = '; max-age=' + exp;
        document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + expires+'; path=/';
    },
    get: key => {
        return (
            decodeURIComponent(
                document.cookie.replace(
                    new RegExp(
                        '(?:(?:^|.*;)\\s*' +
                            encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') +
                            '\\s*\\=\\s*([^;]*).*$)|^.*$'
                    ),
                    '$1'
                )
            ) || null
        );
    },
    remove: key => {
        if (
            new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=').test(
                document.cookie
            )
        ) {
            document.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';;
        }
    }
};

export default cookieUtil;
