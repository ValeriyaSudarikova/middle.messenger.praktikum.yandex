import EventBus from "./EventBus";

export enum WSTransportEvents {
    connected = "connected",
    error = "error",
    message = "message",
    close = "close"
}

export default class WSTransport extends EventBus {
	private socket: WebSocket | null = null
	private pingInterval: any = 0

	constructor(private url: string) {
		super()
	}

	public send(data: unknown) {
		if (!this.socket) {
			throw new Error('Socket is not connected');
		}

		this.socket.send(JSON.stringify(data))
	}

	public connect(): Promise<void> {
		this.socket = new WebSocket(this.url);

		this.subscribe(this.socket);

		this.setupPing();

		return new Promise((resolve) => {
			this.on(WSTransportEvents.connected, () => {
				resolve();
			});
		});
	}

	public close() {
		this.socket?.close()
	}

	private setupPing() {
		this.pingInterval = setInterval(() => {
			this.send({ type: 'ping' });
		}, 5000)

		this.on(WSTransportEvents.close, () => {
			clearInterval(this.pingInterval);

			this.pingInterval = 0;
		})
	}

	private subscribe(socket: WebSocket) {
		socket.addEventListener('open', () => {
			this.emit(WSTransportEvents.connected)
		});
		socket.addEventListener('close', () => {
			this.emit(WSTransportEvents.close)
		});

		socket.addEventListener('error', (e) => {
			this.emit(WSTransportEvents.error, e)
		});

		socket.addEventListener('message', (message) => {
			const data = JSON.parse(message.data);

			if (data.type && data.type === 'pong') {
				return;
			}

			this.emit(WSTransportEvents.message, data)
		});
	}
}
