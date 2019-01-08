import { interEventEmitter } from './interEventEmitter';
import interSiteCodeUtil from './interSiteCodeUtil';

let Bridge = {
    ios: function(event, _params, needCallback = true) {
        return new Promise(resolve => {
            console.log(
                `invoke iOS.event[${event}] with params: ${JSON.stringify(
                    _params
                )}`
            );
            let params = _params || {};
            const callbackEvent = this.getCallbackEvent(event);
            if (needCallback) {
                interEventEmitter.once(callbackEvent, _res => {
                    console.log(
                        `callback iOS.event[${callbackEvent}] with data: ${_res}`
                    );
                    let res =
                        _res && typeof _res === 'string'
                            ? JSON.parse(_res)
                            : _res;
                    resolve(res);
                });
            }
            let msg = JSON.stringify({
                method: event,
                data: params,
                callback: callbackEvent,
            });
            console.log(`send iOS msg ${JSON.stringify(msg)}`);
            if ('webkit' in window) {
                window.webkit.messageHandlers.native.postMessage(msg);
            } else {
                console.log('window.webkit is undefined');
            }
        });
    },

    android: function(event, _params, needCallback = true) {
        return new Promise(resolve => {
            console.log(
                `invoke Android.event[${event}] with params: ${JSON.stringify(
                    _params
                )}`
            );
            let params = _params || {};
            const callbackEvent = this.getCallbackEvent(event);
            if (needCallback) {
                interEventEmitter.once(callbackEvent, _res => {
                    console.log(
                        `callback Android.event[${callbackEvent}] with data: ${_res}`
                    );
                    let res =
                        _res && typeof _res === 'string'
                            ? JSON.parse(_res)
                            : _res;
                    resolve(res);
                });
            }
            let msg = JSON.stringify({
                method: event,
                data: params,
                callback: callbackEvent,
            });
            console.log(`send Android msg ${JSON.stringify(msg)}`);
            if ('Android' in window) {
                window.Android[event](msg);
            } else {
                console.log('window.Android is undefined');
            }
        });
    },

    common: function(event, params, needCallback = true) {
        if (interSiteCodeUtil.inIOSAPP()) {
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
