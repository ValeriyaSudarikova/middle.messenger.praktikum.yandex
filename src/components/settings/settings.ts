import Block from "../../utils/Block"
import template from "./settings.hbs"
import SettingsFileInput, {SettingsFileInputProps} from "./settingsFileInput/settingsFileInput"
import Img, {ImgProps} from "../img/img"
import SettingForm, {SettingFormProps} from "./settingsForm/settingForm";
import {Btn,BtnProps} from "../btn/btn";
import Avatar from "../img/avatar/avatar";
import {withStore} from "../../utils/Store";

export interface SettingsProps {
	img: ImgProps,
	file: SettingsFileInputProps,
	form: SettingFormProps,
	id: number
}

export default class SettingsBase extends Block<SettingsProps> {
	constructor(props: SettingsProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		this.children.userAvatar = new Img({
			...this.props.img
		});
		this.children.settingsFileInput = new SettingsFileInput({...this.props.file});
		this.children.Form = new SettingForm({...this.props.form});

	}

	protected componentDidUpddate(oldProps: SettingsProps, newProps: SettingsProps) {
		console.log("upd settings", newProps)
	}

}

export const Settings = withStore((state) => {return state.user})(SettingsBase)


