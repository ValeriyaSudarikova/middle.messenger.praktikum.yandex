import Block from "../../../utils/Block"
import template from "./settingInputLabel.hbs"

export interface SettingsInputLabelProps {
	text: string,
	subtitle: string,
	// forClass: string
}

export default class SettingsInputLabel extends Block<SettingsInputLabelProps> {
	constructor(props) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
