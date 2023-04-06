import Block from "../../../utils/Block"
import template from "./chatForm.hbs"
//components
import ChatFileInput, {ChatFileInputProps} from "../chatFileInput/chatFileInput"
import ChatInput, {ChatInputProps} from "../chatInput/chatInput"
import BtnSubmit, {BtnSubmitProps} from "../../btnSubmit/btnSubmit"
//icons
import add from "../../../icons/add.svg"
import Img from "../../img/img"
import send from "../../../icons/send.svg"
import store from "../../../utils/Store"

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
		this.children.fileInput = new ChatFileInput(this.props.file)

		this.children.chatInput = new ChatInput(this.props.input)
		this.children.submitBtn = new BtnSubmit(this.props.btn)
	}
}
