const ueye = require('../index');
const path = require('path');

ueye.acquirePNG(path.resolve('./test.png'), (err) => {
    if(err) {
        console.log(`Error while acquiring image: ${err}`);
    } else {
        console.log('Image stored to ./test.png');
    }
});
