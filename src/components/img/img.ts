import Block from "../../utils/Block"
import template from "./img.hbs"

export interface ImgProps {
	class?: string,
	src: string,
	alt: string
}

export default class Img extends Block<ImgProps> {
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
