import template from "./btnSubmit.hbs"
import Block from "../../utils/Block"
import Img from "../img/img"

export interface BtnSubmitProps {
	type: string,
	class: string,
	label?: string | Img,
	disabled?: string,
	events?: Record<string, any>
}

class BtnSubmit extends Block<BtnSubmitProps> {
	constructor(props: BtnSubmitProps) {
		super("div", props)
	}

	protected render():DocumentFragment {
		return this.compile(template, {
			type: this.props.type,
			class: this.props.class,
			label: this.props.label ? this.props.label : null,
			disabled: this.props.disabled ? this.props.disabled : null,
			events: this.props.events
		})
	}

}

export default BtnSubmit
