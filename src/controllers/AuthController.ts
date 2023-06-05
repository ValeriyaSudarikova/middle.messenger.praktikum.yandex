import {AuthAPI} from "../api/auth/AuthAPI"
import {SignInData, SignUpData} from "../api/auth/types"
import store from "../utils/Store"
import {Routes} from "../index"
import Router from "../utils/Router"
import {messagesController} from "./MessageController"

class AuthController {
	private api: AuthAPI
	constructor() {
		this.api = new AuthAPI()
	}

	async getUser() {
		try {
			const user = await this.api.getUser()

			store.set("user.data", user)

			return user

		} catch (e) {
			console.log(e)
		}
	}

	createErrorMessage(errorMess: string, clas: string, afterElemTag: string) {
		const existedMes = document.querySelector(clas)

		if (existedMes) {
			existedMes.remove()
		}

		const error = document.createElement("span")
		error.innerHTML = errorMess
		error.classList.add(clas)
		const elem = document.querySelector(afterElemTag)

		elem!.after(error)
		setTimeout(() => {
			error.remove()
		}, 3000)
	}

	async signup(data: SignUpData) {
		try {
			await this.api.signup(data)

			await this.getUser()

			Router.go(Routes.menu)

		} catch (e) {

			this.createErrorMessage("Пользователь с этими данными уже существует", ".errored__message", ".submit" )

		}
	}

	async signin(data: SignInData) {
		try {
			await this.api.signin(data)

			await this.getUser()

			Router.go(Routes.menu)

		} catch (error: any) {
			if (error.reason === "User already in system") {
				Router.go(Routes.menu)
			} else {
				this.createErrorMessage("Проверьте корректность данных и повторите попытку входа", ".errored__message-dark", "button")
			}
		}
	}

	async logout() {
		try {
			messagesController.closeAll()

			await this.api.logout()

			Router.go(Routes.homepage)
		} catch (e) {
			console.error(e)
		}
	}


}

export default new AuthController()
