const express = require('express');

const { create_database_service } = require('./database_service.factory');
const { create_authentication_service } = require('./authentication_service.factory');
const { create_crypto_service } = require('./crypto_service.factory');

const AUTH_TOKEN_LENGHT = parseInt(process.env.AUTH_TOKEN_LENGHT);
const PASSWORD_HASH_SECRET = process.env.PASSWORD_HASH_SECRET;
const PORT = parseInt(process.env.PORT);
const MONGODB_URI = process.env.MONGODB_URI;

(async () => {
	const app = express();

	app.use(express.json());

	const database_service = await create_database_service({
		uri: MONGODB_URI,
		database_name: 'authentication'
	});

	const crypto_service = create_crypto_service({ secret: PASSWORD_HASH_SECRET, auth_token_lenght: AUTH_TOKEN_LENGHT });

	const authentication_service = create_authentication_service({ database_service, crypto_service });

	function auth_handler(req, res, next) {
		const auth_token = req.headers['auth_token'];

		console.log("🚀 ~ auth_handler ~ auth_token:", auth_token)

		if (!auth_token) {
			res.status(401).json({ error: 'Unauthorized' });
			return;
		}

		try {
			const user = authentication_service.authenticate({ auth_token });

			if (!user) {
				res.status(401).json({ error: 'Unauthorized' });
				return;
			}

			req.user = user;
			next();
		} catch (e) {
			console.error(e);
			res.status(401).json({ error: 'Unauthorized' });
			return;
		}
	}

	app.get('/', auth_handler, (req, res) => {
		res.send("Hello, Node.js!");
	});

	app.get('/api/info', auth_handler, (req, res) => {
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

	app.listen(PORT, () => {
		console.log(`Authentication system listening on port ${PORT}`);
	});
})();

