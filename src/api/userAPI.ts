import BaseAPI from "./baseApi"
import {UserData} from "./auth/auth.t"

export class UserAPI extends BaseAPI {
	constructor() {
		super("/user")
	}

	changeUserData(data: any) {

		return this.http.put("/profile", data)
	}

	changeUserAvatar(avatar: any) {
		return this.http.put("/profile/avatar", avatar)
	}

	getUserByID(id: number) {
		return this.http.get(`/${id}`)
	}


	create = undefined
	read = undefined
	update = undefined
	delete = undefined
}
