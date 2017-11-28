const fetch = require('node-fetch');

module.exports = function(url, options) {
	if (!options) options = {};

	//overwrite default timeout to 30 seconds
	if (!options.timeout) options.timeout = 30000;

	let t1 = Date.now();
	return fetch(url, options).then(res => {
		res.json = () => {
			return res.text().then(text => {
				try {
					if (!text) throw new Error('empty input');
					return JSON.parse(text);
				} catch (err) {
					let msg = `invalid json response body at ${url} reason: ${err.message}`; 
					let error = new Error();
					error.message = msg;
					error.name = 'FetchError';
					error.url = url;
					error.options = options;
					error.type = 'invalid-json';
					error.timeCost = (Date.now() - t1) + 'ms';
					error.response = {
						status: res.status,
						statusText: res.statusText,
						headers: JSON.stringify(res.headers.raw()),
						ok: res.ok,
						text
					};
					Object.defineProperty(error, 'toJSON', {
						enumerable: false,
						value() {
							error._stack = (error && error.stack && typeof error.stack === 'string') ? error.stack.split('\n') : [];
							error._stack.shift();
							error._stack = error._stack.map(l => l.trim());
							return error;
						}
					});
					throw error;
				}
			});
		};
		return res;
	}).catch(err => {
		err = err || new Error();
		if (!err.url) err.url = url;
		if (!err.options) err.options = options;
		if (!err.message) err.message = 'Unkown fetch error caught by zkt-fetch wrapper';
		if (!err.type) err.type = 'unkown-fetch-error';
		err.timeCost = (Date.now() - t1) + 'ms';
		Object.defineProperty(err, 'toJSON', {
			enumerable: false,
			value() {
				err._stack = (err && err.stack && typeof err.stack === 'string') ? err.stack.split('\n') : [];
				err._stack.shift();
				err._stack = err._stack.map(l => l.trim());
				return err;
			}
		});
		throw err;
	});
};