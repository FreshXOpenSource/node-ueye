const ueye = require('../index');
const path = require('path');
const async = require('async');

return ueye.initalize((err, cam) => {
    // TODO: Error handling here
    return async.series([
        (callback) => {
            return ueye.acquirePNG(cam, path.resolve('./test.png'), (err) => {
                if(err) {
                    console.log(`Error while acquiring image: ${err}`);
                } else {
                    console.log('Image stored to ./test.png');
                }
                
                return callback();
            });
        },
        (callback) => {
            return ueye.acquireJPG(cam, path.resolve('./test.jpg'), (err) => {
                if(err) {
                    console.log(`Error while acquiring image: ${err}`);
                } else {
                    console.log('Image stored to ./test.jpg');
                }

                return callback();
            });
        },
        (callback) => {
            ueye.acquireBGR(cam, path.resolve('./test.bgr'), (err) => {
                if(err) {
                    console.log(`Error while acquiring image: ${err}`);
                } else {
                    console.log('Image stored to ./test.bgr');
                }

                return callback();
            });
        }
    ], (err) => {
        // TODO: Error handling here
        ueye.destroy(cam, () => {
            console.log('done');
        });
    });
});
