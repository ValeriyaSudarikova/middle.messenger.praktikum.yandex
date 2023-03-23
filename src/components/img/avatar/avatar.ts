import Block from "../../../utils/Block";
import template from "./avatar.hbs"
import {ImgProps} from "../img";

export default class Avatar extends Block<ImgProps> {
    constructor(props: ImgProps) {
        super("div", props)
    }

    protected render():DocumentFragment {
        return this.compile(template, {
            class: this.props.class,
            src: this.props.src,
            alt: this.props.alt
        })
    }
}
