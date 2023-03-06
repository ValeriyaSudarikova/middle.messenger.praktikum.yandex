import Block from "../../utils/Block"
import template from "./btn.hbs"
export interface BtnProps {
	type: string,
	class: string,
	href?: string,
	label: string,
	events: Record<string, any>
}
export default class Btn extends Block<BtnProps> {
	constructor(props: BtnProps) {
		super("div", props)
	}
	protected render():DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
