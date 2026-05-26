━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROMPT --- FULL-STACK PERSONAL PORTFOLIO WEBSITE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

────────────────────────────────────────────────────────────

CONTEXT AND ROLE

────────────────────────────────────────────────────────────

As a Senior Full-Stack Engineer with a strong eye for design, you are

responsible for building a complete, production-grade personal portfolio

website --- not a template, not a stub. Every file listed must be
generated,

every line must be runnable, and every section must reflect real craft.

The portfolio should feel alive: sections animate as you scroll, the
design

has personality, and a contact form actually sends an email when
submitted.

Think cinematic editorial, not corporate filler.

You are wearing both hats --- senior engineer and thoughtful designer
--- at the

same time.

────────────────────────────────────────────────────────────

OBJECTIVE

────────────────────────────────────────────────────────────

Develop a complete full-stack portfolio website that:

• Implements scroll-based storytelling animations using Framer Motion

• Provides a modern, dark, editorial UI with smooth transitions

• Includes a \"Get in Touch\" button that opens an animated contact
modal

• Validates and sanitizes all user input, client- and server-side

• Logs form submissions with a timestamp to the server console

• Triggers an email to the portfolio owner upon successful submission

• Returns structured JSON responses from the API

• Is fully responsive across mobile, tablet, and desktop

• Meets WCAG AA accessibility requirements throughout

────────────────────────────────────────────────────────────

FOLDER STRUCTURE

────────────────────────────────────────────────────────────

Generate every file listed below. Explain what each one does --- no
skipping.

/portfolio-app

├── /frontend ← React 18 + Vite app

│ ├── /public

│ │ └── /assets ← Images, icons, fonts

│ ├── /src

│ │ ├── /components

│ │ │ ├── Navbar.jsx ← Fixed nav, active-link highlight, fade-in on load

│ │ │ ├── Hero.jsx ← Full-screen, staggered headline, mouse-parallax

│ │ │ ├── About.jsx ← Two-column, line-by-line text reveal, stats strip

│ │ │ ├── Skills.jsx ← Animated progress/radial indicators by category

│ │ │ ├── Projects.jsx ← Card grid, hover lift, staggered entrance

│ │ │ ├── ContactCTA.jsx ← Wide CTA section, opens ContactModal on click

│ │ │ └── ContactModal.jsx ← Blurred backdrop, animated modal, 4-field
form

│ │ ├── /hooks

│ │ │ └── useScrollAnimation.js ← Reusable Intersection Observer +
Framer hook

│ │ ├── /utils

│ │ │ └── validators.js ← Client-side field validation helpers

│ │ ├── App.jsx ← Root component, section assembly

│ │ └── main.jsx ← Vite entry point

│ ├── tailwind.config.js ← Custom theme tokens, font config

│ └── package.json

│

├── /backend ← Node.js 18 + Express 4 API

│ ├── /routes

│ │ └── contact.js ← POST /api/contact handler

│ ├── /middleware

│ │ ├── rateLimiter.js ← 5 requests / IP / 15 min

│ │ └── sanitizer.js ← Strip HTML, trim whitespace

│ ├── /utils

│ │ └── mailer.js ← Nodemailer config + email template

│ ├── server.js ← Express app bootstrap

│ ├── .env.example ← All required env vars documented

│ └── package.json

│

└── README.md ← Full setup, env vars, deployment, API docs

────────────────────────────────────────────────────────────

TECHNOLOGY STACK

────────────────────────────────────────────────────────────

Frontend

─────────────────────────────────────

Framework React 18+ with Vite (or Next.js 14+ --- either works)

Animations Framer Motion v10+

Styling Tailwind CSS v3+

HTTP Axios or Fetch API

Forms React Hook Form (preferred) or manual handling

Backend

─────────────────────────────────────

Runtime Node.js 18+

Framework Express.js 4+

Email Nodemailer (Gmail SMTP) or SendGrid

Security express-rate-limit, express-validator, sanitize-html

Config dotenv

Optional

─────────────────────────────────────

Database MongoDB or PostgreSQL for persisting submissions

────────────────────────────────────────────────────────────

UI AND ANIMATION REQUIREMENTS

────────────────────────────────────────────────────────────

Visual Direction

Background #0A0A0A (near-black)

Accent One strong color --- electric cyan, neon violet, or amber.

Pick one and use it consistently across the entire site.

Typography Clash Display or Syne for headings

DM Sans or Instrument Sans for body copy

Load from Google Fonts or a CDN

Layout Asymmetric where it makes sense; bold section breaks;

generous breathing room

Avoid Purple gradients on white. Seen it. Hard pass.

Scroll-Based Storytelling

• Scroll-triggered animations via Framer Motion useInView and
useAnimation

• Parallax effects, fade-ins, and staggered transitions between sections

