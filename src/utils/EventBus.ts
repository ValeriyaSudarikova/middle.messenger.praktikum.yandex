class EventBus {
	/* eslint-disable */

	private readonly listeners: Record<string, Array<(event: any) => void>> = {}
	/* eslint-disable */


	on(event: string, callback: (oldProps?: any, newProps?:any) => void):void {

		if (!this.listeners[event]) {
			if (!this.listeners[event]) {
				this.listeners[event] = []
			}
			this.listeners[event].push(callback)
		}
	}

	off(event: string, callback: () => void):void {
		if (!this.listeners[event]) {
			throw new Error(`Не найдено события ${event}`)
		}
		this.listeners[event] = this.listeners[event].filter(listener => listener !== callback)
	}

	emit(event: string, ...args: any) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`)
		}
		this.listeners[event].forEach(function (listener) {
			listener.apply(null, args)
		})
	}
}

export default EventBus
