import Homepage from "./pages/homepage/homepage"
import Contacts from "./components/chatFriendsSections/contacts"
import Menu from "./pages/menu/menu"
import Img from "./components/img/img"
//imgs
import user1 from "./img/user1.png"
import user2 from "./img/user2.png"
import chatIcon from "./icons/message.svg"
import friends from "./icons/friends.svg"
import settingsIcon from "./icons/settings.svg"
import next from "./icons/next.svg"
import Settings from "./components/settings/settings"
import mainImg from "./img/homepage.png"
import logo from "./img/logo.svg"
import Registration from "./pages/registration/registration"
import logoblack from "./img/logo_black.svg"
import Signin from "./pages/signin/signin"
import ResetPassword from "./pages/ResetPassword/resetPassword"

enum InputNames {
	name= "first_name",
	surname = "second_name",
	tel = "phone",
	email = "email",
	login = "login",
	pass = "password"
}

window.addEventListener("DOMContentLoaded", () => {
	const NotContainered = document.querySelector(".background")

	//util function for reg page
	let UnchangedData: Record<string, string> | null
	// let FormData: Record<string, string> = {
	// 	[InputNames.name]: "Name",
	// 	[InputNames.surname]: "Surname",
	// 	[InputNames.login]: "login",
	// 	[InputNames.pass]: "passwods32eD",
	// 	[InputNames.tel]: "+995595101858",
	// 	[InputNames.email]: "qwerty@mail.ru"
	// }
	const loginData: Record<string, string> = {}
	let FormData: Record<string, string> = {}
	/* eslint-disable */
	//@ts-ignore
	const checkOnErrors = (name: string, value: string) : boolean => {
		switch (name) {
		case "first_name": {
			const regexp = new RegExp(/^(?=.{2,50}$)[A-Za-zА-ЯЁ][a-zа-яё]*(?:-[A-Za-zА-ЯЁ][a-zа-яё]*)?$/)
			return Boolean(regexp.test(value))
		}
		case "second_name": {
			const regexp = new RegExp(/^(?=.{2,50}$)[A-Za-zА-ЯЁ][a-zа-яё]*(?:-[A-Za-zА-ЯЁ][a-zа-яё]*)?$/)
			return Boolean(regexp.test(value))
		}
		case "phone": {
			const regexp = new RegExp(/^\+?\d{10,15}$/)
			return Boolean(regexp.test(value))
		}
		case "email" : {
			const regexp = new RegExp(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
			return Boolean(regexp.test(value))
		}
		case "login" : {
			const regexp = new RegExp(/^(?!\\d+$)[A-Za-z_-]{3,20}$/)
			return Boolean(regexp.test(value))
		}
		case "password" : {
			const regexp = new RegExp(/^(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{8,40}$/)
			return Boolean(regexp.test(value))
		}
		}
	}
	/* eslint-disable */

	const getData = (Event, name: string, value: string) => {
		if (checkOnErrors(name, value)) {
			FormData[name] = value
			Event.target.style.borderColor = "white"
		} else {
			Event.target.style.borderColor = "red"
		}
	}
	const login = (Event, name: string, value: string) : void => {
		if (checkOnErrors(name, value)) {
			loginData![name] = value
			Event.target.style.borderColor = "#363a44"
		} else  {
			Event.target.style.borderColor = "red"
		}
	}
	const changeData = (Event: any, name: string, value: string) => {
		if (checkOnErrors(name, value)) {
			if (!UnchangedData) {
				UnchangedData = JSON.parse(JSON.stringify(FormData))
				const input: HTMLButtonElement = document.querySelector(".input__submit")!
				input.disabled = false
			}
			FormData[name] = value
		} else {
			Event.target.style.borderColor = "red"
		}
	}
	const findProperty = (obj: Record<string, string>, objName: string) : string  => {
		return obj[objName]
	}

	const homepage = new Homepage({
		circledImg: {
			class: "homepage__circle_img",
			src: mainImg,
			alt: "изображние домашней страницы"
		},
		logo: {
			class: "homepage__logo",
			src: logo,
			alt: "логотип приложения"
		},
		signin: {
			type: "button",
			class: "homepage",
			href: "",
			label: "Вход",
			events: {
				click: (Event: any) => {
					Event.preventDefault()
					const cntnr = document.querySelector(".container")
					const bcgrnd = document.querySelector(".background")
					const signin = new Signin({
						inputs: [
							{
								label: "введите логин",
								input: {
									class: "input fz-24",
									type: "text",
									name: "login",
									events: {
										focus: (Event) => {console.log(Event)},
										blur: (Event) => {login(Event, Event.target.name, Event.target.value)}
									}
								}
							},
							{
								label: "введите пароль",
								input: {
									type: "password",
									class: "input fz-24",
									name: "password",
									events: {
										focus: (Event) => {console.log(Event)},
										blur: (Event) => {login(Event, Event.target.name, Event.target.value)}
									}
								}
							},
						],
						submit: {
							class:"btn fz-30 signin__form_submit",
							type: "button",
							label: "Войти",
							events: {
								click: () => {
									if (loginData[InputNames.login] === FormData[InputNames.login] &&
											loginData[InputNames.pass] === FormData[InputNames.pass]) {
										console.log("to see the main page pass through registration section, " +
											"current users data: ", loginData)
									} else {
										throw new Error("некорректные данные для входа")
									}
								}
							}
						},
						logo: {
							src: logo,
							alt: "логотип приложения",
							class: "signin__logo"
						},
						link: {
							class: "signin__link fz-30 colored",
							text: "Забыли пароль?",
							href: "reset-pass",
							events: {
								click: (Event: any) => {
									Event.preventDefault()
									const body = document.querySelector("body")
									const cntnr = document.querySelector(".background")
									const reset = new ResetPassword({
										logo: {
											src: logoblack,
											alt: "логотип приложения",
											class: "registration__img"
										},
										inputs: [
											{
												label: "введите логин",
												input: {
													class: "input fz-24",
													type: "text",
													name: "login",
													events: {
														focus: (Event) => {console.log(Event)},
														blur: (Event) => {getData(Event, Event.target.name, Event.target.value)}
													}
												}
											},
											{
												label: "введите пароль",
												input: {
													type: "password",
													class: "input fz-24",
													name: "password",
													events: {
														focus: (Event) => {console.log(Event)},
														blur: (Event) => {getData(Event, Event.target.name, Event.target.value)}
													}
												}
											},
											{
												label: "повторите пароль",
												input: {
													type: "password",
													class: "input fz-24",
													name: "repeat_password",
													events: {
														focus: (Event) => {console.log(Event)},
														blur: (Event) => {getData(Event, Event.target.name, Event.target.value)}
													}
												}
											},
										],
										submit: {
											type: "submit",
											class: "btn fz-30 submit",
											label: "сбросить пароль",
											events: {
												click: () => {
													console.log("clicked")
												}
											}
										}
									})
									cntnr!.remove()
									body!.append(reset.getContent()!)
								}
							}
						}
					})
					cntnr!.remove()
					bcgrnd!.append(signin.getContent()!)
				}
			}
		},
		registration: {
			label: "Регистрация",
			href: "",
			type: "button",
			class: "homepage",
			events: {
				click: (Event: any) => {
					Event.preventDefault()
					const body = document.querySelector("body")
					const home = document.querySelector(".background")
					const regpage = new Registration({
						logo: {src: logoblack, alt:"логотип приложения", class: "registration__img"},
						inputsp1: [
							{
								label: "введите имя",
								input: {
									type: "text",
									name: "first_name",
									class: "input fz-24",
									events: {
										focus: (Event) => {console.log(Event.target.name)},
										blur: (Event) => {getData(Event, Event.target.name, Event.target.value)}
									}
								}
							},
							{
								label: "введите фамилию",
								input: {
									type: "text",
									class: "input fz-24",
									name: "second_name",
									events: {
										focus: (Event) => {console.log(Event.target.name)},
										blur: (Event) => {getData(Event, Event.target.name, Event.target.value)}
									}
								}
							},
						],
						inputsp2: [
							{
								label: "введите телефон",
								input: {
									type: "tel",
									name: "phone",
									class: "input fz-24",
									events: {
										focus: (Event) => {console.log(Event)},
										blur: (Event) => {getData(Event, Event.target.name, Event.target.value)}
									}
								}

							},
							{
								label: "введите e-mail",
								input: {
									type: "email",
									name: "email",
									class: "input fz-24",
									events: {
										focus: (Event) => {console.log(Event)},
										blur: (Event) => {getData(Event, Event.target.name, Event.target.value)}
									}
								}
							},
						],
						inputsp3: [
							{
								label: "введите логин",
								input: {
									class: "input fz-24",
									type: "text",
									name: "login",
									events: {
										focus: (Event) => {console.log(Event)},
										blur: (Event) => {getData(Event, Event.target.name, Event.target.value)}
									}
								}
							},
							{
								label: "введите пароль",
								input: {
									type: "password",
									class: "input fz-24",
									name: "password",
									events: {
										focus: (Event) => {console.log(Event)},
										blur: (Event) => {getData(Event, Event.target.name, Event.target.value)}
									}
								}
							},
						],
						submit: {
							events: {
								click: (Event: any) => {
									Event.preventDefault()
									const btn = Event.target
									const error = document.createElement("span")
									btn.insertAdjacentElement("afterend", error)
									error.style.display = "none"
									if (!FormData[InputNames.name] || !FormData[InputNames.surname] ||
										!FormData[InputNames.tel] || !FormData[InputNames.email] ||
										!FormData[InputNames.login] || !FormData[InputNames.pass]) {
										error.innerText = "Пожалуйста, заполните все поля"
										error.style.display = "block"
										error.style.marginLeft = "100px"
										error.style.color = "#FFF"
										setTimeout(() => {
											error.style.display = "none"
										}, 3000)
									} else {
										error.style.display = "none"
										const cntnr = document.querySelector(".white")
										const reg = document.querySelector(".container")
										const menu = new Menu({
											UserImg: {
												src: user2,
												alt: "иконка юзера",
												class: "main__navigation_header-img"
											},
											HeaderTextP: {
												userName: `${findProperty(FormData, InputNames.name)} ${findProperty(FormData, InputNames.surname)}`,
												userStatus: "online",
											},
											NavItems: [
												{link: "../components/chat.hbs",
													text:"Активные чаты",
													img: {src: chatIcon, alt: "иконка сообщений"},
													events: {
														click: (Event) => {
															Event.preventDefault()
															const wrapper = document.querySelector(".main")
															closeUnactiveWindows()
															// const existedContactsBlock = document.querySelector(".contacts")
															// if (existedContactsBlock) {
															// 	existedContactsBlock.remove()
															// }
															wrapper!.append(chats.getContent()!)
														}
													}
												},
												{link: "../components/chatFriendsSections.hbs",
													text:"Список контактов",
													img: {src: friends, alt: "иконка друзей"},
													events: {
														click: (Event) => {
															Event.preventDefault()
															const wrapper = document.querySelector(".main")
															closeUnactiveWindows()
															// const existedContactsBlock = document.querySelector(".contacts")
															// if (existedContactsBlock) {
															// 	existedContactsBlock.remove()
															// }
															wrapper!.append(contacts.getContent()!)
														}
													}
												},
												{link: "../components/settings.hbs",
													text:"Настройки",
													img: {src: settingsIcon, alt: "иконка настроек"},
													events: {
														click: (Event: any) => {
															Event.preventDefault()
															const wrapper = document.querySelector(".main")
															closeUnactiveWindows()
															// const existedContactsBlock = document.querySelector(".contacts");
															// if (existedContactsBlock) {
															// 	existedContactsBlock.remove()
															// }
															CloseMenu()
															wrapper!.append(settings.getContent()!)
														}
													}
												}
											],
											NavOpenBtn: {
												type: "button",
												class: "main__navigation-open hidden",
												label: new Img({src: next, alt: "далее"}),
												events: {
													click: () => { OpenMenu() }
												}
											},
											CloseBtn: {
												type: "button",
												class: "btn fz-30 main__navigation-close",
												label: "Скрыть меню",
												events: {
													click: () => { CloseMenu() }
												}
											}
										})
										cntnr!.classList.remove("white")
										cntnr!.classList.add("background")
										cntnr!.append(menu.getContent()!)
										reg!.remove()
									}
								}
							}
						}
					})
					home!.remove()
					body!.append(regpage.getContent()!)
				}
			}
		}
	})
	const contacts = new Contacts({
		header: "Мои контакты",
		flag: "contact",
		ItemsProps: [
			{	class: "online",
				statusClass: "online",
				name: "Иванова Мария",
				status: "сейчас онлайн",
				img: {
					src: user1,
					alt: "изображение пользователя",
					class: "user"
				}
			},
			{	class: "online",
				statusClass: "online",
				name: "Иванова Мария",
				status: "сейчас онлайн",
				img: {
					src: user1,
					alt: "изображение пользователя",
					class: "user"
				}
			},
			{class: "offline",
				statusClass: "offline",
				name: "Сидорова Катя",
				status: "не в сети",
				img: {
					src: user2,
					alt: "изображение пользователя",
					class: "user"
				}
			}
		]
	})
	const chats = new Contacts({
		header: "Мои сообщения",
		flag: "chat",
		ItemsProps: [
			{
				img: {src: user1, alt: "аватар пользователя"},
				name: "Мария Петрова",
				statusClass: "online",
				date: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}, ${new Date().getHours()}: ${new Date().getMinutes()}`,
				messageText: "Пример очень длинного сообщения"
			}
		]
	})
	const settings = new Settings({
		img: {src: user1, alt: "аватар пользователя"},
		file: {
			title: "Изменить аватар",
			label: "выберете файл",
			forClass: "input__file",
			input: {
				type:"file",
				name:"avatar",
				class:"input__wrapper-add file",
				events: {
					focus: (Event) => {console.log(Event, "focus")},
					blur: (Event) => {console.log(Event, "blur")}
				}
			},
			// events: Record<string, any>
		},
		headerInputs: [
			{
				label: {
					text: "имя",
					subtitle: "",
					// forClass: string
				},
				input: {
					type: "text",
					name: "first_name",
					placeholder: "введите имя",
					value: findProperty(FormData, InputNames.name) ? findProperty(FormData, InputNames.name) : "",
					events: {
						focus: () => {console.log("focused")},
						blur: (Event) => {changeData(Event, Event.target.name, Event.target.value)}
					}
				}
			},
			{
				label: {
					text: "фамилия",
					subtitle: "",
					// forClass: string
				},
				input: {
					type: "text",
					name: "second_name",
					placeholder: "введите фамилию",
					value: findProperty(FormData, InputNames.surname) ? findProperty(FormData, InputNames.surname) : "",
					events: {
						focus: () => {
							console.log("focused")},
						blur: (Event) => {changeData(Event, Event.target.name, Event.target.value)}
					}
				}
			}],
		bodyInputs: [
			{
				label: {
					text: "имя пользователя",
					subtitle: "логин, по которому вас можно будет найти в поиске",
					// forClass: string
				},
				input: {
					type: "text",
					name: "login",
					placeholder: "введите имя пользователя",
					value: findProperty(FormData, InputNames.login) ? findProperty(FormData, InputNames.login) : "",
					events: {
						focus: () => {
							console.log("focused")
						},
						blur: (Event) => {
							changeData(Event, Event.target.name, Event.target.value)
						}
					}
				}
			},
			{
				label: {
					text: "адрес эл. почты",
					subtitle: "адрес эл. почты введенный при регистрации",
					// forClass: string
				},
				input: {
					type: "email",
					name: "email",
					placeholder: "адрес эл. почты",
					value: findProperty(FormData, InputNames.email) ? findProperty(FormData, InputNames.email) : "",
					events: {
						focus: () => {
							console.log("focused")},
						blur: (Event) => {changeData(Event, Event.target.name, Event.target.value)}
					}
				}
			},
			// {
			// 	label: {
			// 		label: "имя пользователя",
			// 		subtitle: "имя для показа в чате",
			// 		// forClass: string
			// 	},
			// 	type: "text",
			// 	name: "login",
			// 	placeholder: "введите имя",
			// 	value: "John"
			// },
			{
				label: {
					text: "номер телефона",
					subtitle: "",
					// forClass: string
				},
				input: {
					type: "phone",
					name: "phone",
					placeholder: "",
					value: findProperty(FormData, InputNames.tel) ? findProperty(FormData, InputNames.tel) : "",
					events: {
						focus: () => {"focused"},
						blur: (Event) => {changeData(Event, Event.target.name, Event.target.value)}
					}
				}
			},
			{
				label: {
					text: "старый пароль",
					subtitle: "Введите старый пароль",
					// forClass: string
				},
				input: {
					type: "password",
					name: "OldPassword",
					placeholder: "",
					value: findProperty(FormData, InputNames.pass) ? findProperty(FormData, InputNames.pass) : "",
					events: {
						focus: () => {"focused"},
						blur: (Event) => {changeData(Event, Event.target.name, Event.target.value)}
					}
				}
			},
			{
				label: {
					text: "новый пароль",
					subtitle: "Введите новый пароль, рекомендуется использовать буквы и символы для надежности",
					// forClass: string
				},
				input: {
					type: "password",
					name: "NewPassword",
					placeholder: "введите новый пароль",
					value: "",
					events: {
						focus: () => {"focused"},
						blur: (Event) => {changeData(Event, Event.target.name, Event.target.value)}
					}
				}

			},
			{
				label: {
					text: "повторите пароль",
					subtitle: "",
					// forClass: string
				},
				input: {
					type: "password",
					name: "repeatpass",
					placeholder: "повторите пароль",
					value: "",
					events: {
						focus: () => {"focused"},
						blur: (Event) => {changeData(Event, Event.target.name, Event.target.value)}
					}
				}
			}
		],
		submit: {
			type:"reset",
			class: "btn fz-16 input__reset",
			label: "отменить изменения",
			events: {
				click: (Event) => {
					Event.preventDefault()
					FormData = UnchangedData!
					UnchangedData = null
					const submit: HTMLButtonElement = document.querySelector(".btn .fz-30 .input__submit")!
					submit.disabled = true
				}
			}
		},
		reset: {
			type:"submit",
			class: "btn fz-30 input__submit",
			label: "cохранить",
			disabled: "disabled",
			events: {
				click: (Event) => {
					Event.preventDefault()
					console.log("new FormData =", FormData)
					UnchangedData = null
					const input: HTMLButtonElement = document.querySelector(".input__submit")!
					input.disabled = true
				}
			}
		}
	})

	function closeUnactiveWindows() {
		const existedContactsBlock = document.querySelector(".contacts")
		const existedChatBlock = document.querySelector(".chat")
		const existedSettingsBlock = document.querySelector(".settings")
		if (existedContactsBlock) {
			existedContactsBlock.remove()
		}
		if (existedChatBlock) {
			existedChatBlock.remove()
		}
		if (existedSettingsBlock) {
			existedSettingsBlock.remove()
		}
	}

	function CloseMenu() {
		const menu = document.querySelector(".main__navigation")
		const headerTitle = document.querySelector(".main__navigation_header-text")
		const openBtn = document.querySelector(".main__navigation-open")
		const closeBtn = document.querySelector(".main__navigation-close")
		const itemText = document.querySelectorAll(".nav__item-text")

		menu!.classList.add("small")
		headerTitle!.classList.add("hidden")
		closeBtn!.classList.add("hidden")
		openBtn!.classList.remove("hidden")
		itemText.forEach(item => {item.classList.add("hidden")})
	}

	function OpenMenu() {
		const menu = document.querySelector(".main__navigation")
		const headerTitle = document.querySelector(".main__navigation_header-text")
		const openBtn = document.querySelector(".main__navigation-open")
		const closeBtn = document.querySelector(".main__navigation-close")
		const itemText = document.querySelectorAll(".nav__item-text")

		menu!.classList.remove("small")
		headerTitle!.classList.remove("hidden")
		closeBtn!.classList.remove("hidden")
		openBtn!.classList.add("hidden")
		itemText.forEach(item => {item.classList.remove("hidden")})
	}

	// root.append(homepage.getContent());
	NotContainered!.append(homepage.getContent()!)
})
