import Block from "../../../utils/Block"
import template from "./chatItem.hbs"
//components
import Img from "../../img/img"

export interface MessageProps {
	class: "from" | "to",
	message: string | null,
	date: string,
	img: imgProps
}

interface imgProps {src: string, alt: string}

export default class MessageItem extends Block<MessageProps> {
	constructor(props: MessageProps) {
		super("div", props)
	}

	init() {
		this.children.chatItemImg = new Img(this.props.img)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
