import Block from "../../utils/Block"
import template from "./homepage.hbs"
//components
import {BtnProps, Btn} from "../../components/btn/btn"
import Img, {ImgProps} from "../../components/img/img"
//img
import mainImg from "../../img/homepage.png"
import logo from "../../img/logo.svg"
import {Router} from "../../utils/Router";
import {Routes} from "../../index";
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
		this.children.CircledImg = new Img({
			class: "homepage__circle_img",
			src: mainImg,
			alt: "изображние домашней страницы"
		})
		this.children.Logo = new Img({
			class: "homepage__logo",
			src: logo,
			alt: "логотип приложения"
		})
		this.children.btnSignIn = new Btn({
			type: "button",
			class: "homepage",
			href: "/sign-in",
			label: "Вход",
			events: {
				click: (event: any) => {
					Router.go(Routes.signIn);
				}
			}
		})
		this.children.btnRegistration = new Btn({
			type: "button",
			class: "homepage",
			href: "/registration",
			label: "Регистрация",
			events: () => {
				Router.go(Routes.registration);
			}
		})
	}
}
