import { eventEmmiter } from './eventEmmiter';
import siteCodeUtil from '@/util/sitecodeUtil';

let Bridge = {
    ios: function(event, params, needCallback = true) {
        return new Promise(resolve => {
            console.log(
                `invoke iOS.event[${event}] with params: ${JSON.stringify(
                    params
                )}`
            );
            if (!params) params = {};
            const callbackEvent = this.getCallbackEvent(event);
            if (needCallback) {
                eventEmmiter.once(callbackEvent, res => {
                    console.log(
                        `callback iOS.event[${callbackEvent}] with data: ${res}`
                    );
                    if (res && typeof res === 'string') res = JSON.parse(res);
                    resolve(res);
                });
            }
            let msg = JSON.stringify({
                method: event,
                data: params,
                callback: callbackEvent,
            });
            console.log(`send iOS msg ${JSON.stringify(msg)}`);
            webkit.messageHandlers.native.postMessage(msg);
        });
    },

    android: function(event, params, needCallback = true) {
        return new Promise(resolve => {
            console.log(
                `invoke Android.event[${event}] with params: ${JSON.stringify(
                    params
                )}`
            );
            if (!params) params = {};
            const callbackEvent = this.getCallbackEvent(event);
            if (needCallback) {
                eventEmmiter.once(callbackEvent, res => {
                    console.log(
                        `callback Android.event[${callbackEvent}] with data: ${res}`
                    );
                    if (res && typeof res === 'string') res = JSON.parse(res);
                    resolve(res);
                });
            }
            let msg = JSON.stringify({
                method: event,
                data: params,
                callback: callbackEvent,
            });
            console.log(`send Android msg ${JSON.stringify(msg)}`);
            Android[event](msg);
        });
    },

    common: function(event, params, needCallback = true) {
        if (siteCodeUtil.inIOSAPP()) {
            return Bridge.ios(event, params, needCallback);
        } else {
            return Bridge.android(event, params, needCallback);
        }
    },

    getCallbackEvent: function(event) {
        return (
            event +
            '-' +
            new Date().getTime() +
            '-' +
            (Math.random() * 100).toFixed()
        );
    },
};

export default Bridge;
