# Finance Tracker — Frontend

A personal finance tracking web application built with React and Vite. Track daily expenses, visualize spending patterns through charts, and download monthly/yearly reports in Excel format.

**Live Demo:** [finance-tracker-frontend-virid.vercel.app](https://finance-tracker-frontend-virid.vercel.app/)

---

## Features

### Authentication
- User signup with custom expense category selection
- Email/password signin with JWT-based session
- Password reset via email OTP (6-digit verification)
- Secure password rules: min 6 chars, uppercase, digit, special character

### Expense Management (Module 1)
- Add expenses with type, amount, payment method (Cash/UPI), date, and description
- Delete expenses from transaction history
- Filter expenses by date range, payment method, month, or year
- Sort and view all transactions in a table
- Today's expense summary with payment method breakdown

### Analytics & Visualization (Module 2)
- Pie charts — monthly and yearly spending by category
- Bar charts — spending trends by date and by month
- Download monthly or yearly expense reports as Excel files

### Settings
- Add and delete custom expense categories per user
- View today's expense split by payment method

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Routing | React Router DOM 7 |
| State Management | Redux Toolkit + React Redux |
| HTTP Client | Axios (with JWT interceptor) |
| UI Components | Bootstrap 5 + React Bootstrap |
| Charts | Recharts |
| Icons | React Icons |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── assets/              # Static images
├── component/           # All React components (24 files)
├── css/                 # Component-level stylesheets (17 files)
├── feature/
│   └── slice/
│       └── Slice.js     # Redux slice — actions & reducers
├── module/
│   └── Dashboard.jsx    # Dashboard wrapper with module switcher
├── redux/
│   └── Store.js         # Redux store configuration
├── util/
│   └── AxiosInstance.js # Axios instance with auth interceptor
├── App.jsx              # Root component — route definitions
└── main.jsx             # React entry point
```

---

## Application Routes

| Route | Component | Description |
|---|---|---|
| `/` | `HomePage` | Landing page with signin/signup options |
| `/signup` | `SignupComponent` | Registration with category selection |
| `/signin` | `SigninComponent` | Login |
| `/dashboard` | `Dashboard` | Main app — Module 1 & Module 2 |
| `/passwordreset` | `OTPPage` | Password reset via OTP |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone <repository-url>
cd finance-tracker-frontend
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build

```bash
npm run build
```

Output goes to `dist/`

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Authentication Flow

1. **Signup** — register with email, password, and select expense categories
2. **Signin** — receive a JWT token stored in `localStorage` as `"token"`; user ID stored as `"id"`
3. **Authenticated requests** — Axios interceptor automatically attaches `Authorization: Bearer <token>` to every request
4. **Password reset** — request OTP → verify 6-digit code → set new password

---

## Backend APIs

The frontend communicates with two backend services:

| Service | Base URL |
|---|---|
| Auth & Finance | `https://financetrackerai-production.up.railway.app` |
| User Expense | `https://userexpense-production.up.railway.app` |

Key endpoint groups:

- **Auth:** `/auth/signin`, `/auth/signup`, `/auth/profile`
- **OTP:** `/generateotp`, `/validateotp`, `/validateotp`, `/resetpassword`
- **Expenses:** `/userexpense`, `/allexpense`, `/deleteuserexpense`
- **Categories:** `/addnewexpense`, `/deleteexpense`, `/availableexpense`
- **Totals:** `/totalexpensebyyear`, `/totalexpensebymonth`, `/totalexpennseoncurrentdate`
- **Charts:** `/piechartbymonth`, `/piechartbyyear`, `/bargraphbymonth`, `/bargraphbyyear`
- **Reports:** `/yearexpenseexcel`, `/monthexpenseexcel`

---

## Redux State

Global state is managed in a single Redux slice (`profileSliceReducer`) with 22 actions covering:

- User profile (email, first name, last name)
- Expense lists (all, sorted, filtered by month/year/date)
- Aggregated totals (yearly, monthly, today, by payment mode)
- Filter flags that control which list is displayed (`paymentMethodFlag`, `sortExpenseFlag`, `monthExpenseFlag`, `yearExpenseFlag`, `userDateFlag`)

---

## Scripts Reference

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |
