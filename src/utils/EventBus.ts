class EventBus {
	private readonly listeners: Record<string, Array<() => void>> = {};

	on(event: string, callback: () => void):void {

		if (!this.listeners[event]) {
			if (!this.listeners[event]) {
				this.listeners[event] = [];
			}
			this.listeners[event].push(callback)
		}
	}

	off(event: string, callback: () => void):void {
		if (!this.listeners[event]) {
			throw new Error(`Не найдено события ${event}`);
		}
		this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
	}

	emit(event: string, ...args) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}
		this.listeners[event].forEach(function (listener) {
			// @ts-ignore
			listener(...args);
		});
	}
}

export default EventBus;
