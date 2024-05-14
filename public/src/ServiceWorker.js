self.addEventListener("install", (e) =>{
    console.log("Installed", e);
    e.waitUntil(
        caches.open(Static_Cache)
        .then((cache) =>{
            cache.addAll([ //Cache Multiple Files with addAll()
                "/",
                "/index.html",
                "/manifest.json",

                "/js/jquery-3.5.1.min.js",
                "/js/script.js",

                "/css/style.css",

                "/images/logo.svg",
                "images/search.svg",

                "/fonts/product_sans_bold-webfont.woff2",
                "/fonts/product_sans_bold-webfont.woff",
                "/fonts/product_sans_regular-webfont.woff2",
                "/fonts/product_sans_regular-webfont.woff",

                "https://traveller.talrop.works/api/v1/places/",
                "https://traveller.talrop.works/api/v1/places/categories/",
            ])
        })
    )
});

self.addEventListener("activate", (e) =>{
    console.log("Activated", e);
    e.waitUntil(
        caches.keys() //Adding Cache Versioning>>>>>>
        .then((keyList) =>{
            return Promise.all(
                keyList.map((key) =>{
                    if (key !== Static_Cache && key !== Dynamic_Cache){
                        console.log(key)
                        return caches.delete(key)
                    }
                })
            )
        })
    )
    return self.clients.claim();
});

//Event Listeners>>>>>>>>

self.addEventListener("fetch", (e) =>{
    e.respondWith(
        caches.match(e.request, {ignoreMethod: true})
        .then((response) =>{
            if(response){
                return response;
            }
            else{
                return fetch(e.request)
                .then((res) =>{
                    return caches.open(Dynamic_Cache) //Implementing dynamic caching>>>>>
                    .then((cache) =>{
                        cache.put(e.request.url, res.clone())
                        return res
                    })
                })
            }
        })
    )
})

//Fetch the request | Getting that "App Install Banner">>>>>

const Static_Cache = "static-v2"
const Dynamic_Cache = "dynamic-v2"