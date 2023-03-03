import Block from "../../utils/Block"
import template from "./resetPasword.hbs"
import InputWrapper, {InputWrapperProps} from "../../components/input/inputWrapper"
import Img, {ImgProps} from "../../components/img/img"
import BtnSubmit, {BtnSubmitProps} from "../../components/btnSubmit/btnSubmit"

interface ResetPasswordProps {
	logo: ImgProps
	inputs: InputWrapperProps[],
	submit: BtnSubmitProps
}

export default class ResetPassword extends Block<ResetPasswordProps> {
	constructor(props: ResetPasswordProps) {
		super("div",props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		this.children.LogoBlack = new Img({...this.props.logo})
		this.children.Inputs = this.props.inputs.map(input => {
			return new InputWrapper({...input})
		})
		/* eslint-disable */
		//@ts-ignore
		this.children.Submit = new BtnSubmit({...this.props.submit})
	}
}
