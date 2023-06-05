import Block from "../../utils/Block"
import template from "./ContactSearchForm.hbs"
//components
import ContactSearchInput, {InputProps} from "./input/ContactSearchInput"
import ContactSearchBtn, {BtnProps} from "./btn/ContactSearchBtn"
import {LabelProps} from "./label/label"
import {InputLabel} from "../input/label/inputLabel"

export interface ContactSearchFormProps {
    input: InputProps,
    label: LabelProps,
    btn: BtnProps,
    events: Record<string, any>
}

export class ContactSearchForm extends Block<ContactSearchFormProps> {
	constructor(props: ContactSearchFormProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {
			...this.props,
		})
	}

	protected init() {
		this.children.Label = new InputLabel({...this.props.label, class: "contacts__footer-label"})
		this.children.Input = new ContactSearchInput({...this.props.input})
		this.children.Btn = new ContactSearchBtn({...this.props.btn})
	}
}
