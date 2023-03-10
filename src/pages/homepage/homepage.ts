import Block from "../../utils/Block"
import template from "./homepage.hbs"
//components
import Btn, {BtnProps} from "../../components/btn/btn"
import Img, {ImgProps} from "../../components/img/img"

export interface HomepageProps {
	circledImg: ImgProps,
	logo: ImgProps,
	signin: BtnProps,
	registration: BtnProps
}

export default class Homepage extends Block<HomepageProps> {
	constructor(props: HomepageProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		this.children.CircledImg = new Img({...this.props.circledImg})
		this.children.Logo = new Img({...this.props.logo})
		this.children.btnSignIn = new Btn({...this.props.signin})
		this.children.btnRegistration = new Btn({...this.props.registration})
	}
}
