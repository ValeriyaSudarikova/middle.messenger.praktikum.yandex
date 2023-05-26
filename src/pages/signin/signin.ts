import Block from "../../utils/Block"
import template from "./signin.hbs"
import Img,{ImgProps} from "../../components/img/img"
import {Link, linkProps} from "../../components/link/link"
import SigninForm, {SigninFormProps} from "./signinForm/signinForm"
//helpers
import {login, ShowFocusMessage} from "../../utils/helpers"
//img
import logo from "../../img/logo.svg"
import AuthController from "../../controllers/AuthController"
import {SignInData} from "../../api/auth/types"
import Router from "../../utils/Router"
import {Routes} from "../../index"

export interface SigninProps {
	form?: SigninFormProps,
	logo?: ImgProps,
	link?: linkProps
}

export default class Signin extends Block<SigninProps> {
	constructor(props: SigninProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		const loginData: SignInData = {login: "", password: ""}

		this.children.Form = new SigninForm({
			inputs: [
				{
					label: "введите логин",
					input: {
						class: "input fz-24",
						type: "text",
						name: "login",
						events: {
							focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message-dark")},
							blur: (Event: any) => {login(Event, loginData, Event.target.name, Event.target.value)}
						}
					}
				},
				{
					label: "введите пароль",
					input: {
						class: "input fz-24",
						type: "password",
						name: "password",
						events: {
							focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message-dark")},
							blur: (Event: any) => {login(Event, loginData, Event.target.name, Event.target.value)}
						}
					}
				}
			],
			submit: {
				class: "btn fz-30 signin__form_submit",
				type: "submit",
				label: "Войти"
			},
			events: {
				submit: (Event: any) => {
					Event.preventDefault()

					if (loginData.login && loginData.password) {
						AuthController.signin(loginData)
					}
				}
			}
		})

		this.children.Logo = new Img({
			src: logo,
			alt: "логотип приложения",
			class: "signin__logo"
		})
		this.children.ResetPassLink = new Link({
			class: "signin__link fz-30 colored",
			text: "еще не зарегистрированы?",
			href: Routes.registration,
		})
	}
}
