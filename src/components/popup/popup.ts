import Block from "../../utils/Block"
import template from "./popup.hbs"
import BtnSubmit, {BtnSubmitProps} from "../btnSubmit/btnSubmit"

interface PopupProps {
	popupText: string,
	btns: BtnSubmitProps[]
}

export default class Popup extends Block<PopupProps> {
	constructor(props: PopupProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {

		this.children.Btns = this.props.btns.map(btn => {
			/* eslint-disable */
			//@ts-ignore
			return new BtnSubmit({...btn})
		})
	}
}
