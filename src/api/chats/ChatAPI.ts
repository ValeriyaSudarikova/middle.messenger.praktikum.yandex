import BaseAPI from "../baseApi";
import {ChatItem, Message} from "./chats.t";
import {UserData} from "../auth/auth.t";

export class ChatAPI extends BaseAPI {

    constructor() {
        super('/chats');
    }

    create(title: string) {
        return this.http.post('/', { title })
    }

    delete(id: number): Promise<unknown> {
        return this.http.delete('/', { chatId: id });
    }


    read(): Promise<ChatItem[]> {
        return this.http.get('/');
    }

    async getToken(id: number): Promise<string> {
        const response = await this.http.post<{ token: string }>(`/token/${id}`);

        return response.token;
    }

    //For contacts page
    getUsers(id: number): Promise<Array<UserData & { role: string }>> {
        return this.http.get(`/${id}/users`)
    }


    addUsers(id: number, users: number[]): Promise<unknown> {
        return this.http.put('/users', { users, chatId: id });
    }

    update = undefined;
}
