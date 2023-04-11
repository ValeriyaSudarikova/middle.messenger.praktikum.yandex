import Block from "../../../utils/Block"
import template from "./chatWrapper.hbs"
import {Message} from "../../../controllers/MessageController"
import store from "../../../utils/Store"
import no_avatar from "../../../icons/no_avatar.svg"
import MessageItem from "../chatItem/chatItem"
import {dateFormatter} from "../../../utils/helpers"

export interface ChatWrapperProps {
    messages: Message[] | undefined,
    events?: Record<string, any>
}

export class ChatWrapper extends Block<ChatWrapperProps> {
	constructor(props: ChatWrapperProps) {
		super("div", props)
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

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		if (Array.isArray(this.props.messages) && this.props.messages[0]) {
			const m = this.props.messages.sort((a, b) => {
				return new Date(b.time).getTime() - new Date(a.time).getTime()
			})

			this.children.messages = m.map((mess) => {
				return this.createMessages(mess)
			})
		}
	}
}
