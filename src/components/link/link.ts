import Block from "../../utils/Block"
import template from "./link.hbs"
import {PropsWithRouter, withRouter} from "../hocs/withRouter";

export interface linkProps extends PropsWithRouter {
	href: string,
	class: string,
	text: string,
	events?: Record<string, any>
}

class BaseLink extends Block<linkProps> {
	constructor(props: linkProps) {
		super("div", {
			...props,
			events: {
				click: () => this.navigate()
			}
		})
	}
	navigate() {
		this.props.router.go(this.props.href)
	}

	render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}
}
export const Link = withRouter(BaseLink);
