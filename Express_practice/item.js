const express = require('express');

const router = express.Router();

let items = [];

// GET /items - Retrieve all items
router.get('/items', (req, res) => {
  res.json(items);
});

// POST /items - Add a new item
router.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

module.exports = router;