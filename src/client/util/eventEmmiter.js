class EventEmmiter {

    _events = {};

    on(event, callback) {
        let callbacks = this._events[event] || [];
        callbacks.push(callback);
        this._events[event] = callbacks;
    }

    once(event, callback) {
        this.on(event, () => {
            this.off(event);
            callback()
        })
    }

    off(event) {
        delete this._events[event]
    }

    emit(event) {
        let callbacks = this._events[event];
        if (!callbacks || callbacks.length === 0) {
            throw new Error('no event listener found')
        }
        let args = [].slice.call(arguments, 1);
        callbacks.forEach(callback => {
            callback.apply(this, args)
        });
    }

}

if (typeof _cine_listener === 'undefined' || !window._cine_listener) {
    window._cine_listener = new EventEmmiter()
}

export const eventEmmiter = window._cine_listener;