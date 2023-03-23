import Block from "../../utils/Block"
import template from "./chatListItem.hbs"
//components
import Img, {ImgProps} from "../img/img"
import BtnSubmit from "../btnSubmit/btnSubmit"
//icons
import delImg from "../../icons/trash.svg"
import mesImg from "../../icons/message.svg"
import Popup from "../popup/popup"
import icon from "../../icons/no_avatar.svg"

import {createChat} from "../contactItem/contactItem"
import {ChatItem, Message} from "../../api/chats/chats.t";
import {dateFormatter} from "../../utils/helpers";
import chatsController from "../../controllers/ChatController";

export default class ChatListItem extends Block<ChatItem> {
	constructor(props: ChatItem) {
		super("div", props)
	}

	checkMessageLength = (mess: string) => {
		if (mess.length > 90) {return mess.substring(1, 90)}
	}

	protected render(): DocumentFragment {
		let avatar = this.props.avatar ? this.props.avatar : icon;

		console.log(avatar)

		return this.compile(template, {
			img: {class: "", src: avatar, alt: "аватар чата"},
			id: this.props.id,
			name: this.props.title,
			statusClass: "offline",
			date: this.props.last_message?.time || dateFormatter(new Date((new Date()).toISOString())),
			messageText: this.props.last_message?.content?  this.checkMessageLength(this.props.last_message?.content) : ""
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
				click: (Event: any, data: any = this.props) => {createChat(Event, data)}
			}
		})
		this.children.del = new BtnSubmit({
			type: "button",
			class: "deleting",
			label: new Img({src: delImg, alt: "удаление"}),
			events: {
				click: (Event: any) => {
					if (this.props.id) {
						console.log(this.props.id)
						chatsController.delete(this.props.id)
					}
				}
			}
		})
	}
}
