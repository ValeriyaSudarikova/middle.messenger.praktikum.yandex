import Block from "../../../utils/Block"
import template from "./inputLabel.hbs"

interface InputLabelProps {
	label: string
}

export class InputLabel extends Block<InputLabelProps> {
	constructor(props: InputLabelProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
