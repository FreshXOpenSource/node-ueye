node-ueye
=========
Unoffical Node.js Binding ([ffi](https://github.com/node-ffi/node-ffi)-based) for uEye Camera-Library from [Imaging Development Systems GmbH](https://de.ids-imaging.com/home.html)

**Notice**: This module requires nodejs 4+. The examples use the ES6/generator pattern to simplify the excessive async code. You can read more about this pattern [here](https://medium.com/javascript-scene/the-hidden-power-of-es6-generators-observable-async-flow-control-cfa4c7f31435). As wrapper we use the excellent [co](https://github.com/tj/co) library, but any generator/promise wrapper could be used. All async methods return a ES6 [Promise](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise)-object and you could also use the standard then/catch methodology.

synopsis
--------

``` js
const Camera = require('ueye');
const co = require('co');
const fs = require('fs');
const path = require('path');

const cam = new Camera();

co(function *() {
    console.log('Initialize cam');
    yield cam.init();
    console.log('Initialized');

    const sensorInfo = yield cam.getSensorInfo();
    const maxImageSize = yield cam.getMaxImageSize(sensorInfo);
    console.log('MaxImageSize', maxImageSize);
    
    yield cam.setColorMode(cam.def.IS_CM_BGR8_PACKED);
    
    yield cam.aoiImageSetSize(maxImageSize);
    yield cam.setDisplayMode(cam.def.IS_SET_DM_DIB);
    
    const seq = yield cam.allocImageMem(maxImageSize, 24);
    yield cam.setImageMem(seq);

    console.log('New framerate:', yield cam.setFrameRate(3));
    
    console.log('Start capturing');
    yield cam.freezeVideo(cam.def.IS_WAIT);

    console.log('Captured!');

    const res = yield cam.getImageMem();

    yield cam.imageFile({
        pwchFileName: path.join(__dirname, '../out/test.png'),
        nFileType: cam.def.IS_IMG_PNG,
        ppcImageMem: res.mem,
        pnImageID: res.id,
        nQuality: 0,
    })
    
    yield cam.exit();
}).catch((ex) => {
    console.error('Exception:', ex);

    cam.exit().then(()=>{
        process.exit();
    });
});
```

installation
------------

``` bash
  $ npm install ueye
```

ueye/sdl2
---------

You can test the live performance of your ueye camera with the liveSDL example located in the [examples](https://github.com/FreshXOpenSource/node-ueye/tree/master/examples) folder.

### installation

You need to install the [sdl2](https://www.libsdl.org/) system-libraries (including sdl2-image and sdl2-ttf) and the [node-sdl2](https://github.com/zetsin/node-sdl2) npm package.


``` bash
apt-get install libsdl2 libsdl2-image libsdl2-ttf # This may differ on your distro
npm install node-sdl2
node examples/liveSDL
```

bindings and defines
--------------------

The [ffi](https://github.com/node-ffi/node-ffi)-bindings are directly accessible via the binding attribute of the Camera class. For many library functions exist a convenient wrapper-function. If not, you can access the functions directly via the binding attribute.

Let's implement a call to the native [is_Saturation](https://en.ids-imaging.com/manuals/uEye_SDK/EN/uEye_Manual_4.82/index.html?is_saturation.html) function:

``` js
const Camera = require('ueye');
const ref = require('ref');

const cam = new Camera();

cam.init().then(() => {
    const saturation = ref.alloc('int', 0);
    const minSaturation = ref.alloc('int', 0);
    const maxSaturation = ref.alloc('int', 0);

    let nRet = cam.binding.is_Saturation (cam.hCam, cam.def.SATURATION_CMD_GET_VALUE, saturation, ref.sizeof.int);
    nRet = nRet || cam.binding.is_Saturation (cam.hCam, cam.def.SATURATION_CMD_GET_MIN_VALUE, minSaturation, ref.sizeof.int);
    nRet = nRet || cam.binding.is_Saturation (cam.hCam, cam.def.SATURATION_CMD_GET_MAX_VALUE, maxSaturation, ref.sizeof.int);

    console.log(`Saturation min/max/current (errcode): ${minSaturation.deref()}/${maxSaturation.deref()}/${saturation.deref()} (${nRet})`);

    cam.exit().then(() => {
    });
});
```

***Notice***: The is_Saturation calls here are called in a synchronous manner. To call async use the ffi-async way: `cam.binding.is_Saturation.async(...)`.
