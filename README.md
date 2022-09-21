# ws-sf: a scantradfrance websocket
ws-sf is a websocket module to get last chapters releases by the team [ScantradFrance](https://scantrad.net).

## Installing
```
npm install ws-sf

yarn add ws-sf
```

## Usage
```js
const WsSf = require('ws-sf') // commonjs
import WsSf from 'ws-sf'

// connect to the websocket
const wssf = new WsSf('ws://localhost:3000')
wssf.connect()

// get new chapters in real-time
wssf.onrelease(release => {
  console.log(release)
});

```

## Release object
```js
{
  manga: {
    id [string]      // manga id
    name [string]    // manga name
    thumbnail [url]  // manga thumbnail
  }, 
  title [string]     // chapter title
  number [number]    // chapter number
}
```

## License
[ALV](LICENSE)
