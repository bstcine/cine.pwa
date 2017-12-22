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

export let setToken = (token) => {
    return set('token', token)
}

export let getToken = () => {
    return get('token')
}

export let removeToken = () => {
    return remove('token')
}
