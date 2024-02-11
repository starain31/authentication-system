import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send("Hello, Node.js!");
})

app.listen(port, () => {
	console.log(`Authentication system listening on port ${port}`);
})