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

		try {
			const chts = await this.api.read()

			const statedChats = store.getState().chats?.data

			if (chts !== statedChats) {
				store.set("chats.data", chts)
			}

			chts.forEach(async chat => {
				const token = await this.getToken(chat.id);
				await messagesController.connect(chat.id, token);

			})

		} catch (e) {
			const contactBlocks = document.querySelectorAll(".contacts")
			contactBlocks.forEach(item => {
				if (item.getAttribute("style") !== "display: block;") {
					const existedError = document.querySelector(".contacts .contacts__list span")

					if (existedError) {
						existedError.remove()
					}

					const wrapper = document.querySelectorAll(".contacts .contacts__list")
					const error = document.createElement("span")
					error.classList.add("p15")
					error.innerHTML = "У вас еще нет доступных чатов"
					wrapper[1].append(error)
					setTimeout(() => {
						error.remove()
					}, 3000)
				}
			})
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

			const selectedChat = chats.filter(chat => {
				return chat.id === id
			})[0]

			if (selectedChat) {
				store.set("selected_chat", id)

				store.set("selected_chat_data.chat", selectedChat)

				// const token = await this.getToken(selectedChat.id)
				//
				// await messagesController.connect(selectedChat.id, token)
			}

			if (users) {
				store.set("selected_chat_data.users", users)
			}
			if (store.getState().messages![id]) {
				store.set("selected_chat_data.messages", store.getState().messages![id])
			}
		} catch (error) {
			console.log(error)
		}
	}
}

const chatsController = new ChatController()

export default chatsController
