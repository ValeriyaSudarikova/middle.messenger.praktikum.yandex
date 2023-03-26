import Block from "../../utils/Block"
import template from "./chat.hbs"
//components
import BtnSubmit from "../btnSubmit/btnSubmit"
import ChatItem, {ChatItemProps} from "./chatItem/chatItem"
import ChatFileInput from "./chatFileInput/chatFileInput"
import ContactItem, {ContactItemProps} from "../contactItem/contactItem"
import ChatInput from "./chatInput/chatInput"
import Img from "../img/img"
//icons
import send from "../../icons/send.svg"
import add from "../../icons/add.svg"
import no_avatar from "../../icons/no_avatar.svg"
//utils
import messageController, {Message} from "../../controllers/MessageController";
import store from "../../utils/Store";
import chatsController from "../../controllers/ChatController";
import contactsController from "../../controllers/ContactsController";
import {UserData} from "../../api/auth/auth.t";

interface ChatProps {
	selectedChat: ChatItem,
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

	 createMessages(messages: Message[]) {
		messages.map( async (message) => {
			const myId = store.getState().user!.data.id;

			let chatter: UserData | undefined = await contactsController.FindUserById(message.chat_id)!;

			let cls: "from" | "to" = message.user_id !== myId ? "to" : "from" ;
			let UserImg
			if (chatter) {
				UserImg = {
					src: 'https://ya-praktikum.tech/api/v2/resources' + chatter.avatar;
					alt: "аватар пользователя"
				}
			}

			let imgProps = UserImg ? UserImg : {src: no_avatar, alt: "аватар пользователя"}

			return new ChatItem({class: cls, message: message.content, img: imgProps})
		})
	}

	init() {
		const {contact, messages} = this.props

		let newMessage = ""
		this.children.activeContactItem = new ContactItem({...contact})

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
				blur: () => {console.log("blur")},
			}
		},
		)
		this.children.chatInput = new ChatInput({
			type: "text",
			class: "chat__input-mess",
			events: {
				blur: (event: any) => {
					if (event.target.value) {
						newMessage = event.target.value
					}
				},
			}
		})
		this.children.submitBtn = new BtnSubmit({
			type: "submit",
			class: "chat__input-submit",
			label: new Img({
				src: send,
				alt: "отправить"
			}),
			events: {
				click: (event: any) => {
					event.preventDefault();

					if (newMessage) {

						const wrapper = document.querySelector(".chat__wrapper")

						messageController.sendMessage(, newMessage)

						wrapper!.append(Message.getContent()!)
						newMessage = ""
					}
				}
			}
		})
	}
}
