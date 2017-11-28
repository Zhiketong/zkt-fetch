const fetch = require('../');

require('http').createServer((req, res) => {
	switch(req.url) {
		case '/badJSON': 
			res.end('{aaa');
			break;
		case '/goodJSON':
			res.end(JSON.stringify({success: true}));
			break;
		case '/timeout':
			setTimeout(() => {
				res.end(JSON.stringify({success: true}));
			}, 30000);
			break;
		case '/404':
			res.writeHead(404, 'Not Found');
			res.end();
			break;
		default: 
			res.end('ok');
	}
}).listen(6756, () => {
	fetch('http://localhost:6756/badJSON').then(res => res.json()).then(data => {
		console.log('data', data);
	}).catch(err => {
		console.error('ERROR', err);
	});

	fetch('http://localhost:6756/badJSON').then(res => res.json()).then(data => {
		console.log('data', data);
	}).catch(err => {
		console.error('ERROR', JSON.stringify(err, null, '  '));
	});

	fetch('http://localhost:6756/timeout', {
		timeout: 2000
	}).then(res => res.json()).then(data => {
		console.log('data', data);
	}).catch(err => {
		console.error('ERROR', JSON.stringify(err, null, '  '));
	});

	fetch('http://localhost:6756/timeout', {
		method: 'POST',
		body: 'xxxxxxx',
		timeout: 2000
	}).then(res => res.json()).then(data => {
		console.log('data', data);
	}).catch(err => {
		console.error('ERROR', JSON.stringify(err, null, '  '));
	});


	fetch('http://localhost:6756/404', {
		timeout: 2000
	}).then(res => res.json()).then(data => {
		console.log('data', data);
	}).catch(err => {
		console.error('ERROR', JSON.stringify(err, null, '  '));
	});


	fetch('http://fdsafafdsafds89fdsa9f89dsafsda.com', {
		timeout: 2000
	}).then(res => res.json()).then(data => {
		console.log('data', data);
	}).catch(err => {
		console.error('ERROR', JSON.stringify(err, null, '  '));
	});
});

