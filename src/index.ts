import Homepage from "./pages/homepage/homepage"
import Contacts from "./components/chatFriendsSections/contacts"
import {Menu} from "./pages/menu/menu"
import Img from "./components/img/img"
import Router from "./utils/Router"
import RegistrationWithStore from "./pages/registration/registration"
import logoblack from "./img/logo_black.svg"
import Signin from "./pages/signin/signin"
import ResetPassword from "./pages/ResetPassword/resetPassword"
import AuthController from "./controllers/AuthController"
import Registration from "./pages/registration/registration"

export enum Routes {
	homepage = "/",
	registration = "/sign-up",
	signIn = "/sign-in",
	resetPass = "/reset-password",
	menu = "/menu",
	chats = "/menu/chats",
	contacts = "/menu/contacts",
	settings = "/menu/settings"
}

window.addEventListener("DOMContentLoaded", async () => {
	Router
		.use(Routes.homepage, Homepage)
		.use(Routes.registration, Registration)
		.use(Routes.signIn, Signin)
		.use(Routes.resetPass, ResetPassword)
		.use(Routes.menu, Menu)

	let isProtectedRoute = true

	switch (window.location.pathname) {
	case Routes.homepage:
		isProtectedRoute = false
		break
	case Routes.registration:
		isProtectedRoute = false
		break
	case Routes.signIn:
		isProtectedRoute = false
		break
	}

	try {
		await AuthController.getUser()

		Router.start()
		if (!isProtectedRoute) {
			Router.go(Routes.homepage)
		} else {
			Router.go(Routes.menu)
		}
	} catch (e) {
		Router.start()

		if (isProtectedRoute) {
			Router.go(Routes.menu)
		}
	}

})

