const ueye = require('../index');
const async = require('async');

exports.initalize = function(callback) {
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
    ], (err) => {
        return callback(err, cam);
    })
};

exports.destroy = function(cam, callback) {
    cam.exitCamera(callback);
};

exports.acquirePNG = function(cam, path, callback) {
    return cam.freezeVideo(ueye.IS_WAIT, (err) => {
        return cam.saveToFile({
            path: path,
            sequence: 0,
            fileType: ueye.IS_IMG_BMP,
        }, callback);
    });
};

exports.acquireJPG = function(cam, path, callback) {
    return cam.freezeVideo(ueye.IS_WAIT, (err) => {
        return cam.saveToFile({
            path: path,
            sequence: 0,
            fileType: ueye.IS_IMG_JPG,
        }, callback);
    });
};

exports.acquireBGR = function(cam, path, callback) {
    return cam.freezeVideo(ueye.IS_WAIT, (err) => {
        return cam.getActiveImageMem((err, res) => {
            return require('fs').writeFile(path, res.buffer, callback);
        });
    });
};
