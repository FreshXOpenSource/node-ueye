const ueye = require('../index');

const async = require('async');

const cam = new ueye.Camera();
let imageSize;

return async.series([
    callback => cam.initCamera(callback),
    callback => cam.getMaxImageSize((err, _imageSize) => {
        imageSize = _imageSize;
        return callback(err, _imageSize);
    }),
    callback => cam.setColorMode(ueye.IS_CM_BGR8_PACKED, callback), 
    callback => cam.allocSequence({ length: 1, bitsPerPixel: 24, }, callback),
    callback => cam.setImageMem(0, callback),
    callback => cam.aoiImageSetSize(imageSize, callback),
    callback => cam.setDisplayMode(ueye.IS_SET_DM_DIB, callback), 
    callback => cam.freezeVideo(ueye.IS_WAIT, callback), 
], (err, results) => {
    return cam.getActiveImageMem((err, res) => {
        return require('fs').writeFile('./out/test.bgr', res.buffer, (err) => {
            console.log(`Image saved to ./test.bgr. Error:`, err);

            cam.exitCamera((err) => {});
        });
    });
});
