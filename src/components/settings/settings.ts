import Block from "../../utils/Block"
import template from "./settings.hbs"
import SettingsFileInput, {SettingsFileInputProps} from "./settingsFileInput/settingsFileInput"
import SettingsInput, {SettingsInputProps} from "../SettingsInput/settingsInput/SettingsInput"
import Img, {ImgProps} from "../img/img"
import BtnSubmit, {BtnSubmitProps} from "../btnSubmit/btnSubmit"
import SettingsInputWrapper ,{SettingsInputWrapperProps} from "../SettingsInput/settingsInputWrapper"
import Input from "../input/input/input"

interface SettingsProps {
	img: ImgProps,
	file: SettingsFileInputProps,
	headerInputs: SettingsInputWrapperProps[],
	bodyInputs: SettingsInputWrapperProps[],
	submit: BtnSubmitProps,
	reset: BtnSubmitProps
}

export default class Settings extends Block<SettingsProps> {
	constructor(props: SettingsProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		this.children.userAvatar = new Img({
			...this.props.img
		})
		//todo write all events
		this.children.settingsFileInput = new SettingsFileInput({...this.props.file})
		this.children.SettingsHeaderInputs = this.props.headerInputs.map(input => {
			return new SettingsInputWrapper({...input})
		})
		this.children.SettingsInputs = this.props.bodyInputs.map(input => {
			return new SettingsInputWrapper({...input})
		})
		this.children.btnSubmit = new BtnSubmit({
			/* eslint-disable */
			//@ts-ignore
			type: this.props.submit.type,
			class: this.props.submit.class,
			label: this.props.submit.label,
			events: this.props.submit.events
		})
		/* eslint-disable */
		//@ts-ignore
		this.children.btnReset = new BtnSubmit({...this.props.reset})
	}

}


