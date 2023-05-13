import Block from "../../utils/Block"
import template from "./contactItem.hbs"
import Img, {ImgProps} from "../img/img"
import BtnSubmit from "../btnSubmit/btnSubmit"
import mess from "../../icons/message.svg"
import delIcon from "../../icons/trash.svg"

export interface ContactItemProps {
	class?: string,
	contactID: number,
	statusClass: string,
	name: string,
	status?: string,
	img: ImgProps
}

export const createChat = (Event: any, data: any) => {

	const chatWrapper = document.querySelector(".main")
	const contacts = document.querySelector(".contacts")
	// const chat = new Chat({
	// 	contact: data,
	// 	messages: [
	// 		{
	// 			class: "to",
	// 			message: data.messageText ? data.messageText : "",
	// 			img: data.img
	// 		}
	// 	]
	// })
	// contacts!.classList.add("hidden")
	// chatWrapper!.append(chat.getContent()!)
}

class ContactItem extends Block<ContactItemProps> {
	constructor(props: ContactItemProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		this.children.activeContactImg = new Img({...this.props.img})
		this.children.message = new BtnSubmit({
			type: "button",
			class: "contacts__list_item-btn mess",
			label: new Img({src: mess, alt:"сообщение"}),
			events: {
				click: (Event: Event, data: any = this.props) => {createChat(Event, data)}
			}
		})
		this.children.del = new BtnSubmit({
			type: "button",
			class: "contacts__list_item-btn trash",
			label: new Img({src:delIcon, alt:"удаление"}),
			events: {
			}
		})
	}
}
export default ContactItem
