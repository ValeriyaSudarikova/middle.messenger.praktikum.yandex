import Block from "../../utils/Block"
import template from "./contacts.hbs"
import ContactItem, {ContactItemProps, createChat} from "../contactItem/contactItem"
import ChatListItem from "../chatListItem/chatListItem"
import ContactSearchForm, {ContactSearchFormProps} from "../ContactSearchForm/ContactSearchForm"
import {ChatItem} from "../../api/chats/types"
import store, {withStore} from "../../utils/Store"
import {UserData} from "../../api/auth/types"

import user from "../../img/user.png"
import ChatController from "../../controllers/ChatController"

export interface ContactsProps {
	header: string,
	flag: "contact" | "chat",
	chats?: ChatItem[] | undefined,
	contacts?: ContactItemProps[] | undefined
	search: ContactSearchFormProps,
	events: Record<string, any>
}

export default class ContactsBase extends Block<ContactsProps> {
	public chats: ChatItem[] | undefined
	public contacts: UserData[] | undefined
	constructor(props: ContactsProps) {
		super("div", props)
		this.chats = store.getState().chats?.data
		this.contacts = store.getState().contacts?.data
	}

	private CreateChat(items: ChatItem[]) {
		if (Array.isArray(items) && items[0]) {

			this.children.Items = items.map(item => {

				return new ChatListItem({...item})
			})
		}
	}

	// private CreateContact(items: UserData[]) {
	// 	if (Array.isArray(items) && items[0]) {
	// 		this.children.Items = items.map(contact => {
	// 			let status = "online"
	// 			return new ContactItem({
	// 				class: status,
	// 				contactID: contact.id,
	// 				statusClass: status,
	// 				name: contact.display_name + " " + contact.id,
	// 				img: {src: contact.avatar ? contact.avatar : user, alt: "изображение пользователя", class: "user"}
	// 			})
	// 		})
	// 	}
	// }

	async init() {
		if (this.chats && this.props.flag === "chat") {
			this.CreateChat(this.chats)
		}
		// if (this.contacts && this.props.flag === "contact") {
		// 	this.CreateContact(this.contacts)
		// }

		this.children.SearchForm = new ContactSearchForm({...this.props.search})
	}

	componentDidUpdate(oldProps: any, newProps: any) {

		if (oldProps.chats !== newProps.chats ) {
			this.chats = [...newProps.chats]
			if (this.chats) {
				//@ts-ignore
				this.children.Items = this.chats.map(chat => {
					return new ChatListItem({...chat})
				})
			}
		}

		return true
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

}

export const ContactsWithStore = withStore((state) => {return {chats: state.chats, contacts: state.contacts}})(ContactsBase)




