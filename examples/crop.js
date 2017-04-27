const Camera = require('../lib/camera');
const co = require('co');
const fs = require('fs');
const path = require('path');

const cam = new Camera();

co(function* () {
    console.log('Initialize cam');
    yield cam.init();

    const sensorInfo = yield cam.getSensorInfo();
    yield cam.setImageFormat(4);
    const maxImageSize = yield cam.getMaxImageSize(sensorInfo);

    // yield cam.setColorMode(cam.def.IS_CM_BGR8_PACKED);
    yield cam.setColorMode(cam.def.IS_CM_MONO8);

    yield cam.aoiImageSetSize(maxImageSize);
    yield cam.setDisplayMode(cam.def.IS_SET_DM_DIB);
    yield cam.setFrameRate(6);

    for (let i = 0; i < 10; i++) {
        // const seq = yield cam.allocImageMem(maxImageSize, 24);
        const seq = yield cam.allocImageMem(maxImageSize, 8);
        yield cam.addToSequence(seq);
    }

    console.log('Start capturing');
    yield cam.captureVideo(cam.def.IS_WAIT);
    console.log('Capture video');

    yield cam.enableEvent(cam.def.IS_SET_EVENT_FRAME);

    yield cam.nextImage((res, done) => {
        const x0 = 1020;
        const y0 = 810;
        const h = 480;
        const w = 800;

        const target = Buffer.alloc(h * w);

        let offset = 0;

        const ts = +new Date();

        for(let pos = maxImageSize.s32Width * y0 + x0; pos < maxImageSize.s32Width * (y0 + h) + w; pos += maxImageSize.s32Width) {
            res.pixels.copy(target, offset, pos, pos + w);
            offset += w;
        }

        console.log((+new Date() - ts)/1000);

        console.log('Image stored to out/test.gray');
        fs.writeFileSync(path.join(__dirname, '../out/test.gray'), target);

        return done();
    });

    yield cam.exit();
}).catch((err) => {
    console.log(`Error: ${err}`);

    cam.exit().then(() => {
        process.exit();
    });
});
