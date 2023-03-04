import Block from "../../../utils/Block"
import template from "./chatFileInput.hbs"
//components
import Label, {LabelProps} from "./label/label"
//icons
import add from "../../../icons/add.svg"

interface ChatFileInputProps {
	name: string,
	type: string,
	id: string,
	class: string,
	label: LabelProps
	events: Record<string, any>
}

export default class ChatFileInput extends Block<ChatFileInputProps> {
	constructor(props: ChatFileInputProps) {
		super("div", props)
	}

	init() {
		this.children.label = new Label({
			forClass: "input__file",
			class: "input__file-button",
			labelImg: {src: add, alt: "Выбрать файл", class: "input__file-icon"}
		})
	}
	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
