import BaseAPI from "../baseApi"
import {SignInData, SignUpData, UserData} from "../auth/auth.t"

export class ContactsAPI extends BaseAPI {
	constructor() {
		super("/user")
	}

	getUserByID(id: number): Promise<UserData> {
		return this.http.get(`/${id}`)
	}

	getUserByLogin(login: string): Promise<UserData> {
		console.log(login)
		return this.http.post("/search", login)
	}

	create = undefined
	read = undefined
	update = undefined
	delete = undefined
}
