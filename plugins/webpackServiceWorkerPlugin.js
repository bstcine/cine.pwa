const path = require('path');
const fs = require('fs');
const getTime = () => {
    let date = new Date();
    let str =
        String(date.getFullYear()) +
        prefixZero(date.getMonth() + 1) +
        prefixZero(date.getDate()) +
        prefixZero(date.getHours()) +
        prefixZero(date.getMinutes()) +
        prefixZero(date.getSeconds());
    return str;
};

const prefixZero = num => (num > 10 ? num : '0' + num);

function ServiceWorkerPlugin(options) {
    const defaultOptions = {
        name: 'service-worker.js',
        path: path.join(__dirname, 'build/'),
    };
    this.options = Object.assign({}, defaultOptions, options);
}

ServiceWorkerPlugin.prototype.apply = function(compiler) {
    compiler.hooks.done.tap('ServiceWorkerPlugin', () => {
        fs.writeFileSync(
            path.resolve(this.options.path, this.options.name),
            this.generate(getTime()),
            'utf-8'
        );
    });
};

ServiceWorkerPlugin.prototype.generate = function(version) {
    return `const OFFLINE_CACHE_PREFIX = 'progressive_cache_';
const CACHE_VERSION = '${version}';
const OFFLINE_CACHE_NAME = OFFLINE_CACHE_PREFIX + CACHE_VERSION;
self.addEventListener('install', function(event) {
    console.log('[ServiceWorker] Install');
    // event.waitUntil(
    //     caches.open(cacheName).then(function(cache) {
    //         console.log('[ServiceWorker] Caching app shell');
    //         return cache.addAll(filesToCache);
    //     })
    // );
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        Promise.all([
            // 更新客户端
            self.clients.claim(),

            // 清理旧版本
            caches.keys().then(function(cacheList) {
                return Promise.all(
                    cacheList.map(function(cacheName) {
                        if (cacheName !== OFFLINE_CACHE_NAME) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
        ])
    );
});

self.addEventListener('fetch', function(event) {
    console.log('[Service Worker] Fetch', event.request.url);
    if (event.request.method === 'GET') {
        // caches.match(event.request).then(function(response) {
            //     // 来来来，代理可以搞一些代理的事情

            //     // 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
            //     if (response) {
            //         return response;
            //     }

            //     // 如果 service worker 没有返回，那就得直接请求真实远程服务
            //     let request = event.request.clone(); // 把原始请求拷过来
                // return fetch(request).then(function(httpRes) {
                //     // http请求的返回已被抓到，可以处置了。

                //     // 请求失败了，直接返回失败的结果就好了。。
                //     if (!httpRes || httpRes.status !== 200) {
                //         return httpRes;
                //     }

                //     // 请求成功的话，将请求缓存起来。
                //     let responseClone = httpRes.clone();
                //     caches.open(OFFLINE_CACHE_NAME).then(function(cache) {
                //         cache.put(event.request, responseClone);
                //     });

                //     return httpRes;
                // });
            // })
        event.respondWith(
            fetch(event.request).then(function(httpRes) {
                if (!httpRes || httpRes.status !== 200) {
                    return httpRes;
                }

                let responseClone = httpRes.clone();
                caches.open(OFFLINE_CACHE_NAME).then(function(cache) {
                    cache.put(event.request, responseClone);
                });

                return httpRes;
            }).catch(function() {
                return caches.match(event.request)
            })
        );
    }
});`;
};

module.exports = ServiceWorkerPlugin;
