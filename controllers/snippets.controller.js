const Snippet = require('../models/Snippet.model');
const ErrorWithHTTPStatus = require('../utils/ErrorWithHTTPStatus');

exports.createSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.insert(req.body);
    res.status(201).send(snippet);
  } catch (err) {
    next(err);
  }
};

exports.getSnippets = async ({ query }, res, next) => {
  try {
    const snippets = await Snippet.select(query);
    res.send(snippets);
  } catch (err) {
    next(err);
  }
};

exports.getSnippetByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const snippet = await Snippet.select({ id });
    if (snippet.length === 0) {
      throw new ErrorWithHTTPStatus('ID does not exist!', 404);
    }
    res.send(snippet[0]);
  } catch (err) {
    next(err);
  }
};

exports.updateSnippet = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Snippet.update(`${id}`, req.body);
    const snippets = await Snippet.select();
    res.send(snippets);
  } catch (err) {
    next(err);
  }
};

exports.deleteSnippet = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Snippet.delete(`${id}`);
    res.status(200).send(`Snippet deleted!`);
  } catch (err) {
    next(err);
  }
};
