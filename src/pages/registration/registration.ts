import Block from "../../utils/Block"
import template from "./registration.hbs"
import Img, {ImgProps} from "../../components/img/img"
import RegForm, {RegFormProps} from "./regForm/RegForm";

export interface RegistrationProps {
	logo: ImgProps,
	registration: RegFormProps
}

export default class Registration extends Block<RegistrationProps> {
	constructor(props: RegistrationProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		this.children.SectionLogo = new Img({...this.props.logo});
		this.children.RegistrationForm = new RegForm({...this.props.registration})
	}
}

