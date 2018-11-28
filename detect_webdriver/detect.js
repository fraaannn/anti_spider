// User-Agent Test
const userAgentElement = document.getElementById('user-agent');
userAgentElement.innerHTML = window.navigator.userAgent;
if (/HeadlessChrome/.test(window.navigator.userAgent)) {
    userAgentElement.classList.add('failed');
}

//Webdriver Test
const webdriverElement = document.getElementById('Webdriver');
webdriverElement.innerHTML = window.navigator.webdriver;
if (navigator.webdriver) {
    webdriverElement.classList.add('failed');
}

//Key Test
const KeyElement = document.getElementById('Key');
KeyElement.innerHTML = document.key;
if (document.key ==='$cdc_asdjflasutopfhvcZLmcfl_') {
    KeyElement.classList.add('failed');
}

// Chrome Test
const chromeElement = document.getElementById('chrome');
chromeElement.innerHTML = window.chrome.runtime;
if (!window.chrome.runtime) {
    chromeElement.innerHTML = 'none runtime'
    chromeElement.classList.add('failed');
}


//  Notification Test    //这个方法暂时保留
if ("Notification" in window) {
    const permissionsElement = document.getElementById('permissions-result');
    (async () => {
        const permissionStatus = await navigator.permissions.query({ name: 'notifications' });
        permissionsElement.innerHTML = permissionStatus.state + ' && '+Notification.permission;
        if(Notification.permission === 'denied' && permissionStatus.state === 'prompt') {
            permissionsElement.classList.add('failed');
        }
    })();
}


// Plugins Length Test
const pluginsLengthElement = document.getElementById('plugins-length');
pluginsLengthElement.innerHTML = navigator.plugins.length;
if (navigator.plugins.length === 0) {
    pluginsLengthElement.classList.add('failed');
}

//outerWidth Test
const outerWidthElement = document.getElementById('outerWidth');
outerWidthElement.innerHTML = window.outerWidth;
if (window.outerWidth === 800) {
    outerWidthElement.classList.add('failed');
}

// //outerHeight Test
const outerHeightElement = document.getElementById('outerHeight');
outerHeightElement.innerHTML = window.outerHeight;
if (window.outerHeight === 600) {
    outerHeightElement.classList.add('failed');
}

// //screen.width Test
const screenWidthElement = document.getElementById('screenWidth');
screenWidthElement.innerHTML = screen.width;
if (screen.width === 800) {
    screenWidthElement.classList.add('failed');
}

// //screen.height Test
const screenHeightElement = document.getElementById('screenHeight');
screenHeightElement.innerHTML = screen.height;
if (screen.height === 600) {
    screenHeightElement.classList.add('failed');
}

// innerWidth Test
const innerWidthElement = document.getElementById('innerWidth');
innerWidthElement.innerHTML = window.innerWidth;
if (window.innerWidth=== 800) {
    innerWidthElement.classList.add('failed');
}

// innerHeight Test
const innerHeightElement = document.getElementById('innerHeight');
innerHeightElement.innerHTML = window.innerHeight;
if (window.innerHeight=== 600) {
    innerHeightElement.classList.add('failed');
}


// Languages Test
const languagesElement = document.getElementById('languages');
languagesElement.innerHTML = navigator.languages;
if (!navigator.languages || navigator.languages.length === 0) {
    languagesElement.classList.add('failed');
}

//Test Chromiun PDF Plugin
const ChromiunPDFElement = document.getElementById('Chromiun-PDF');
ChromiunPDFElement.innerHTML = navigator.plugins["Chromium PDF Plugin"] ;
if (navigator.plugins["Chromium PDF Plugin"]) {
    ChromiunPDFElement.classList.add('failed');
}

// WebGL Tests
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl') || canvas.getContext('webgl-experimental');
if (gl) {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    // WebGL Vendor Test
    const webGLVendorElement = document.getElementById('webgl-vendor');
    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    webGLVendorElement.innerHTML = vendor;
    if (vendor === 'Brian Paul') {
        webGLVendorElement.classList.add('failed');
    }

    // WebGL Renderer Test
    const webGLRendererElement = document.getElementById('webgl-renderer');
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    webGLRendererElement.innerHTML = renderer;
    if (renderer === 'Mesa OffScreen') {
        webGLRendererElement.classList.add('failed');
    }
}


//private Test
const PrivateEvn = document.getElementById('Private-Evn');
function detectPrivateMode(cb) {
    var db,
        on = cb.bind(null, true),
        off = cb.bind(null, false)

    function tryls() {
        var isPrivate = false;
        try {
            window.openDatabase(null,null,null,null);
        } catch (e) {
            isPrivate = true;
        }
        isPrivate ? on() : off()
    }
    function errorIndexDb(event) {
        event.preventDefault()
        //raised with no InvalidStateError
        if (this.error && this.error.name === 'InvalidStateError') {
            on()
        } else {
            off()
        }
    }

    // Blink (chrome & opera)
    window.webkitRequestFileSystem ? webkitRequestFileSystem(0, 0, off, on)
        // FF
        //: "MozAppearance" in document.documentElement.style ? (db = indexedDB.open("test"), db.onerror = on, db.onsuccess = off)
        : "MozAppearance" in document.documentElement.style ? (db = indexedDB.open("test"), db.onerror = errorIndexDb, db.onsuccess =off)
        // Safari
        : /constructor/i.test(window.HTMLElement) || window.safari ? tryls()
            // IE10+ & edge
            : !window.indexedDB && (window.PointerEvent || window.MSPointerEvent) ? on()
                // Rest
                : off()
}


detectPrivateMode(function (isPrivateMode) {
    if (isPrivateMode) {
        PrivateEvn.innerHTML= 'private';
        PrivateEvn.classList.add('failed');
    }else{
        PrivateEvn.innerHTML= 'no private'
    }
})
