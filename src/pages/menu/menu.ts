import Block from "../../utils/Block"
import template from "./menu.hbs"
//components
import Img, {ImgProps} from "../../components/img/img"
import NavItem, {NavItemProps} from "../../components/navItem/navItem"
import BtnSubmit, {BtnSubmitProps} from "../../components/btnSubmit/btnSubmit"
import HeaderText, {HeaderTextProps} from "./headerText/headerText"
//img
import user2 from "../../img/user2.png";
import user1 from "../../img/user1.png";
import no_icon from "../../icons/no_avatar.svg";
import chatIcon from "../../icons/message.svg";
import friends from "../../icons/friends.svg";
import exit from "../../icons/exit.svg";
import settingsIcon from "../../icons/settings.svg";
import next from "../../icons/next.svg"

import AuthController from "../../controllers/AuthController";
import {changeData, CloseMenu, findProperty, InputNames, OpenMenu} from "../../utils/helpers";
import Contacts, {ContactsWithStore} from "../../components/chatFriendsSections/contacts";
import Settings from "../../components/settings/settings";
import store, {State, withStore} from "../../utils/Store";
import {UsedDataKeys, UserData} from "../../api/auth/auth.t";
import ChatController from "../../controllers/ChatController";
import {ContactsAPI} from "../../api/contacts/ContactsAPI";
import ContactsController from "../../controllers/ContactsController";
import Avatar from "../../components/img/avatar/avatar";
import * as events from "events";
import messageController from "../../controllers/MessageController";
import chatsController from "../../controllers/ChatController";
import UserController from "../../controllers/UserController";
import userController from "../../controllers/UserController";

interface MenuProps {
	UserImg: ImgProps,
	HeaderTextP: HeaderTextProps,
	NavItems: NavItemProps[],
	NavOpenBtn: BtnSubmitProps,
	CloseBtn: BtnSubmitProps
}

class MenuBase extends Block<MenuProps> {
	constructor(props: MenuProps) {
		super("div", props)
	}

	protected render(): DocumentFragment {
		return this.compile(template, {...this.props})
	}

