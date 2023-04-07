import {UserData} from "../api/auth/auth.t"
import {set} from "./helpers"
import EventBus from "./EventBus"
import Block from "./Block"
import {ChatItem} from "../api/chats/chats.t"
import {Message} from "../controllers/MessageController"

export interface State {
    user?: {
        data: UserData,
        error?: string,
        isLoading: boolean
    },
    chats?: {
        data: ChatItem[],
        error: string,
        isLoading: boolean
    },
    selected_chat?: number,
    selected_chat_data?: {
        chat: ChatItem,
        users: UserData[],
        messages: Message[],
    }
    messages?: Record<number, Message[]>
    contacts?: {
        data: UserData[],
        error: string,
        isLoading: false
    },
    new_message?: string | undefined

}

enum StoreEvents {
    update=  "updated"
}

export class Store extends EventBus {
	private state: State = {}

	public set(keypath: string, data: unknown) {
		set(this.state, keypath, data)

		this.emit(StoreEvents.update, this.getState())
	}

	public getState() {
		return this.state
	}
}

const store = new Store()

// @ts-ignore
window.store = store

interface BlockConstructor<P = any> {
    new(props: any): Block<P & any>;
}

export function withStore<SP>(mapStateToProps: (state: State) => SP) {
	return function wrap<P>(Component: BlockConstructor<SP & P>){
		return class WithStore extends Component {
			constructor(props: Omit<P, keyof SP>) {
				let previousState = mapStateToProps(store.getState())
				super({...props , ...previousState})

				store.on(StoreEvents.update, () => {
					const stateProps = mapStateToProps(store.getState())
					previousState = stateProps
					this.setProps({
						...stateProps
					})
				})

			}

		}

	}
}

export default store