import {UsedDataKeys, UserData} from "../api/auth/auth.t";

export type Indexed<Type = any> = {
    [key in string]: Type;
};

export enum InputNames {
    name= "first_name",
    surname = "second_name",
    tel = "phone",
    email = "email",
    login = "login",
    pass = "password",
    repPass = "repeat_password"
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }
        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);

    return merge(object as Indexed, result);
}

export function checkOnErrors(name: string, value: string = ""): {check: boolean, error: string} {
    switch (name) {
        case "first_name": {
            const regexp = new RegExp(/^(?=.{2,50}$)[A-Za-zА-ЯЁ][a-zа-яё]*(?:-[A-Za-zА-ЯЁ][a-zа-яё]*)?$/)
            return {check: Boolean(regexp.test(value)), error: "Имя должно начинаться с заглавной буквы и иметь не менее 2 символов"}
        }
        case "second_name": {
            const regexp = new RegExp(/^(?=.{2,50}$)[A-Za-zА-ЯЁ][a-zа-яё]*(?:-[A-Za-zА-ЯЁ][a-zа-яё]*)?$/)
            return {check: Boolean(regexp.test(value)), error: "Фамилия должна начинаться с заглавной буквы и иметь не менее 2 символов"}
        }
        case "display_name": {
            const regexp = new RegExp(/^(?=.{2,50}$)[A-Za-zА-ЯЁ][a-zа-яё]*(?:-[A-Za-zА-ЯЁ][a-zа-яё]*)?$/)
            return {check: Boolean(regexp.test(value)), error: "Отображаемое имя должно начинаться с заглавной буквы и иметь не менее 2 символов"};
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

export	function ShowFocusMessage(Event: any, name: string, clas: "errored__message" | "errored__message-dark" | "settings-error") {
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

export function getData(Event:any, formdata: any, name: string, value: string):void {
    let CheckRes = checkOnErrors(name, value)
    if (CheckRes.check) {
        formdata[name] = value
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
export function login(Event: any, loginData: any, name: string, value: string) : void {
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

export function changeData(Event: any, UnchangedData: any, FormData: any, name: string, value: string) {

    console.log(FormData)

    let existError = document.querySelector(".errored__message-dark")
    if (existError) {
        existError.remove()
    }
    let CheckRes = checkOnErrors(name, value);
    if (CheckRes.check) {
        if (UnchangedData) {
            const input: HTMLButtonElement = document.querySelector(".input__submit")!
            input.disabled = false
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

export const findProperty = (obj: UserData, objName: UsedDataKeys) : string => {
    return obj[objName].toString()
}

// export function closeUnactiveWindows() {
//     let components = [];
//     const existedContactsBlock = document.querySelector(".contacts")
//     const existedChatBlock = document.querySelector(".chat")
//     const existedSettingsBlock = document.querySelector(".settings")
//
//     components.push(existedChatBlock, existedContactsBlock, existedSettingsBlock)
//
//     components.forEach(component => {
//         if (component) {
//             component.hide()
//         }
//     })
// }

export function CloseMenu() {
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

export function OpenMenu() {
    const menu = document.querySelector(".main__navigation");
    const headerTitle = document.querySelector(".main__navigation_header-text");
    const openBtn = document.querySelector(".main__navigation-open");
    const closeBtn = document.querySelector(".main__navigation-close");
    const itemText = document.querySelectorAll(".nav__item-text");
    // const stngs = document.querySelector(".settings");
    //
    // if (stngs) {
    //     return;
    // }

    menu!.classList.remove("small")
    headerTitle!.classList.remove("hidden")
    closeBtn!.classList.remove("hidden")
    openBtn!.classList.add("hidden")
    itemText.forEach(item => {item.classList.remove("hidden")})
}

export const dateFormatter = (date: Date) => {
    let day = date.getDate() + 1 < 10 ? "0"+ (date.getDate() + 1) : date.getDate();
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes()

    return `${day}.${month}.${year}, ${hours}:${minutes}`
}

