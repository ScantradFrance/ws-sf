const WebSocket = require('ws');
const EventEmitter = require('events');

class WsSf {

	#websocket_uri;

	constructor() {
		// this.#websocket_uri = "ws://ldgr.fr:2006";
		this.#websocket_uri = "ws://localhost:9484";
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

		this._ws.onmessage = res => {
			let data = res.data;
			try { data = JSON.parse(data); }
			catch (e) { console.error(e) }
			data.chapters.reverse();
			data.mangas.reverse();
			let releases = [];
			for (let i = 0; i < data.chapters.length; i++) {
				releases.push({
					id: data.mangas[i].id,
					name: data.mangas[i].name,
					number: data.chapters[i].number
				});
			}
			this._emitter.emit('release', releases);
		};

		this._ws.onerror = () => {};

		this._ws.onclose = () => {
			this._ws = null;
			this._reconnection_count++;
			if (this._reconnection_count < 5) { console.log("Connection lost: Trying to reconnect in 5 seconds."); setTimeout(() => { this.#connect() }, 5000); }
			else throw new Error("Attempted to reconnect to server 5 times but failed.");
		};
	}

}

module.exports = WsSf;
