import Block from "../../utils/Block"
import template from "./chat.hbs"
//components
import BtnSubmit, {BtnSubmitProps} from "../btnSubmit/btnSubmit"
import ChatItem, {ChatItemProps} from "./chatItem/chatItem"
import ChatFileInput from "./chatFileInput/chatFileInput"
import ContactItem, {ContactItemProps} from "../contactItem/contactItem"
import ChatInput from "./chatInput/chatInput"
import Img from "../img/img"
//icons
import send from "../../icons/send.svg"
import add from "../../icons/add.svg"

interface ChatProps {
	contact: ContactItemProps,
	messages: ChatItemProps[]

}

export default class Chat extends Block<ChatProps> {
	constructor(props: ChatProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		const {contact, messages} = this.props
		let newMessage = ""
		const quantity = 0
		/* eslint-disable */
		//@ts-ignore
		this.children.activeContactItem = new ContactItem({...contact})
		/* eslint-disable */
		this.children.messages = messages.map(message => {
			return new ChatItem({...message})
		})
		this.children.fileInput = new ChatFileInput({
			name: "file",
			type: "file",
			id: "input__file",
			class: "input input__file",
			label: {
				forClass: "input__file",
				class: "input__file-button",
				labelImg: {
					class: "input__file-icon",
					src: add,
					alt: "Выбрать файл"
				}
			},
			events: {
				focus: (event: any) => {console.log(event, "focus")},
				blur: (event: any) => {
					console.log("kd")},
			}
		},
		)
		this.children.chatInput = new ChatInput({
			type: "text",
			class: "chat__input-mess",
			events: {
				focus: (event: any) => {console.log(event, "focus")},
				blur: (event: any) => {
					if (event.target.value) {
						newMessage = event.target.value
					}
				},
			}
		})
		this.children.submitBtn = new BtnSubmit({
			/* eslint-disable */
			//@ts-ignore
			type: "submit",
			class: "chat__input-submit",
			label: new Img({
				src: send,
				alt: "отправить"
			}),
			events: {
				click: (event, props: any = this.props) => {
					event.preventDefault()
					if (newMessage) {
						const wrapper = document.querySelector(".chat__wrapper")
						const Message = new ChatItem({
							class: "from",
							message: newMessage,
							img: contact.img
						})
						wrapper!.append(Message.getContent()!)
						newMessage = ""
					}
				}
			}
			/* eslint-disable */
		})
	}
}
