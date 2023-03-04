import Block from "../../utils/Block"
import template from "./settingsInputWrapper.hbs"
import SettingsInput, {SettingsInputProps} from "./settingsInput/SettingsInput"
import SettingsInputLabel, {SettingsInputLabelProps} from "./settingInputLabel/SettingsInputLabel"

export interface SettingsInputWrapperProps {
	input: SettingsInputProps,
	label: SettingsInputLabelProps
}

export default class SettingsInputWrapper extends Block<SettingsInputWrapperProps> {
	constructor(props) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		this.children.InputLabel = new SettingsInputLabel({...this.props.label})
		this.children.SetInput = new SettingsInput({...this.props.input})
	}
}
