var n=["/iinsight/","/iinsight/index.html","/iinsight/apple-touch-icon.png","/iinsight/logo-192.png","/iinsight/logo-512.png","/iinsight/favicon-16x16.png","/iinsight/favicon-32x32.png"];self.addEventListener("fetch",(function(n){console.log("fetch request : "+n.request.url),n.respondWith(caches.match(n.request).then((function(i){return i?(console.log("responding with cache : "+n.request.url),i):(console.log("file is not cached, fetching : "+n.request.url),fetch(n.request))})))})),self.addEventListener("install",(function(i){i.waitUntil(caches.open("iinsight_v07").then((function(i){return console.log("installing cache : iinsight_v07"),i.addAll(n)})))})),self.addEventListener("activate",(function(n){n.waitUntil(caches.keys().then((function(n){var i=n.filter((function(n){return n.indexOf("iinsight_")}));return i.push("iinsight_v07"),Promise.all(n.map((function(e,t){if(-1===i.indexOf(e))return console.log("deleting cache : "+n[t]),caches.delete(n[t])})))})))}));