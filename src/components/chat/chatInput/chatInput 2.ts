import Block from "../../../utils/Block"
import template from "./chatInput.hbs"

interface ChatInputProps {
	type: string,
	class: string
	events: Record<string, any>
}
export default class ChatInput extends Block<ChatInputProps> {
	constructor(props: ChatInputProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
