# AI-Aided Consultant Platform — Front-End

A React + TypeScript single-page application for submitting and reviewing consultation cases, fully localized (English/عربى) and featuring professional responsive design.

---

## 🚀 Features Implemented

- **Project Setup**
  - Scaffolded with Vite + React + TypeScript  
  - ESLint, Prettier, and CSS Modules support  
- **Routing & Layout**
  - `react-router-dom` v6 with `AppRoutes` for `/`, `/login`, `/register`  
  - `GuestLayout` with a sticky `<Navbar>` and an `<Outlet>` for pages  
- **Dependency-Injected HTTP**
  - `HttpClient` interface + `AxiosClient` implementation  
  - `HttpClientContext` to inject the client into components  
- **Case Submission Form**
  - Built with **React Hook Form** for validation & submission state  
  - Fields: Email, Case Specialty, Description  
  - **CSS Module** styling: card layout, focus states, error messages  
  - **Toast** notifications (react-toastify) on success/failure  
- **Internationalization (i18n)**
  - `react-i18next` integration  
  - Locale JSON files in `src/locales/en.json` & `src/locales/ar.json`  
  - LanguageSwitcher component (EN ↔ AR)  
  - Dynamic `<html lang>` and `dir` attribute updates  
- **Specialties Dropdown**
  - `SPECIALTY_KEYS` as a type-safe list of keys (`legal`, `medical`, …)  
  - Translated labels via `t('specialties.legal')`, etc.  
- **Professional Navbar**
  - Semantic `<header>` + `<nav>` markup  
  - CSS Variables for theme colors & spacing  
  - Sticky, shadowed header  
  - Responsive mobile “hamburger” menu with ARIA attributes  
  - Active-link indicator and hover/focus styles  

---