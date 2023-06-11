import BaseAPI from "./baseApi"
import { UserDataToChange} from "./auth/types"

export class UserAPI extends BaseAPI {
	constructor() {
		super("/user")
	}

	changeUserData(data: UserDataToChange) {

		return this.http.put("/profile", data)
	}

	changeUserAvatar(avatar: any) {
		return this.http.put("/profile/avatar", avatar)
	}

	getUserByID(id: number) {
		return this.http.get(`/${id}`)
	}


	create: any = undefined
	read: any = undefined
	update: any = undefined
	delete: any = undefined
}
