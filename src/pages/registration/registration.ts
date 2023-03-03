import Block from "../../utils/Block"
import template from "./registration.hbs"
import Img, {ImgProps} from "../../components/img/img"
import Input, {InputProps} from "../../components/input/input/input"
//img
import next from "../../icons/next1.svg"
import BtnSubmit from "../../components/btnSubmit/btnSubmit"
import InputWrapper, {InputWrapperProps} from "../../components/input/inputWrapper"

export interface RegistrationProps {
	logo: ImgProps,
	inputsp1: InputWrapperProps[],
	inputsp2: InputWrapperProps[],
	inputsp3: InputWrapperProps[],
	submit: {
		events: Record<string, any>
	}
}

export default class Registration extends Block<RegistrationProps> {
	constructor(props: RegistrationProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		let clickCounter = 0
		const {submit} = this.props

		this.children.SectionLogo = new Img({...this.props.logo})
		this.children.InputsP1 = this.props.inputsp1.map(input => {
			return new InputWrapper(input)
		})
		this.children.InputsP2 = this.props.inputsp2.map(input => {
			return new InputWrapper(input)
		})
		this.children.InputsP3 = this.props.inputsp3.map(input => {
			return new InputWrapper(input)
		})
		this.children.next = new BtnSubmit({
			/* eslint-disable */
			//@ts-ignore
			type: "button",
			class: "registration__form_pagination-trigger",
			label: new Img({src: next, alt: "далее"}),
			events: {
				click: (Event: any) => {
					clickCounter += 1

					const inputsPages = document.querySelectorAll(".registration__form_inputs")
					const inputsPagination = document.querySelectorAll(".registration__form_pagination-item")

					function hideContent() {
						inputsPages.forEach(page => page.classList.remove("active"))
						inputsPagination.forEach(pag => pag.classList.remove("active"))
					}

					function showContent(i = 0) {
						inputsPages[i].classList.add("active")
						inputsPagination[i].classList.add("active")
					}

					if (clickCounter < 4) {
						hideContent()
						showContent(clickCounter - 1)
					} else {
						clickCounter = 1
						hideContent()
						showContent(clickCounter - 1)
					}

				}
			}
		})
		this.children.Submit = new BtnSubmit({
			//@ts-ignore
			type: "submit",
			class: "btn fz-30 submit",
			label: "Регистрация",
			events: this.props.submit.events
		})
		/* eslint-disable */
	}
}

