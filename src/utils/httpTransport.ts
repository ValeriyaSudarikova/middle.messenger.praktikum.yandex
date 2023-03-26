// type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>
//
// enum METHODS {
// 	GET = "GET",
// 	POST = "POST",
// 	PUT = "PUT",
// 	DELETE = "DELETE"
// }
//
// /* eslint-disable */
// type Data = Record<string, any>
// type Options = {method: METHODS, data?: Data, headers?: Record<string, string>}
// type OptionsWithoutMethod = {data?: Data, timeout?: number}
//
// function queryStringify(data: Data) {
// 	const json = Object.entries(data)
//
// 	let resStr = "?"
// 	json.map(item => {
// 		if (Array.isArray(item)) {
// 			item.map((inner,i) => {
// 				if (i === 0) {
// 					return resStr += inner + "="
// 				} else {
// 					return resStr += inner +"&"
// 				}
// 			})
// 		}
// 	})
// 	resStr = resStr.slice(0, resStr.length - 1)
// 	return resStr ? resStr : ""
// }
// export default class HTTPTransport {
// 	static API_URL = 'https://ya-praktikum.tech/api/v2';
// 	protected endpoint: string;
//
// 	constructor(endpoint: string) {
// 		this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
// 	}
//
// 	checkRoute = (data: Data | undefined) => {return data ? queryStringify(data) : ""}
//
// 	get: HTTPMethod = (url, options = {}) => (
// 		this.request(url, {...options, method: METHODS.GET})
// 	)
// 	put: HTTPMethod = (url, options = {}) => (
// 		this.request(url, {...options, method: METHODS.PUT})
// 	)
// 	post: HTTPMethod = (url, options = {}) => (
// 		this.request(url, {...options, method: METHODS.POST})
// 	)
// 	delete: HTTPMethod = (url, options = {}) => (
// 		this.request(url, {...options, method: METHODS.DELETE})
// 	)
// 	/* eslint-disable */
// 	request = (url: string, options: Options = {method: METHODS.GET}):Promise<XMLHttpRequest> => {
// 		const {method, data, headers} = options
//
// 		return new Promise((resolve, reject) => {
//
// 			const xhr = new XMLHttpRequest
//
// 			xhr.open(url, method)
//
// 			if (headers) {
// 				const hdrs = Object.entries(headers)
// 				hdrs.forEach(item => {
// 					if (Array.isArray(item) && item[0]) {
// 						xhr.setRequestHeader(item[0], item[1])
// 					}
// 				})
// 			}
//
// 			xhr.onload = function () {
// 				resolve(xhr)
// 			}
//
// 			xhr.onabort = reject
// 			xhr.onerror = reject
// 			xhr.ontimeout = reject
//
// 			if (method === METHODS.GET || !data) {
// 				xhr.send()
// 			} else {
// 				xhr.send(JSON.stringify(data))
// 			}
// 		})
// 	}
// }

export enum Method {
	Get = 'GET',
	Post = 'POST',
	Put = 'PUT',
	Patch = 'PATCH',
	Delete = 'DELETE'
}

type Options = {
	method: Method;
	Accept?: string,
	"Content-Type"?: string,
	data?: any;
};

export default class HTTPTransport {
	static API_URL = 'https://ya-praktikum.tech/api/v2';
	protected endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
	}

	public get<Response>(path = '/'): Promise<Response> {
		return this.request<Response>(this.endpoint + path);
	}

	public post<Response = void>(path: string, data?: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.Post,
			data,
		});
	}

	public put<Response = void>(path: string, data: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.Put,
			data,
		});
	}

	public patch<Response = void>(path: string, data: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.Patch,
			data,
		});
	}

	public delete<Response>(path: string, data?: unknown): Promise<Response> {
		return this.request<Response>(this.endpoint + path, {
			method: Method.Delete,
			data
		});
	}

	private request<Response>(url: string, options: Options = {method: Method.Get}): Promise<Response> {
		const {method, data} = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);

			xhr.onreadystatechange = (e) => {

				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status < 400) {
						resolve(xhr.response);
					} else {
						reject(xhr.response);
					}
				}
			};

			xhr.onabort = () => reject({reason: 'abort'});
			xhr.onerror = () => reject({reason: 'network error'});
			xhr.ontimeout = () => reject({reason: 'timeout'});

			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.withCredentials = true;
			xhr.responseType = 'json';

			if (method === Method.Get || !data) {
				xhr.send();
			} else if (method === Method.Put && data instanceof FormData) {
				console.log(data, "formdata")
				xhr.send(data);
			} else if (method === Method.Put && data) {
				console.log(data, 'json')
				xhr.send(JSON.stringify(data))
			}
		});
	}
}
