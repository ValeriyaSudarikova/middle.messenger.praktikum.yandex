import Block from "../../utils/Block"
import template from "./resetPasword.hbs"
import Img, {ImgProps} from "../../components/img/img"
import ResetPassForm, {ResetPassFormProps} from "./resetPassForm/resetPassForm";

interface ResetPasswordProps {
	logo: ImgProps
	form: ResetPassFormProps
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
		this.children.Form = new ResetPassForm({...this.props.form})
	}
}
