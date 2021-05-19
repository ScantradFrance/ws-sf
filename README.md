# ws-sf: a scantradfrance websocket

ws-sf is a websocket module to get last chapters releases by the team [ScantradFrance](https://scantrad.net).

## Installing

```
npm install ws-sf
```

## Usage

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
The function has one parameter, an object of the new chapter (string):
```js
{
	manga: {
		id [string] 		// manga id
		name [string] 		// manga name
		thumbnail [url] 	// manga thumbnail
	}, 
	title [string] 			// chapter title
	number [number]			// chapter number
}
```

## Changelog

See [releases](https://github.com/Dastan21/ws-sf/releases) for changelog entries.

## License

[ALV](LICENSE)
