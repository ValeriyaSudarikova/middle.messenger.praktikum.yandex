import Block from "../../utils/Block"
import template from "./chatListItem.hbs"
//components
import Img from "../img/img"
import BtnSubmit from "../btnSubmit/btnSubmit"
//icons
import delImg from "../../icons/trash.svg"
import mesImg from "../../icons/message.svg"
import icon from "../../icons/no_avatar.svg"
//utils
import {ChatItem} from "../../api/chats/types"
import {dateFormatter} from "../../utils/helpers"
import {chatsController} from "../../controllers/ChatController"

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
		const avatar = this.props.avatar ? `https://ya-praktikum.tech/api/v2/resources${this.props.avatar}` : icon

		return this.compile(template, {
			img: {class: "", src: avatar, alt: "аватар чата"},
			id: this.props.id,
			name: this.props.title,
			statusClass: "offline",
			date: !this.props.last_message?.time ? dateFormatter(new Date((new Date()).toISOString())) : dateFormatter(new Date(this.props.last_message.time)),
			messageText: this.props.last_message?.content ?  this.checkMessageLength(this.props.last_message?.content) : "",
		})

	}

	init() {
		this.children.activeContactImg = new Img({
			class: "user",
			src: this.props.last_message?.user.avatar ? `https://ya-praktikum.tech/api/v2/resources${this.props.last_message?.user.avatar}` : icon,
			alt: "иконка чата"
		})
		this.children.message = new BtnSubmit({
			type: "button",
			class: "messaging",
			label: new Img({src: mesImg, alt: "Сообщение"}),
			events: {
				click: () => {
					chatsController.selectChat(this.props.id)
				}
			}
		})
		this.children.del = new BtnSubmit({
			type: "button",
			class: "deleting",
			label: new Img({src: delImg, alt: "удаление"}),
			events: {
				click: () => {
					if (this.props.id) {
						chatsController.delete(this.props.id)
					}
				}
			}
		})
	}
}
