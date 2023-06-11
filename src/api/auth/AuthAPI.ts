import BaseAPI from "../baseApi"
import {SignInData, SignUpData, UserData} from "./types"

export class AuthAPI extends BaseAPI {
	constructor() {
		super("/auth")
	}

	signup(data: SignUpData) {
		return this.http.post("/signup", data)
	}

	signin(data: SignInData) {
		return this.http.post("/signin", data)
	}

	logout() {
		return this.http.post("/logout")
	}

	getUser() {
		return this.http.get<UserData>("/user")
	}

	create: any = undefined
	read: any = undefined
	update: any = undefined
	delete: any = undefined
}
