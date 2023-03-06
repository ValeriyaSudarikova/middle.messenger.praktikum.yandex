import Block from "../../utils/Block"
import template from "./contacts.hbs"
import ContactItem, {ContactItemProps} from "../contactItem/contactItem"
import ChatItem, {ChatItemProps} from "../chat/chatItem/chatItem"
import ChatListItem, {ChatListItemProps} from "../chatListItem/chatListItem"

interface ContactsProps {
	header: string,
	flag: "contact" | "chat"
	ItemsProps: ContactItemProps[] | ChatListItemProps[]
}


export default class Contacts extends Block<ContactsProps> {
	constructor(props: ContactsProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		const Items = this.props.ItemsProps
		if (this.props.flag === "contact") {
			this.children.Items = Items.map(item => {
				/* eslint-disable */
				//@ts-ignore
				return new ContactItem({...item})
			})
		}
		if (this.props.flag === "chat") {
			this.children.Items = Items.map(item => {
				//@ts-ignore
				return new ChatListItem({...item})
			})
			/* eslint-disable */
		}
	}

}
