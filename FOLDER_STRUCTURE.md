# HRMS App — Folder Structure

```
hrms-app/
├── public/                          # Static assets served as-is
├── src/                             # Application source code
│   ├── main.tsx                     # Entry point — renders <App /> into DOM
│   ├── App.tsx                      # Root component — routing, ErrorBoundary, lazy loading
│   ├── index.css                    # Global styles, Tailwind directives, custom utilities
│   │
│   ├── assets/                      # Static assets imported by components (images, SVGs)
│   │
│   ├── components/                  # Reusable UI components (not tied to a specific route)
│   │   ├── ErrorBoundary.tsx        # App-wide error boundary with fallback UI
│   │   │
│   │   ├── ui/                      # Generic, reusable UI primitives
│   │   │   ├── index.ts             # Barrel export for all UI components
│   │   │   ├── GlassCard.tsx        # Glassmorphism card wrapper with animation
│   │   │   ├── FloatingLabelInput.tsx   # MUI-style floating label text input
│   │   │   ├── FloatingLabelSelect.tsx  # MUI-style floating label select dropdown
│   │   │   ├── Pagination.tsx       # Reusable table pagination controls
│   │   │   ├── StatCard.tsx         # Dashboard stat card with gradient icon
│   │   │   ├── ProductCard.tsx      # Landing page product card
│   │   │   ├── MasterModal.tsx      # Accessible modal for CRUD forms (focus trap, ESC close)
│   │   │   ├── MasterToolbar.tsx    # Search bar + Add button toolbar for master pages
│   │   │   ├── EmptyState.tsx       # "No records found" placeholder
│   │   │   ├── StatusBadge.tsx      # Active/Inactive status badge with pulse dot
│   │   │   └── ActionButtons.tsx    # Edit/Delete action button pair
│   │   │
│   │   ├── layout/                  # App shell and navigation
│   │   │   ├── index.ts             # Barrel export
│   │   │   ├── DashboardLayout.tsx  # Sidebar + content area layout wrapper
│   │   │   └── Navbar.tsx           # Sidebar navigation with collapsible submenus
│   │   │
│   │   ├── dashboard/               # Dashboard-specific widgets
│   │   │   ├── Charts.tsx           # ApexCharts attendance + donut charts
│   │   │   ├── LiveFeed.tsx         # Live punch feed table with search
│   │   │   └── PendingRequests.tsx  # Pending leave requests + quick actions
│   │   │
│   │   ├── employee/                # Employee-specific components
│   │   │   └── EmployeeFormModal.tsx # Tabbed employee form (Personal, Job, Salary, Documents)
│   │   │
│   │   └── landing/                 # Landing page sub-components
│   │       ├── ProductCardComponent.tsx   # Animated product card with image slider
│   │       └── ProductShowcaseCard.tsx    # Detailed product feature showcase
│   │
│   ├── pages/                       # Route-level page components (lazy-loaded)
│   │   ├── index.ts                 # Barrel export for all pages
│   │   ├── Login.tsx                # Login page with animated form
│   │   ├── LandingPage.tsx          # Application hub with product grid + showcases
│   │   ├── Dashboard.tsx            # Main dashboard — stats, charts, live feed
│   │   ├── EmployeeMaster.tsx       # Employee CRUD with status filter tabs
│   │   ├── DepartmentMaster.tsx     # Department CRUD master
│   │   ├── DesignationMaster.tsx    # Designation CRUD master
│   │   └── LocationMaster.tsx       # Location CRUD master
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── index.ts                 # Barrel export for all hooks
│   │   ├── useTheme.ts              # Theme context consumer hook + context creation
│   │   ├── useMasterTable.ts        # Table filtering, pagination, and search logic
│   │   └── useCrudMaster.ts         # Generic CRUD state management (add/edit/delete/modal)
│   │
│   ├── context/                     # React Context providers
│   │   └── ThemeContext.tsx          # Dark/light mode provider with localStorage persistence
│   │
│   ├── data/                        # Static data (JSON + TypeScript)
│   │   ├── employees.json           # Mock employee records
│   │   ├── departments.json         # Mock department records
│   │   ├── designations.json        # Mock designation records
│   │   ├── locations.json           # Mock location records
│   │   ├── menuData.json            # Sidebar navigation menu structure
│   │   └── landingPageData.ts       # Product cards, showcases, and stats data
│   │
│   └── types/                       # TypeScript type definitions
│       └── index.ts                 # All shared interfaces and types
│
├── index.html                       # HTML entry point
├── package.json                     # Dependencies and scripts
├── vite.config.ts                   # Vite build config (manual chunks for code splitting)
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS config (Tailwind plugin)
├── tsconfig.json                    # Root TypeScript config
├── tsconfig.app.json                # App-specific TS config
├── tsconfig.node.json               # Node/Vite TS config
└── eslint.config.js                 # ESLint flat config
```

## Architecture Overview

```
                    main.tsx
                       │
                    App.tsx ──── ErrorBoundary + Suspense
                       │
              ┌────────┴────────┐
              │                 │
         Login.tsx      DashboardLayout
                        (Navbar + Outlet)
                               │
              ┌────┬────┬──────┴──────┬────────┐
              │    │    │             │        │
          Landing  Dashboard  EmployeeMaster  DepartmentMaster ...
              │        │             │
     ProductCard   Charts        useCrudMaster ← Generic CRUD hook
     ProductShowcase  LiveFeed   MasterToolbar    shared across
                      Requests   MasterModal      all masters
                                 StatusBadge
                                 ActionButtons
```

## Key Patterns

| Pattern | Files | Purpose |
|---------|-------|---------|
| **Barrel exports** | `*/index.ts` | Clean imports: `from '../components/ui'` |
| **Generic CRUD hook** | `useCrudMaster.ts` | Shared add/edit/delete/modal logic |
| **Lazy loading** | `App.tsx` | All pages use `React.lazy()` for code splitting |
| **Vendor chunking** | `vite.config.ts` | apexcharts, framer-motion, react-router split |
| **Theme system** | `useTheme.ts` + `ThemeContext.tsx` | Dark/light mode with localStorage |
| **Data layer** | `src/data/*.json` | Mock data (API-ready — swap JSON imports for fetches) |
