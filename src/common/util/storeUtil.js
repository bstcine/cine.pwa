import store from 'store'

export let set = (key, data) => {
    return store.set(key, data)
}

export let get = (key) => {
    return store.get(key)
}

export let remove = (key) => {
    return store.remove(key)
}
