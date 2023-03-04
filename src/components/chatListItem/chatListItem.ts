import Block from "../../utils/Block"
import template from "./chatListItem.hbs"
//components
import Img, {ImgProps} from "../img/img"
import BtnSubmit, {BtnSubmitProps} from "../btnSubmit/btnSubmit"
//icons
import delImg from "../../icons/trash.svg"
import mesImg from "../../icons/message.svg"
import Popup from "../popup/popup"
import {createChat} from "../contactItem/contactItem"

export interface ChatListItemProps {
	img: ImgProps,
	name: string,
	statusClass: "online" | "offline",
	date: string | Date,
	messageText: string
}

export default class ChatListItem extends Block<ChatListItemProps> {
	constructor(props: ChatListItemProps) {
		super("div", props)
	}


	checkMessageLength = (mess: string) => {
		if (mess.length > 90) {return mess.substring(1, 90)}
	}

	protected render(): DocumentFragment {
		return this.compile(template, {
			img: this.props.img,
			name: this.props.name,
			statusClass: this.props.statusClass,
			date: this.props.date,
			messageText: this.props.messageText.length > 20 ? this.props.messageText.substring(0, 20) + "..." : this.props.messageText
		})
	}

	init() {
		const {img} = this.props

		this.children.activeContactImg = new Img({...img})
		this.children.message = new BtnSubmit({
			/* eslint-disable */
			//@ts-ignore
			type: "button",
			class: "messaging",
			label: new Img({src: mesImg, alt: "Сообщение"}),
			events: {
				click: (Event: any, data: any = this.props) => {createChat(Event, data)}
			}
			/* eslint-disable */
		})
		this.children.del = new BtnSubmit({
			//@ts-ignore
			type: "button",
			class: "deleting",
			label: new Img({src: delImg, alt: "удаление"}),
			events: {
				click: (event: any, data: any = this.props) => {
					// console.log(data)
					const parent = document.querySelector(".background")
					const popup = new Popup({
						popupText: data.name,
						/* eslint-disable */
						//@ts-ignore
						btns: [{
							type: "button",
							class: "fz-40",
							label: "да",
							events: {
								click: (Event: any, data: any) => {console.log(Event); createChat(Event, data)}
							}
						/* eslint-disable */
						}, {
							type: "button",
							class: "fz-40",
							label: "нет",
							events: {
								click: (Event: any) => {console.log(Event)}
							}
						}
						]
					})
						parent!.append(popup.getContent()!)
				}
			}
		})
	}
}
