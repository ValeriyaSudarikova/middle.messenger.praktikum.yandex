import Block from "../../utils/Block"
import template from "./settings.hbs"
import SettingsFileInput, {SettingsFileInputProps} from "./settingsFileInput/settingsFileInput"
import Img, {ImgProps} from "../img/img"
import SettingForm, {SettingFormProps} from "./settingsForm/settingForm";

interface SettingsProps {
	img: ImgProps,
	file: SettingsFileInputProps,
	form: SettingFormProps,
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
		this.children.settingsFileInput = new SettingsFileInput({...this.props.file})
		this.children.Form = new SettingForm({...this.props.form})

	}

}


