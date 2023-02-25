enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE'

}
type Data = Record<string, any>
type Options = {method: METHODS, data?: Data, headers?: Record<string, string>}
type OptionsWithoutMethod = {data?: Data, timeout?: number}

function queryStringify(data: Data) {
	let json = Object.entries(data)

	let resStr = '?';
	json.map(item => {
		if (Array.isArray(item)) {
			item.map((inner,i) => {
				if (i === 0) {
					return resStr += inner + '=';
				} else {
					return resStr += inner +'&'
				}
			})
		}
	})
	resStr = resStr.slice(0, resStr.length - 1)
	return resStr ? resStr : ''
}

class HTTPTransport {
	checkRoute = (data: Data | undefined) => {return data ? queryStringify(data) : ''}
	get = (url: string, options: OptionsWithoutMethod = {}, timeout: number = 5000):Promise<XMLHttpRequest> => {
		let route:string = this.checkRoute(options.data)
		return this.request(route, {...options, method: METHODS.GET}, timeout);
	};
	post = (url, options: OptionsWithoutMethod = {}, timeout: number = 5000) => {
		let route:string = this.checkRoute(options.data)
		return this.request(route, {...options, method: METHODS.POST}, timeout)
	}
	put = (url, options: OptionsWithoutMethod={}, timeout: number = 5000) => {
		let route:string = this.checkRoute(options.data)
		return this.request(route, {...options, method: METHODS.PUT}, timeout)
	}
	delete = (url, options: OptionsWithoutMethod={}, timeout: number = 5000) => {
		let route:string = this.checkRoute(options.data)
		return this.request(route, {...options, method: METHODS.DELETE}, timeout)
	}

	request = (url: string, options: Options = {method: METHODS.GET}, timeout = 5000):Promise<XMLHttpRequest> => {
		const {method, data, headers} = options;

		return new Promise((resolve, reject) => {

			const xhr = new XMLHttpRequest;

			xhr.open(url, method);

			if (headers) {
				let hdrs = Object.entries(headers);
				hdrs.forEach(item => {
					if (Array.isArray(item) && item[0]) {
						xhr.setRequestHeader(item[0], item[1]);
					}
				})
			}

			xhr.onload = function () {
				resolve(xhr)
			}

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (method === METHODS.GET || !data) {
				xhr.send()
			} else {
				xhr.send(JSON.stringify(data))
			}
		});
	}
}
