# ws-sf: a scantradfrance websocket

ws-sf is a websocket module to get last chapters releases by the team [ScantradFrance](https://scantrad.net).

## Installing

```
npm install ws-sf
```

## How to use

```js
const WsSf = require('ws-sf');

// connect to the websocket
const wssf = new WsSf();

// get new chapters in real-time
wssf.onrelease(chapters => {
	console.log(chapters);
});

```
## Class: WsSf

This class represents a WebSocket server. It extends the `EventEmitter`.

### new WsSf()
- `Returns`: {Object} An instance of the class.

Create a new websocket instance connected to the API.

### websocket.onmessage(cb)
- `Params`: {Function} A callback function.

Bind a callback function to handle new chapters datas.

## Changelog

I am using the GitHub [releases](https://github.com/Dastan21/ws-sf/releases) for changelog entries.

## License

[ALV](LICENSE)
