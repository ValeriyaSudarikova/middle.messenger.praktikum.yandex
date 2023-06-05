import Block from "../../utils/Block"
import template from "./resetPasword.hbs"
import Img, {ImgProps} from "../../components/img/img"
import ResetPassForm, {ResetPassFormProps} from "./resetPassForm/resetPassForm"
//img
import logoblack from "../../img/logo_black.svg"
import {getData, InputNames, ShowFocusMessage} from "../../utils/helpers"
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
		const formData: any = {}
		this.children.LogoBlack = new Img({
			src: logoblack,
			alt: "логотип приложения",
			class: "registration__img"
		})
		this.children.Form = new ResetPassForm({
			class: "reset__form",
			inputs: [
				{
					label: "введите логин",
					input: {
						class: "input fz-24",
						type: "text",
						name: "login",
						events: {
							focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
							blur: (Event:any) => {getData(Event, formData, Event.target.name, Event.target.value)}
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
							focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
							blur: (Event:any) => {getData(Event, formData, Event.target.name, Event.target.value)}
						}
					}
				},
				{
					label: "повторите пароль",
					input: {
						type: "password",
						class: "input fz-24",
						name: "repeat_password",
						events: {
							focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
							blur: (Event:any) => {getData(Event, formData, Event.target.name, Event.target.value)}
						}
					}
				},
			],
			submit: {
				type: "submit",
				class: "btn fz-30 submit",
				label: "сбросить пароль"
			},
			events: {
				submit: (Event: any) => {
					Event.preventDefault()
					if (formData[InputNames.pass] !== formData[InputNames.repPass]) {
						const elem = document.querySelector("button")
						const error = document.createElement("span")
						error.classList.add("errored_message")
						error.innerHTML = "Пароли не совпадают"
						error.style.color = "white"
						error.style.marginLeft = "30%"
						elem!.after(error)

						setTimeout(() => {
							error.remove()
						}, 3000)
					}
				}
			}
		})
	}
}
