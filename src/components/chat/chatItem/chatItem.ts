import Block from "../../../utils/Block"
import template from "./chatItem.hbs"
//components
import Img from "../../img/img"

export interface ChatItemProps {
	class: "from" | "to",
	message: string | null,
	img: imgProps
}

interface imgProps {src: string, alt: string}

export default class ChatItem extends Block<ChatItemProps> {
	constructor(props: ChatItemProps) {
		super("div", props)
	}

	init() {
		this.children.chatItemImg = new Img({...this.props.img})
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
