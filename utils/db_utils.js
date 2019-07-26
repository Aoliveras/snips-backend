// Helper code for database
const fs = require('fs').promises;
const path = require('path');

/**
 * Gets absolute path to `resource` db file
 * @param {string} resource
 * @returns {string} file path
 */
const dbPath = resource => path.join(__dirname, '..', 'db', `${resource}.json`);

/**
 * Reads and parses JSON data from DB
 * @params {string} `resource` - resource to fetch
 * @returns {Promise<Object>} parsed data
 */
exports.readJsonFromDb = async resource =>
  JSON.parse(await fs.readFile(dbPath(resource)));

/**
 *Writes JSON data to file 
 @param
 @param
 @returns
 */
exports.writeJsonToDb = (resource, data) =>
  fs.writeFile(dbPath(resource), JSON.stringify(data));
