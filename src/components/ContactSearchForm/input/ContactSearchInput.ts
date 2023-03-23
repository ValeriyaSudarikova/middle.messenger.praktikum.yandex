import Block from "../../../utils/Block";
import template from "./ContactSearchInput.hbs";

export interface InputProps {
    placeholder: string,
    type: string,
    events?: Record<string, any>
}

export default class ContactSearchInput extends Block<InputProps> {
    constructor(props: InputProps) {
        super("div", props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, {
            ...this.props,
        })
    }
}
