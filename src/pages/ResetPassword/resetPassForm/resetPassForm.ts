import Block from "../../../utils/Block";
import template from './resetPassForm.hbs';
import InputWrapper, {InputWrapperProps} from "../../../components/input/inputWrapper";
import BtnSubmit, {BtnSubmitProps} from "../../../components/btnSubmit/btnSubmit";

export interface ResetPassFormProps {
    class: string
    inputs: InputWrapperProps[],
    submit: BtnSubmitProps
    events: Record<string, any>
}

export default class ResetPassForm extends Block<ResetPassFormProps> {
    constructor(props: ResetPassFormProps) {
        super("div", props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props})
    }

    init() {
        this.children.Inputs = this.props.inputs.map(input => {
            return new InputWrapper({...input})
        })
        this.children.Submit = new BtnSubmit({...this.props.submit})
    }
}
