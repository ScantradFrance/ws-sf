import WebSocket from 'ws'
import EventEmitter from 'node:events'

const timeouts = [1, 5, 15, 30, 60]

/**
 * Manga type.
 * @typedef {Object} Manga
 * @property {string} id
 * @property {string} name
 * @property {string} thumbnail
 *
 * Chapter type.
 * @typedef {Object} Chapter
 * @property {Manga} manga
 * @property {string} title
 * @property {number} number
 */

/**
 * ScantradFrance WebSocket class.
 */
class WsSf {
	#reconnection_count = 0
	#websocket_uri = null
	#ws = null
	#emitter = null

	/**
	 * Connect to the server.
	 * @param {string} uri server URI 
	 */
	constructor(uri) {
		if (uri == null || uri === '') throw new Error('Server URI is required')
		this.#websocket_uri = uri
		this.#emitter = new EventEmitter()
	}

	/**
	 * Emitted when a chapter is released.
	 * @param {(releases: Chapter) => void} cb callback function 
	 */
	onrelease(cb) {
		this.#emitter.on('release', releases => {
			if (typeof cb !== 'function') throw new Error('cb is not a function')
			cb(releases)
		})
	}

	connect() {
		console.log(this.#websocket_uri)
		this.#ws = new WebSocket(this.#websocket_uri)

		this.#ws.onopen = () => { this.#reconnection_count = 0 }

		this.#ws.onmessage = res => { this.#emitter.emit('release', res.data) }

		this.#ws.onerror = () => { }

		this.#ws.onclose = () => {
			this.#ws = null
			this.#reconnection_count++
			if (this.#reconnection_count < timeouts.length) {
				const time = timeouts[this.#reconnection_count - 1]
				console.log(`Connection lost: Trying to reconnect in ${time} second${time > 1 ? 's' : ''}.`)
				setTimeout(this.connect, 10000)
			} else throw new Error('Attempted to reconnect to server 5 times but failed.')
		}
	}
}

export { WsSf }
export default WsSf