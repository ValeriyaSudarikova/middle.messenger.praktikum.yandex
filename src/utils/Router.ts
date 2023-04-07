import Block from "./Block"
export interface BlockConstructor<P = any> {
    new(props: P): Block<P>;
}

function render(query: string, block: Block | null) {
	const root = document.querySelector(query)

	if (root === null) {
		throw new Error(`no root with "${query}" selector`)
	}

	root.innerHTML = ""

	root.append(block!.getContent()!)

	return root
}

class Route {
	private block: Block | null = null

	constructor(
        private pathname: string,
        private readonly blockClass: BlockConstructor | ((Component: BlockConstructor) => any),
        private readonly rootQuery: string
	) {}

	navigate(path: string) {
		if (this.match(path)) {
			this.pathname = path
			this.render()
		}
	}

	leave() {
		if (this.block) {
			this.block.hide()
		}
	}

	match(pathname: string) {
		return pathname === this.pathname
	}

	render() {
		if (!this.block) {
			// @ts-ignore
			this.block = new this.blockClass({})

			render(this.rootQuery, this.block)
			return
		}
        this.block!.show()
	}
}

class Router {
	private static __instance: Router
	private routes: Route[] = []
	private currentRoute: Route | null = null
	private history = window.history

	constructor(private readonly rootQuery: string) {
		if (Router.__instance) {
			return Router.__instance
		}

		this.routes = []

		Router.__instance = this
	}

	public use(pathname: string, block: BlockConstructor) {
		const route = new Route(pathname, block, this.rootQuery)
		this.routes.push(route)

		return this
	}

	public go(pathname: string) {
		this.history.pushState({}, "", pathname)

		this._onRoute(pathname)
	}

	public back() {
		this.history.back()
	}

	public forward() {
		this.history.forward()
	}

	public start() {
		window.onpopstate = (event: PopStateEvent) => {
			const target = event.currentTarget as Window;

			this._onRoute(target.location.pathname);
		}

		this._onRoute(window.location.pathname);
	}


	private _onRoute(pathname: string) {
		const route = this.getRoute(pathname)

		if (!route) {
			return
		}

		if (this.currentRoute && this.currentRoute !== route) {
			this.currentRoute.leave()
		}

		this.currentRoute = route

		route.render()
	}

	private getRoute(pathname: string) {
		return this.routes.find(route => route.match(pathname))
	}
}

export default new Router("main")
