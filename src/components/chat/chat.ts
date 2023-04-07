import Block from "../../utils/Block"
import template from "./chat.hbs"
//components
import {ChatItem} from "../../api/chats/types"
import ContactSearchForm from "../ContactSearchForm/ContactSearchForm"
import ChatContact, {ChatContactProps} from "./chatContact/ChatContact"
import MessageItem, {MessageProps} from "./chatItem/chatItem"
import ChatMessageForm from "./chatForm/ChatForm"
import Img from "../img/img"
//icons
import send from "../../icons/send.svg"
import add from "../../icons/add.svg"
import no_avatar from "../../icons/no_avatar.svg"
import no_chat_avatar from "../../img/chat.png"
//utils
import messageController, {Message} from "../../controllers/MessageController"
import store from "../../utils/Store"
import chatController from "../../controllers/ChatController"
import {dateFormatter} from "../../utils/helpers"

export interface ChatProps {
	selectedChat: ChatItem,
	ChatName: string | undefined,
	Contacts: ChatContactProps[] | [],
	messages: Message[] | undefined,
}

export default class Chat extends Block<ChatProps> {
	public newID: number | undefined
	public ChatName: string | undefined
	public Contacts: string[] | undefined
	public messages: any

	constructor(props: ChatProps) {
		super("div", props)

		this.ChatName = undefined
		this.Contacts = undefined
		this.newID = undefined
		this.messages = undefined
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	 createMessages(messages: Message[]): any {
		if (Array.isArray(messages) && messages[0]) {
			const m = messages.sort((a, b) => {
				return new Date(a.time).getTime() - new Date(b.time).getTime()
			})

			return m.map((message) => {

				const myId = store.getState().user!.data.id

				const user = store.getState().selected_chat_data!.users.filter((user) => {return user.id === message.user_id})

				const cls: "from" | "to" = message.user_id !== myId ? "to" : "from" 

				let UserImg

				if (user) {
					UserImg = {
						src: "https://ya-praktikum.tech/api/v2/resources" + user[0].avatar,
						alt: "аватар пользователя"
					}
				}

				const imgProps = UserImg ? UserImg : {src: no_avatar, alt: "аватар пользователя"}

				return new MessageItem({class: cls, message: message.content, img: imgProps, date: dateFormatter(new Date(message.time))})
			})
		}
	}

	init() {
		messageController.getOldMessages(this.props.selectedChat.id)

		let newMessage = ""

		this.children.ChatLogo = new Img({
			src: this.props.selectedChat.avatar ? "https://ya-praktikum.tech/api/v2/resources" + this.props.selectedChat.avatar : no_chat_avatar,
			alt: "аватар чата",
			class: "chat__avatar"
		})
		this.children.Contacts = this.props.Contacts.map(contact => {
			return new ChatContact(contact)
		})

		this.children.AddContactForm = new ContactSearchForm({
			input: {
				placeholder: "введите ID",
				type: "number",
				events: {
					blur: (Event: any) => {
						console.log(Event.target.value)
						this.newID = Event.target.value
					}
				}
			},
			label: {
				label: "добавить контакт"
			},
			btn: {
				events: {}
			},
			events: {
				submit: (Event: any) => {
					Event.preventDefault()
					console.log(this.newID)
					if (this.newID) {
						chatController.addUserToChat(this.props.selectedChat.id, this.newID!)
					} else {
						throw new Error("введите ID пользователя")
					}
				}
			}
		})

		if (this.props.messages) {
			this.messages = this.createMessages(this.props.messages)
		}

		const wrapper = document.querySelector(".chat__wrapper")

		if (Array.isArray(this.messages) && this.messages[0] && wrapper) {
			this.messages.forEach(message => {
				wrapper!.append(message.getContent())
				message.show()
			})
		}
		console.log(wrapper, this.messages)

		this.children.form = new ChatMessageForm({
			file: {
				//@ts-ignore
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
					change: (event: any) => {
						event.preventDefault()

						console.log(event)
					},
				}
			},
			input: {
				//@ts-ignore
				type: "text",
				class: "chat__input-mess",
				events: {
					blur: (event: any) => {
						event.preventDefault()

						if (event.target.value) {
							newMessage = event.target.value
						}
					}
				}
			},
			btn: {
				//@ts-ignore
				type: "submit",
				class: "chat__input-submit",
				label: new Img({
					src: send,
					alt: "отправить"
				}),
				events: {
					// submit: (event: any) => {
					// 	event.preventDefault()
					// 	console.log(event)
					// }
				},
			},
			events: {
				submit: (event: any) => {
					event.preventDefault()

					if (newMessage) {
						messageController.sendMessage(this.props.selectedChat.id, newMessage)

						event.target.reset()
					}
				}
			},
			class: "chat__form"
		})

	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {

		if (!newProps.messages) {
			const mess = store.getState().messages![newProps.selectedChat.id]
			this.messages = this.createMessages(mess)
		} else {
			this.messages = this.createMessages(newProps.messages)
		}

		this.children.messages = this.messages

		return true
	}
}
