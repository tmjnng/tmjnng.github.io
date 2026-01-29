// MathGrade Service Worker
// 提供离线缓存功能

const CACHE_NAME = 'mathgrade-v1';
const STATIC_ASSETS = [
    './',
    './index.html',
    './shared/styles/global.css',
    './shared/styles/grade-themes.css',
    './shared/core/GradeApp.js',
    './shared/core/KnowledgeGraph.js',
    './shared/core/QuestionGenerator.js',
    './shared/core/ProgressTracker.js',
    './shared/ui/TreeNavigator.js',
    './shared/ui/FormulaRenderer.js',
    './shared/ui/CanvasBoard.js',
    './shared/ui/Breadcrumb.js',
    './shared/ui/ExercisePanel.js',
    './shared/utils/storage.js',
    './shared/utils/grade-detector.js',
    './shared/utils/mathEval.js',
    // CDN资源
    'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
    'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.mjs'
];

// 安装时缓存静态资源
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('MathGrade: 缓存静态资源');
                return cache.addAll(STATIC_ASSETS);
            })
            .catch((err) => {
                console.error('MathGrade: 缓存失败', err);
            })
    );
    self.skipWaiting();
});

// 激活时清理旧缓存
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// 拦截请求，优先从缓存获取
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // 跳过非GET请求
    if (request.method !== 'GET') {
        return;
    }

    // 策略：缓存优先，网络回退
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // 返回缓存，同时更新缓存
                    fetchAndCache(request);
                    return cachedResponse;
                }

                // 缓存未命中，从网络获取
                return fetchAndCache(request);
            })
            .catch(() => {
                // 网络失败，返回离线页面
                if (request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
                return new Response('离线模式 - 资源不可用', {
                    status: 503,
                    statusText: 'Service Unavailable'
                });
            })
    );
});

// 获取并缓存资源
async function fetchAndCache(request) {
    try {
        const networkResponse = await fetch(request);
        
        // 只缓存成功的响应
        if (networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        throw error;
    }
}

// 后台同步（用于保存学习进度）
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-progress') {
        event.waitUntil(syncProgress());
    }
});

async function syncProgress() {
    // 可以在这里添加与服务器同步的逻辑
    console.log('MathGrade: 同步学习进度');
}

// 推送通知（可选功能）
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : '继续你的数学学习吧！',
        icon: './assets/icon-192.png',
        badge: './assets/icon-72.png',
        tag: 'mathgrade-reminder',
        requireInteraction: false
    };

    event.waitUntil(
        self.registration.showNotification('MathGrade', options)
    );
});
