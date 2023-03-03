import Block from "../../../utils/Block"
import template from "./settingsInput.hbs"
import SettingsInputLabel,
{SettingsInputLabelProps}
	from "../settingInputLabel/SettingsInputLabel"

export interface SettingsInputProps {
	type: string,
	name: string,
	placeholder: string,
	value: string
	events: Record<string, any>
}

export default class SettingsInput extends Block<SettingsInputProps> {
	constructor(props: SettingsInputProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

}
