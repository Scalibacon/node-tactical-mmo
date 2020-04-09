let resourceCache = {};
let readyCallbacks = [];

// Load an image url or an array of image urls
function load(urlOrArr) {
    if(urlOrArr instanceof Array) {
        urlOrArr.forEach(function(url) {
            loadImage(url);
        });
    }
    else {
        loadImage(urlOrArr);
    }
}

function loadImage(url) {
    if(resourceCache[url]) {
        return resourceCache[url];
    }
    
    const img = new Image();  
    img.src = url;    
    resourceCache[url] = false;    
    
    img.onload = function() {
        resourceCache[url] = img;

        if(isReady()) {
            readyCallbacks.forEach( func =>  func() );
        }
    };
}

function get(url) {
    return resourceCache[url];
}

function isReady() {
    let ready = true;
    for(let i in resourceCache) {
        if(resourceCache.hasOwnProperty(i) && !resourceCache[i]) {
            ready = false;
        }
    }
    return ready;
}

function onReady(func) {
    readyCallbacks.push(func);
}

export {
    load,
    get,
    onReady,
    isReady
}