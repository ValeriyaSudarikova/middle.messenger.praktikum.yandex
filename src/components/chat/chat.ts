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
import {dateFormatter, isEqual} from "../../utils/helpers"
import {ChatWrapper} from "./chatWrapper/ChatWrapper";

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
	public current_offset: number
	public ChatWrapper: ChatWrapper | undefined;

	constructor(props: ChatProps) {
		super("div", props)

		this.ChatName = undefined
		this.Contacts = undefined
		this.newID = undefined
		this.ChatWrapper = undefined
		this.current_offset = 0
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

					if (this.newID) {
						chatController.addUserToChat(this.props.selectedChat.id, this.newID!)
					} else {
						throw new Error("введите ID пользователя")
					}
				}
			}
		})

		this.ChatWrapper = new ChatWrapper({
			messages: this.props.messages,
			events: {
				scroll: (event: any) => {
					// event.target.scrollTop = this.props.messages?.length ? this.props.messages.length * 50 : 0
				}
			}
		});

		this.children.chatWrapper = this.ChatWrapper;

		this.children.form = new ChatMessageForm({
			file: {
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

		if (!isEqual(oldProps.messages, newProps.messages)) {
			this.ChatWrapper?.setProps({
				messages: newProps.messages,
				events: {
					scroll: (event: any) => {
						console.log(event)
					}
				}
			})
		}

		return true
	}
}
