import Block from "../../utils/Block"
import template from "./menu.hbs"
//components
import Img, {ImgProps} from "../../components/img/img"
import NavItem, {NavItemProps} from "../../components/navItem/navItem"
import BtnSubmit, {BtnSubmitProps} from "../../components/btnSubmit/btnSubmit"
import HeaderText, {HeaderTextProps} from "./headerText/headerText"

interface MenuProps {
	UserImg: ImgProps,
	HeaderTextP: HeaderTextProps,
	NavItems: NavItemProps[],
	NavOpenBtn: BtnSubmitProps,
	CloseBtn: BtnSubmitProps
}

export default class Menu extends Block<MenuProps> {
	constructor(props: MenuProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		const {UserImg, HeaderTextP, NavItems, NavOpenBtn, CloseBtn} = this.props

		this.children.UserImage = new Img({...UserImg})
		this.children.HeaderText = new HeaderText({...HeaderTextP})
		this.children.NavItems = NavItems.map(item => {
			return new NavItem({...item})
		})
		/* eslint-disable */
		//@ts-ignore
		this.children.NavigationOpenBtn = new BtnSubmit({...NavOpenBtn})
		//@ts-ignore
		this.children.NavigationCloseBtn = new BtnSubmit({...CloseBtn})
		/* eslint-disable */
	}

}
