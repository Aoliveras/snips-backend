const fs = require('fs').promises;
const path = require('path');

function logger(request, response, next) {
  // append "method path timestamp" to log.txt
  // ex: GET / 232534534535
  const info = `Method: ${request.method} | Path: ${
    request.path
  } | TimeStamp: ${Date.now()}\n`;
  // Warning: be careful about pathing
  const filePath = path.join(__dirname, '..', `log.txt`);
  try {
    fs.appendFile(filePath, info);
  } catch (err) {
    console.error(err);
  } finally {
    // next says, move onto the next piece of middleware
    next();
  }
}

module.exports = logger;
