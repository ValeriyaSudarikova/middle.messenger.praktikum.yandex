import {UserData} from "../api/auth/auth.t";
import WSTransport, {WSTransportEvents} from "../utils/WSTransport";
import store from "../utils/Store";

export interface Message {
    chat_id: number,
    type: string,
    user_id: number,
    //"2020-01-02T14:22:22.000Z"
    time: string,
    content: string,
    file?: {
        id: number,
        user_id: number,
        path: string,
        filename: string,
        content_type: string,
        content_size: number,
        upload_date: string
    }
}

class MessagesController{
    private sockets: Map<number, WSTransport> = new Map()

    async connect(id: number, token: string) {
        if (this.sockets.get(id)) {
            return;
        }

        const {user} = store.getState()

        const transport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${user?.data.id}/${id}/${token}`)

        await transport.connect()

        this.sockets.set(id, transport)

        this.getOldMessages(id)

        this.subscribe(transport, id)
    }

    sendMessage(id: number, message: string) {
        const transport = this.sockets.get(id);

        if (!transport) {
            throw new Error('Channel is closed');
        }

        transport.send({type: "message", content: message})
    }

    getOldMessages(id: number) {
        const transport = this.sockets.get(id);

        if (!transport) {
            throw new Error('Channel is closed');
        }

        transport.send({type: "get old", content: "0"})
    }

    closeAll() {}

    private onMessage(id: number, message: Message | Message[]) {
        if (Array.isArray(message)) {
            store.set(`messages.${id}`, message)

            return;
        }

        const history = store.getState().messages![id];

        if (!history) {
            store.set(`messages.${id}`, [message])
        }

        store.set(`messages.${id}`, [...history, message])

    }

    private onClose(id: number) {
        this.sockets.delete(id)
    }

    private subscribe(transport: WSTransport, id: number) {
        transport.on(WSTransportEvents.message, (messages) => this.onMessage(id, messages))
        transport.on(WSTransportEvents.close, () => {this.onClose(id)})
    }

}

const messageController = new MessagesController();

//@ts-ignore
window.messageController = messageController;

export default messageController;
