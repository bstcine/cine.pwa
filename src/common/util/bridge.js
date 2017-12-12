import {eventListener} from "./eventListener";

let Bridge = {
    android: function (fn, params, needCallback) {
        return new Promise(resolve => {
            console.log(`Android.${fn} params${params}`)
            Android[fn](JSON.stringify(params))
            needCallback && eventListener.on(`Android.${fn}`, (res) => {
                alert(`Android.${fn} callback`)
                if (res) res = JSON.parse(res)
                resolve(res)
            })
        })
    },
    ios: function (fn, params, needCallback) {
        return new Promise(resolve => {
            console.log(`iOS.${fn} params${params}`)
            webkit.messageHandlers.native.postMessage(JSON.stringify({
                method:fn,
                data:params,
                callback:`iOS.${fn}`
            }));
            needCallback && eventListener.on(`iOS.${fn}`, (res) => {
                alert(`iOS.${fn} callback`)
                if (res) res = JSON.parse(res)
                resolve(res)
            })
        })
    }
}

export default Bridge