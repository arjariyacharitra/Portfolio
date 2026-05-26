# Portfolio App

## 1. Project Overview

A production-grade personal portfolio website with scroll-based storytelling animations, a live contact form, and a full Express backend that sends emails on submission.

### What It Does

- Six animated sections (Hero → About → Skills → Projects → Contact CTA) that reveal as you scroll, powered by Framer Motion
- A lazy-loaded contact modal with client- and server-side validation, a loading state, and success/error feedback
- An Express API that rate-limits, sanitizes, validates, logs, and emails every form submission via Nodemailer (Gmail SMTP)
- Fully responsive across mobile, tablet, and desktop using Tailwind CSS
- WCAG AA accessible: focus trap, keyboard navigation, ARIA attributes throughout

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 + Vite |
| Animations | Framer Motion v11 |
| Styling | Tailwind CSS v3 |
| Forms | React Hook Form v7 |
| HTTP Client | Axios |
| Backend Runtime | Node.js 18+ |
| Backend Framework | Express 4 |
| Email | Nodemailer (Gmail SMTP) |
| Security | express-rate-limit, express-validator, sanitize-html |
| Config | dotenv |

---

## 2. Repository Structure

```
portfolio-app/
├── frontend/                          # React 18 + Vite application
│   ├── public/
│   │   └── assets/                    # Static images, icons, fonts
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx             # Fixed nav, active-link highlight, hamburger menu
│   │   │   ├── Hero.jsx               # 100vh, staggered headline, mouse-parallax orb
│   │   │   ├── About.jsx              # Two-column, line-by-line reveal, stats strip
│   │   │   ├── Skills.jsx             # Animated progress bars grouped by category
│   │   │   ├── Projects.jsx           # Card grid, hover lift, staggered entrance
│   │   │   ├── ContactCTA.jsx         # Wide CTA section, opens ContactModal
│   │   │   └── ContactModal.jsx       # Blurred backdrop, animated modal, 4-field form
│   │   ├── hooks/
│   │   │   └── useScrollAnimation.js  # Reusable IntersectionObserver + Framer hook
│   │   ├── utils/
│   │   │   └── validators.js          # Client-side field validation helpers
│   │   ├── App.jsx                    # Root — section assembly + modal state
│   │   ├── main.jsx                   # Vite entry point
│   │   └── index.css                  # Tailwind directives + base styles
│   ├── index.html                     # HTML shell with Google Fonts
│   ├── tailwind.config.js             # Custom theme tokens
│   ├── postcss.config.js
│   └── package.json
│
├── backend/                           # Node.js 18 + Express 4 API
│   ├── routes/
│   │   └── contact.js                 # POST /api/contact handler
│   ├── middleware/
│   │   ├── rateLimiter.js             # 5 requests / IP / 15 minutes
│   │   └── sanitizer.js               # Strip HTML, trim whitespace
│   ├── utils/
│   │   └── mailer.js                  # Nodemailer config + HTML email template
│   ├── server.js                      # Express bootstrap, CORS, global error handler
│   ├── .env.example                   # All required env vars documented
│   └── package.json
│
└── README.md
```

---

## 3. Instructions for Running / Testing the Code

### Prerequisites

- Node.js 18 or later
- npm 9 or later
- A Gmail account with an **App Password** → [Generate one here](https://myaccount.google.com/apppasswords)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/portfolio-app.git
cd portfolio-app
```

---

### Step 2 — Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in the required values:

| Variable | Purpose | Example |
|---|---|---|
| `PORT` | Port the Express server listens on | `5000` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:5173` |
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_SECURE` | Use TLS (true for 465, false for 587) | `false` |
| `SMTP_USER` | Gmail address used to send emails | `you@gmail.com` |
| `SMTP_PASS` | Gmail App Password | `abcd efgh ijkl mnop` |
| `OWNER_EMAIL` | Email address that receives submissions | `you@gmail.com` |
| `FROM_NAME` | Display name shown in email client | `Portfolio Contact Form` |

Start the backend:

```bash
npm run dev
# → http://localhost:5000
```

Verify it is running:

```bash
curl http://localhost:5000/api/health
# → {"status":"ok","timestamp":"..."}
```

---

### Step 3 — Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
# → http://localhost:5173
```

The Vite dev server automatically proxies all `/api` calls to `http://localhost:5000` — no extra configuration needed.

---

### Step 4 — Run Both Together

Open two terminal tabs:

```bash
# Tab 1 — Backend
cd backend && npm run dev

# Tab 2 — Frontend
cd frontend && npm run dev
```

Visit `http://localhost:5173` in your browser.

---

### Step 5 — Build for Production

```bash
# Frontend
cd frontend && npm run build
# Output: frontend/dist/

# Backend
cd backend && npm start
```

---

### Deployment

| Service | Target |
|---|---|
| [Vercel](https://vercel.com) | Frontend — set root directory to `frontend`, build command `npm run build`, output `dist` |
| [Railway](https://railway.app) | Backend — add env vars from `.env.example`, start command auto-detected as `npm start` |
| [Render](https://render.com) | Backend — root `backend`, build `npm install`, start `node server.js` |

After deploying the backend, update `FRONTEND_URL` in your backend env vars to your Vercel URL.

---

## 4. Evaluation Methodology

The project was evaluated against the following criteria:

### Functionality
- All six sections render correctly and animate on scroll using Framer Motion `useInView` and `useAnimation`
- The contact modal opens, validates all four fields (name, email, phone, message) on blur and on submit, and returns a success or error state
- The backend `POST /api/contact` endpoint correctly processes submissions end-to-end: rate limiting → sanitization → validation → logging → email dispatch → JSON response

### Security
- **Rate limiting:** `express-rate-limit` restricts each IP to 5 requests per 15-minute window, returning a structured JSON `429` response
- **Input sanitization:** `sanitize-html` strips all HTML tags and trims whitespace from every field before validation runs
- **Server-side validation:** `express-validator` re-validates all fields independently of the client, ensuring no bypass is possible
- **Credential safety:** All SMTP credentials are loaded exclusively from `.env` — nothing is hardcoded

### Accessibility (WCAG AA)
- Every interactive element is keyboard-navigable
- The contact modal carries `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to the modal title
- Focus is trapped inside the modal while open; Escape key closes it
- Color contrast ratio meets the 4.5:1 minimum throughout
- All images include descriptive `alt` attributes; icon-only buttons carry `aria-label`

### Performance
- `ContactModal` is lazy-loaded via `React.lazy()` + `Suspense` to keep the initial bundle small
- All Framer Motion animations operate exclusively on `transform` and `opacity` — GPU-friendly properties that avoid layout thrashing
- Images use `loading="lazy"` to defer off-screen loading
- Manual scroll listeners are debounced at 100 ms to prevent scroll jank

### Code Quality
- Each component has a single, clearly defined responsibility
- Validation logic is extracted into `validators.js` (frontend) and `express-validator` rules (backend) and reused consistently
- The `useScrollAnimation` hook abstracts the Intersection Observer + Framer Motion pattern into a single reusable interface
- No stack traces or internal error details are ever exposed to the client
