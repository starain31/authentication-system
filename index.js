const express = require('express');

const { create_database_service } = require('./database_service.factory');
const { create_authentication_service } = require('./authentication_service.factory');
const { create_crypto_service } = require('./crypto_service.factory');

const AUTH_TOKEN_LENGHT = 256;
const SECRET = 'mirpur rocks!!!';
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

(async () => {
	const app = express();

	app.use(express.json());

	const database_service = await create_database_service({
		uri: MONGODB_URI,
		database_name: 'authentication'
	});

	const crypto_service = create_crypto_service({ secret: SECRET, auth_token_lenght: AUTH_TOKEN_LENGHT });

	const authentication_service = create_authentication_service({ database_service, crypto_service });

	app.get('/', (req, res) => {
		res.send("Hello, Node.js!");
	});

	app.get('/api/info', (req, res) => {
		res.json({
			name: 'Authentication system',
			version: '1.0.0',
			description: 'Authentication system',
		});
	});

	app.post('/api/register', async (req, res) => {
		const { username, password, email } = req.body;

		console.log({ username, password });

		const user = await authentication_service.register({ username, password, email });

		res.json(user);
	});

	app.post('/api/login', async (req, res) => {
		try {
			const { username, password } = req.body;

			const { auth_token } = await authentication_service.login({ username, password });

			res.json({ auth_token });
		} catch (e) {
			console.error(e);
			res.status(400).json({ error: e.message });
		}

	});

	app.listen(port, () => {
		console.log(`Authentication system listening on port ${port}`);
	});
})();

