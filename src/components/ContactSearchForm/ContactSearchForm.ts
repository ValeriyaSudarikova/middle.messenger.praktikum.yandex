import Block from "../../utils/Block";
import template from "./ContactSearchForm.hbs";
//components
import ContactSearchInput, {InputProps} from "./input/ContactSearchInput";
import ContactSearchBtn, {BtnProps} from "./btn/ContactSearchBtn";
import ContactSearchLabel, {LabelProps} from './label/label';

export interface ContactSearchFormProps {
    input: InputProps,
    label: LabelProps,
    btn: BtnProps,
    events: Record<string, any>
}

class ContactSearchForm extends Block<ContactSearchFormProps> {
    constructor(props: ContactSearchFormProps) {
        super("div", props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
        })
    }

    protected init() {
        this.children.Label = new ContactSearchLabel({...this.props.label});
        this.children.Input = new ContactSearchInput({...this.props.input});
        this.children.Btn = new ContactSearchBtn({...this.props.btn});
    }
}

export default ContactSearchForm
