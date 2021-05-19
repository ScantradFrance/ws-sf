const WebSocket = require('ws');
const EventEmitter = require('events');

class WsSf {

	#websocket_uri;

	constructor() {
		this.#websocket_uri = "ws://ldgr.fr:2006";
		this._reconnection_count = 0;
		this._ws = null;
		this._emitter = new EventEmitter();
		this.#connect();
	}

	onrelease(cb) {
		this._emitter.on('release', releases => {
			if (typeof cb !== "function") throw new Error("cb is not a function");
			cb(releases);
		});
	}

	#connect = () => {
		this._ws = new WebSocket(this.#websocket_uri);

		this._ws.onopen = () => { this._reconnection_count = 0 };

		this._ws.onmessage = res => { this._emitter.emit('release', res.data) };

		this._ws.onerror = () => {};

		this._ws.onclose = () => {
			this._ws = null;
			this._reconnection_count++;
			if (this._reconnection_count < 5) { console.log("Connection lost: Trying to reconnect in 10 seconds."); setTimeout(() => { this.#connect() }, 10000); }
			else throw new Error("Attempted to reconnect to server 5 times but failed.");
		};
	}

}

module.exports = WsSf;
