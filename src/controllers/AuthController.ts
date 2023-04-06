import {AuthAPI} from "../api/auth/AuthAPI"
import {SignInData, SignUpData, UserData} from "../api/auth/auth.t"
import store from "../utils/Store"
import {Routes} from "../index"
import Router from "../utils/Router"
import messageController from "./MessageController"

class AuthController {
	private api: AuthAPI
	constructor() {
		this.api = new AuthAPI()
	}

	async getUser() {
		store.set("user.isLoading", true)

		const user = await this.api.getUser()

		store.set("user.isLoading", false)
		store.set("user.data", user)

	}

	async signup(data: SignUpData) {
		try {
			await this.api.signup(data)

			await this.getUser()

			Router.go(Routes.menu)

		} catch (e) {
			console.error("error", e)

			const existedMes = document.querySelector(".errored__message")
			if (existedMes) {
				existedMes.remove()
			}

			const error = document.createElement("span")
			error.innerHTML = "Пользователь с этими данными уже существует"
			error.classList.add("errored__message")
			const elem = document.querySelector(".submit")

            elem!.after(error)
            setTimeout(() => {
            	error.remove()
            }, 3000)
		}
	}

	async signin(data: SignInData) {
		try {
			await this.api.signin(data)

			await this.getUser()

			Router.go(Routes.menu)

		} catch (e) {

			const error = document.createElement("span")
			const btn = document.querySelector("button")
			error.innerHTML = "Проверьте корректность данных и повторите попытку входа"
			error.classList.add(".errored__message-dark")
			btn?.after(error)
			setTimeout(() => {
				error.remove()
			}, 3000)

		}
	}

	async logout() {
		try {
			messageController.closeAll()

			await this.api.logout()

			store.set("user.data", undefined)
			store.set("chats.data", undefined)
			store.set("selected_chat", undefined)
			store.set("selected_chat_data", undefined)


			Router.go(Routes.homepage)
		} catch (e) {
			console.error(e)
		}
	}


}

export default new AuthController()
