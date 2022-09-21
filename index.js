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
	/**
	 * Connect to the server.
	 * @param {string} uri server URI 
	 */
	constructor(uri) {
		if (uri == null || uri === '') throw new Error('Server URI is required')
		this.#websocket_uri = uri
		this.#reconnection_count = 0
		this.#ws = null
		this.#emitter = new EventEmitter()
		this.#connect()
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

	#connect() {
		this.#ws = new WebSocket(this.#websocket_uri)

		this.#ws.onopen = () => { this.#reconnection_count = 0 }

		this.#ws.onmessage = res => { this.#emitter.emit('release', res.data) }

		this.#ws.onerror = () => { }

		this.#ws.onclose = () => {
			this.#ws = null
			this.#reconnection_count++
			if (this.#reconnection_count < timeouts.length) {
				console.log(`Connection lost: Trying to reconnect in ${timeouts[this.#reconnection_count]} seconds.`)
				setTimeout(this.#connect, 10000)
			} else throw new Error('Attempted to reconnect to server 5 times but failed.')
		}
	}
}

export { WsSf }
export default WsSf