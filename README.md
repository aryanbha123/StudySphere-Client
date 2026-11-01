<p align="center">
  <img src="public/logo.png" alt="StudySphere logo" width="110" />
</p>

# StudySphere Client

The React frontend for StudySphere, a student learning platform. It has an AI study assistant, saved notes with PDF export, a filterable quiz practice bank and an in-browser code playground.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

## About

StudySphere Client is a single-page app built with Vite and React 19. It has a public landing page and a `/dashboard` area for students. The dashboard talks to a separate StudySphere backend at `http://localhost:3000`. Code runs through a Judge0-compatible execution API.

## Features

- **Landing page**: hero, services, quiz bundles, achievements and FAQ sections.
- **Study (AI assistant)**: a chat that sends the conversation to `/api/gemini/ask` and renders replies as Markdown with GitHub-flavored tables and lists. You can save a selected range of messages as notes through `/api/notes`.
- **Notes**: lists your saved notes from `/api/notes/:userId`, renders them as Markdown and exports them to PDF with jsPDF and html2canvas.
- **Practice**: a paginated quiz bank from `/api/quiz/getall`, with debounced search plus difficulty (easy, medium, hard), type and tag filters. Results are cached with TanStack React Query.
- **Playground**: a Monaco code editor that loads its language list from a Judge0 API, submits base64-encoded code, then polls for the result. Each language has a starter template.
- **Auth state**: a Redux Toolkit slice, plus a thunk that loads the current user from `/api/auth/me` using cookies (`withCredentials`).
- **Notifications** with notistack.

### Work in Progress

These parts are still placeholders: the `Login`, `Signup`, `Meet` and `Attempt` pages, `ProtectedRoute`, and the dashboard home cards (loading skeletons).

## Tech Stack

| Area | Tools |
|------|-------|
| Framework | React 19, Vite 7 (SWC plugin) |
| Routing | React Router 7 |
| State and data | Redux Toolkit, React Redux, TanStack React Query, Axios |
| UI | MUI 7, Tailwind CSS 4, notistack |
| Content | react-markdown, remark-gfm, Monaco Editor |
| Export | jsPDF, html2canvas |

## Project Structure

```
src/
├── api.js              # Axios instance (baseURL http://localhost:3000, withCredentials)
├── cofig/conig.js      # BASE_URL constant
├── App.jsx             # Routes
├── pages/              # Home, Login, Signup
├── component/          # Landing sections: Navbar, Hero, Service, QuizBundle, Acheivements, FAQ, Footer
├── view/user/          # Dashboard, Study, Notes, Practice, Playground, Meet, Attempt
│   └── Layout/         # Dashboard Header, Sidebar, Layout
├── store/              # Redux store, authSlice, authActions thunk
└── auth/               # ProtectedRoute (stub)
```

## Routes

| Path | Page |
|------|------|
| `/` | Landing page |
| `/login`, `/signup` | Auth pages (placeholders) |
| `/dashboard` | Dashboard home |
| `/dashboard/study` | AI study assistant |
| `/dashboard/notes` | Saved notes |
| `/dashboard/practice` | Quiz practice |
| `/dashboard/playground` | Code playground |
| `/dashboard/meet` | Meet (placeholder) |
| `/dashboard/attempt/:id` | Quiz attempt (placeholder) |

## Getting Started

### Prerequisites

- Node.js 18+
- The StudySphere backend running on `http://localhost:3000`. To point at a different backend, change `src/api.js` and `src/cofig/conig.js`.

### Install and Run

```bash
npm install
npm run dev       # start the Vite dev server
npm run build     # production build
npm run preview   # preview the build
npm run lint      # ESLint
```

## Author

**Aryan Bhandari**: [GitHub](https://github.com/aryanbha123)
