import {ChatAPI} from "../api/chats/ChatAPI";
import ChatListItem from "../components/chatListItem/chatListItem";
import store from "../utils/Store";
import {ContactsAPI} from "../api/contacts/ContactsAPI";
import {UserData} from "../api/auth/auth.t";
import {login} from "../utils/helpers";
import chatsController from "./ChatController";

class ContactsController {
    private api: ContactsAPI;
    private state: UserData[]

    constructor() {
        this.state = store.getState().contacts?.data || []
        this.api = new ContactsAPI()
    }

    async getContacts() {
        const contacts = await store.getState().contacts?.data;

        if (!contacts) {

            let existedError = document.querySelector(".contacts .contacts__list span");

            if (existedError) {
                existedError.remove()
            }

            let wrapper = document.querySelector("#contact")
            let error = document.createElement("span");
            error.classList.add("p15");
            error.innerHTML = "У вас еще нет доступных контактов, воспользуйтесь поиском"
            console.log(wrapper, error)
            wrapper?.append(error);
            setTimeout(() => {
                error.remove()
            }, 3000)
        }

        return contacts;
    }
    async FindUserByLogin(login: string) {
        let newUser:UserData = await this.api.getUserByLogin(login);

        if (newUser) {
            if (this.state) {
                this.state.push(newUser)
            } else {
                this.state = store.getState().contacts?.data || []
                this.state.push(newUser)
            }

            store.set("contacts.data", this.state);
            console.log(this.state)
        }
    }

    async FindUserById(id: number) {
        let newUser:UserData = await this.api.getUserByID(id);

        if (newUser) {
            if (this.state) {
                this.state.push(newUser)
            } else {
                this.state = store.getState().contacts?.data || []
                this.state.push(newUser)
            }

            store.set("contacts.data", this.state);

            return newUser;
        }
    }

    async deleteUser(id: number) {
        if (this.state) {
            console.log(id)
            if (this.state.length === 1) {
                store.set('contacts.data', [])
            }

            let results: UserData[] | [] = this.state.filter(user => { return user.id !== id})

            store.set("contacts.data", results)
            console.log(results, store.getState().contacts!.data, 'api')
        }
    }

}

export default new ContactsController()
