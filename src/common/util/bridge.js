import {eventListener} from "./eventListener";

let Bridge = {
    android: function (fn, params, needCallback) {
        return new Promise(resolve => {
            console.log(`Android.${fn} params${params}`)
            if (!params) params = {}
            Android[fn](JSON.stringify(params))
            if (needCallback !== false) {
                eventListener.on(`Android.${fn}`, (res) => {
                    // alert(`Android.${fn} callback`)
                    if (res) res = JSON.parse(res)
                    resolve(res)
                })
            }
        })
    },
    ios: function (fn, params, needCallback) {
        return new Promise(resolve => {
            console.log(`iOS.${fn} params${params}`)
            if (!params) params = {}
            webkit.messageHandlers.native.postMessage(JSON.stringify({
                method: fn,
                data: params,
                callback: `iOS.${fn}`
            }))
            if (needCallback !== false) {
                eventListener.on(`iOS.${fn}`, (res) => {
                    // alert(`iOS.${fn} callback`)
                    if (res) res = JSON.parse(res)
                    resolve(res)
                })
            }
        })
    }
}

export default Bridge