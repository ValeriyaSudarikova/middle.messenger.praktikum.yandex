import BaseAPI from "../baseApi"
import {SignInData, SignUpData, UserData} from "../auth/types"

export class ContactsAPI extends BaseAPI {
	constructor() {
		super("/user")
	}

	getUserByID(id: number): Promise<UserData> {
		return this.http.get(`/${id}`)
	}

	getUserByLogin(login: string): Promise<UserData> {
		return this.http.post("/search", login)
	}

	create = undefined
	read = undefined
	update = undefined
	delete = undefined
}
