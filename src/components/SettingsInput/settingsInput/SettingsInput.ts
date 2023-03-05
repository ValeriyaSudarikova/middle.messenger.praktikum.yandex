import Block from "../../../utils/Block"
import template from "./settingsInput.hbs"

export interface SettingsInputProps {
	type: string,
	name: string,
	placeholder: string,
	value: string,
	required?: boolean,
	events: Record<string, any>
}

export default class SettingsInput extends Block<SettingsInputProps> {
	constructor(props: SettingsInputProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {
			type: this.props.type,
			name: this.props.name,
			placeholder: this.props.placeholder,
			value: this.props.value,
			required: this.props.required ? null : "required",
			events: this.props.events
		})
	}

}
