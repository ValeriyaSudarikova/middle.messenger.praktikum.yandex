import Block from "../../utils/Block"
import template from "./errorMessage.hbs"
import Img, {ImgProps} from "../img/img"

export interface ErrorMessageProps {
	img: ImgProps
}

export default class ErrorMessage extends Block<ErrorMessageProps> {
	constructor(props: ErrorMessageProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	protected init() {
		this.children.Img = new Img({...this.props.img})
	}
}
