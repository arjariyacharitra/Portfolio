const sanitizeHtml = require('sanitize-html')

/**
 * sanitizeBody
 * Middleware that strips all HTML tags from every string field in req.body
 * and trims leading/trailing whitespace.
 * Applied BEFORE validation so validators work on clean data.
 */
function sanitizeBody(req, _res, next) {
  if (req.body && typeof req.body === 'object') {
    for (const key of Object.keys(req.body)) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeHtml(req.body[key], {
          allowedTags: [],        // strip all HTML tags
          allowedAttributes: {},  // strip all attributes
        }).trim()
      }
    }
  }
  next()
}

module.exports = sanitizeBody
