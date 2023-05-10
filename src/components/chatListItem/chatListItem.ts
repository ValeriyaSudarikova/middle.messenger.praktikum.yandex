import Block from "../../utils/Block"
import template from "./chatListItem.hbs"
//components
import Img, {ImgProps} from "../img/img"
import BtnSubmit from "../btnSubmit/btnSubmit"
//icons
import delImg from "../../icons/trash.svg"
import mesImg from "../../icons/message.svg"
import icon from "../../icons/no_avatar.svg"

import {ChatItem, Message} from "../../api/chats/types"
import {dateFormatter} from "../../utils/helpers"
import chatsController from "../../controllers/ChatController"
import store from "../../utils/Store"
import chatController from "../../controllers/ChatController"
import Router from "../../utils/Router";
import {Routes} from "../../index";

export default class ChatListItem extends Block<ChatItem> {
	constructor(props: ChatItem) {
		super("div", props)
	}

	checkMessageLength(mess: string) : string | undefined {
		if (mess.length > 90) {
			return mess.substring(1, 90)
		} else {
			return mess
		}
	}

	protected render(): DocumentFragment {

		const user_avatar = this.props.last_message?.user.avatar

		return this.compile(template, {
			img: {
				class: "",
				src: user_avatar ? "https://ya-praktikum.tech/api/v2/resources/" + user_avatar : icon,
				alt: "аватар чата"},
			id: this.props.id,
			name: this.props.title,
			statusClass: "offline",
			date: !this.props.last_message?.time ? dateFormatter(new Date((new Date()).toISOString())) : dateFormatter(new Date(this.props.last_message.time)),
			messageText: this.props.last_message?.content ?  this.checkMessageLength(this.props.last_message?.content) : "",
			events: {
				click: (Event: any) => {
					console.log(Event.target)
				}
			}
		})

	}

	init() {
		this.children.activeContactImg = new Img({
			class: "",
			src: this.props.avatar ? this.props.avatar : icon,
			alt: "иконка чата"
		})
		this.children.message = new BtnSubmit({
			type: "button",
			class: "messaging",
			label: new Img({src: mesImg, alt: "Сообщение"}),
			events: {
				click: (Event: any) => {
					chatController.selectChat(this.props.id)
				}
			}
		})
		this.children.del = new BtnSubmit({
			type: "button",
			class: "deleting",
			label: new Img({src: delImg, alt: "удаление"}),
			events: {
				click: (Event: any) => {
					if (this.props.id) {
						chatsController.delete(this.props.id)
					}
				}
			}
		})
	}
}