• Narrative flow across: Hero → About → Skills → Projects → Contact CTA

• Animations must:

-- Be performant (no layout thrashing)

-- Use only GPU-friendly properties: transform and opacity

-- Never block or jank scroll performance

• Debounce any manual scroll detection at 100 ms

────────────────────────────────────────────────────────────

THE SIX SECTIONS --- DETAILED SPECIFICATIONS

────────────────────────────────────────────────────────────

1\. NAVBAR

• Fixed at the top at all times

• Name or logo on the left; nav links on the right

• Active section highlights in the nav via Intersection Observer

• Clicking a link smoothly scrolls to the target section

• On first load, the entire navbar fades in (Framer Motion, opacity 0 →
1)

• Hamburger menu on mobile (\< 640 px)

2\. HERO

• Full viewport height (100vh)

• Headline enters with staggered character or word animation (not all at
once)

• Subtitle follows \~300 ms after the headline completes

• Background includes a subtle mouse-parallax element:

floating orb, soft SVG blob, or gentle grid --- adds depth, not
distraction

• \"View My Work\" button scrolls down to the Projects section

→ Provide a full working code example for this component.

3\. ABOUT

• Two-column layout: avatar/image placeholder left, bio text right

• Bio text reveals line by line --- each line slides up with a slight
delay

• Framer Motion useInView controls when the animation triggers

• Includes a small stats strip or tag row, e.g.:

\"3 years exp\" · \"12 projects\" · \"5 countries\"

4\. SKILLS

• 8--12 skills displayed as progress bars or radial indicators

• On scroll-into-view, all bars/radials animate from 0 to their real
values

• Use useInView + useAnimation from Framer Motion for the trigger

• Grouped by category: Frontend · Backend · Tools

→ Provide a full working code example for this component.

5\. PROJECTS

• 3--4 cards in a responsive grid

• Each card contains: project name, short description, tech tags,

GitHub link, and live demo link

• Hover state: card lifts slightly (whileHover: scale 1.03, y -8)

• Cards stagger into view one by one when the section enters the
viewport

