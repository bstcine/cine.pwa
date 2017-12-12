function EventListener() {
    this._events = {}
    this.on = function (event, callback) {
        let callbacks = this._events[event] || [];
        callbacks.push(callback);
        this._events[event] = callbacks;
    }
    this.off = function (event) {
        delete this._events[event]
    }
    this.emit = function (event) {
        let callbacks = this._events[event]
        if (!callbacks || callbacks.length === 0) {
            throw new Error('no event listener found')
        }
        let args = [].slice.call(arguments, 1)
        callbacks.forEach(callback => {
            callback.apply(this, args)
        })
        this.off[event]
    }
}

if (typeof eventListener === 'undefined' || !window.eventListener) {
    window._cine_listener = new EventListener()
}

export const eventListener = window._cine_listener