import Block from "../../utils/Block"
import template from "./navItem.hbs"
import Img, {ImgProps} from "../img/img"

export interface NavItemProps {
	link: string,
	img: ImgProps,
	text: string,
	events: {
		click: (event: any) => void
	}
}

export default class NavItem extends Block<NavItemProps> {
	constructor(props: NavItemProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		this.children.ItemImg = new Img({
			src: this.props.img.src,
			alt: this.props.img.alt,
			class: this.props.img.class
		})
	}
}
