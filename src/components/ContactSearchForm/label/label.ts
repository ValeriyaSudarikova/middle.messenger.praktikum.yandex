import Block from "../../../utils/Block"
import template from "./label.hbs"
export interface LabelProps {
    label: string
}

export default class InputLabel extends Block<LabelProps> {
	constructor(props: LabelProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
