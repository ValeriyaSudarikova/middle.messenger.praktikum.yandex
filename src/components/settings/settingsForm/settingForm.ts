import Block from "../../../utils/Block";
import template from "./SettingsForm.hbs";
import SettingsInputWrapper, {SettingsInputWrapperProps} from "../../SettingsInput/settingsInputWrapper";
import BtnSubmit, {BtnSubmitProps} from "../../btnSubmit/btnSubmit";

export interface SettingFormProps {
    bodyInputs: SettingsInputWrapperProps[],
    submit: BtnSubmitProps,
    reset: BtnSubmitProps,
    events: Record<string, any>
}

export default class SettingForm extends Block<SettingFormProps> {
    constructor(props: SettingFormProps) {
        super("div", props);
    }

    render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }

    init() {
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
        this.children.btnReset = new BtnSubmit({...this.props.reset})
    }
}
