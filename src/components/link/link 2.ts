import Block from "../../utils/Block"
import template from "./link.hbs"

export interface linkProps {
	href: string,
	class: string,
	text: string,
	events: Record<string, any>
}

export default class Link extends Block<linkProps> {
	constructor(props: linkProps) {
		super("div",props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
