import Block from "../../../utils/Block"
import template from "./headerText.hbs"
import Text from "../../../components/header/text/headerText"

export interface HeaderTextProps {
	userName: string,
	userStatus: string
}

export default class HeaderText extends Block<HeaderTextProps> {
	public userName: Text | undefined
	public userStatus: Text | undefined
	constructor(props: HeaderTextProps) {
		super("div", props)
		this.userName = undefined
		this.userStatus = undefined
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	protected init() {
		this.children.userName = new Text({text: this.props.userName})
		this.children.userStatus = new Text({text: this.props.userStatus})
	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {

		if (this.props.userName !== oldProps.userName) {
			this.children.userName = new Text({text: newProps.userName})
		}

		return true
	}
}
