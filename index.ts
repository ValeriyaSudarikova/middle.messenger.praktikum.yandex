import Homepage from "./src/pages/homepage/homepage"
import Contacts from "./src/components/chatFriendsSections/contacts"
import Menu from "./src/pages/menu/menu"
import Img from "./src/components/img/img"
//imgs
import user1 from "./src/img/user1.png"
import user2 from "./src/img/user2.png"
import chatIcon from "./src/icons/message.svg"
import friends from "./src/icons/friends.svg"
import settingsIcon from "./src/icons/settings.svg"
import next from "./src/icons/next.svg"
import Settings from "./src/components/settings/settings"
import mainImg from "./src/img/homepage.png"
import logo from "./src/img/logo.svg"
import Registration from "./src/pages/registration/registration"
import logoblack from "./src/img/logo_black.svg"
import Signin from "./src/pages/signin/signin"
import ResetPassword from "./src/pages/ResetPassword/resetPassword"

enum InputNames {
	name= "first_name",
	surname = "second_name",
	tel = "phone",
	email = "email",
	login = "login",
	pass = "password",
	repPass = "repeat_password"
}

window.addEventListener("DOMContentLoaded", () => {
	const NotContainered = document.querySelector(".background")

	//util function for reg page
	let UnchangedData: Record<string, string> = {}
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
	const checkOnErrors = (name: string, value: string = "") : {check: boolean, error: string} => {
		switch (name) {
			case "first_name": {
				const regexp = new RegExp(/^(?=.{2,50}$)[A-Za-zА-ЯЁ][a-zа-яё]*(?:-[A-Za-zА-ЯЁ][a-zа-яё]*)?$/)
				return {check: Boolean(regexp.test(value)), error: "Имя должно начинаться с заглавной буквы и иметь не менее 2 символов"}
			}
			case "second_name": {
				const regexp = new RegExp(/^(?=.{2,50}$)[A-Za-zА-ЯЁ][a-zа-яё]*(?:-[A-Za-zА-ЯЁ][a-zа-яё]*)?$/)
				return {check: Boolean(regexp.test(value)), error: "Фамилия должна начинаться с заглавной буквы и иметь не менее 2 символов"}
			}
			case "phone": {
				const regexp = new RegExp(/^\+?\d{10,15}$/)
				return {check: Boolean(regexp.test(value)), error: "Номер телефона должен состоять из 10-15 цифр"}
			}
			case "email" : {
				const regexp = new RegExp(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
				return {check: Boolean(regexp.test(value)), error: "Эл. адрес должен содержать @ и иметь домен (пример .ru)"}
			}
			case "login" : {
				const regexp = new RegExp(/^(?!\\d+$)[A-Za-z_-]{3,20}$/)
				return {check: Boolean(regexp.test(value)), error: "Логин может содержать заглавные буквы или цифры, длина - 3-20 символов"}
			}
			case "password" : {
				const regexp = new RegExp(/^(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{8,40}$/)
				return {check: Boolean(regexp.test(value)), error: "Пароль должен содержать минимум 8 символов латиницы, включая цифры и заглавные буквы"}
			}
			case "repeat_password" : {
				const regexp = new RegExp(/^(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{8,40}$/)
				return {check: Boolean(regexp.test(value)), error: "Пароль должен содержать минимум 8 символов латиницы, включая цифры и заглавные буквы"}
			}
		}
		return {check: false, error: "имя объекта не передано"}
	}
	const ShowFocusMessage = (Event: any, name: string, clas: "errored__message" | "errored__message-dark" | "settings-error") => {
		let existedMes = document.querySelector(`.${clas}`);
		if (existedMes) {
			existedMes.remove()
		}
		let focusMesElem = document.createElement("span");
		focusMesElem.classList.add(clas);
		focusMesElem.innerHTML = checkOnErrors(name).error;
		Event.target.after(focusMesElem);
		setTimeout(() => {
			focusMesElem.remove()
		}, 3000)
	}
	/* eslint-disable */
	const getData = (Event:any, name: string, value: string) => {
		let CheckRes = checkOnErrors(name, value)
		if (CheckRes.check) {
			FormData[name] = value
			Event.target.style.borderColor = "white"
		} else {
			let existError = document.querySelector(".errored__message")
			if (existError) {
				existError.remove()
			}
			Event.target.style.borderColor = "red";
			let error = document.createElement("span");
			error.classList.add("errored__message");
			error.innerHTML = CheckRes.error
				Event.target.after(error)
			setTimeout(() => {
				error.remove()
			}, 4000)
		}
	}
	const login = (Event: any, name: string, value: string) : void => {
		let existError = document.querySelector(".errored__message-dark");
		if (existError) {
			existError.remove()
		}
		let CheckRes = checkOnErrors(name, value);
		if (CheckRes.check) {
			loginData![name] = value
			Event.target.style.borderColor = "#363a44"
		} else  {
			Event.target.style.borderColor = "red";
			let error = document.createElement("span");
			error.classList.add("errored__message-dark");
			error.innerHTML = CheckRes.error
			Event.target.after(error)
			setTimeout(() => {
				error.remove()
			}, 4000)
		}
	}
	const changeData = (Event: any, name: string, value: string) => {
		let existError = document.querySelector(".errored__message-dark")
		if (existError) {
			existError.remove()
		}
		let CheckRes = checkOnErrors(name, value);
		if (CheckRes.check) {
			if (!UnchangedData[InputNames.name]) {
				UnchangedData = JSON.parse(JSON.stringify(FormData))
				if (Event.target.value) {
					const input: HTMLButtonElement = document.querySelector(".input__submit")!
					input.disabled = false
				}
			}
			Event.target.style.borderColor = "#B9E3E1";
			FormData[name] = value
		} else {
			Event.target.style.borderColor = "red";
			let error = document.createElement("span");
			error.classList.add("settings-error", "fz-12");
			error.innerHTML = CheckRes.error
			Event.target.after(error)
			setTimeout(() => {
				error.remove()
			}, 4000)
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
						form: {
							inputs: [
								{
									label: "введите логин",
									input: {
										class: "input fz-24",
										type: "text",
										name: "login",
										events: {
											focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message-dark")},
											blur: (Event:any) => {login(Event, Event.target.name, Event.target.value)}
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
											focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message-dark")},
											blur: (Event:any) => {login(Event, Event.target.name, Event.target.value)}
										}
									}
								},
							],
							submit: {
								class:"btn fz-30 signin__form_submit",
								type: "submit",
								label: "Войти",
							},
							events: {
								submit: (Event: any) => {
									Event.preventDefault();
									if (loginData[InputNames.login] === FormData[InputNames.login] &&
										loginData[InputNames.pass] === FormData[InputNames.pass]) {
										console.log("to see the main page pass through registration section, " +
											"current users data: ", loginData)
									} else {
										let error = document.createElement("span");
										let btn = document.querySelector("button");
										error.innerHTML = "Проверьте корректность данных и повторите попытку входа";
										error.classList.add(".errored__message-dark");
										btn?.after(error);
										setTimeout(() => {
											error.remove()
										}, 3000)
									}
								}
							},
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
										form: {
											class: "reset__form",
											inputs: [
												{
													label: "введите логин",
													input: {
														class: "input fz-24",
														type: "text",
														name: "login",
														events: {
															focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
															blur: (Event:any) => {getData(Event, Event.target.name, Event.target.value)}
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
															focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
															blur: (Event:any) => {getData(Event, Event.target.name, Event.target.value)}
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
															focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
															blur: (Event:any) => {getData(Event, Event.target.name, Event.target.value);}
														}
													}
												},
											],
											submit: {
												type: "submit",
												class: "btn fz-30 submit",
												label: "сбросить пароль",
											},
											events: {
												submit: (Event: any) => {
													Event.preventDefault();
													if (FormData[InputNames.pass] === FormData[InputNames.repPass]) {
														console.log('pass reset, current user data: ', FormData)
													} else {
														let elem = document.querySelector("button");
														let error = document.createElement("span");
														error.classList.add("errored_message");
														error.innerHTML = "Пароли не совпадают";
														error.style.color = "white";
														error.style.marginLeft = "30%"
														elem!.after(error)
													}
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
						registration: {
							inputsp1: [
								{
									label: "введите имя",
									input: {
										type: "text",
										name: "first_name",
										class: "input fz-24",
										events: {
											focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
											blur: (Event:any) => {getData(Event, Event.target.name, Event.target.value)}
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
											focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
											blur: (Event:any) => {getData(Event, Event.target.name, Event.target.value)}
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
											focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
											blur: (Event:any) => {getData(Event, Event.target.name, Event.target.value)}
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
											focus: (Event:any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
											blur: (Event:any) => {getData(Event, Event.target.name, Event.target.value)}
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
											focus: (Event: any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
											blur: (Event: any) => {getData(Event, Event.target.name, Event.target.value)}
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
											focus: (Event: any) => {ShowFocusMessage(Event, Event.target.name, "errored__message")},
											blur: (Event: any) => {getData(Event, Event.target.name, Event.target.value)}
										}
									}
								},
							],
							events: {
								submit: (Event: any) => {
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
					focus: (Event: any) => {console.log(Event, "focus")},
					blur: (Event: any) => {console.log(Event, "blur")}
				}
			},
		},
		form: {
			events: {
				submit: (Event: any) => {
					Event.preventDefault()
					console.log("new FormData =", FormData)
					UnchangedData = {}
					const input: HTMLButtonElement = document.querySelector(".input__submit")!
					input.disabled = true
				}
			},
			bodyInputs: [
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
							focus: () => {},
							blur: (Event: any) => {changeData(Event, Event.target.name, Event.target.value)}
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
							focus: () => {},
							blur: (Event: any) => {changeData(Event, Event.target.name, Event.target.value)}
						}
					}
				},
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
							},
							blur: (Event: any) => {
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
							focus: () => {},
							blur: (Event: any) => {changeData(Event, Event.target.name, Event.target.value)}
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
					},
					input: {
						type: "phone",
						name: "phone",
						placeholder: "",
						value: findProperty(FormData, InputNames.tel) ? findProperty(FormData, InputNames.tel) : "",
						events: {
							focus: () => {"focused"},
							blur: (Event: any) => {changeData(Event, Event.target.name, Event.target.value)}
						}
					}
				},
				{
					label: {
						text: "старый пароль",
						subtitle: "Введите старый пароль",
					},
					input: {
						type: "password",
						name: "OldPassword",
						placeholder: "",
						required: true,
						value: findProperty(FormData, InputNames.pass) ? findProperty(FormData, InputNames.pass) : "",
						events: {
							focus: () => {},
							blur: (Event: any) => {changeData(Event, Event.target.name, Event.target.value)}
						}
					}
				},
				{
					label: {
						text: "новый пароль",
						subtitle: "Введите новый пароль, рекомендуется использовать буквы и символы для надежности",
					},
					input: {
						type: "password",
						name: "NewPassword",
						required: true,
						placeholder: "введите новый пароль",
						value: "",
						events: {
							focus: () => {},
							blur: (Event: any) => {changeData(Event, Event.target.name, Event.target.value)}
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
						required: true,
						placeholder: "повторите пароль",
						value: "",
						events: {
							focus: () => {},
							blur: (Event: any) => {changeData(Event, Event.target.name, Event.target.value)}
						}
					}
				}
			],
			submit: {
				type:"submit",
				class: "btn fz-16 input__submit",
				label: "cохранить",
				disabled: "disabled",
				events: {
					// click: (Event: any) => {
					// 	Event.preventDefault()
					// 	FormData = UnchangedData!
					// 	UnchangedData = {}
					// 	const submit: HTMLButtonElement = document.querySelector(".btn .fz-30 .input__submit")!
					// 	submit.disabled = true
					// }
				}
			},
			reset: {
				type:"reset",
				class: "btn fz-30 input__reset",
				label: "отменить изменения",
				events: {
					reset: (Event: any) => {
						Event.preventDefault()
						FormData = UnchangedData!
						UnchangedData = {}
						const submit: HTMLButtonElement = document.querySelector(".btn .fz-30 .input__submit")!
						submit.disabled = true
					}
					// submit: (Event: any) => {
					// 	Event.preventDefault()
					// 	console.log("new FormData =", FormData)
					// 	UnchangedData = {}
					// 	const input: HTMLButtonElement = document.querySelector(".input__submit")!
					// 	input.disabled = true
					}
				}
			},
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
		const menu = document.querySelector(".main__navigation");
		const headerTitle = document.querySelector(".main__navigation_header-text");
		const openBtn = document.querySelector(".main__navigation-open");
		const closeBtn = document.querySelector(".main__navigation-close");
		const itemText = document.querySelectorAll(".nav__item-text");
		const stngs = document.querySelector(".settings");

		if (stngs) {
			return;
		}

		menu!.classList.remove("small")
		headerTitle!.classList.remove("hidden")
		closeBtn!.classList.remove("hidden")
		openBtn!.classList.add("hidden")
		itemText.forEach(item => {item.classList.remove("hidden")})
	}

	// root.append(homepage.getContent());
	NotContainered!.append(homepage.getContent()!)
})
