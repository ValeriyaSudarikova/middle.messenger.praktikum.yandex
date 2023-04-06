import Block from "../../utils/Block"
import template from "./menu.hbs"
//components
import Img, {ImgProps} from "../../components/img/img"
import NavItem, {NavItemProps} from "../../components/navItem/navItem"
import BtnSubmit, {BtnSubmitProps} from "../../components/btnSubmit/btnSubmit"
import HeaderText, {HeaderTextProps} from "./headerText/headerText"
//img
import user2 from "../../img/user2.png"
import user1 from "../../img/user1.png"
import no_icon from "../../icons/no_avatar.svg"
import chatIcon from "../../icons/message.svg"
import friends from "../../icons/friends.svg"
import exit from "../../icons/exit.svg"
import settingsIcon from "../../icons/settings.svg"
import next from "../../icons/next.svg"
import notFound from "../../icons/404.svg"

import AuthController from "../../controllers/AuthController"
import {changeData, CloseMenu, findProperty, InputNames, OpenMenu} from "../../utils/helpers"
import Contacts, {ContactsWithStore} from "../../components/chatFriendsSections/contacts"
import Settings, {SettingsProps} from "../../components/settings/settings"
import store, {State, withStore} from "../../utils/Store"
import {UsedDataKeys, UserData} from "../../api/auth/auth.t"
import ChatController from "../../controllers/ChatController"
import UserController from "../../controllers/UserController"
import userController from "../../controllers/UserController"
import {ChatItem} from "../../api/chats/chats.t"
import messageController, {Message} from "../../controllers/MessageController"
import {ContactItemProps} from "../../components/contactItem/contactItem"
import Chat, {ChatProps} from "../../components/chat/chat"
import chatController from "../../controllers/ChatController"
import ErrorMessage, {ErrorMessageProps} from "../../components/Errors/errorMessage"
import ContactsController from "../../controllers/ContactsController"
import ContactsBase from "../../components/chatFriendsSections/contacts"
import {response} from "express"
import {ChatContactProps} from "../../components/chat/chatContact/ChatContact"

interface MenuProps {
	UserImg: ImgProps,
	HeaderTextP: HeaderTextProps,
	NavItems: NavItemProps[],
	NavOpenBtn: BtnSubmitProps,
	CloseBtn: BtnSubmitProps
}

class MenuBase extends Block<MenuProps> {
	public UserData: UserData | undefined
	// public nav: NavItemProps[];
	public chats_data: ChatItem[] | undefined
	public chats: Contacts | undefined
	public active_chat_data: {chat: ChatItem, users: UserData[], messages: Message[]} | undefined
	public active_chat: Block<ChatProps> | undefined
	public settings: Block<SettingsProps> | undefined
	public newUserData: UserData | undefined
	public UserImg: Block<ImgProps> | undefined
	public Header: Block<HeaderTextProps> | undefined
	constructor(props: MenuProps) {
		super("div", props)
		this.UserImg = new Img({
			src: this.UserData!.avatar ? "https://ya-praktikum.tech/api/v2/resources" +  this.UserData!.avatar : no_icon,
			alt: "аватар пользователя",
			class: "main__navigation_header-img"
		})
		this.Header = new HeaderText({
			userName: this.UserData!.first_name + " " + this.UserData!.second_name,
			userStatus: "online"
		})
		this.UserData = store.getState().user!.data
		this.newUserData = {
			"id": this.UserData.id,
			"first_name": "",
			"second_name": "",
			"display_name": "",
			"login": "",
			"email": "",
			"phone": "",
			"avatar": ""
		}
		this.chats_data = store.getState().chats?.data
		this.active_chat_data = store.getState().selected_chat_data
		// this.settings_data =
	}

