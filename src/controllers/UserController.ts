import {UserAPI} from "../api/userAPI"
import authController from "./AuthController"
import {UserData, UserDataToChange} from "../api/auth/types"

class UserController {
	private api: UserAPI

	constructor() {
		this.api = new UserAPI()
	}

	async ChangeUserData(data: UserDataToChange) {

		try {
			await this.api.changeUserData(data)

			await authController.getUser()

			location.reload()

		} catch (e) {
			console.log(e)
		}
	}

	async setUserAvatar(avatar: object) {
		try {
			await this.api.changeUserAvatar(avatar)

			await authController.getUser()

			location.reload()

		} catch (e) {
			console.log(e)
		}
	}
}

export const userController =  new UserController()
