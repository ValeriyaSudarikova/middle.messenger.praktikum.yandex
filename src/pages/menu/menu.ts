import Block from "../../utils/Block"
import template from "./menu.hbs"
//components
import Img, {ImgProps} from "../../components/img/img"
import NavItem, {NavItemProps} from "../../components/navItem/navItem"
import BtnSubmit, {BtnSubmitProps} from "../../components/btnSubmit/btnSubmit"
import HeaderText, {HeaderTextProps} from "./headerText/headerText"
//img
import no_icon from "../../icons/no_avatar.svg"
import chatIcon from "../../icons/message.svg"
import friends from "../../icons/friends.svg"
import exit from "../../icons/exit.svg"
import settingsIcon from "../../icons/settings.svg"
import next from "../../icons/next.svg"
import error from "../../icons/404.svg"

import AuthController from "../../controllers/AuthController"
import {changeData, CloseMenu, findProperty, InputNames, isEqual, login, OpenMenu} from "../../utils/helpers"
import Contacts, {ContactsWithStore} from "../../components/chatFriendsSections/contacts"
import Settings, {SettingsProps} from "../../components/settings/settings"
import store, {State, withStore} from "../../utils/Store"
import {UsedDataKeys, UserData, UserDataToChange} from "../../api/auth/types"
import ChatController from "../../controllers/ChatController"
import {userController} from "../../controllers/UserController"
import {ChatItem} from "../../api/chats/types"
import messagesController, {Message} from "../../controllers/MessageController"
import Chat, {ChatProps} from "../../components/chat/chat"
import ErrorMessage from "../../components/Errors/errorMessage";
import ChatContact, {ChatContactProps} from "../../components/chat/chatContact/ChatContact";
import chatController from "../../controllers/ChatController";
import no_avatar from "../../icons/no_avatar.svg";

interface MenuProps {
	UserImg: ImgProps,
	HeaderTextP: HeaderTextProps,
	NavItems: NavItemProps[],
	NavOpenBtn: BtnSubmitProps,
	CloseBtn: BtnSubmitProps
}

