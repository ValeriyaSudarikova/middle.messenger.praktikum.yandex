import WSTransport, { WSTransportEvents } from '../utils/WSTransport';
import store from '../utils/Store';
import {isEqual} from "../utils/helpers";
import chatsController from "./ChatController";

export interface Message {
	id: number;
	chat_id: number;
	time: string;
	type: string;
	user_id: number;
	content: string;
	file?: {
		id: number;
		user_id: number;
		path: string;
		filename: string;
		content_type: string;
		content_size: number;
		upload_date: string;
	}
}

class MessagesController {
	private sockets: Map<number, WSTransport> = new Map();

	async connect(id: number, token: string) {

		if (this.sockets.has(id)) {
			return;
		}

		const userId = store.getState().user!.data.id;

		const wsTransport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);

		this.sockets.set(id, wsTransport);

		await wsTransport.connect();

		this.subscribe(wsTransport, id);

		this.getOldMessages(id);
	}

	sendMessage(id: number, message: string) {
		const socket = this.sockets.get(id);

		if (!socket) {
			throw new Error(`Chat ${id} is not connected`);
		}

		socket.send({
			type: 'message',
			content: message,
		});
	}

	getOldMessages(id: number, offset?: number) {

		const socket = this.sockets.get(id);

		if (!socket) {
			throw new Error(`Chat ${id} is not connected`);
		}

		socket.send({type: 'get old', content: `${offset ? offset : 0}`});
	}

	closeAll() {
		Array.from(this.sockets.values()).forEach(socket => socket.close());
	}

	private onMessage(id: number, messages: Message | Message[]) {
		let messagesToAdd: Message[] = [];

		if (Array.isArray(messages)) {
			messagesToAdd = messages.reverse();
		} else {
			messagesToAdd.push(messages);
		}

		const currentMessages = (store.getState().messages || {})[id] || [];

		if (!isEqual(currentMessages, messagesToAdd)) {
			messagesToAdd = [...currentMessages, ...messagesToAdd];
		}

		store.set(`messages.${id}`, messagesToAdd);

		chatsController.getChats();
	}

	private onClose(id: number) {
		this.sockets.delete(id);
	}

	private subscribe(transport: WSTransport, id: number) {
		transport.on(WSTransportEvents.message, (message) => this.onMessage(id, message));
		transport.on(WSTransportEvents.close, () => this.onClose(id));
	}

}

const messagesController = new MessagesController();

export default messagesController;