• Placeholder projects are fine (e.g., \"E-Commerce Dashboard\",

\"AI Chatbot UI\", \"Dev Portfolio\")

6\. CONTACT CTA

• Wide, centered section

• Large headline: e.g., \"Let\'s build something great together.\"

• Single button below: \"Get in Touch\"

• Button uses whileHover and whileTap (Framer Motion)

• Clicking the button opens the ContactModal

────────────────────────────────────────────────────────────

CONTACT MODAL --- FULL SPECIFICATION

────────────────────────────────────────────────────────────

Opening Behavior

• Background blurs (backdrop-filter: blur(8px)) and dims to a dark
overlay

• Framer Motion entrance:

-- Backdrop fades from opacity 0 → 1

-- Modal panel scales from 0.85 → 1 while fading in simultaneously

• Closes on: X button click · backdrop click · Escape key press

Form Fields

┌──────────────────┬───────────┬──────────────────────────────────────┐

│ Field │ Type │ Validation Rules │

├──────────────────┼───────────┼──────────────────────────────────────┤

│ Full Name │ text │ Required · min 2 characters │

│ Email Address │ email │ Required · valid email pattern │

│ Phone Number │ tel │ Required · digits only · 10--15 digits│

│ Message │ textarea │ Optional · max 500 characters │

└──────────────────┴───────────┴──────────────────────────────────────┘

Validation Behavior

• Errors appear inline, directly below the relevant field, in red

• Validate on: form submit AND on field blur

• While submitting: disable the button, show a loading spinner

Success State

• Replace the form with a calm confirmation message:

\"Message sent! I\'ll get back to you soon.\"

Error State

• Show a red banner at the top of the modal:

\"Something went wrong. Please try again.\"

Accessibility

• role=\"dialog\" · aria-modal=\"true\" · aria-labelled by pointing to
modal title

• Focus trapped inside the modal while it is open

• Escape key closes the modal

• All interactive elements are keyboard-navigable

Performance

• Lazy-load Contact Modal with React.lazy() and Suspense

────────────────────────────────────────────────────────────

BACKEND --- FULL SPECIFICATION

────────────────────────────────────────────────────────────

Endpoint

POST /api/contact

Request Processing Order

1\. Rate limit check --- max 5 requests from one IP within 15 minutes

2\. Sanitize inputs --- strip all HTML, trim whitespace

3\. Server-side validation --- name, email format, phone digits

4\. Console log the submission with a full ISO timestamp

5\. Send the email via Nodemailer

6\. Return a structured JSON success response

API Response Shape

Success: { \"success\": true, \"message\": \"Email sent successfully.\"
}

Error: { \"success\": false, \"message\": \"\<descriptive error
message\>\" }

Security Requirements

• express-rate-limit: 5 req / IP / 15 min window

• sanitize-html (or DOMPurify): strip all HTML from every field

• express-validator: enforce field rules server-side

• All credentials (SMTP, API keys) loaded from .env --- never hardcoded

────────────────────────────────────────────────────────────

EMAIL TEMPLATE (mailer.js)

────────────────────────────────────────────────────────────

Subject: New Portfolio Inquiry from \[Name\]

──────────────────────────────────────

NEW CONTACT FORM SUBMISSION

──────────────────────────────────────

Name : Riya Sharma

Email : riya@example.com

Phone : +91-9876543210

Message : I\'d love to collaborate on a project.

Timestamp : 2025-05-25T10:30:00.000Z

────────────────────────────

Sent via Portfolio Contact Form

───────────────────────────────────────────

RESPONSIVE BEHAVIOR

───────────────────────────────────────────────────────

Mobile \< 640 px Single column throughout; hamburger menu;

project cards stack vertically

Tablet 640--1024 px Projects in a 2-col grid; About section side by side

Desktop \> 1024 px Full layout; projects in a 3-col grid

Use Tailwind\'s sm:, md:, lg: breakpoint prefixes consistently
throughout.

────────────────────────────────────────

ACCESSIBILITY --- NON-NEGOTIABLE

─────────────────────────────────────────

• Every image has a descriptive alt attribute

• Buttons without self-explanatory labels carry an aria-label

• Modal: role=\"dialog\", aria-modal=\"true\", aria-labelledby → modal
title

• Focus is trapped inside the modal while it is open

• Escape key closes the modal

• Color contrast ratio ≥ 4.5:1 everywhere (WCAG AA)

• Semantic HTML throughout (nav, main, section, article, footer, etc.)

─────────────────────────────────────────────

PERFORMANCE REQUIREMENTS

─────────────────────────────────────

• Lazy-load ContactModal via React.lazy() + Suspense

• All Framer Motion animations touch only transform and opacity ---

never animate width, height, top, or left directly

• Add loading=\"lazy\" to all images

• Debounce manual scroll listeners at 100 ms

• Optimize bundle size; avoid importing entire libraries when
tree-shaking works

• No animation should cause scroll jank --- test it and fix it if it
does

───────────────────────────────────────

OUTPUT REQUIREMENTS

─────────────────────────────────────────────

• All 6 sections built out with Framer Motion animations

• ContactModal fully implemented --- 4 fields, full validation, entrance
animation

• Express backend with rate limiting, sanitization, and validation wired
up

• Nodemailer configured and reading credentials from .env

• API returns structured JSON for both success and error cases

• Tailwind layout is fully responsive across all breakpoints

• HTML is accessible --- ARIA, focus trap, keyboard navigation

• README covers setup, environment variables, and deployment

• Every single file is real, runnable code --- no pseudocode, no stubs

───────────────────────────────────────

ERROR HANDLING AND DOCUMENTATION

─────────────────────────────────────────

Frontend

• Inline field errors with clear messaging

• Graceful fallback if the API call fails (red banner in modal)

Backend

• Structured error responses with appropriate HTTP status codes

• Console logging for all backend failures with timestamps

• Never expose stack traces or internal details to the client

README must document:

┌────────────────────────────────

│ • Project description and what it actually does │

│ • Tech stack laid out in a table │

│ • Annotated folder structure │

│ • Step-by-step install instructions (frontend + │

│ backend separately) │

│ • Environment variables table (name · purpose · │

│ example value) │

│ • Exact commands to run locally │

│ • Deployment notes --- Vercel (frontend), │

│ Railway or Render (backend) │

│ • Full API docs for POST /api/contact │

│ • Known limitations (Gmail sending caps, etc.) │

└─────────────────────────────── 

─────────────────────────────────

PRE-DELIVERY CHECKLIST

─────────────────────────────────

☐ All 6 sections built with Framer Motion animations

☐ ContactModal --- 4 fields, validation, animated entrance/exit

☐ Express backend with rate limiting wired up

☐ Nodemailer configured and pulling from .env

☐ Sanitization middleware applied before validation

☐ API responses are structured JSON (success and error)

☐ Tailwind layout is fully responsive (mobile / tablet / desktop)

☐ HTML is accessible --- ARIA, focus trap, keyboard nav

☐ README covers setup, environment variables, and deployment

☐ Every file is real, runnable code --- no pseudocode, no shortcuts

─────────────────────────────────────

EXECUTION NOTE

─────────────────────────────────────

Do not skip sections. Do not stub anything out. If more space is needed,

continue in a follow-up message --- that is perfectly fine.

Default output order:

1\. Full annotated folder structure

2\. Hero.jsx (with complete code example)

3\. Skills.jsx (with complete code example)

4\. ContactModal.jsx (full implementation)

5\. Remaining frontend components

6\. Backend files (server.js → routes → middleware → utils)

7\. README.md

