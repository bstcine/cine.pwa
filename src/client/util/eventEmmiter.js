class EventEmmiter {
    _events = {};

    on(event, listener) {
        this.addListener(event, listener, false);
    }

    once(event, listener) {
        this.addListener(event, listener, true);
    }

    emit(event, ...args) {
        if (!event) throw new Error('event cannot be null');
        // alert(`emit event[${event}]`)
        let listenerObjs = this._events[event];
        if (!listenerObjs || listenerObjs.length === 0) {
            throw new Error(`no event[${event}] listener found`);
        }
        listenerObjs.forEach(listenerObj => {
            const { listener, once } = listenerObj;
            if (once) this.removeListener(event, listener);
            listener(...args);
        });
    }

    addListener(event, listener, once = false) {
        if (!event) return;
        // alert(`add event[${event}]`)
        let listenerObjs = this._events[event] || [];
        listenerObjs.push({
            listener,
            once
        });
        this._events[event] = listenerObjs;
    }

    removeListener(event, listener) {
        let listenerObjs = this._events[event];
        let index = null;
        for (let i = 0; i < listener.length; i++) {
            if (listenerObjs[i].listener === listener) {
                index = i;
                break;
            }
        }
        if (index === null) {
            throw new Error('no match listener found');
        }
        listenerObjs.splice(index, 1);
        if (!listenerObjs.length) delete this._events[event];
    }

    remveAllListener(event) {
        delete this._events[event];
    }
}

if (typeof _cine_listener === 'undefined' || !window._cine_listener) {
    window._cine_listener = new EventEmmiter();
}

export const eventEmmiter = window._cine_listener;
