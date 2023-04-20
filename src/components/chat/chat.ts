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
import store, {withStore} from "../../utils/Store"
import chatController from "../../controllers/ChatController"
import {dateFormatter, isEqual} from "../../utils/helpers"
import {ChatWrapper} from "./chatWrapper/ChatWrapper"
import {userController} from "../../controllers/UserController";
import {UserData} from "../../api/auth/types";

export interface ChatProps {
	selectedChat: ChatItem,
	ChatName: string | undefined,
	contacts:  UserData[] | [],
	messages: Message[] | undefined,
}

class ChatBase extends Block<ChatProps> {
	public newID: number | undefined
	public ChatName: string | undefined
	public Contacts: ChatContact[] | undefined
	public current_offset: number
	public messages: MessageItem[] | undefined

	constructor(props: ChatProps) {
		super("div", props)

		this.ChatName = undefined
		this.Contacts = undefined
		this.newID = undefined
		this.messages = undefined
		this.current_offset = 0
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	 createMessages(message: Message): any {

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

	}

	async init() {
		console.log(this.props, 'chat props')
		let newMessage = ""

		this.children.ChatLogo = new Img({
			src: this.props.selectedChat.avatar ? "https://ya-praktikum.tech/api/v2/resources" + this.props.selectedChat.avatar : no_chat_avatar,
			alt: "аватар чата",
			class: "chat__avatar"
		})

		if (this.props.messages && this.props.messages[0]) {
			const m = this.props.messages.sort((a, b) => {
				return new Date(b.time).getTime() - new Date(a.time).getTime()
			})

			this.messages = m.map((mess) => {
				return this.createMessages(mess)
			})
		}

		if (this.messages) {
			this.children.messages = this.messages
		}

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

		console.log(this.props, 'contacts')

		if (this.props.contacts && this.props.contacts[0]) {
			console.log("block if")
			this.Contacts = this.props.contacts.map((contact ) => {
				let props = {
					img: {
						src: contact.avatar ? "https://ya-praktikum.tech/api/v2/resources/" + contact.avatar : no_avatar,
						alt: "аватар пользователя"},
					name: contact.display_name
				};

				return new ChatContact(props)
			})
		} else {
			console.log('block else')

			let active_id = store.getState().selected_chat_data!.chat.id

			let usrs = await chatController.getUsers(active_id);
			console.log(usrs)

			if (usrs) {
				this.Contacts = usrs.map((usr) => {
					let props = {
						img: {
							src: usr.avatar ? "https://ya-praktikum.tech/api/v2/resources/" + usr.avatar : no_avatar,
							alt: "аватар пользователя"},
						name: usr.display_name
					};

					return new ChatContact(props)
				})
			}
		}

		if (this.Contacts) {
			this.children.Contacts = this.Contacts
		}

		// this.ChatWrapper = new ChatWrapper({
		// 	messages: this.props.messages,
		// 	events: {
		// 		scroll: (event: any) => {
		// 			// event.target.scrollTop = this.props.messages?.length ? this.props.messages.length * 50 : 0
		// 		}
		// 	}
		// })

	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {
		if (this.Contacts && !isEqual(oldProps.contacts, newProps.contacts)) {
			this.Contacts = newProps.contacts.map((contact: UserData) => {
				let props = {img: {src: contact.avatar ? "https://ya-praktikum.tech/api/v2/resources/" + contact.avatar : no_avatar, alt: "аватар пользователя"}, name: contact.display_name}
				return new ChatContact(props)
			})

			this.children.Contacts = this.Contacts!
		}

		if (!oldProps.messages || !isEqual(oldProps.messages, newProps.messages)) {

			const m = oldProps.messages.sort((a:Message, b:Message) => {
				return new Date(b.time).getTime() - new Date(a.time).getTime()
			})

			this.messages = m.map((mess: Message) => {
				return this.createMessages(mess)
			})

			this.children.messages = this.messages!
		}

		return true
	}
}

const Chat = withStore((state) => {return {messages: state.messages![state.selected_chat!], contacts: state.selected_chat_data?.users} || {}})(ChatBase)

export default Chat;
