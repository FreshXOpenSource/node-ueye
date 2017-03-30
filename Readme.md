node-ueye
=========
Unoffical Node.js Binding (FFI-based) for uEye Camera-Library from [Imaging Development Systems GmbH](https://de.ids-imaging.com/home.html)

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
