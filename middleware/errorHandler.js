const ErrorWithHTTPStatus = require('../utils/ErrorWithHTTPStatus');

/**
 * Sends appropriate error message and ode to the client
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof ErrorWithHTTPStatus)
    res.status(err.status).send(err.message);
  else res.status(500).send(`Server error!`);
};

module.exports = errorHandler;
