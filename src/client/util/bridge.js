import {eventEmmiter} from "./eventEmmiter";

let Bridge = {
    android: function (event, params, needCallback = true) {
        return new Promise(resolve => {
            console.log(`Android.${fn} params ${params}`);
            if (!params) params = {};
            const callbackEvent = this.getCallbackEvent(event)
            if (needCallback) {
                eventEmmiter.once(callbackEvent, (res) => {
                    // alert(`Android.${fn} callback`)
                    if (res) res = JSON.parse(res);
                    resolve(res)
                })
            }
            let msg = JSON.stringify({
                method: event,
                data: params,
                callback: callbackEvent
            });
            // alert(`msg ${JSON.stringify(msg)}`)
            Android[event](msg);
        })
    },
    ios: function (event, params, needCallback = true) {
        return new Promise(resolve => {
            console.log(`iOS.${event} params ${params}`);
            if (!params) params = {};
            // alert(`needCallback !== false ===> ${needCallback !== false}`)
            const callbackEvent = this.getCallbackEvent(event)
            if (needCallback) {
                eventEmmiter.once(callbackEvent, (res) => {
                    alert(`iOS.${res} callback`)
                    if (res) res = JSON.parse(res);
                    resolve(res)
                })
            }
            let msg = JSON.stringify({
                method: event,
                data: params,
                callback: callbackEvent
            });
            // alert(`msg ${JSON.stringify(msg)}`)
            webkit.messageHandlers.native.postMessage(msg)
        })
    },
    getCallbackEvent: function (event) {
        return event + '-' + new Date().getTime() + '-' + (Math.random() * 100).toFixed();
    }
};

export default Bridge