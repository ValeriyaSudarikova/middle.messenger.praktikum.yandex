import Block from "../../utils/Block"
import template from "./btn.hbs"
import {PropsWithRouter, withRouter} from "../hocs/withRouter"
export interface BtnProps extends PropsWithRouter{
	type: string,
	class: string,
	href: string,
	label: string,
	navigate?: () => void
	events?: Record<string, any>
}
class BaseBtn extends Block<BtnProps> {
	constructor(props: BtnProps) {
		super("div", {
			...props,
			events: {
				click: () => this.props.navigate ? this.props.navigate() : this.navigate()
			}
		})
	}

	navigate() {
		this.props.router.go(this.props.href)
	}

	protected render():DocumentFragment {
		return this.compile(template, {...this.props})

	}
}
export const Btn = withRouter(BaseBtn)
