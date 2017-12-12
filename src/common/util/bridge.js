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
            console.log(`Native.${fn} params${params}`)
            Native[fn](JSON.stringify(params))
            needCallback && eventListener.on(`Native.${fn}`, (res) => {
                alert(`Native.${fn} callback`)
                if (res) res = JSON.parse(res)
                resolve(res)
            })
        })
    }
}

export default Bridge