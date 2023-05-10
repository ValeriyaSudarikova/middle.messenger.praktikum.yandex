import {ChatAPI} from "../api/chats/ChatAPI"

import store from "../utils/Store"
import messagesController from "./MessageController"

class ChatController {
	private api: ChatAPI

	constructor() {
		this.api = new ChatAPI()
	}

	async create(title: string) {
		await this.api.create(title)
		this.getChats()
	}

	async getChats() {
		const chats = await this.api.read()

		const statedChats = store.getState().chats?.data

		if (chats !== statedChats) {
			store.set("chats.data", chats)
		}
	}

	async getUsers(id: number) {

		try {
			const users = await this.api.getUsers(id)

			store.set("selected_chat_data.users", users)

			return users
			
		} catch (error) {
			console.log(error)
		}
	}
	async addUserToChat(id: number, userId: number) {
		try {
			await this.api.addUsers(id, [userId])

			const users = await this.api.getUsers(id)

			store.set("selected_chat_data.users", users)
		} catch (error) {
			console.log(error)
		}
	}

	async delete(id: number) {
		await this.api.delete(id)

		await this.getChats()
	}

	getToken(id: number) {
		return this.api.getToken(id)
	}

	async selectChat(id: number) {
		try {

			const users = await this.api.getUsers(id)
			const chats = await this.api.read()
			const messages = store.getState().messages

			const selectedChat = chats.filter(chat => {
				return chat.id === id
			})[0]

			if (selectedChat) {
				store.set("selected_chat", id)

				store.set("selected_chat_data.chat", selectedChat)
			}

			const token = await this.getToken(selectedChat.id);
			await messagesController.connect(selectedChat.id, token);

			if (users) {
				store.set("selected_chat_data.users", users)
			}

			if (messages) {
				if (messages[id]) {
					store.set("selected_chat_data.messages", messages[id])
				}
			}

		} catch (error) {
			console.log(error)
		}
	}
}

const chatsController = new ChatController()

export default chatsController
