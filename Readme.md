node-ueye
=========
Unoffical Node.js Binding for uEye Camera-Library from [Imaging Development Systems GmbH](https://de.ids-imaging.com/home.html)

synopsis
--------

``` js
const ueye = require('ueye');
const path = require('path');

ueye.acquirePNG(path.resolve('./test.png'), (err) => {
    if(err) {
        console.log(`Error while acquiring image: ${err}`);
    } else {
        console.log('Image stored to ./test.png');
    }
});
```

installation
------------

``` bash
  $ npm install ueye
```
