const Camera = require('../lib/camera');
const co = require('co');
const fs = require('fs');
const path = require('path');

const cam = new Camera();

co(function* () {
    console.log('Initialize cam');
    yield cam.init();

    const sensorInfo = yield cam.getSensorInfo();
    const maxImageSize = yield cam.getMaxImageSize(sensorInfo);

    console.log(yield cam.getImageFormats());
    console.log('AOI Supported', yield cam.getArbitraryAOISupported());
    console.log(yield cam.setSubSampling(cam.def.IS_GET_SUBSAMPLING));
    console.log(yield cam.setBinning(cam.def.IS_GET_BINNING));
    console.log(yield cam.aoiImageGetPos());
    console.log(yield cam.aoiImageGetSize());

    yield cam.exit();
}).catch((err) => {
    console.log(`Error: ${err}`);

    cam.exit().then(() => {
        process.exit();
    });
});
