import Block from "../../utils/Block";
import template from "./btn.hbs";
interface BtnProps {
	type: string,
	class: string,
	href: string,
	label: string
}
export default class Btn extends Block<BtnProps> {
	constructor(props: BtnProps) {
		super('div', props);
	}
	protected render():DocumentFragment {
		return this.compile(template, {
			type: this.props.type,
			class: this.props.class,
			href: this.props.href,
			label: this.props.label
		});
	}
}