class MenuBase extends Block<MenuProps> {
	public UserData: UserData | undefined
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
		this.UserData = store.getState().user!.data;
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
	}

	closeAll() {
		let components = []

		if (this.settings && this.chats) {
			components.push(this.chats, this.settings)
		}

		components.forEach(component => {
			component.hide()
		})
	}
	closeUnactive(Event: any) {

		Event.preventDefault()

		const target = Event.target.innerText

		const components = []

		const wrapper = document.querySelector(".background .main")

		if (this.chats && this.settings) {
			components.push(this.chats, this.settings)
			if (this.active_chat) {
				components.push(this.active_chat)
			}
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
		// ChatController.getChats()
		//
		// if (!this.UserData) {
		// 	this.UserData = store.getState().user!.data
		// }
		//
		// let ChatName: string
		//
		// this.chats = new Contacts({
		// 	header: "Мои сообщения",
		// 	flag: "chat",
		// 	chats: this.chats_data,
		// 	search: {
		// 		input: {
		// 			placeholder: "введите название чата",
		// 			events: {
		// 				blur: (Event: any) => {ChatName = Event.target.value}
		// 			},
		// 			type: "string"
		// 		},
		// 		label: {
		// 			label: "новый чат"
		// 		},
		// 		btn: {},
		// 		events: {
		// 			submit: (Event: any) => {
		//
		// 				Event.preventDefault()
		//
		// 				if (!ChatName) {
		// 					const err = document.createElement("span")
		// 					err.classList.add("p12")
		// 					err.style.display = "block"
		// 					err.style.marginTop = "15px"
		// 					err.style.textAlign = "center"
		// 					err.innerText = "необходимо ввести название чата"
		//
		// 					Event.target.after(err)
		// 					setTimeout(() => {
		// 						err.remove()
		// 					}, 3000)
		// 				} else {
		// 					ChatController.create(ChatName)
		//
		// 					this.chats_data = store.getState().chats!.data
		//
		// 					Event.target.reset()
		// 				}
		// 			}
		// 		}
		// 	},
		// 	events: {}
		// })
		// this.settings = new Settings({
		// 	id: this.UserData!.id,
		// 	img: {src: this.UserData!.avatar ? "https://ya-praktikum.tech/api/v2/resources" + this.UserData!.avatar : no_icon, alt: "аватар пользователя"},
		// 	file: {
		// 		title: "Изменить аватар",
		// 		label: "выберете файл",
		// 		forClass: "input__file",
		// 		input: {
		// 			type:"file",
		// 			name:"avatar",
		// 			class:"input__wrapper-add file",
		// 			events: {
		// 				change: async (Event: any) => {
		// 					const formData = new FormData()
		// 					if (Event.target.files[0]) {
		//
		// 						formData.append("avatar", Event.target.files![0])
		//
		// 						await userController.setUserAvatar(formData)
		// 					}
		// 				}
		// 			}
		// 		},
		// 	},
		// 	form: {
		// 		events: {
		// 			submit: (Event: any) => {
		// 				Event.preventDefault()
		//
		// 				const options: UserDataToChange = {
		// 					first_name: this.newUserData!.first_name ? this.newUserData!.first_name : this.UserData!.first_name,
		// 					second_name: this.newUserData!.second_name? this.newUserData!.second_name : this.UserData!.second_name,
		// 					display_name: this.newUserData!.display_name? this.newUserData!.display_name : this.UserData!.display_name,
		// 					login: this.newUserData!.login ? this.newUserData!.login : this.UserData!.login,
		// 					email: this.newUserData!.email? this.newUserData!.email : this.UserData!.email,
		// 					phone: this.newUserData!.phone? this.newUserData!.phone : this.UserData!.phone,
		// 				}
		//
		// 				userController.ChangeUserData(options)
		//
		// 				const input: HTMLButtonElement = document.querySelector(".input__submit")!
		// 				input.disabled = true
		// 			}
		// 		},
		// 		bodyInputs: [
		// 			{
		// 				label: {
		// 					text: "Имя",
		// 					subtitle: "",
		// 					// forClass: string
		// 				},
		// 				input: {
		// 					type: "text",
		// 					name: "first_name",
		// 					placeholder: "Введите имя",
		// 					value: this.UserData!.first_name ? findProperty(this.UserData!, UsedDataKeys.first_name) : "",
		// 					events: {
		// 						focus: () => {},
		// 						blur: (Event: any) => {changeData(Event, {}, this.newUserData, Event.target.name, Event.target.value)}
		// 					}
		// 				}
		// 			},
		// 			{
		// 				label: {
		// 					text: "Фамилия",
		// 					subtitle: "",
		// 					// forClass: string
		// 				},
		// 				input: {
		// 					type: "text",
		// 					name: "second_name",
		// 					placeholder: "введите фамилию",
		// 					value: this.UserData!.second_name ? findProperty(this.UserData!, UsedDataKeys.second_name) : "",
		// 					events: {
		// 						focus: () => {},
		// 						blur: (Event: any) => {changeData(Event, {}, this.newUserData, Event.target.name, Event.target.value)}
		// 					}
		// 				}
		// 			},
		// 			{
		// 				label: {
		// 					text: "Логин",
		// 					subtitle: "по которому вас можно будет найти в поиске",
		// 					// forClass: string
		// 				},
		// 				input: {
		// 					type: "text",
		// 					name: "login",
		// 					placeholder: "введите имя пользователя",
		// 					value: this.UserData!.login ? findProperty(this.UserData!, UsedDataKeys.login) : "",
		// 					events: {
		// 						focus: () => {},
		// 						blur: (Event: any) => {changeData(Event, {}, this.newUserData, Event.target.name, Event.target.value)}
		// 					}
		// 				}
		// 			},
		// 			{
		// 				label: {
		// 					text: "Адрес эл. почты",
		// 					subtitle: "используемый при регистрации",
		// 					// forClass: string
		// 				},
		// 				input: {
		// 					type: "email",
		// 					name: "email",
		// 					placeholder: "адрес эл. почты",
		// 					value: this.UserData!.email ? findProperty(this.UserData!, UsedDataKeys.email) : "",
		// 					events: {
		// 						focus: () => {},
		// 						blur: (Event: any) => {changeData(Event, {}, this.newUserData, Event.target.name, Event.target.value)}
		// 					}
		// 				}
		// 			},
		// 			{
		// 				label: {
		// 					text: "Имя пользователя",
		// 					subtitle: "для отображения в чате",
		// 				},
		// 				input: {
		// 					type: "text",
		// 					name: "display_name",
		// 					placeholder: "введите имя",
		// 					value: this.UserData!.display_name ? findProperty(this.UserData!, UsedDataKeys.display_name) : "",
		// 					events: {
		// 						focus: () => {},
		// 						blur: (Event: any) => {changeData(Event, {}, this.newUserData, Event.target.name, Event.target.value)}
		// 					}
		// 				}
		// 			},
		// 			{
		// 				label: {
		// 					text: "номер телефона",
		// 					subtitle: "",
		// 				},
		// 				input: {
		// 					type: "phone",
		// 					name: "phone",
		// 					placeholder: "",
		// 					value: this.UserData!.phone ? findProperty(this.UserData!, UsedDataKeys.phone) : "",
		// 					events: {
		// 						focus: () => {},
		// 						blur: (Event: any) => {changeData(Event, {}, this.newUserData, Event.target.name, Event.target.value)}
		// 					}
		// 				}
		// 			}
		// 		],
		// 		submit: {
		// 			type:"submit",
		// 			class: "btn fz-16 input__submit",
		// 			label: "сохранить",
		// 			disabled: "disabled",
		// 			events: {}
		// 		},
		// 		reset: {
		// 			type:"reset",
		// 			class: "btn fz-30 input__reset",
		// 			label: "отменить изменения",
		// 			events: {
		// 				reset: (Event: any) => {
		// 					Event.preventDefault()
		//
		// 					this.UserData = store.getState().user!.data
		// 				}
		// 			}
		// 		}
		// 	},
		// })
		//
		// this.closeAll()
		//
		// const NavItems = [
		// 	{
		// 		link: "chats",
		// 		text:"Список чатов",
		// 		img: {src: friends, alt: "иконка сообщений"},
		// 		events: {
		// 			click: (Event: any) => {
		// 				Event.preventDefault()
		// 				this.closeUnactive(Event)
		// 			}
		// 		}
		// 	},
		// 	// {
		// 	// 	link: "active",
		// 	// 	text:"Активный чат",
		// 	// 	img: {src: chatIcon, alt: "иконка сообщений"},
		// 	// 	events: {
		// 	// 		click: (Event: any) => {
		// 	// 			Event.preventDefault()
		// 	// 			this.closeUnactive(Event)
		// 	// 		}
		// 	// 	}
		// 	// },
		// 	{
		// 		link: "settings",
		// 		text:"Настройки",
		// 		img: {src: settingsIcon, alt: "иконка настроек"},
		// 		events: {
		// 			click: (Event: any) => {
		// 				Event.preventDefault()
		// 				this.closeUnactive(Event)
		// 			}
		// 		}
		// 	},
		// 	{
		// 		link: "exit",
		// 		text:"Выход",
		// 		img: {src: exit, alt: "иконка выхода"},
		// 		events: {
		// 			click: (Event: any) => {
		// 				Event.preventDefault()
		// 				AuthController.logout()
		// 			}
		// 		}
		// 	}
		// ]
		//
		// if (!this.UserData) {
		// 	this.UserData = store.getState().user!.data
		// }
		//
		// this.UserImg = new Img({
		// 	src: this.UserData!.avatar ? "https://ya-praktikum.tech/api/v2/resources" +  this.UserData!.avatar : no_icon,
		// 	alt: "иконка юзера",
		// 	class: "main__navigation_header-img"
		// })
		//
		// this.Header = new HeaderText({userName: `${this.UserData.first_name} ${this.UserData.second_name}`, userStatus: "online"})
		//
		// this.children.UserImage = this.UserImg
		//
		// this.children.HeaderText = this.Header
		//
		// this.children.NavItems = NavItems.map(item => {
		// 	return new NavItem({...item})
		// })
		//
		// this.children.NavigationOpenBtn = new BtnSubmit({
		// 	type: "button",
		// 	class: "main__navigation-open hidden",
		// 	label: new Img({src: next, alt: "далее"}),
		// 	events: {
		// 		click: () => { OpenMenu() }
		// 	}
		// })
		// this.children.NavigationCloseBtn = new BtnSubmit({
		// 	type: "button",
		// 	class: "btn fz-30 main__navigation-close",
		// 	label: "Скрыть меню",
		// 	events: {
		// 		click: () => { CloseMenu() }
		// 	}
		// })
		//
		// this.children.Settings = this.settings;
		// this.children.Chats = this.chats;
		// if (this.active_chat) {
		// 	this.children.ActiveChat = this.active_chat;
		// }

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

								await userController.setUserAvatar(formData)
							}
						}
					}
				},
			},
			form: {
				events: {
					submit: (Event: any) => {
						Event.preventDefault()

						const options: UserDataToChange = {
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
					}
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

		if (!this.UserData) {
			this.UserData = store.getState().user!.data
		}

		this.UserImg = new Img({
			src: this.UserData!.avatar ? "https://ya-praktikum.tech/api/v2/resources" +  this.UserData!.avatar : no_icon,
			alt: "иконка юзера",
			class: "main__navigation_header-img"
		})

		this.Header = new HeaderText({userName: `${this.UserData.first_name} ${this.UserData.second_name}`, userStatus: "online"})

		this.children.UserImage = this.UserImg

		this.children.HeaderText = this.Header

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

	async getUsers(props: { chat: ChatItem | undefined, users: UserData[], messages: Message[]}) {
		let usrs_props

		if (props && props["users"]) {

			usrs_props = props.users.map((user:UserData) => {
				return {
					img: {
						src: "https://ya-praktikum.tech/api/v2/resources" + user.avatar,
						alt: "аватар пользователя"
					},
					name: user.display_name
				}
			})
		}
		// else if (props && props["chat"]) {
		// 	console.log(store.getState())
		// 	let id = props.chat?.id
		// 	let usrs = store.getState().chats!.users[id]
		//
		// 	if (usrs) {
		// 		usrs_props = usrs.map((usr) => {
		// 			return {img: {src: usr.avatar ? "https://ya-praktikum.tech/api/v2/resources/" + usr.avatar : no_avatar, alt: "аватар пользователя"}, name: usr.display_name}
		// 		})
		// 	}
		// }
		return usrs_props
	}

	getMessages(props: {messages: Message[], chat: ChatItem | undefined, users: UserData[]}) {
		let messages: Message[] | [];

		if (!props.chat) {
			messages = []
		}

		if (props && props.chat && !props.messages) {
			const id = props.chat.id;

			messages = store.getState().messages![id];
		}
		else {
			messages = props.messages
		}
		return messages
	}

	async componentDidUpdate(oldProps: any, newProps: any): Promise<boolean> {
		let ChatName: string
		let selected_bool: boolean

		if (oldProps.selected_chat) {
			selected_bool = isEqual(oldProps.selected_chat, newProps.selected_chat)
		} else {
			selected_bool = !oldProps.selected_chat
		}

		// console.log(oldProps, newProps, selected_bool)

		if (newProps.chats && this.chats_data !== newProps.chats.data) {

			this.chats_data = store.getState().chats!.data

			this.chats!.setProps({
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
		}
		if (!isEqual(oldProps.user.data.avatar, newProps.user.data.avatar)) {
			this.UserImg?.setProps({
				src: newProps.user.data.avatar ? "https://ya-praktikum.tech/api/v2/resources" +  newProps.user.data.avatar : no_icon,
				alt: "аватар пользователя",
				class: "main__navigation_header-img"
			})
		}
		if (isEqual(oldProps.user.data, newProps.user.data)) {
			this.Header!.setProps({
				userName: `${newProps.user.data!.first_name} ${newProps.user.data!.second_name}`,
				userStatus: "online"
			})
		}
		if (newProps.selected_chat && newProps.selected_chat.chat && selected_bool) {

			console.log(newProps.selected_chat)
			const users = await this.getUsers(newProps.selected_chat)

			// console.log(users)

			if (!oldProps.selected_chat) {
				this.active_chat = new Chat({
					selectedChat: newProps.selected_chat.chat,
					ChatName: newProps.selected_chat.chat.title,
					contacts:  users ? users : [],
					messages: this.getMessages(newProps.selected_chat),
				})
			} else if (oldProps.selected_chat.chat && this.active_chat && oldProps.selected_chat.chat.id === newProps.selected_chat.chat.id) {
				this.active_chat.setProps({
					selectedChat: newProps.selected_chat.chat,
					ChatName: newProps.selected_chat.chat.title,
					contacts:  newProps.selected_chat.users,
					messages: this.getMessages(newProps.selected_chat)
				})
			} else if (oldProps.selected_chat.chat && this.active_chat && oldProps.selected_chat.chat.id !== newProps.selected_chat.chat.id) {
				this.active_chat = new Chat({
					selectedChat: newProps.selected_chat.chat,
					ChatName: newProps.selected_chat.chat.title,
					Contacts:  users ? users : [],
					messages: this.getMessages(newProps.selected_chat),
				})
			}

			if (this.active_chat) {
				this.children.ActiveChat = this.active_chat
			}

			this.active_chat_data = newProps.selected_chat;
		}
		return true
	}
}

export const menu = withStore((state) => {return {chats: state.chats, user: state.user, selected_chat: state.selected_chat_data} || {}})(MenuBase)
