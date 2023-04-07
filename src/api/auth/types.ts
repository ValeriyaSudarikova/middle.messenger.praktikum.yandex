export interface SignUpData {
    "first_name": string,
    "second_name": string,
    "login": string,
    "email": string,
    "password": string,
    "phone": string
}

export interface SignInData {
    login: string,
    password: string
}

export interface UserData {
    "id": number,
    "first_name": string,
    "second_name": string,
    "display_name": string,
    "login": string,
    "email": string,
    "phone": string,
    "avatar": string
}

export enum UsedDataKeys {
    id = "id",
    first_name = "first_name",
    second_name = "second_name",
    display_name = "display_name",
    login = "login",
    email = "email",
    phone = "phone",
    img = "avatar"
}
