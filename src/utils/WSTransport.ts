import EventBus from "./EventBus";

export enum WSTransportEvents {
    connected = "connected",
    error = "error",
    message = "message",
    close = "close"
}

export default class WSTransport extends EventBus {
    private socket: WebSocket | null = null;
    private pingInterval: number = 0

    constructor(private url: string) {
        super();
    }

    public send(data: unknown) {
        if (!this.socket) {
             throw new Error("Socket is not connected")
        }

        this.socket?.send(JSON.stringify(data))
    }

    public connect(): Promise<void> {
        this.socket = new WebSocket(this.url)

        this.subscribe(this.socket)

        return new Promise<void>(resolve => {
            this.socket!.addEventListener("open", () => {
                this.emit(WSTransportEvents.connected)

                resolve();
            })
        })
    }

    public close() {
        if (!this.socket) {
            throw new Error("Socket is not connected")
        }

        this.socket.close()
    }

    private setupPing() {

    }

    private subscribe(socket: WebSocket) {
        socket.addEventListener("message", (message) => {
            const data = JSON.parse(message.data)

            this.emit(WSTransportEvents.message, data)
        })

        socket.addEventListener("close", () => {
            this.emit(WSTransportEvents.close)
        })
    }
}
