const express = require('express')
const { body, validationResult } = require('express-validator')
const rateLimiter = require('../middleware/rateLimiter')
const sanitizeBody = require('../middleware/sanitizer')
const { sendContactEmail } = require('../utils/mailer')

const router = express.Router()

/**
 * Validation rules (express-validator).
 * Applied after sanitization so all values are already stripped/trimmed.
 */
const contactValidationRules = [
  body('name')
    .notEmpty().withMessage('Full name is required.')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters.'),

  body('email')
    .notEmpty().withMessage('Email address is required.')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('phone')
    .notEmpty().withMessage('Phone number is required.')
    .custom((value) => {
      const digits = value.replace(/[\s\-\+\(\)]/g, '')
      if (!/^\d+$/.test(digits)) throw new Error('Phone must contain digits only.')
      if (digits.length < 10 || digits.length > 15)
        throw new Error('Phone number must be 10–15 digits.')
      return true
    }),

  body('message')
    .optional({ checkFalsy: true })
    .isLength({ max: 500 }).withMessage('Message must be 500 characters or fewer.'),
]

/**
 * POST /api/contact
 *
 * Pipeline:
 *   1. rateLimiter  — 5 req / IP / 15 min
 *   2. sanitizeBody — strip HTML, trim whitespace
 *   3. validation   — server-side field checks
 *   4. console.log  — timestamped submission log
 *   5. sendEmail    — Nodemailer dispatch
 *   6. JSON response
 */
router.post(
  '/contact',
  rateLimiter,
  sanitizeBody,
  contactValidationRules,
  async (req, res) => {
    // 1. Check validation result
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      })
    }

    const { name, email, phone, message } = req.body

    // 2. Log submission with timestamp
    const timestamp = new Date().toISOString()
    console.log(
      `[${timestamp}] Contact form submission — Name: "${name}" | Email: "${email}" | Phone: "${phone}" | IP: ${req.ip}`
    )

    // 3. Send email
    try {
      await sendContactEmail({ name, email, phone, message })
      console.log(`[${new Date().toISOString()}] Email sent successfully to ${process.env.OWNER_EMAIL}`)

      return res.status(200).json({
        success: true,
        message: 'Email sent successfully.',
      })
    } catch (err) {
      // Log the internal error but never expose details to the client
      console.error(`[${new Date().toISOString()}] Email send failed:`, err.message)

      return res.status(500).json({
        success: false,
        message: 'Failed to send email. Please try again later.',
      })
    }
  }
)

module.exports = router
