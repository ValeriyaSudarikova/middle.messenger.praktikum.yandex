import {UserData} from "../auth/types"

export interface ChatItem {
    id: number,
    title: string,
    avatar: string,
    unreadCount: number,
    last_message: Message | undefined,
    delete?: (id: number) => void | undefined
    events?: Record<string, any>
}

export interface Message {
    user: UserData,
    //"2020-01-02T14:22:22.000Z"
    time: string,
    content: string
}

