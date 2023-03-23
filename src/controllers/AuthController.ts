import {AuthAPI} from "../api/auth/AuthAPI";
import {SignInData, SignUpData, UserData} from "../api/auth/auth.t";
import store from "../utils/Store";
import {Routes} from "../index";
import Router from "../utils/Router";

class AuthController {
    private api: AuthAPI;
    constructor() {
        this.api = new AuthAPI()
    }

    async signup(data: SignUpData) {
        try {
            await this.api.signup(data);

            await this.getUser();

            Router.go(Routes.menu)

        } catch (e) {
            console.error('error', e);

            let existedMes = document.querySelector(`.errored__message`);
            if (existedMes) {
                existedMes.remove()
            }

            let error = document.createElement("span");
            error.innerHTML = "Пользователь с этими данными уже существует"
            error.classList.add("errored__message")
            let elem = document.querySelector(".submit")

            elem!.after(error);
            setTimeout(() => {
                error.remove()
            }, 3000)
        }
    }

    async signin(data: SignInData) {
        try {
            await this.api.signin(data)
            await this.getUser();
            Router.go(Routes.menu)
        } catch (e) {
            let error = document.createElement("span");
            let btn = document.querySelector("button");
            error.innerHTML = "Проверьте корректность данных и повторите попытку входа";
            error.classList.add(".errored__message-dark");
            btn?.after(error);
            setTimeout(() => {
                error.remove()
            }, 3000)
        }
    }

    async logout() {
        try {
          await this.api.logout();
          store.set('user.data', undefined);
          Router.go(Routes.homepage)
        } catch (e) {
            console.error(e)
        }
    }

    async ChangeUserData(data: any, withJson: boolean) {

        let formdata = new FormData();

        formdata.append("userRequest", data)

        console.log(formdata, 'fdata')

        try {
            await this.api.changeUserData(data, withJson)
            await this.getUser();

            Router.go(Routes.menu)
        } catch (e) {
            console.log(e)
        }
    }

    async getUser() {
        store.set("user.isLoading", true)

        const user = await this.api.getUser()

        store.set("user.isLoading", false)
        store.set("user.data", user)

    }

    async setUserAvatar(avatar: object) {
        try {
            this.api.changeUserAvatar(avatar);
            await this.api.getUser();
        } catch (e) {
            console.log(e)
        }
    }
}

export default new AuthController();
