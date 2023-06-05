import Block from "../../utils/Block"
import template from "./chat.hbs"
//components
import {ChatItem} from "../../api/chats/types"
import {ContactSearchForm} from "../ContactSearchForm/ContactSearchForm"
import ChatContact from "./chatContact/ChatContact"
import MessageItem from "./chatItem/chatItem"
import ChatMessageForm from "./chatForm/ChatForm"
import Img, {ImgProps} from "../img/img"
//icons
import send from "../../icons/send.svg"
import add from "../../icons/add.svg"
import no_avatar from "../../icons/no_avatar.svg"
import no_chat_avatar from "../../img/chat.png"
//utils
import {messagesController, Message} from "../../controllers/MessageController"
import store, {withStore} from "../../utils/Store"
import {chatsController} from "../../controllers/ChatController"
import {dateFormatter} from "../../utils/helpers"
import {UserData} from "../../api/auth/types"


export interface ChatProps {
	selectedChat: ChatItem,
	ChatName?: string,
	contacts?:  UserData[],
	messages?: Message[],
}

class ChatBase extends Block<ChatProps> {
	public newID: number | undefined
	public ChatName: string | undefined
	ChatId: number | undefined
	public Contacts: ChatContact[] | undefined
	public current_offset: number
	public messages: MessageItem[] | undefined

	constructor(props: ChatProps) {
		super("div", props)
		this.ChatName = this.props.ChatName
		this.current_offset = 0

	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	returnUsersAvatar(users: UserData[], id: number): ImgProps | undefined {
		if (users && users[0]) {
			const user = users.filter((user) => {return user.id === id})

			let UserImg

			if (user[0]) {
				UserImg = {
					src: "https://ya-praktikum.tech/api/v2/resources" + user[0].avatar,
					alt: "аватар пользователя"
				}
			}

			return UserImg
		}
	}

	createMessages(message: Message, users: UserData[]): MessageItem {

		const myId = store.getState().user!.data.id

		const cls: "from" | "to" = message.user_id !== myId ? "to" : "from"

		const UserImg = this.returnUsersAvatar(users, message.user_id)

		const imgProps = UserImg ? UserImg : {src: no_avatar, alt: "аватар пользователя"}

		return new MessageItem({class: cls, message: message.content, img: imgProps, date: dateFormatter(new Date(message.time))})

	}

	async init() {
		let newMessage = ""

		this.children.ChatLogo = new Img({
			src: this.props.selectedChat.avatar ? "https://ya-praktikum.tech/api/v2/resources" + this.props.selectedChat.avatar : no_chat_avatar,
			alt: "аватар чата",
			class: "chat__avatar"
		})

		if (this.props.messages && this.props.messages[0]) {

			this.messages = this.props.messages.sort((a, b) => {
				return new Date(b.time).getTime() - new Date(a.time).getTime()
			}).map((mess) => {
				return this.createMessages(mess, this.props.contacts!)
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
						this.newID = Event.target.value
					}
				}
			},
			label: {
				label: "добавить контакт"
			},
			btn: {
				innerText: "добавить",
				events: {}
			},
			events: {
				submit: (Event: any) => {
					Event.preventDefault()

					if (this.newID) {
						chatsController.addUserToChat(this.props.selectedChat.id, this.newID!)
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
					},
				}
			},
			input: {
				type: "text",
				class: "chat__input-mess",
				events: {
					change: (event: any) => {
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
				events: {},
			},
			events: {
				keyup: (event: any) => {
					if (event.code === "Enter" && newMessage) {

						event.target.submit()

						newMessage = ""
					}
				},
				submit: (event: any) => {
					event.preventDefault()

					if (newMessage) {
						messagesController.sendMessage(this.props.selectedChat.id, newMessage)

						event.target.reset()
					}
				}
			},
			class: "chat__form"
		})

		if (this.props.contacts && this.props.contacts[0]) {

			this.Contacts = this.props.contacts.map((contact ) => {
				const props = {
					img: {
						src: contact.avatar ? "https://ya-praktikum.tech/api/v2/resources/" + contact.avatar : no_avatar,
						alt: "аватар пользователя"},
					name: contact.display_name
				}

				return new ChatContact(props)
			})
		}

		if (this.Contacts) {
			this.children.Contacts = this.Contacts
		}

	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {
		if (newProps.contacts !== oldProps.contacts) {

			this.Contacts = newProps.contacts.map((contact: UserData) => {
				const props = {img: {src: contact.avatar ? "https://ya-praktikum.tech/api/v2/resources/" + contact.avatar : no_avatar, alt: "аватар пользователя"}, name: contact.display_name}
				return new ChatContact(props)
			})

			if (this.Contacts) {
				this.children.Contacts = this.Contacts
			}
		}

		if (oldProps.messages && newProps.messages && Object.values(oldProps.messages) !== Object.values(newProps.messages)) {

			const state = store.getState()

			if (state.messages && state.messages[state.selected_chat_data?.chat.id!]) {
				this.messages = state.messages[state.selected_chat_data?.chat.id!].sort((a: Message, b: Message) => {
					return new Date(b.time).getTime() - new Date(a.time).getTime()
				}).map((mess: Message) => {
					return this.createMessages(mess, newProps.contacts)
				})
			}

			if (this.messages) {
				this.children.messages = this.messages
			}
		}
		return true
	}
}

export const Chat = withStore((state) => {return {messages: state.messages, contacts: state.selected_chat_data?.users} || {}})(ChatBase)

// export default Chat;
