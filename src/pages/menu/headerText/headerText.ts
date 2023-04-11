import Block from "../../../utils/Block"
import template from "./headerText.hbs"
import Text, {TextProps} from "../../../components/header/text/headerText"
import {isEqual} from "../../../utils/helpers"

export interface HeaderTextProps {
	userName: string,
	userStatus: string
}

export default class HeaderText extends Block<HeaderTextProps> {
	public userName: Text | undefined
	public userStatus: Text | undefined
	constructor(props: HeaderTextProps) {
		super("div", props)
		this.userName = undefined
		this.userStatus = undefined
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	protected init() {
		this.children.userName = new Text({text: this.props.userName})
		this.children.userStatus = new Text({text: this.props.userStatus})
	}
}
