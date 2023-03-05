import Block from "../../utils/Block"
import template from "./signin.hbs"
import Img,{ImgProps} from "../../components/img/img"
import Link, {linkProps} from "../../components/link/link"
import SigninForm, {SigninFormProps} from "./signinForm/signinForm";

export interface SigninProps {
	form: SigninFormProps,
	logo: ImgProps,
	link: linkProps
}

export default class Signin extends Block<SigninProps> {
	constructor(props: SigninProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		this.children.Form = new SigninForm({...this.props.form})
		this.children.Logo = new Img({...this.props.logo})
		this.children.ResetPassLink = new Link({...this.props.link})
	}
}
