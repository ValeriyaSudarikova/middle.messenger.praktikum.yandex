import Block from "../../../utils/Block"
import template from "./headerText.hbs"

export interface HeaderTextProps {
	userName: string,
	userStatus: string
}

export default class HeaderText extends Block<HeaderTextProps> {
	constructor(props: HeaderTextProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
