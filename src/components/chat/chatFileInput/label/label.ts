import Block from "../../../../utils/Block"
import template from "./label.hbs"
//components
import Img, {ImgProps} from "../../../img/img"
export interface LabelProps {
	forClass: string,
	class: string,
	labelImg: ImgProps
}

export default class Label extends Block<LabelProps> {
	constructor(props: LabelProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		this.children.InpulLabelImg = new Img({
			class: this.props.labelImg.class,
			src: this.props.labelImg.src,
			alt: this.props.labelImg.alt
		})
	}
}
