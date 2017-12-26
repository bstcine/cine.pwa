import {eventEmmiter} from "./eventEmmiter";

let Bridge = {
    android: function (fn, params, needCallback) {
        return new Promise(resolve => {
            console.log(`Android.${fn} params${params}`);
            if (!params) params = {};
            if (needCallback !== false) {
                eventEmmiter.once(`Android.${fn}`, (res) => {
                    // alert(`Android.${fn} callback`)
                    if (res) res = JSON.parse(res);
                    resolve(res)
                })
            }
            Android[fn](JSON.stringify(params))
        })
    },
    ios: function (fn, params, needCallback) {
        return new Promise(resolve => {
            console.log(`iOS.${fn} params${params}`);
            if (!params) params = {};
            // alert(`needCallback !== false ===> ${needCallback !== false}`)
            if (needCallback !== false) {
                eventEmmiter.once(`iOS.${fn}`, (res) => {
                    // alert(`iOS.${JSON.stringify(res)} callback`)
                    if (res) res = JSON.parse(res);
                    resolve(res)
                })
            }
            let msg = JSON.stringify({
                method: fn,
                data: params,
                callback: `iOS.${fn}`
            });
            // alert(`msg ${JSON.stringify(msg)}`)
            webkit.messageHandlers.native.postMessage(msg)
        })
    }
};



export default Bridge