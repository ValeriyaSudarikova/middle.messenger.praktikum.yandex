import Block from "../../utils/Block"
import template from "./homepage.hbs"
//components
import {BtnProps, Btn} from "../../components/btn/btn"
import Img, {ImgProps} from "../../components/img/img"
//img
import mainImg from "../../img/homepage.png";
import logo from "../../img/logo.svg";
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
			// events: {
			// 	click: (Event: any) => {
			// 		Event.preventDefault()
			// 		const cntnr = document.querySelector(".container")
			// 		const bcgrnd = document.querySelector(".background")
			// 		let signInData: SignInData = {login: "", password: ""}
			// 		const signin = new Signin({
			// 			form: {
			// 				inputs: [
			// 					{
			// 						label: "введите логин",
			// 						input: {
			// 							class: "input fz-24",
			// 							type: "text",
			// 							name: "login",
			// 							events: {
			// 								focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message-dark")},
			// 								blur: (Event:any) => {login(Event, signInData, Event.target.name, Event.target.value)}
			// 							}
			// 						}
			// 					},
			// 					{
			// 						label: "введите пароль",
			// 						input: {
			// 							type: "password",
			// 							class: "input fz-24",
			// 							name: "password",
			// 							events: {
			// 								focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message-dark")},
			// 								blur: (Event:any) => {login(Event, signInData, Event.target.name, Event.target.value)}
			// 							}
			// 						}
			// 					},
			// 				],
			// 				submit: {
			// 					class:"btn fz-30 signin__form_submit",
			// 					type: "submit",
			// 					label: "Войти",
			// 				},
			// 				events: {
			// 					submit: (Event: any) => {
			// 						Event.preventDefault();
			// 						if (signInData.login && signInData.password) {
			// 							AuthController.signin(signInData)
			// 						} else {
			// 							let error = document.createElement("span");
			// 							let btn = document.querySelector("button");
			// 							error.innerHTML = "Проверьте корректность данных и повторите попытку входа";
			// 							error.classList.add(".errored__message-dark");
			// 							btn?.after(error);
			// 							setTimeout(() => {
			// 								error.remove()
			// 							}, 3000)
			// 						}
			// 					}
			// 				},
			// 			},
			// 			logo: {
			// 				src: logo,
			// 				alt: "логотип приложения",
			// 				class: "signin__logo"
			// 			},
			// 			link: {
			// 				class: "signin__link fz-30 colored",
			// 				text: "Забыли пароль?",
			// 				href: "/reset-password",
			// 				Router: Router
			// 				// events: {
			// 				// 	click: (Event: any) => {
			// 				// 		Event.preventDefault()
			// 				// 		const body = document.querySelector("body")
			// 				// 		const cntnr = document.querySelector(".background")
			// 				// 		const reset = new ResetPassword({
			// 				// 			logo: {
			// 				// 				src: logoblack,
			// 				// 				alt: "логотип приложения",
			// 				// 				class: "registration__img"
			// 				// 			},
			// 				// 			form: {
			// 				// 				class: "reset__form",
			// 				// 				inputs: [
			// 				// 					{
			// 				// 						label: "введите логин",
			// 				// 						input: {
			// 				// 							class: "input fz-24",
			// 				// 							type: "text",
			// 				// 							name: "login",
			// 				// 							events: {
			// 				// 								focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
			// 				// 								blur: (Event:any) => {getData(Event, Event.target.name, Event.target.value)}
			// 				// 							}
			// 				// 						}
			// 				// 					},
			// 				// 					{
			// 				// 						label: "введите пароль",
			// 				// 						input: {
			// 				// 							type: "password",
			// 				// 							class: "input fz-24",
			// 				// 							name: "password",
			// 				// 							events: {
			// 				// 								focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
			// 				// 								blur: (Event:any) => {getData(Event, Event.target.name, Event.target.value)}
			// 				// 							}
			// 				// 						}
			// 				// 					},
			// 				// 					{
			// 				// 						label: "повторите пароль",
			// 				// 						input: {
			// 				// 							type: "password",
			// 				// 							class: "input fz-24",
			// 				// 							name: "repeat_password",
			// 				// 							events: {
			// 				// 								focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
			// 				// 								blur: (Event:any) => {getData(Event, Event.target.name, Event.target.value);}
			// 				// 							}
			// 				// 						}
			// 				// 					},
			// 				// 				],
			// 				// 				submit: {
			// 				// 					type: "submit",
			// 				// 					class: "btn fz-30 submit",
			// 				// 					label: "сбросить пароль",
			// 				// 				},
			// 				// 				events: {
			// 				// 					submit: (Event: any) => {
			// 				// 						Event.preventDefault();
			// 				// 						if (FormData[InputNames.pass] === FormData[InputNames.repPass]) {
			// 				// 							console.log('pass reset, current user data: ', FormData)
			// 				// 						} else {
			// 				// 							let elem = document.querySelector("button");
			// 				// 							let error = document.createElement("span");
			// 				// 							error.classList.add("errored_message");
			// 				// 							error.innerHTML = "Пароли не совпадают";
			// 				// 							error.style.color = "white";
			// 				// 							error.style.marginLeft = "30%"
			// 				// 							elem!.after(error)
			// 				// 						}
			// 				// 					}
			// 				// 				}
			// 				// 			}
			// 				//
			// 				// 		})
			// 				// 		cntnr!.remove()
			// 				// 		body!.append(reset.getContent()!)
			// 				// 	}
			// 				// }
			// 			}
			// 		})
			// 		cntnr!.remove()
			// 		bcgrnd!.append(signin.getContent()!)
			// 	}
			// }
		})
		this.children.btnRegistration = new Btn({
			type: "button",
			class: "homepage",
			href: "/registration",
			label: "Регистрация",
		})
	}
}
