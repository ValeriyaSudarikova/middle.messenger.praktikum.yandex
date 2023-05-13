import {UserAPI} from "../api/userAPI"
import {UserDataToChange} from "../api/auth/types"
import store from "../utils/Store";
import {isEqual} from "../utils/helpers";

class UserController {
	private api: UserAPI

	constructor() {
		this.api = new UserAPI()
	}

	async ChangeUserData(data: UserDataToChange) {
		try {
			const newUserData = await this.api.changeUserData(data)

			//@ts-ignore
			if (newUserData) {
				store.set("user.data", newUserData)
			}

		} catch (e) {
			console.log(e)
		}
	}

	async setUserAvatar(avatar: object) {
		try {

			const newUserData = await this.api.changeUserAvatar(avatar)

			//@ts-ignore
			// if (newUserData) {
				store.set("user.data", newUserData)
			// }

			// await authController.getUser()

			// location.reload()

		} catch (e) {
			console.log(e)
		}
	}
}

export const userController =  new UserController()
