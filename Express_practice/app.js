const express = require('express');

const app = express();
const port = 3000;

app.get('/items', (req, res) => { 
  res.status(200).json({ 'message': 'Hello, world!' });
});

app.post('/items', (req, res) => { 
  const newItem = req.body;
  res.status(201).json({ 'message': 'Item created', 'item': newItem });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});