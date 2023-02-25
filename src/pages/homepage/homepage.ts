import template from "./homepage.hbs";
import Btn from '../../components/btn/btn'
import Block from "../../utils/Block";

export default class Homepage extends Block {
	constructor() {
		super('div', {})
	}

	init() {
		this.children.btnSignIn = new Btn({
			type: 'button',
			class: "homepage",
			href: "./src/partials/pages/signin.hbs",
			label: "Вход"
		});
		this.children.btnRegistration = new Btn({
			label:"Регистрация",
			href:"./src/partials/pages/registration.hbs",
			type:"button",
			class:"homepage"
		})
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props)
	}
}
