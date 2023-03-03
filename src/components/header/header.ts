import Block from "../../utils/Block"
import template from "./header.hbs"

interface HeaderProps {
	header: string
}

export default class Header extends Block<HeaderProps> {

	constructor(props: HeaderProps) {
		super("div", props)
	}
	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