	closeUnactive(Event: any) {

		Event.preventDefault()

		const target = Event.target.innerText

		const components = []

		const wrapper = document.querySelector(".background .main")

		if (this.chats && this.settings) {
			components.push(this.chats, this.settings)
		}
		if (this.active_chat) {
			components.push(this.active_chat)
		}

		components.forEach(component => {
			wrapper!.append(component.getContent()!)
			component.hide()
		})

		switch (target) {
		case "Список чатов":
				this.chats!.show()
			break
		case "Активный чат":
			this.active_chat?.show()
			break
		case "Настройки":
				this.settings!.show()
			break
		}
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	async init() {
		ChatController.getChats()

		if (!this.UserData) {
			this.UserData = store.getState().user!.data
		}

		let ChatName: string

		this.chats = new Contacts({
			header: "Мои сообщения",
			flag: "chat",
			chats: this.chats_data,
			search: {
				input: {
					placeholder: "введите название чата",
					events: {
						blur: (Event: any) => {ChatName = Event.target.value}
					},
					type: "string"
				},
				label: {
					label: "новый чат"
				},
				btn: {},
				events: {
					submit: (Event: any) => {

						Event.preventDefault()

						if (!ChatName) {
							const err = document.createElement("span")
							err.classList.add("p12")
							err.style.display = "block"
							err.style.marginTop = "15px"
							err.style.textAlign = "center"
							err.innerText = "необходимо ввести название чата"

							Event.target.after(err)
							setTimeout(() => {
								err.remove()
							}, 3000)
						} else {
							ChatController.create(ChatName)

							this.chats_data = store.getState().chats!.data

							Event.target.reset()
						}
					}
				}
			},
			events: {}
		})
		this.settings = new Settings({
			id: this.UserData!.id,
			img: {src: this.UserData!.avatar ? "https://ya-praktikum.tech/api/v2/resources" + this.UserData!.avatar : no_icon, alt: "аватар пользователя"},
			file: {
				title: "Изменить аватар",
				label: "выберете файл",
				forClass: "input__file",
				input: {
					type:"file",
					name:"avatar",
					class:"input__wrapper-add file",
					events: {
						change: async (Event: any) => {
							const formData = new FormData()
							if (Event.target.files[0]) {

								formData.append("avatar", Event.target.files![0])

								await UserController.setUserAvatar(formData)
							}
						}
					}
				},
			},
			form: {
				events: {
					submit: (Event: any) => {
						Event.preventDefault()

						const options = {
							first_name: this.newUserData!.first_name ? this.newUserData!.first_name : this.UserData!.first_name,
							second_name: this.newUserData!.second_name? this.newUserData!.second_name : this.UserData!.second_name,
							display_name: this.newUserData!.display_name? this.newUserData!.display_name : this.UserData!.display_name,
							login: this.newUserData!.login ? this.newUserData!.login : this.UserData!.login,
							email: this.newUserData!.email? this.newUserData!.email : this.UserData!.email,
							phone: this.newUserData!.phone? this.newUserData!.phone : this.UserData!.phone,
						}

						userController.ChangeUserData(options)

						const input: HTMLButtonElement = document.querySelector(".input__submit")!
						input.disabled = true
					}
				},
				bodyInputs: [
					{
						label: {
							text: "Имя",
							subtitle: "",
							// forClass: string
						},
						input: {
							type: "text",
							name: "first_name",
							placeholder: "Введите имя",
							value: this.UserData!.first_name ? findProperty(this.UserData!, UsedDataKeys.first_name) : "",
							events: {
								focus: () => {},
								blur: (Event: any) => {changeData(Event, {}, this.newUserData, Event.target.name, Event.target.value)}
							}
						}
					},
					{
						label: {
							text: "Фамилия",
							subtitle: "",
							// forClass: string
						},
						input: {
							type: "text",
							name: "second_name",
							placeholder: "введите фамилию",
							value: this.UserData!.second_name ? findProperty(this.UserData!, UsedDataKeys.second_name) : "",
							events: {
								focus: () => {},
								blur: (Event: any) => {changeData(Event, {}, this.newUserData, Event.target.name, Event.target.value)}
							}
						}
					},
					{
						label: {
							text: "Логин",
							subtitle: "по которому вас можно будет найти в поиске",
							// forClass: string
						},
						input: {
							type: "text",
							name: "login",
							placeholder: "введите имя пользователя",
							value: this.UserData!.login ? findProperty(this.UserData!, UsedDataKeys.login) : "",
							events: {
								focus: () => {},
								blur: (Event: any) => {changeData(Event, {}, this.newUserData, Event.target.name, Event.target.value)}
							}
						}
					},
					{
						label: {
							text: "Адрес эл. почты",
							subtitle: "используемый при регистрации",
							// forClass: string
						},
						input: {
							type: "email",
							name: "email",
							placeholder: "адрес эл. почты",
							value: this.UserData!.email ? findProperty(this.UserData!, UsedDataKeys.email) : "",
							events: {
								focus: () => {},
								blur: (Event: any) => {changeData(Event, {}, this.newUserData, Event.target.name, Event.target.value)}
							}
						}
					},
					{
						label: {
							text: "Имя пользователя",
							subtitle: "для отображения в чате",
						},
						input: {
							type: "text",
							name: "display_name",
							placeholder: "введите имя",
							value: this.UserData!.display_name ? findProperty(this.UserData!, UsedDataKeys.display_name) : "",
							events: {
								focus: () => {},
								blur: (Event: any) => {changeData(Event, {}, this.newUserData, Event.target.name, Event.target.value)}
							}
						}
					},
					{
						label: {
							text: "номер телефона",
							subtitle: "",
						},
						input: {
							type: "phone",
							name: "phone",
							placeholder: "",
							value: this.UserData!.phone ? findProperty(this.UserData!, UsedDataKeys.phone) : "",
							events: {
								focus: () => {},
								blur: (Event: any) => {changeData(Event, {}, this.newUserData, Event.target.name, Event.target.value)}
							}
						}
					},
					// {
					// 	label: {
					// 		text: "старый пароль",
					// 		subtitle: "Введите старый пароль",
					// 	},
					// 	input: {
					// 		type: "password",
					// 		name: "OldPassword",
					// 		placeholder: "",
					// 		required: true,
					// 		value: /*FormData? findProperty(FormData, InputNames.pass) : */"",
					// 		events: {
					// 			focus: () => {},
					// 			blur: (Event: any) => {changeData(Event, UnchangedData, FormData, Event.target.name, Event.target.value)}
					// 		}
					// 	}
					// },
					// {
					// 	label: {
					// 		text: "новый пароль",
					// 		subtitle: "Введите новый пароль, рекомендуется использовать буквы и символы для надежности",
					// 	},
					// 	input: {
					// 		type: "password",
					// 		name: "NewPassword",
					// 		required: true,
					// 		placeholder: "введите новый пароль",
					// 		value: "",
					// 		events: {
					// 			focus: () => {},
					// 			blur: (Event: any) => {changeData(Event, UnchangedData, FormData, Event.target.name, Event.target.value)}
					// 		}
					// 	}
					//
					// },
					// {
					// 	label: {
					// 		text: "повторите пароль",
					// 		subtitle: "",
					// 		// forClass: string
					// 	},
					// 	input: {
					// 		type: "password",
					// 		name: "repeatpass",
					// 		required: true,
					// 		placeholder: "повторите пароль",
					// 		value: "",
					// 		events: {
					// 			focus: () => {},
					// 			blur: (Event: any) => {changeData(Event, UnchangedData, FormData, Event.target.name, Event.target.value)}
					// 		}
					// 	}
					// }
				],
				submit: {
					type:"submit",
					class: "btn fz-16 input__submit",
					label: "сохранить",
					disabled: "disabled",
					events: {}
				},
				reset: {
					type:"reset",
					class: "btn fz-30 input__reset",
					label: "отменить изменения",
					events: {
						reset: (Event: any) => {
							Event.preventDefault()

							this.UserData = store.getState().user!.data
						}
					}
				}
			},
		})

		const NavItems = [
			{
				link: "chats",
				text:"Список чатов",
				img: {src: friends, alt: "иконка сообщений"},
				events: {
					click: (Event: any) => {
						Event.preventDefault()
						this.closeUnactive(Event)
					}
				}
			},
			{
				link: "active",
				text:"Активный чат",
				img: {src: chatIcon, alt: "иконка сообщений"},
				events: {
					click: (Event: any) => {
						Event.preventDefault()
						this.closeUnactive(Event)
					}
				}
			},
			{
				link: "settings",
				text:"Настройки",
				img: {src: settingsIcon, alt: "иконка настроек"},
				events: {
					click: (Event: any) => {
						Event.preventDefault()
						this.closeUnactive(Event)
					}
				}
			},
			{
				link: "exit",
				text:"Выход",
				img: {src: exit, alt: "иконка выхода"},
				events: {
					click: (Event: any) => {
						Event.preventDefault()
						AuthController.logout()
					}
				}
			}
		]

		this.children.UserImage = new Img({
			src: this.UserData!.avatar ? "https://ya-praktikum.tech/api/v2/resources" +  this.UserData!.avatar : no_icon,
			alt: "иконка юзера",
			class: "main__navigation_header-img"
		})
		this.children.HeaderText = new HeaderText({
			userName: `${ this.UserData!.first_name} ${ this.UserData!.second_name}`,
			userStatus: "online"
		})

		this.children.NavItems = NavItems.map(item => {
			return new NavItem({...item})
		})

		this.children.NavigationOpenBtn = new BtnSubmit({
			type: "button",
			class: "main__navigation-open hidden",
			label: new Img({src: next, alt: "далее"}),
			events: {
				click: () => { OpenMenu() }
			}
		})
		this.children.NavigationCloseBtn = new BtnSubmit({
			type: "button",
			class: "btn fz-30 main__navigation-close",
			label: "Скрыть меню",
			events: {
				click: () => { CloseMenu() }
			}
		})
	}

	async getUsers(props: any) {
		let users
		if (props.selected_chat_data.users) {
			users = props.selected_chat_data.users.map((user:UserData) => {
				return {
					img: {
						src: "https://ya-praktikum.tech/api/v2/resources" + user.avatar,
						alt: "аватар пользователя"
					},
					name: user.display_name
				}
			})
		} else {
			const r = await ChatController.getUsers(props.selected_chat_data.chat.id)
			users = r!.map((user) => {
				return {
					img: {
						src: "https://ya-praktikum.tech/api/v2/resources" + user.avatar,
						alt: "аватар пользователя"
					},
					name: user.display_name
				}
			})
		}
		return users
	}

	getMessages(props: any) {
		let messages
		if (!props.selected_chat_data.messages) {
			const id = props.selected_chat_data?.chat.id
			messages = store.getState().messages![id]
		} else {
			messages = props.selected_chat_data?.messages
		}
		return messages
	}

	async componentDidUpdate(oldProps: any, newProps: any): Promise<boolean> {
		let ChatName: string
		let selected_bool

		if (oldProps.selected_chat_data) {
			selected_bool = oldProps.selected_chat_data.chat.id === newProps.selected_chat_data.chat.id
		} else {
			selected_bool = !oldProps.selected_chat_data
		}

		if (oldProps.chats !== newProps.chats) {

			this.chats_data = newProps.chats?.data

			this.chats?.setProps({
				header: "Мои сообщения",
				flag: "chat",
				chats: newProps.chats.data,
				search: {
					input: {
						placeholder: "введите название чата",
						events: {
							blur: (Event: any) => {ChatName = Event.target.value}
						},
						type: "string"
					},
					label: {
						label: "новый чат"
					},
					btn: {},
					events: {
						submit: (Event: any) => {

							Event.preventDefault()

							if (!ChatName) {
								const err = document.createElement("span")
								err.classList.add("p12")
								err.style.display = "block"
								err.style.marginTop = "15px"
								err.style.textAlign = "center"
								err.innerText = "необходимо ввести название чата"

								Event.target.after(err)
								setTimeout(() => {
									err.remove()
								}, 3000)
							} else {
								ChatController.create(ChatName)

								this.chats_data = store.getState().chats!.data

								Event.target.reset()
							}
						}
					}
				},
				events: {}
			})
		}
		if (oldProps.user.data.avatar !== newProps.user.data.avatar) {
			this.UserImg?.setProps({
				src: newProps.user.data.avatar ? "https://ya-praktikum.tech/api/v2/resources" +  newProps.user.data.avatar : no_icon,
				alt: "аватар пользователя",
				class: "main__navigation_header-img"
			})
		}
		if (oldProps.user.data !== newProps.user.data) {
			this.Header?.setProps({
				userName: `${newProps.UserData!.first_name} ${newProps.UserData!.second_name}`,
				userStatus: "online"
			})

		}
		if (selected_bool) {
			if (!this.active_chat) {
				this.active_chat = new Chat({
					selectedChat: newProps.selected_chat_data.chat,
					ChatName: newProps.selected_chat_data.chat.title,
					Contacts:  await this.getUsers(newProps),
					messages: newProps.selected_chat_data.messages ? newProps.selected_chat_data.messages : this.getMessages(newProps),
				})
			} else {
				this.active_chat.setProps({
					selectedChat: newProps.selected_chat_data.chat,
					ChatName: newProps.selected_chat_data.chat.title,
					Contacts:  await this.getUsers(newProps),
					messages: newProps.selected_chat_data.messages
				})
			}

		}
		return true
	}
}

export const Menu = withStore((state) => {return state || {}})(MenuBase)
