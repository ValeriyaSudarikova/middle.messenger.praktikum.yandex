import Block from "../../../utils/Block"
import template from "./input.hbs"

export interface InputProps {
	type: string,
	class: string,
	name: string,
	events: Record<string, any>
}

export default class Input extends Block<InputProps> {
	constructor(props: InputProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {
			...this.props
		})
	}
}
