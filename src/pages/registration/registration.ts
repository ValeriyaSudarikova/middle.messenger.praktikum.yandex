import Block from "../../utils/Block"
import template from "./registration.hbs"
import Img, {ImgProps} from "../../components/img/img"
import RegForm, {RegFormProps} from "./regForm/RegForm"
//img
import logo from "../../img/logo_black.svg"
import {getData, ShowFocusMessage} from "../../utils/helpers"
import {SignUpData} from "../../api/auth/types"
import AuthController from "../../controllers/AuthController"

export interface RegistrationProps {
	logo?: ImgProps,
	registration?: RegFormProps
}

export default class Registration extends Block<RegistrationProps> {
	constructor(props: RegistrationProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		const formData: SignUpData = {
			login: "",
			email: "",
			first_name: "",
			second_name: "",
			password: "",
			phone: ""
		}

		this.children.SectionLogo = new Img({
			src: logo,
			alt:"логотип приложения",
			class: "registration__img"
		})

		this.children.RegistrationForm = new RegForm({
			inputsp1: [
				{
					label: "введите имя",
					input: {
						type: "text",
						name: "first_name",
						class: "input fz-24",
						events: {
							focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
							blur: (Event:any) => {getData(Event, formData, Event.target.name, Event.target.value)}
						}
					}
				},
				{
					label: "введите фамилию",
					input: {
						type: "text",
						class: "input fz-24",
						name: "second_name",
						events: {
							focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
							blur: (Event:any) => {getData(Event, formData, Event.target.name, Event.target.value)}
						}
					}
				},
			],
			inputsp2: [
				{
					label: "введите телефон",
					input: {
						type: "tel",
						name: "phone",
						class: "input fz-24",
						events: {
							focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
							blur: (Event:any) => {getData(Event, formData, Event.target.name, Event.target.value)}
						}
					}

				},
				{
					label: "введите e-mail",
					input: {
						type: "email",
						name: "email",
						class: "input fz-24",
						events: {
							focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
							blur: (Event:any) => {getData(Event, formData, Event.target.name, Event.target.value)}
						}
					}
				},
			],
			inputsp3: [
				{
					label: "введите логин",
					input: {
						class: "input fz-24",
						type: "text",
						name: "login",
						events: {
							focus: (Event: any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
							blur: (Event: any) => {getData(Event, formData, Event.target.name, Event.target.value)}
						}
					}
				},
				{
					label: "введите пароль",
					input: {
						type: "password",
						class: "input fz-24",
						name: "password",
						events: {
							focus: (Event: any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
							blur: (Event: any) => {getData(Event, formData, Event.target.name, Event.target.value)}
						}
					}
				},
			],
			events: {
				submit: async (Event: any) => {
					Event.preventDefault()

					await AuthController.signup(formData)
				}
			}
		})
	}
}

