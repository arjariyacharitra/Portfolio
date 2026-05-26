/**
 * validators.js
 * Client-side validation helpers used in ContactModal via React Hook Form.
 * Each function returns an error string on failure, or true on success.
 */

/** Validates a full name: required, min 2 chars */
export const validateName = (value) => {
  if (!value || value.trim().length === 0) return 'Full name is required.'
  if (value.trim().length < 2) return 'Name must be at least 2 characters.'
  return true
}

/** Validates an email address using a standard RFC-5322 simplified pattern */
export const validateEmail = (value) => {
  if (!value || value.trim().length === 0) return 'Email address is required.'
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(value.trim())) return 'Please enter a valid email address.'
  return true
}

/** Validates a phone number: required, digits only (with optional +/spaces/dashes), 10–15 digits */
export const validatePhone = (value) => {
  if (!value || value.trim().length === 0) return 'Phone number is required.'
  const digits = value.replace(/[\s\-\+\(\)]/g, '')
  if (!/^\d+$/.test(digits)) return 'Phone number must contain digits only.'
  if (digits.length < 10 || digits.length > 15) return 'Phone number must be 10–15 digits.'
  return true
}

/** Validates the message field: optional, max 500 chars */
export const validateMessage = (value) => {
  if (value && value.length > 500) return 'Message must be 500 characters or fewer.'
  return true
}
