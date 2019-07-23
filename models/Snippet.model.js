const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

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
      throw Error('Missing properties!');
    // Read snippets
    const dbpath = path.join(__dirname, '..', 'db', 'snippets.json');
    const snippets = JSON.parse(await fs.readFile(dbpath));
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
    await fs.writeFile(dbpath, JSON.stringify(snippets));
    return snippets[snippets.length - 1];
  } catch (err) {
    console.log(err);
    throw err;
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
    const dbpath = path.join(__dirname, '..', 'db', 'snippets.json');
    const snippets = JSON.parse(await fs.readFile(dbpath));
    // Filter snippets with query
    const filtered = snippets.filter(snippet =>
      Object.keys(query).every(key => query[key] === snippet[key])
    );
    // 3. Return data
    return filtered;
  } catch (err) {
    console.log(`Error in snippet model`);
    throw err;
  }
};

/* Update */

/* Delete */
