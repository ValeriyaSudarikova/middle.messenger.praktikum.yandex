import Block from "../../../utils/Block"
import template from "./ChatContact.hbs"
import Img, {ImgProps} from "../../img/img"

export interface ChatContactProps {
    img: ImgProps;
    name: string
}

export default class ChatContact extends Block<ChatContactProps> {
	constructor(props: ChatContactProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		this.children.ContactImg = new Img({...this.props.img, class: "chat__contact-wrapper-img"})
		// this.children.ContactDisplayedName =
	}
}
