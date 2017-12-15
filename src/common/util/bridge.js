import {eventListener} from "./eventListener";

let Bridge = {
    android: function (fn, params, needCallback) {
        return new Promise(resolve => {
            console.log(`Android.${fn} params${params}`)
            if (!params) params = {}
            if (needCallback !== false) {
                eventListener.on(`Android.${fn}`, (res) => {
                    // alert(`Android.${fn} callback`)
                    if (res) res = JSON.parse(res)
                    resolve(res)
                })
            }
            Android[fn](JSON.stringify(params))
        })
    },
    ios: function (fn, params, needCallback) {
        return new Promise(resolve => {
            console.log(`iOS.${fn} params${params}`)
            if (!params) params = {}
            alert(`needCallback !== false ===> ${needCallback !== false}`)
            if (needCallback !== false) {
                eventListener.on(`iOS.${fn}`, (res) => {
                    alert(`iOS.${JSON.stringify(res)} callback`)
                    if (res) res = JSON.parse(res)
                    resolve(res)
                })
            }
            let msg = JSON.stringify({
                method: fn,
                data: params,
                callback: `iOS.${fn}`
            })
            alert(`msg ${JSON.stringify(msg)}`)
            webkit.messageHandlers.native.postMessage(msg)
        })
    }
}

export default Bridge