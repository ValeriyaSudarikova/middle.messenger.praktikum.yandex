import Block from "../../../utils/Block"
import template from "./headerText.hbs"

export interface TextProps {
    text: string
}

export default class Text extends Block<TextProps> {
	constructor(props: TextProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
