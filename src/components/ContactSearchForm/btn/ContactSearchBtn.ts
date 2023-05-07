import Block from "../../../utils/Block"
import template from "./ContactSearchBtn.hbs"

export interface BtnProps {
    events?: Record<string, any>
	innerText?: string
}

export default class ContactSearchBtn extends Block<BtnProps> {
	constructor(props: BtnProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {
			...this.props,
			innerText: this.props.innerText? this.props.innerText : "поиск"
		})
	}
}
