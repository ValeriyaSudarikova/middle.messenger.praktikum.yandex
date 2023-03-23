import {ChatAPI} from "../api/chats/ChatAPI";
import {ChatItem, Message} from "../api/chats/chats.t";
import {UserData} from "../api/auth/auth.t";

import store from "../utils/Store";
import {Routes} from "../index";
import Router from "../utils/Router";
import ChatListItem from "../components/chatListItem/chatListItem";
import {ImgProps} from "../components/img/img";
import {dateFormatter} from "../utils/helpers";
import * as domain from "domain";

class ChatController {
    private api: ChatAPI;

    constructor() {
        this.api = new ChatAPI()
    }

    async create(title: string) {
        await this.api.create(title);
        this.getChats();
    }

    async getChats() {
        try {
            const chats = await this.api.read()
            let statedChats = store.getState().chats?.data;

            if (chats !== statedChats) {
                store.set("chats.data", chats);
            }

        } catch (e) {
            const contactBlocks = document.querySelectorAll(".contacts");
                contactBlocks.forEach(item => {
                    if (item.getAttribute("style") !== "display: block;") {
                        let existedError = document.querySelector(".contacts .contacts__list span");

                        if (existedError) {
                            existedError.remove()
                        }

                        let wrapper = document.querySelectorAll(".contacts .contacts__list")
                        let error = document.createElement("span");
                        error.classList.add("p15");
                        error.innerHTML = "У вас еще нет доступных чатов"
                        wrapper[1].append(error);
                        setTimeout(() => {
                            error.remove()
                        }, 3000)
                    }
                })
        }
    }

    addUserToChat(id: number, userId: number) {
        this.api.addUsers(id, [userId]);
    }

    async delete(id: number) {
        await this.api.delete(id);

        this.getChats();
    }

    getToken(id: number) {
        return this.api.getToken(id);
    }

    selectChat(id: number) {
        store.set('chats.selected', id);
    }
}

const chatsController = new ChatController();

export default chatsController;
