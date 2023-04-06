import BaseAPI from "../baseApi"
import {SignInData, SignUpData, UserData} from "./auth.t"
import store from "../../utils/Store"

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

	create = undefined
	read = undefined
	update = undefined
	delete = undefined
}
