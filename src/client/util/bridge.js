import {eventEmmiter} from "./eventEmmiter";

let Bridge = {
    android: function (event, params, needCallback = true) {
        return new Promise(resolve => {
            console.log(`invoke Android.event[${event}] with params: ${JSON.stringify(params)}`);
            if (!params) params = {};
            const callbackEvent = this.getCallbackEvent(event);
            if (needCallback) {
                eventEmmiter.once(callbackEvent, (res) => {
                    console.log(`callback Android.event[${callbackEvent}] with data: ${res}`);
                    if (res) res = JSON.parse(res);
                    resolve(res)
                })
            }
            let msg = JSON.stringify({
                method: event,
                data: params,
                callback: callbackEvent
            });
            console.log(`msg ${JSON.stringify(msg)}`);
            Android[event](msg);
        })
    },
    ios: function (event, params, needCallback = true) {
        return new Promise(resolve => {
            console.log(`invoke iOS.event[${event}] with params: ${JSON.stringify(params)}`);
            if (!params) params = {};
            // alert(`needCallback !== false ===> ${needCallback !== false}`)
            const callbackEvent = this.getCallbackEvent(event);
            if (needCallback) {
                eventEmmiter.once(callbackEvent, (res) => {
                    console.log(`callback iOS.event[${callbackEvent}] with data: ${res}`);
                    if (res) res = JSON.parse(res);
                    resolve(res)
                })
            }
            let msg = JSON.stringify({
                method: event,
                data: params,
                callback: callbackEvent
            });
            console.log(`msg ${JSON.stringify(msg)}`);
            webkit.messageHandlers.native.postMessage(msg)
        })
    },
    getCallbackEvent: function (event) {
        return event + '-' + new Date().getTime() + '-' + (Math.random() * 100).toFixed();
    }
};

export default Bridge