
export enum Method {
	Get = "GET",
	Post = "POST",
	Put = "PUT",
	Patch = "PATCH",
	Delete = "DELETE"
}

type Options = {
	method: Method;
	Accept?: string,
	"Content-Type"?: string,
	data?: any;
};

export default class HTTPTransport {
	static API_URL = "https://ya-praktikum.tech/api/v2"
	protected endpoint: string

	constructor(endpoint: string) {
		this.endpoint = `${HTTPTransport.API_URL}${endpoint}`
	}

	public get<Response>(path = "/"): Promise<Response> {
		return this.request<Response>(this.endpoint + path)
	}

	public post<Response = void>(path: string, data?: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.Post,
			data,
		})
	}

	public put<Response = void>(path: string, data: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.Put,
			data,
		})
	}

	public patch<Response = void>(path: string, data: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.Patch,
			data,
		})
	}

	public delete<Response>(path: string, data?: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.Delete,
			data
		})
	}

	private request<Response>(url: string, options: Options = {method: Method.Get}): Promise<Response> {
		const {method, data} = options

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()

			xhr.open(method, url)

			xhr.onreadystatechange = (e) => {

				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status < 400) {
						resolve(xhr.response)
					} else {
						reject(xhr.response)
					}
				}
			}

			xhr.onabort = () => reject({reason: "abort"})
			xhr.onerror = () => reject({reason: "network error"})
			xhr.ontimeout = () => reject({reason: "timeout"})

			xhr.withCredentials = true
			xhr.responseType = "json"

			if (!(data instanceof FormData)) {
				xhr.setRequestHeader("Content-Type", "application/json")
			} else {
				xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
			}


			if (method === Method.Get || !data) {
				xhr.send()
			} else if (method === Method.Put && data instanceof FormData) {
				xhr.send(data)
			} else if (data) {
				xhr.send(JSON.stringify(data))
			}
		})
	}
}
