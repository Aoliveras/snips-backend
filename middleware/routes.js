const express = require('express');
const snippetsController = require('../controllers/snippets.controller');

const router = express.Router();

// ROOT route
router.get('/', (req, res) => {
  res.send('Welcome to Snips!');
});
// API ROOT
router.get('/api', (req, res) => {
  res.send('Welcome to the Snips API!');
});

// Snippets routes
router.post('/api/snippets', snippetsController.createSnippet);
router.get('/api/snippets', snippetsController.getSnippets);
router.get('/api/snippets/:id', snippetsController.getSnippetByID);
router.patch('/api/snippets/:id', snippetsController.updateSnippet);
router.delete('/api/snippets/:id', snippetsController.deleteSnippet);

module.exports = router;
