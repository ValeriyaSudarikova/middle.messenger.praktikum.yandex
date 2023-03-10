type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>

enum METHODS {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE"

}
/* eslint-disable */
type Data = Record<string, any>
type Options = {method: METHODS, data?: Data, headers?: Record<string, string>}
type OptionsWithoutMethod = {data?: Data, timeout?: number}

function queryStringify(data: Data) {
	const json = Object.entries(data)

	let resStr = "?"
	json.map(item => {
		if (Array.isArray(item)) {
			item.map((inner,i) => {
				if (i === 0) {
					return resStr += inner + "="
				} else {
					return resStr += inner +"&"
				}
			})
		}
	})
	resStr = resStr.slice(0, resStr.length - 1)
	return resStr ? resStr : ""
}
/* eslint-disable */
class HTTPTransport {
	checkRoute = (data: Data | undefined) => {return data ? queryStringify(data) : ""}
	get: HTTPMethod = (url, options = {}) => (
		this.request(url, {...options, method: METHODS.GET})
	)
	put: HTTPMethod = (url, options = {}) => (
		this.request(url, {...options, method: METHODS.PUT})
	)
	post: HTTPMethod = (url, options = {}) => (
		this.request(url, {...options, method: METHODS.POST})
	)
	delete: HTTPMethod = (url, options = {}) => (
		this.request(url, {...options, method: METHODS.DELETE})
	)
	/* eslint-disable */
	request = (url: string, options: Options = {method: METHODS.GET}):Promise<XMLHttpRequest> => {
		const {method, data, headers} = options

		return new Promise((resolve, reject) => {

			const xhr = new XMLHttpRequest

			xhr.open(url, method)

			if (headers) {
				const hdrs = Object.entries(headers)
				hdrs.forEach(item => {
					if (Array.isArray(item) && item[0]) {
						xhr.setRequestHeader(item[0], item[1])
					}
				})
			}

			xhr.onload = function () {
				resolve(xhr)
			}

			xhr.onabort = reject
			xhr.onerror = reject
			xhr.ontimeout = reject

			if (method === METHODS.GET || !data) {
				xhr.send()
			} else {
				xhr.send(JSON.stringify(data))
			}
		})
	}
}
