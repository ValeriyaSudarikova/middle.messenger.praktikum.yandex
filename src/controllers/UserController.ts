import Router from "../utils/Router";
import {Routes} from "../index";
import store from "../utils/Store";
import {UserAPI} from "../api/userAPI";
import authController from "./AuthController";

class UserController {
    private api: UserAPI;

    constructor() {
        this.api = new UserAPI();
    }

    async ChangeUserData(data: any) {


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
            await this.api.changeUserAvatar(avatar);
        } catch (e) {
            console.log(e)
        }
    }
}

export default new UserController();
