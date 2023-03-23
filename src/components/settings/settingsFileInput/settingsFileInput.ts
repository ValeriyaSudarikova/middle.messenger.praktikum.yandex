import Block from "../../../utils/Block"
import template from "./settingsFileInput.hbs"
import Input, {InputProps} from "../../input/input/input"

export interface SettingsFileInputProps {
	title: string,
	label: string,
	forClass: string
	input: InputProps
	// events: Record<string, any>
}

export default class SettingsFileInput extends Block<SettingsFileInputProps> {
	constructor(props: SettingsFileInputProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		this.children.Input = new Input({
			...this.props.input,
		})
	}
}
