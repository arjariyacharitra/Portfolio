require('dotenv').config()

const express = require('express')
const cors = require('cors')
const contactRouter = require('./routes/contact')

const app = express()
const PORT = process.env.PORT || 5000

// ─── Middleware ────────────────────────────────────────────────────────────────

// CORS: allow requests from the frontend origin only
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
)

// Parse JSON request bodies (limit body size to prevent abuse)
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false, limit: '10kb' }))

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Contact form route (rate limiting applied inside the router)
app.use('/api', contactRouter)

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found.' })
})

// ─── Global Error Handler ─────────────────────────────────────────────────────
// Catches any unhandled errors thrown by route handlers.
// Never exposes stack traces to the client.
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(`[${new Date().toISOString()}] Unhandled error:`, err.message)
  res.status(500).json({
    success: false,
    message: 'An unexpected error occurred. Please try again.',
  })
})

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server running on port ${PORT}`)
  console.log(`  Health check: http://localhost:${PORT}/api/health`)
})

module.exports = app
