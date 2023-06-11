import Block from "../../utils/Block"
import template from "./inputWrapper.hbs"
import {InputLabel} from "./label/inputLabel"
import Input from "./input/input"

export interface InputWrapperProps {
	label: string,
	input: {
		type: string,
		name: string,
		class: string
		events: Record<string, any>
	}

}

export default class InputWrapper extends Block<InputWrapperProps> {
	constructor(props: InputWrapperProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		this.children.label = new InputLabel({
			label: this.props.label
		})

		this.children.Input = new Input({
			...this.props.input
		})
	}
}