	init() {
		ChatController.getChats();

		let Data: State = store.getState();
		let Chats: any = store.getState().chats?.data;
		let Contacts: any = ContactsController.getContacts();
		let UserData: UserData = store.getState().user!.data;

		// let FormData: UserData = {
		// 	"id": 123,
		// 	"first_name": "Val",
		// 	"second_name": "Su",
		// 	"display_name": "Val Su",
		// 	"login": "invaice",
		// 	"email": "valsu@mail.ru",
		// 	"phone": "89209231728",
		// 	"avatar": user1
		// }

		let UserId: number | undefined;
		let UserLog: string | undefined;
		let ChatName: string | undefined;

		let UnchangedData: UserData | undefined;
		let newUserData: UserData | undefined = {
			"id": UserData.id,
			"first_name": "",
			"second_name": "",
			"display_name": "",
			"login": "",
			"email": "",
			"phone": "",
			"avatar": user1
		}

		// const contacts = new ContactsWithStore({
		// 	header: "Поиск пользователей",
		// 	flag: "contact",
		// 	contacts: Contacts? Contacts : undefined,
		// 	search: {
		// 		input: {
		// 			placeholder: "введите ID пользователя",
		// 			events: {
		// 				blur: (Event: any) => {UserId = Event.target.value}
		// 			},
		// 			type: "number"
		// 		},
		// 		label: {
		// 			label: "новый контакт"
		// 		},
		// 		btn: {},
		// 		events: {
		// 			submit: (Event: any) => {
		//
		// 				Event.preventDefault();
		////
		// 				if (!UserId) {
		// 					let existingErr = document.querySelector(".contact__footer span")
		//
		// 					if (existingErr) {
		// 						existingErr.remove()
		// 					}
		//
		// 					let err = document.createElement("span");
		// 					err.classList.add("p12");
		// 					err.style.display = "block"
		// 					err.style.marginTop = "15px"
		// 					err.style.textAlign = "center"
		// 					err.innerText = "необходимо ввести ID пользователя";
		//
		// 					Event.target.after(err)
		// 					setTimeout(() => {
		// 						err.remove()
		// 					}, 3000)
		//
		// 				} else {
		// 					if (UserId) {
		// 						ContactsController.FindUserById(UserId);
		// 						UserId = undefined;
		// 					}
		// 					Event.target.reset()
		// 				}
		// 			}
		// 		}
		// 	}
		// });
		const chats = new ContactsWithStore({
			header: "Мои сообщения",
			flag: "chat",
			chats: Chats,
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

						Event.preventDefault();

						if (!ChatName) {
							let err = document.createElement("span");
							err.classList.add("p12");
							err.style.display = "block"
							err.style.marginTop = "15px"
							err.style.textAlign = "center"
							err.innerText = "необходимо ввести название чата";

							Event.target.after(err)
							setTimeout(() => {
								err.remove()
							}, 3000)
						} else {
							ChatController.create(ChatName)

							Chats = store.getState().chats!.data

							Event.target.reset()
						}
					}
				}
			},
			events: {
				click: (event: any) => {
					chatsController.selectChat(event.target.id)
				}
			}
		});
		const settings = new Settings({
			id: UserData.id,
			img: {src: UserData.avatar ? "https://ya-praktikum.tech/api/v2/resources" + UserData.avatar : no_icon, alt: "аватар пользователя"},
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
							let formData = new FormData();
							if (Event.target.files[0]) {

								formData.append("avatar", Event.target.files![0])

								await UserController.setUserAvatar(formData, true)
							}
						}
					}
				},
			},
			form: {
				events: {
					submit: (Event: any) => {
						Event.preventDefault()

						let options = {
							first_name: newUserData!.first_name ? newUserData!.first_name : UserData.first_name,
							second_name: newUserData!.second_name? newUserData!.second_name : UserData.second_name,
							display_name: newUserData!.display_name? newUserData!.display_name : UserData.display_name,
							login: newUserData!.login ? newUserData!.login : UserData.login,
							email: newUserData!.email? newUserData!.email : UserData.email,
							phone: newUserData!.phone? newUserData!.phone : UserData.phone,
						}

						UnchangedData = JSON.parse(JSON.stringify(UserData))

						console.log(options, "options")

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
							value: UserData.first_name ? findProperty(UserData, UsedDataKeys.first_name) : "",
							events: {
								focus: () => {},
								blur: (Event: any) => {changeData(Event, UnchangedData, newUserData, Event.target.name, Event.target.value)}
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
							value: UserData.second_name ? findProperty(UserData, UsedDataKeys.second_name) : "",
							events: {
								focus: () => {},
								blur: (Event: any) => {changeData(Event, UnchangedData, newUserData, Event.target.name, Event.target.value)}
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
							value: UserData.login ? findProperty(UserData, UsedDataKeys.login) : "",
							events: {
								focus: () => {},
								blur: (Event: any) => {changeData(Event, UnchangedData, newUserData, Event.target.name, Event.target.value)}
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
							value: UserData.email ? findProperty(UserData, UsedDataKeys.email) : "",
							events: {
								focus: () => {},
								blur: (Event: any) => {changeData(Event, UnchangedData, newUserData, Event.target.name, Event.target.value)}
							}
						}
					},
					{
						label: {
							text: "Имя пользователя",
							subtitle: "для отображения в чате",
							// forClass: string
						},
						input: {
							type: "text",
							name: "display_name",
							placeholder: "введите имя",
							value: UserData.display_name ? findProperty(UserData, UsedDataKeys.display_name) : "",
							events: {
								focus: () => {},
								blur: (Event: any) => {changeData(Event, UnchangedData, newUserData, Event.target.name, Event.target.value)}
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
							value: UserData.phone ? findProperty(UserData, UsedDataKeys.phone) : "",
							events: {
								focus: () => {},
								blur: (Event: any) => {changeData(Event, UnchangedData, newUserData, Event.target.name, Event.target.value)}
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

							UserData = store.getState().user!.data
						}
					}
				}
			},
		})

		const closeUnactive = (Event: any) => {

			Event.preventDefault();

			let target = Event.target.innerText;

			let components = [];

			let wrapper = document.querySelector(".background .main");

			components.push(chats, settings)

			components.forEach(component => {
				wrapper!.append(component.getContent()!);
				component.hide()
			})

			switch (target) {
				case "Активные чаты":
					chats.show();
					break;
				// case "Поиск пользователей":
				// 	contacts.show();
				// 	break;
				case "Настройки":
					settings.show();
					break;
			}
		}

		const NavItems = [
			{
				link: "chats",
				text:"Активные чаты",
				img: {src: chatIcon, alt: "иконка сообщений"},
				events: {
					click: (Event: any) => {
						Event.preventDefault();
						closeUnactive(Event);
					}
			}
		},
		// {
		// 	link: "contacts",
		// 	text:"Поиск пользователей",
		// 	img: {src: friends, alt: "иконка друзей"},
		// 	events: {
		// 		click: (Event: any) => {
		// 			Event.preventDefault();
		// 			closeUnactive(Event);
		// 		}
		// 	}
		// },
		{
			link: "settings",
			text:"Настройки",
			img: {src: settingsIcon, alt: "иконка настроек"},
			events: {
				click: (Event: any) => {
					Event.preventDefault();
					closeUnactive(Event)
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
			src: UserData.avatar ? "https://ya-praktikum.tech/api/v2/resources" + UserData.avatar : no_icon,
			alt: "иконка юзера",
			class: "main__navigation_header-img"
		})
		this.children.HeaderText = new HeaderText({
			userName: `${UserData.first_name} ${UserData.second_name}`,
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

	componentDidUpdate(oldProps: any, newProps: any): boolean {
		console.log('old', oldProps,'new', newProps)
		return true
	}
}

export const Menu = withStore((state) => {return state || {}})(MenuBase);
