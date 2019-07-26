const express = require('express');
const snippetsController = require('../controllers/snippets.controller');

const router = express.Router();

const Snippet = require('../models/Snippet.model');

// ROOT route
router.get('/', snippetsController.getSnippets);
// API ROOT
router.get('/api', (req, res) => {
  res.send('Welcome to the Snips API!');
});

router.post('/api/snippets', snippetsController.createSnippet);
router.get('/api/snippets', snippetsController.getSnippets);
router.get('/api/snippets/:id', snippetsController.getSnippetByID);
router.patch('/api/snippets/:id', snippetsController.updateSnippet);
router.delete('/api/snippets/:id', snippetsController.deleteSnippet);

module.exports = router;
