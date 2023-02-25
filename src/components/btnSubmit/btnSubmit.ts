import template from './btnSubmit.hbs';
import Block from "../../utils/Block";

interface BtnSubmit {
	type: string,
	class: string,
	label: string
}

class BtnSubmit extends Block<BtnSubmit> {
	constructor(props: BtnSubmit) {
		super("div", props);
	}

	protected render():DocumentFragment {
		return this.compile(template, {
			type: this.props.type,
			class: this.props.class,
			label: this.props.label
		});
	}

}

export default BtnSubmit;
