import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
	console.log(`Authentication system listening on port ${port}`);
});