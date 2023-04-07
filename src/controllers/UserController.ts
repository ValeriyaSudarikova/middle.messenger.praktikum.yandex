import {Router} from "../utils/Router"
import {Routes} from "../index"
import {UserAPI} from "../api/userAPI"
import authController from "./AuthController"
import {UserData} from "../api/auth/types";

class UserController {
	private api: UserAPI

	constructor() {
		this.api = new UserAPI()
	}

	async ChangeUserData(data: UserData) {

		try {
			await this.api.changeUserData(data)

			await authController.getUser()

			Router.go(Routes.menu)
		} catch (e) {
			console.log(e)
		}
	}

	async setUserAvatar(avatar: object) {
		try {
			await this.api.changeUserAvatar(avatar)
		} catch (e) {
			console.log(e)
		}
	}
}

export const userController =  new UserController();
