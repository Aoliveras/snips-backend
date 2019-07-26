const shortid = require('shortid');
const { readJsonFromDb, writeJsonToDb } = require('../utils/db_utils');
const ErrorWithHTTPStatus = require('../utils/ErrorWithHTTPStatus');

/**
 * @typedef {Object} Snippet
 * @property {string} id
 * @property {string} author
 * @property {string} code
 * @property {string} title
 * @property {string} description
 * @property {string} language
 * @property {string[]} comments
 * @property {number} favorites
 */

/* Create */

/**
 * Inserts new snippet into db.
 * @param {Snippet} newSnippet - the data to create the snippet with
 * @returns {Promise<Snippet>} the created snippet
 */
exports.insert = async ({ author, code, title, description, language }) => {
  try {
    if (!author || !code || !title || !description || !language)
      throw new ErrorWithHTTPStatus('Missing properties!', 400);
    // Read snippets
    const snippets = await readJsonFromDb('snippets');
    // Grab data from newSnippet (validate)
    // Make newSnippet a proper object
    // Generate default data (id, comments, favorites)
    // push that object into snippets
    snippets.push({
      id: shortid.generate(),
      author,
      code,
      title,
      description,
      language,
      comments: [],
      favorites: 0,
    });
    // write back to the file
    await writeJsonToDb('snippets', snippets);
    return snippets[snippets.length - 1];
  } catch (err) {
    if (err instanceof ErrorWithHTTPStatus) throw err;
    else throw new ErrorWithHTTPStatus(`Database Error!`);
  }
};

/* Read */

/**
 * Selects snippets from db.
 *
 * Can accept optional query object to filter results
 * @param {Object} [query]
 * @returns {Promise<Snippet[]>}
 */
exports.select = async (query = {}) => {
  try {
    // 1. read file
    // 2. Parse it
    const snippets = await readJsonFromDb('snippets');
    // Filter snippets with query
    const filtered = snippets.filter(snippet =>
      Object.keys(query).every(key => query[key] === snippet[key])
    );
    // 3. Return data
    return filtered;
  } catch (err) {
    throw new ErrorWithHTTPStatus(`Database error`);
  }
};

/* Update */

/**
 * Updates Snippet
 * @param {string} id - id of the snippet to update
 * @param {snippet} newData - subset of values to update
 */
exports.update = async (id, newData) => {
  console.log(newData);
  try {
    // TODO: error on id not found
    if (id.length === 0) throw new ErrorWithHTTPStatus(`Must give ID`);
    // read file
    const snippets = await readJsonFromDb('snippets');
    // find snippet with id
    // update snippet(make sure to validate again)
    const updatedSnippets = snippets.map(snippet => {
      if (snippet.id !== id) return snippet;

      Object.keys(newData).forEach(key => {
        // eslint-disable-next-line no-prototype-builtins
        if (key in snippet) snippet[key] = newData[key];
        // TODO: see if we want to throw an error here if key does not exist. Add 400 error
        else throw new ErrorWithHTTPStatus(`Invalid information!`);
      });
      return snippet;
    });
    // overwrite existing data
    return writeJsonToDb('snippets', updatedSnippets);
  } catch (err) {
    if (err instanceof ErrorWithHTTPStatus) throw err;
    else throw new ErrorWithHTTPStatus(`Database Error!`);
  }
};

/* Delete */

/**
 *@param {string} id - id
 */

exports.delete = async id => {
  // Read in the db file
  const snippets = await readJsonFromDb('snippets');
  // filter snippets for everything except snippet.id
  const filteredSnips = snippets.filter(snippet => snippet.id !== id);
  // Short-circuit if id does not exist
  if (filteredSnips.length === snippets.length) return;
  // TODO: error if trying to delete a snippet DNE
  // write the file
  await writeJsonToDb('snippets', filteredSnips);
};
