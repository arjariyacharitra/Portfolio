import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {
  validateName,
  validateEmail,
  validatePhone,
  validateMessage,
} from '../utils/validators'

/**
 * ContactModal
 * Blurred backdrop, animated entrance/exit.
 * 4-field form (name, email, phone, message).
 * Uses react-hook-form for validation on blur + submit.
 * On success: replaces form with confirmation message.
 * On error: shows red banner at top.
 * Accessibility: role=dialog, aria-modal, focus trap, Escape key close.
 */
export default function ContactModal({ isOpen, onClose }) {
  const [submitState, setSubmitState] = useState('idle') // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const firstInputRef = useRef(null)
  const closeButtonRef = useRef(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  // Close modal helper that also resets state
  const handleClose = useCallback(() => {
    onClose()
    // Delay reset until exit animation completes
    setTimeout(() => {
      reset()
      setSubmitState('idle')
      setErrorMessage('')
    }, 300)
  }, [onClose, reset])

  // Escape key listener
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isOpen) handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, handleClose])

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 80)
    }
  }, [isOpen])

  // Focus trap: keep Tab cycling inside modal
  const handleKeyDown = useCallback((e) => {
    if (e.key !== 'Tab') return
    const modal = document.getElementById('contact-modal-panel')
    if (!modal) return
    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const onSubmit = async (data) => {
    setSubmitState('loading')
    setErrorMessage('')
    try {
      const res = await axios.post('/api/contact', data)
      if (res.data.success) {
        setSubmitState('success')
      } else {
        setErrorMessage(res.data.message || 'Something went wrong. Please try again.')
        setSubmitState('error')
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || 'Something went wrong. Please try again.'
      setErrorMessage(msg)
      setSubmitState('error')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-[8px]"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            id="contact-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={handleKeyDown}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-4"
          >
            <div className="w-full max-w-lg bg-[#111111] border border-[#1E1E1E] rounded-2xl shadow-2xl pointer-events-auto overflow-hidden">
              {/* Modal header */}
              <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-[#1E1E1E]">
                <div>
                  <h2 id="modal-title" className="font-display text-2xl font-bold text-[#F0F0F0]">
                    Get in Touch
                  </h2>
                  <p className="text-sm text-[#888888] mt-1">
                    I'll get back to you within 24 hours.
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={handleClose}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-[#1E1E1E] text-[#888888] hover:text-[#F0F0F0] hover:border-[#F0F0F0] transition-all duration-150"
                  aria-label="Close contact modal"
                >
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Modal body */}
              <div className="px-8 py-8">
                {submitState === 'success' ? (
                  /* Success state */
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-8"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#00FFD1]/10 border border-[#00FFD1]/30 flex items-center justify-center mx-auto mb-6">
                      <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00FFD1" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#F0F0F0] mb-2">
                      Message sent!
                    </h3>
                    <p className="text-[#888888]">
                      Thanks for reaching out — I'll get back to you soon.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-8 px-6 py-2.5 border border-[#1E1E1E] text-sm text-[#888888] hover:text-[#F0F0F0] rounded-full transition-colors duration-200"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  /* Form */
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* API error banner */}
                    <AnimatePresence>
                      {submitState === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          role="alert"
                          aria-live="assertive"
                          className="mb-6 flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl"
                        >
                          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          <p className="text-sm text-red-400">{errorMessage}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-5">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="modal-name"
                          className="block text-xs font-medium text-[#888888] mb-1.5 tracking-wide"
                        >
                          Full Name <span aria-hidden="true" className="text-red-500">*</span>
                        </label>
                        <input
                          id="modal-name"
                          type="text"
                          autoComplete="name"
                          ref={(el) => {
                            register('name', { validate: validateName }).ref(el)
                            firstInputRef.current = el
                          }}
                          {...register('name', { validate: validateName })}
                          placeholder="Riya Sharma"
                          aria-required="true"
                          aria-invalid={errors.name ? 'true' : 'false'}
                          aria-describedby={errors.name ? 'error-name' : undefined}
                          className={`w-full bg-[#0A0A0A] border rounded-xl px-4 py-3 text-sm text-[#F0F0F0] placeholder-[#444] outline-none transition-all duration-200
                            focus:ring-1 focus:ring-[#00FFD1] focus:border-[#00FFD1]
                            ${errors.name ? 'border-red-500' : 'border-[#1E1E1E] hover:border-[#333]'}`}
                        />
                        {errors.name && (
                          <p id="error-name" role="alert" className="mt-1.5 text-xs text-red-400">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="modal-email"
                          className="block text-xs font-medium text-[#888888] mb-1.5 tracking-wide"
                        >
                          Email Address <span aria-hidden="true" className="text-red-500">*</span>
                        </label>
                        <input
                          id="modal-email"
                          type="email"
                          autoComplete="email"
                          {...register('email', { validate: validateEmail })}
                          placeholder="riya@example.com"
                          aria-required="true"
                          aria-invalid={errors.email ? 'true' : 'false'}
                          aria-describedby={errors.email ? 'error-email' : undefined}
                          className={`w-full bg-[#0A0A0A] border rounded-xl px-4 py-3 text-sm text-[#F0F0F0] placeholder-[#444] outline-none transition-all duration-200
                            focus:ring-1 focus:ring-[#00FFD1] focus:border-[#00FFD1]
                            ${errors.email ? 'border-red-500' : 'border-[#1E1E1E] hover:border-[#333]'}`}
                        />
                        {errors.email && (
                          <p id="error-email" role="alert" className="mt-1.5 text-xs text-red-400">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="modal-phone"
                          className="block text-xs font-medium text-[#888888] mb-1.5 tracking-wide"
                        >
                          Phone Number <span aria-hidden="true" className="text-red-500">*</span>
                        </label>
                        <input
                          id="modal-phone"
                          type="tel"
                          autoComplete="tel"
                          {...register('phone', { validate: validatePhone })}
                          placeholder="+91 98765 43210"
                          aria-required="true"
                          aria-invalid={errors.phone ? 'true' : 'false'}
                          aria-describedby={errors.phone ? 'error-phone' : undefined}
                          className={`w-full bg-[#0A0A0A] border rounded-xl px-4 py-3 text-sm text-[#F0F0F0] placeholder-[#444] outline-none transition-all duration-200
                            focus:ring-1 focus:ring-[#00FFD1] focus:border-[#00FFD1]
                            ${errors.phone ? 'border-red-500' : 'border-[#1E1E1E] hover:border-[#333]'}`}
                        />
                        {errors.phone && (
                          <p id="error-phone" role="alert" className="mt-1.5 text-xs text-red-400">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="modal-message"
                          className="block text-xs font-medium text-[#888888] mb-1.5 tracking-wide"
                        >
                          Message{' '}
                          <span className="text-[#555]">(optional, max 500 chars)</span>
                        </label>
                        <textarea
                          id="modal-message"
                          rows={4}
                          {...register('message', { validate: validateMessage })}
                          placeholder="I'd love to collaborate on a project…"
                          aria-invalid={errors.message ? 'true' : 'false'}
                          aria-describedby={errors.message ? 'error-message' : undefined}
                          className={`w-full bg-[#0A0A0A] border rounded-xl px-4 py-3 text-sm text-[#F0F0F0] placeholder-[#444] outline-none resize-none transition-all duration-200
                            focus:ring-1 focus:ring-[#00FFD1] focus:border-[#00FFD1]
                            ${errors.message ? 'border-red-500' : 'border-[#1E1E1E] hover:border-[#333]'}`}
                        />
                        {errors.message && (
                          <p id="error-message" role="alert" className="mt-1.5 text-xs text-red-400">
                            {errors.message.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={submitState === 'loading'}
                      whileHover={submitState !== 'loading' ? { scale: 1.02, y: -1 } : {}}
                      whileTap={submitState !== 'loading' ? { scale: 0.98 } : {}}
                      className={`mt-8 w-full py-3.5 font-display font-bold text-sm tracking-wide rounded-xl transition-all duration-200
                        ${submitState === 'loading'
                          ? 'bg-[#00FFD1]/50 text-[#0A0A0A]/70 cursor-not-allowed'
                          : 'bg-[#00FFD1] text-[#0A0A0A] hover:shadow-[0_0_24px_rgba(0,255,209,0.3)]'
                        }`}
                      aria-disabled={submitState === 'loading'}
                    >
                      {submitState === 'loading' ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            aria-hidden="true"
                            className="animate-spin w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                          </svg>
                          Sending…
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
