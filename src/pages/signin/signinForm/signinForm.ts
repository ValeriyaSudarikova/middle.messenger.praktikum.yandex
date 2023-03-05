import Block from "../../../utils/Block";
import template from './signinForm.hbs';
import InputWrapper, {InputWrapperProps} from "../../../components/input/inputWrapper";
import BtnSubmit, {BtnSubmitProps} from "../../../components/btnSubmit/btnSubmit";

export interface SigninFormProps {
    inputs: InputWrapperProps[],
    submit: BtnSubmitProps
    events: Record<string, any>
}

export default class SigninForm extends Block<SigninFormProps> {
    constructor(props: SigninFormProps) {
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
