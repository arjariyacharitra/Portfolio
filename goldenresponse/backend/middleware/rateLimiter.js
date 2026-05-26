const rateLimit = require('express-rate-limit')

/**
 * rateLimiter
 * Limits each IP to 5 requests per 15-minute window.
 * Returns a structured JSON error response (not the default HTML page)
 * when the limit is exceeded.
 */
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,   // Return rate-limit info in the `RateLimit-*` headers
  legacyHeaders: false,     // Disable the `X-RateLimit-*` headers

  handler: (req, res) => {
    console.warn(
      `[${new Date().toISOString()}] Rate limit exceeded — IP: ${req.ip}`
    )
    res.status(429).json({
      success: false,
      message: 'Too many requests. Please wait 15 minutes before trying again.',
    })
  },
})

module.exports = rateLimiter
