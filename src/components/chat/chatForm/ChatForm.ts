import Block from "../../../utils/Block"
import template from "./chatForm.hbs"
//components
import {ChatFileInputProps} from "../chatFileInput/chatFileInput"
import ChatInput, {ChatInputProps} from "../chatInput/chatInput"
import BtnSubmit, {BtnSubmitProps} from "../../btnSubmit/btnSubmit"

export interface FormProps {
    class: string,
    file: ChatFileInputProps,
    input: ChatInputProps,
    btn: BtnSubmitProps,
    events: Record<string, any>
}

export default class ChatMessageForm extends Block<FormProps> {
	public newMessage: string | undefined
	constructor(props: FormProps) {
		super("div", props)
		this.newMessage = undefined
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		this.children.chatInput = new ChatInput(this.props.input)
		this.children.submitBtn = new BtnSubmit(this.props.btn)
	}
}
