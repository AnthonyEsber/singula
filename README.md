<div align="center">
  <img src="src/assets/dark.svg" alt="Singula" height="60" />
  <br /><br />
  <p><strong>Resume builder that lives in the browser.</strong><br/>Create, customise, preview, and share professional CVs — in real time.</p>

  <br />

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)

</div>

---

## What is Singula?

Singula is a minimal, fast resume builder that lets you go from blank page to polished PDF without ever leaving the browser. Every edit you make is reflected instantly in a live preview panel. When you're done, download a pixel-perfect PDF with one click — or share a public link.

---

## Features

|                        |                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------- |
| **Live preview**       | Side-by-side editor and resume preview that updates as you type                  |
| **PDF export**         | One-click download via `@react-pdf/renderer` — no server, no wait                |
| **Public sharing**     | Toggle a resume public and share a permanent link with anyone                    |
| **Section management** | Add, reorder, hide, or delete Profile / Experience / Education / Skills sections |
| **Customisation**      | Per-resume accent colour, font family, and font size controls                    |
| **Light & dark mode**  | Follows system preference with a manual override in the header                   |
| **Mobile editor**      | Fields-only view by default; tap **Preview** for a full-screen overlay           |
| **Authentication**     | Email/password sign-up and login powered by Supabase Auth                        |
| **Dashboard**          | Grid of all your resumes with search, sort, and pagination                       |

---

## Tech Stack

| Layer        | Technology                               |
| ------------ | ---------------------------------------- |
| Framework    | React 19 + Vite 7                        |
| Language     | JavaScript (JSX)                         |
| Routing      | React Router 7                           |
| State        | Redux Toolkit                            |
| Backend / DB | Supabase (PostgreSQL + Auth + RLS)       |
| PDF          | @react-pdf/renderer                      |
| Styling      | CSS Modules + custom design tokens       |
| Fonts        | Makira, InstrumentSerif, InconsolataBold |

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/your-org/singula.git
cd singula
npm install
```

### 2. Configure Supabase

Create a `.env` file at the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Available Scripts

```bash
npm run dev       # Start dev server with HMR
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

---

## Project Structure

```
src/
├── app/
│   └── App.jsx                    # Route tree
├── assets/                        # SVGs, images
├── components/
│   ├── CustomisePanel/            # Accent colour, font, size controls
│   ├── Forms/                     # Login & register form styles
│   ├── Header/                    # Nav, theme toggle, PDF download button
│   ├── Hero/                      # Landing hero section
│   ├── Introduction/              # Features section
│   ├── PersonalInformationPanel/  # Name, email, phone, location fields
│   ├── PreviewPanel/              # Sticky live-preview wrapper
│   ├── Pricing/                   # Pricing plans section
│   ├── ResumePDF/                 # @react-pdf/renderer document
│   ├── ResumeCard/                # Dashboard grid card
│   ├── ResumeItemsGrid/           # Paginated grid + new-resume card
│   ├── ResumeOverview/            # Dashboard header section
│   ├── ResumePreview/             # Scaled HTML resume preview
│   ├── SearchFilters/             # Search input + sort controls
│   ├── SectionCard/               # Individual resume section editor
│   └── SectionsPanel/             # Section list + add-section menu
├── layouts/
│   ├── MainLayout.jsx             # Header + Footer (public routes)
│   └── UserlandLayout.jsx         # Header only (authenticated routes)
├── routes/
│   ├── Dashboard.jsx
│   ├── Editor.jsx                 # Full resume editor
│   ├── Landing.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── styles/
│   └── Userland.module.css        # Editor grid + mobile overlay styles
├── utils/
│   └── mockResume.js
└── index.css                      # Global tokens, fonts, theming
```

---

## Database Schema

```
profiles
  id          uuid  PK → auth.users
  email       text
  full_name   text
  tier        text  ('free' | 'pro')

resumes
  id          uuid  PK
  owner_id    uuid  → profiles
  item_name   text
  content     jsonb  { fullName, email, phoneNumber, location, sections[], customization }
  is_public   bool
  created_at  timestamptz
  updated_at  timestamptz  (auto-updated via trigger)
```

Row-level security ensures users can only read and write their own resumes. Public resumes are readable by anyone via the share link — always query by both `id` and `is_public = true` to avoid cross-user leakage.

---

## Responsive Breakpoints

Singula uses a **desktop-first** approach:

| Breakpoint | Behaviour                                                            |
| ---------- | -------------------------------------------------------------------- |
| `> 1280px` | Full layout, maximum padding                                         |
| `≤ 1280px` | Reduced horizontal padding                                           |
| `≤ 1024px` | Tighter padding, scaled typography                                   |
| `≤ 768px`  | Single-column editor, mobile preview overlay, stacked dashboard grid |

---

## Theming

Three modes cycled by the `Theme` button in the header:

- **Dark** — default, near-black background with warm off-white text
- **Light** — applies `--main-bg-color-light` and remaps input/panel backgrounds via CSS custom property override
- **System** — reads `prefers-color-scheme` and picks the matching logo variant automatically

All colours are defined as CSS custom properties in `src/index.css` and consumed via CSS Modules throughout the app.

---

<div align="center">
  <sub>Built with React, Supabase, and a lot of CSS variables.</sub>
</div>
