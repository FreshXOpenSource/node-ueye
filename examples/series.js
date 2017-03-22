const ueye = require('../index');
const async = require('async');
const path = require('path');

const cam = new ueye.Camera();
let imageSize;
let exposure;
let focus;

const log = function (method, callback) {
    return (err, result) => {
        if(err) {
            console.log(`${method} failed:`, err);
        } else {
            console.log(`${method} ok:`, result);
        }

        return callback(err, result);
    };
};

return async.series([
    callback => cam.initCamera(log('initCamera', callback)),
    callback => cam.getMaxImageSize((err, _imageSize) => {
        imageSize = _imageSize;

        return log('getMaxImageSize', callback)(err, _imageSize);
    }),
    callback => cam.setColorMode(ueye.IS_CM_BGR8_PACKED, log('setColorMode', callback)),
    callback => cam.allocSequence({
        length: 10,
        bitsPerPixel: 24,
    }, log('allocSequence', callback)),
    callback => cam.aoiImageSetSize(imageSize, log('aoiImageSetSize', callback)),
    callback => cam.setDisplayMode(ueye.IS_SET_DM_DIB, log('setDisplayMode', callback)),
    callback => cam.setFrameRate(3, log('setFrameRate', callback)),
    callback => cam.getManualFocus((err, _focus) => {
        focus = _focus;

        return log('getManualFocus', callback)(err, _focus);
    }),
    callback => cam.getExposureRange((err, _exposure) => {
        exposure = _exposure;

        return log('getExposureRange', callback)(err, _exposure);
    }),
    callback => cam.fullManualMode(log('fullManualMode', callback)),
    // callback => cam.setFocus(focus.value, log('setFocus', callback)),
    callback => cam.captureVideo(ueye.IS_WAIT, log('captureVideo', callback)),
    callback => cam.enableEvent(ueye.IS_SET_EVENT_FRAME, log('enableEvent', callback)),
], (err, results) => {
    if (err) {
        if(results[0]) {
            return cam.exitCamera((err) => {
                console.log('End with error');
                process.exit();
            });
        } else {
            process.exit();
        }
    }

    const LENGTH = 30;
    const expStep = (300 - exposure.min) / LENGTH;
    let count = 0;
    let exp = exposure.min;

    return async.whilst(
        () => count < LENGTH,
        callback => {
            count += 1;
            // exp += expStep;

            const file = path.join('.', 'out', `test-${count}.bmp`);

            console.log(`Save to file ${file}`);

            return async.auto({
                exposure: callback => cam.setExposure(exp, log('setExposure', callback)),
                wait: ['exposure', callback => cam.waitEvent(ueye.IS_SET_EVENT_FRAME, 5000, log('waitEvent', callback))],
                sequence: ['wait', callback => cam.getCurrentSequence(log('getCurrentSequence', callback))],
                lock: ['sequence', (callback, res) => cam.lockSeqBuf(res.sequence, log('lockSeqBuf', callback))],
                saveToFile: ['lock', (callback, res) => cam.saveToFile({
                    path: file,
                    sequence: res.sequence,
                    fileType: ueye.IS_IMG_BMP,
                }, log('saveToFile', callback))],
                unlock: ['saveToFile', (callback, res) => cam.unlockSeqBuf(res.sequence, log('unlockSeqBuf', callback))],
            }, callback);

        }, (err) => {
            console.log(`Saved ${count} images. Error:`, err);

            cam.exitCamera((err, cnt) => {
            });
        }
    );
});
