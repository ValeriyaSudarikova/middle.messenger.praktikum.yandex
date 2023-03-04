import EventBus from "./EventBus"
import {nanoid} from "nanoid"
import {TemplateDelegate} from "handlebars"
class Block<props = any> {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render"
	}

	public id = nanoid(6)
	protected props: props
	public children: Record<string, Block> | Record<string, Block[]>
	private eventBus: () => EventBus
	private _element: HTMLElement | null = null
	private _meta: { tagName: string, props: any }

	constructor(tagName = "div", propsWithChildren: props | any = {}) {
		const eventBus = new EventBus()

		const {props, children} = this._getChildrenAndProps(propsWithChildren)

		this._meta = {
			tagName,
			props
		}

		this.children = children
		this.props = this._makePropsProxy(props)
		this.eventBus = () => eventBus
		this._registerEvents(eventBus)
		eventBus.emit(Block.EVENTS.INIT)
	}

	_getChildrenAndProps = (childrenAndProps: props | any) : any => {
		const props: Record<string, any> = {}
		const children: Record<string, Block> | Record<string, Block[]> = {}
		Object.entries(childrenAndProps).forEach(([key, value]) => {
			if (Array.isArray(value) && value[0]) {
				/* eslint-disable */
				//@ts-ignore
				children[key] = value
			}
			if (value instanceof Block) {
				children[key] = value
			} else {
				props[key] = value
			}
		})
		return { props, children }
	}
	_addEvents() {
		//@ts-ignore
		const {events = {}} = this.props as {events: Record<string, () => void>}
		Object.keys(events).forEach(eventName => {
			this._element!.addEventListener(eventName, events[eventName])
		})
	}

	_registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
		//@ts-ignore
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
	}

	_createResourses() {
		const {tagName} = this._meta
		this._element = this._createDocumentElement(tagName)
	}

	private _init() {
		this._createResourses()
		this.init()
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
	}

	protected init() {}

	private _componentDidMount() {
		this.componentDidMount()
	}

	protected componentDidMount() {}

	public dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM)
		Object.values(this.children).forEach(child => child.dispatchComponentDidMount())
	}

	private _componentDidUpdate(oldProps: any, newProps: any) {
		if (this.componentDidUpdate(oldProps, newProps)) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
		}
	}
	componentDidUpdate(oldProps: any, newProps: any): boolean {
		if (newProps !== oldProps) {
			if (newProps.child && newProps.child instanceof Block) {
				const {child} = newProps
				this.children.child = child
				return true
			}
		}
		return false
	}

	setProps(nextProps: any) {
		if (!nextProps) {
			return
		}
		//@ts-ignore
		Object.assign(this.props, nextProps)
	}

	get element() {
		return this._element
	}

	_render() {
		const fragment = this.render()

		const newElement = fragment.firstElementChild as HTMLElement

		if (this._element && newElement) {
			this._element.replaceWith(newElement)
		}

		this._element = newElement

		this._addEvents()
	}

	// @ts-ignore
	protected compile(template: TemplateDelegate, context: any) {
		const contextAndStubs = {...context}

		Object.entries(this.children).forEach(([name, component]) => {
			if (Array.isArray(component)) {
				contextAndStubs[name] = component.map(child => `<div data-id="${child.id}"></div>`)
			} else {
				contextAndStubs[name] = `<div data-id="${component.id}"></div>`
			}
		})

		const html = template(contextAndStubs)

		const temp = document.createElement("template")

		temp.innerHTML = html

		const replaceStub = (component: Block) => {
			const stub = temp.content.querySelector(`[data-id="${component.id}"]`)

			if (!stub) {
				return
			}

			component.getContent()?.append(...Array.from(stub.childNodes))

			stub.replaceWith(component.getContent()!)
		}

		Object.entries(this.children).forEach(([name, component]) => {

			if (Array.isArray(component)) {
				component.forEach(replaceStub)
			} else {
				replaceStub(component)
			}
		})


		return temp.content
	}

	protected render(): DocumentFragment {
		return new DocumentFragment()
	}

	getContent() {
		return this.element
	}

	_makePropsProxy(props: any) {
		const self = this

		return new Proxy(props, {
			get(target, prop: string) {
				const value = target[prop]
				return typeof value === "function" ? value.bind(target) : value
			},
			set(target, prop: string, value) {
				const oldTarget = {...target}

				target[prop] = value

				// Запускаем обновление компоненты
				// Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
				return true
			},
			deleteProperty() {
				throw new Error("Нет доступа")
			}
		})
	}

	_createDocumentElement(tagName: string) {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName)
	}

	// show() {
	// 	this.getContent()!.style.display = "block"
	// }
	//
	// hide() {
	// 	this.getContent()!.style.display = "none"
	// }
}
/* eslint-disable */
export default Block
