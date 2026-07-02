# Web Dashboard Design System

**Version 1.0 - PausePoint Admin & Estate Web Dashboards**

> **AI Instruction**: When building any web dashboard component, follow this EXACT design system. This extends the mobile PausePoint Design Language for desktop/web interfaces. Apply all colors, spacing, typography, and component styles consistently.

---

## 🎨 COLOR PALETTE

### Primary Colors (Same as Mobile)

```css
/* Main brand colors */
--primary-green: #10B981;
--primary-green-light: #D1FAE5;
--primary-green-dark: #065F46;

/* Backgrounds */
--background-main: #F9FAFB;        /* Main dashboard background */
--background-white: #FFFFFF;       /* Card/panel backgrounds */
--background-gray: #F3F4F6;        /* Sidebar, secondary areas */
--background-dark: #1F2937;        /* Dark sidebar variant */
--background-darker: #111827;      /* Navigation, headers */
```

### Semantic Colors

```css
/* Status colors */
--success: #10B981;
--success-light: #D1FAE5;
--success-dark: #065F46;

--warning: #F59E0B;
--warning-light: #FEF3C7;
--warning-dark: #92400E;

--error: #DC2626;
--error-light: #FEE2E2;
--error-dark: #991B1B;

--info: #2563EB;
--info-light: #DBEAFE;
--info-dark: #1E40AF;

--pending: #8B5CF6;
--pending-light: #EDE9FE;
--pending-dark: #6D28D9;
```

### Text Colors

```css
/* Text hierarchy */
--text-primary: #111827;
--text-secondary: #374151;
--text-tertiary: #6B7280;
--text-disabled: #9CA3AF;
--text-white: #FFFFFF;
--text-inverse: #F9FAFB;
```

### Service/Category Colors

```css
/* For different modules/categories */
--electricity-bg: #FEF3C7;
--electricity-color: #F59E0B;

--esusu-bg: #DBEAFE;
--esusu-color: #3B82F6;

--residents-bg: #E0E7FF;
--residents-color: #6366F1;

--emergency-bg: #FEE2E2;
--emergency-color: #DC2626;

--analytics-bg: #D1FAE5;
--analytics-color: #10B981;

--reports-bg: #FCE7F3;
--reports-color: #DB2777;
```

### Border Colors

```css
--border-light: #F3F4F6;
--border-medium: #E5E7EB;
--border-dark: #D1D5DB;
--border-focus: #10B981;
```

---

## 📐 LAYOUT SYSTEM

### Desktop Breakpoints

```css
/* Responsive breakpoints */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Laptops */
--breakpoint-2xl: 1536px; /* Large screens */

/* Optimal viewing range: 1280px - 1920px */
```

### Grid System

```css
/* 12-column grid */
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Dashboard grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

/* Common layouts */
.col-span-3 { grid-column: span 3; }  /* 25% - Small cards */
.col-span-4 { grid-column: span 4; }  /* 33% - Medium cards */
.col-span-6 { grid-column: span 6; }  /* 50% - Half width */
.col-span-8 { grid-column: span 8; }  /* 66% - Main content */
.col-span-9 { grid-column: span 9; }  /* 75% - Wide content */
.col-span-12 { grid-column: span 12; } /* 100% - Full width */
```

### Sidebar Layouts

```css
/* Two-column layout with sidebar */
.dashboard-layout {
  display: grid;
  grid-template-columns: 280px 1fr; /* Fixed sidebar + fluid content */
  min-height: 100vh;
}

/* Collapsed sidebar */
.dashboard-layout.collapsed {
  grid-template-columns: 80px 1fr;
}

/* Three-column layout (sidebar + content + details panel) */
.dashboard-layout-three {
  display: grid;
  grid-template-columns: 280px 1fr 320px;
}
```

---

## 📏 SPACING SYSTEM

### Base Spacing Scale

```css
/* Desktop spacing (larger than mobile) */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 12px;
--space-lg: 16px;
--space-xl: 20px;
--space-2xl: 24px;
--space-3xl: 32px;
--space-4xl: 40px;
--space-5xl: 48px;
--space-6xl: 64px;

/* RULE: Desktop uses more generous spacing than mobile */
```

### Component Spacing

```css
/* Cards */
--card-padding-sm: 16px;
--card-padding-md: 24px;
--card-padding-lg: 32px;

/* Sections */
--section-spacing: 32px;
--section-header-margin: 20px;

/* Container */
--container-padding-x: 24px;
--container-padding-y: 32px;

/* Sidebar */
--sidebar-padding: 24px;
--sidebar-item-padding: 12px 16px;
```

---

## 🔤 TYPOGRAPHY SYSTEM

### Font Families

```css
/* Primary font stack */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;

/* Monospace for data/numbers */
--font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
```

### Font Sizes (Desktop Scale)

```css
/* Larger than mobile for better desktop readability */
--text-xs: 11px;      /* Small labels */
--text-sm: 12px;      /* Table data, captions */
--text-base: 13px;    /* Body text, descriptions */
--text-md: 14px;      /* Default body text */
--text-lg: 15px;      /* Emphasized text */
--text-xl: 16px;      /* Card titles, labels */
--text-2xl: 18px;     /* Section headers */
--text-3xl: 20px;     /* Page titles */
--text-4xl: 24px;     /* Dashboard titles */
--text-5xl: 28px;     /* Hero numbers (medium) */
--text-6xl: 36px;     /* Hero numbers (large) */
--text-7xl: 48px;     /* Display numbers */
```

### Font Weights

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;

/* Usage guidelines */
/* 400: Rarely used, only for long paragraphs */
/* 500: Labels, descriptions, table data */
/* 600: Card titles, section headers */
/* 700: Page titles, buttons, emphasis */
/* 800: Dashboard titles, hero text */
```

### Letter Spacing

```css
--tracking-tight: -0.02em;
--tracking-normal: 0;
--tracking-wide: 0.02em;
--tracking-wider: 0.05em;

/* Apply to headings and buttons */
```

### Line Heights

```css
--leading-tight: 1.25;    /* Headings */
--leading-normal: 1.5;    /* Body text */
--leading-relaxed: 1.75;  /* Descriptions */
--leading-loose: 2;       /* Spacious content */
```

---

## 🎯 BORDER RADIUS SYSTEM

```css
/* Desktop uses slightly larger radii */
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 20px;
--radius-3xl: 24px;
--radius-full: 9999px;

/* Component-specific */
--card-radius: 12px;        /* Default cards */
--panel-radius: 16px;       /* Large panels */
--modal-radius: 20px;       /* Modals */
--button-radius: 8px;       /* Buttons */
--input-radius: 8px;        /* Form inputs */
--badge-radius: 6px;        /* Badges */
--avatar-radius: 9999px;    /* Avatars */
```

---

## 🌑 SHADOW SYSTEM

### Standard Shadows

```css
/* Subtle elevation */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* Card elevation */
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
             0 2px 4px -1px rgba(0, 0, 0, 0.06);

/* Panel elevation */
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
             0 4px 6px -2px rgba(0, 0, 0, 0.05);

/* Modal/dropdown elevation */
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
             0 10px 10px -5px rgba(0, 0, 0, 0.04);

/* Heavy elevation */
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Colored Shadows (for emphasis)

```css
/* Primary action shadow */
--shadow-green: 0 10px 20px -5px rgba(16, 185, 129, 0.3);

/* Status shadows */
--shadow-success: 0 4px 12px rgba(16, 185, 129, 0.15);
--shadow-warning: 0 4px 12px rgba(245, 158, 11, 0.15);
--shadow-error: 0 4px 12px rgba(220, 38, 38, 0.15);
```

---

## 🎴 CORE COMPONENTS

### 1. SIDEBAR NAVIGATION

#### Dark Sidebar (Recommended for Admin)

```css
.sidebar {
  width: 280px;
  background: linear-gradient(180deg, #1F2937 0%, #111827 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px 0;
  overflow-y: auto;
}

.sidebar-header {
  padding: 0 24px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sidebar-logo-icon {
  width: 40px;
  height: 40px;
  background: #10B981;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: 700;
}

.sidebar-logo-text {
  font-size: 18px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.02em;
}

.sidebar-nav {
  margin-top: 24px;
  padding: 0 12px;
}

.sidebar-section {
  margin-bottom: 32px;
}

.sidebar-section-title {
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 16px;
  margin-bottom: 8px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  color: #D1D5DB;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 4px;
}

.sidebar-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.sidebar-item.active {
  background: #10B981;
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.sidebar-item-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.sidebar-item-badge {
  margin-left: auto;
  padding: 2px 8px;
  background: #DC2626;
  color: white;
  font-size: 11px;
  font-weight: 700;
  border-radius: 12px;
}
```

#### Light Sidebar (Alternative for Estate Dashboard)

```css
.sidebar-light {
  width: 280px;
  background: white;
  border-right: 1px solid #E5E7EB;
  padding: 24px 0;
}

.sidebar-light .sidebar-item {
  color: #374151;
}

.sidebar-light .sidebar-item:hover {
  background: #F9FAFB;
  color: #111827;
}

.sidebar-light .sidebar-item.active {
  background: #D1FAE5;
  color: #065F46;
  font-weight: 600;
}
```

#### Collapsed Sidebar

```css
.sidebar.collapsed {
  width: 80px;
}

.sidebar.collapsed .sidebar-logo-text,
.sidebar.collapsed .sidebar-section-title,
.sidebar.collapsed .sidebar-item-text,
.sidebar.collapsed .sidebar-item-badge {
  display: none;
}

.sidebar.collapsed .sidebar-item {
  justify-content: center;
  padding: 12px;
}
```

### 2. TOP NAVIGATION BAR

```css
.topbar {
  height: 72px;
  background: white;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.topbar-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6B7280;
}

.topbar-breadcrumb-item {
  color: #6B7280;
  text-decoration: none;
}

.topbar-breadcrumb-item.active {
  color: #111827;
  font-weight: 600;
}

.topbar-search {
  width: 400px;
  position: relative;
}

.topbar-search-input {
  width: 100%;
  padding: 10px 16px 10px 42px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 14px;
  background: #F9FAFB;
  transition: all 0.2s ease;
}

.topbar-search-input:focus {
  outline: none;
  border-color: #10B981;
  background: white;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.topbar-search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.topbar-notification-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #F9FAFB;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.topbar-notification-btn:hover {
  background: #E5E7EB;
}

.topbar-notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  background: #DC2626;
  border: 2px solid white;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.topbar-user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 12px 6px 6px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.topbar-user:hover {
  background: #F9FAFB;
}

.topbar-user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.topbar-user-info {
  display: flex;
  flex-direction: column;
}

.topbar-user-name {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  line-height: 1.2;
}

.topbar-user-role {
  font-size: 12px;
  color: #6B7280;
  line-height: 1.2;
}
```

### 3. DASHBOARD CARDS

#### Stats Card

```css
.stats-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.stats-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.stats-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.stats-card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #D1FAE5; /* Use service color */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10B981;
}

.stats-card-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.stats-card-trend.up {
  background: #D1FAE5;
  color: #065F46;
}

.stats-card-trend.down {
  background: #FEE2E2;
  color: #991B1B;
}

.stats-card-value {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
  margin-bottom: 4px;
  font-family: var(--font-mono);
}

.stats-card-label {
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
}

.stats-card-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #6B7280;
}
```

#### Content Card

```css
.content-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.content-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #F3F4F6;
}

.content-card-title-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.content-card-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #D1FAE5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10B981;
}

.content-card-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  letter-spacing: 0.02em;
}

.content-card-subtitle {
  font-size: 13px;
  color: #6B7280;
  margin-top: 2px;
}

.content-card-actions {
  display: flex;
  gap: 8px;
}
```

### 4. DATA TABLES

```css
.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.table-header {
  padding: 20px 24px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.table-filters {
  display: flex;
  gap: 12px;
  align-items: center;
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: #F9FAFB;
}

.data-table th {
  padding: 12px 24px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #E5E7EB;
}

.data-table tbody tr {
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s ease;
}

.data-table tbody tr:hover {
  background: #F9FAFB;
}

.data-table tbody tr:last-child {
  border-bottom: none;
}

.data-table td {
  padding: 16px 24px;
  font-size: 14px;
  color: #374151;
}

.data-table td.font-medium {
  font-weight: 500;
  color: #111827;
}

/* Table pagination */
.table-pagination {
  padding: 16px 24px;
  border-top: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-pagination-info {
  font-size: 14px;
  color: #6B7280;
}

.table-pagination-controls {
  display: flex;
  gap: 8px;
}

.pagination-btn {
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #F9FAFB;
  border-color: #D1D5DB;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn.active {
  background: #10B981;
  border-color: #10B981;
  color: white;
}
```

### 5. BUTTONS

#### Primary Button

```css
.btn-primary {
  padding: 12px 24px;
  background: #10B981;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-primary:hover {
  background: #059669;
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
}
```

#### Secondary Button

```css
.btn-secondary {
  padding: 12px 24px;
  background: white;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-secondary:hover {
  background: #F9FAFB;
  border-color: #D1D5DB;
}
```

#### Outline Button

```css
.btn-outline {
  padding: 12px 24px;
  background: transparent;
  color: #10B981;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: 2px solid #10B981;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-outline:hover {
  background: #D1FAE5;
}
```

#### Icon Button

```css
.btn-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #F9FAFB;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #374151;
}

.btn-icon:hover {
  background: #E5E7EB;
  color: #111827;
}
```

#### Button Sizes

```css
.btn-sm {
  padding: 8px 16px;
  font-size: 13px;
}

.btn-lg {
  padding: 14px 28px;
  font-size: 15px;
}

.btn-xl {
  padding: 16px 32px;
  font-size: 16px;
}
```

### 6. FORM INPUTS

#### Text Input

```css
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  color: #111827;
  background: white;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #10B981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.form-input::placeholder {
  color: #9CA3AF;
}

.form-input.error {
  border-color: #DC2626;
}

.form-input.error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.form-help {
  font-size: 13px;
  color: #6B7280;
  margin-top: 6px;
}

.form-error {
  font-size: 13px;
  color: #DC2626;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}
```

#### Select Input

```css
.form-select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  color: #111827;
  background: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
  transition: all 0.2s ease;
}

.form-select:focus {
  outline: none;
  border-color: #10B981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}
```

#### Checkbox & Radio

```css
.form-checkbox,
.form-radio {
  width: 20px;
  height: 20px;
  border: 2px solid #D1D5DB;
  cursor: pointer;
  transition: all 0.2s ease;
}

.form-checkbox {
  border-radius: 4px;
}

.form-radio {
  border-radius: 50%;
}

.form-checkbox:checked,
.form-radio:checked {
  background: #10B981;
  border-color: #10B981;
}

.form-checkbox-label,
.form-radio-label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
}
```

### 7. BADGES & STATUS INDICATORS

#### Status Badge

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.badge-success {
  background: #D1FAE5;
  color: #065F46;
}

.badge-warning {
  background: #FEF3C7;
  color: #92400E;
}

.badge-error {
  background: #FEE2E2;
  color: #991B1B;
}

.badge-info {
  background: #DBEAFE;
  color: #1E40AF;
}

.badge-pending {
  background: #EDE9FE;
  color: #6D28D9;
}

.badge-neutral {
  background: #F3F4F6;
  color: #374151;
}

/* With dot indicator */
.badge-dot::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}
```

#### Count Badge

```css
.count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: #DC2626;
  color: white;
  font-size: 11px;
  font-weight: 700;
  border-radius: 10px;
}
```

### 8. MODALS

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
}

.modal-container {
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #E5E7EB;
}

.modal-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.modal-close-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #F3F4F6;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6B7280;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  background: #E5E7EB;
  color: #111827;
}

.modal-body {
  padding: 32px;
  overflow-y: auto;
  max-height: calc(90vh - 200px);
}

.modal-footer {
  padding: 20px 32px;
  border-top: 1px solid #E5E7EB;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
```

### 9. CHARTS & ANALYTICS

#### Chart Container

```css
.chart-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.chart-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.chart-controls {
  display: flex;
  gap: 8px;
}

.chart-wrapper {
  height: 300px; /* Adjust as needed */
}
```

#### Legend

```css
.chart-legend {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #F3F4F6;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.legend-label {
  font-size: 13px;
  color: #6B7280;
}

.legend-value {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-left: 4px;
}
```

### 10. EMPTY STATES

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 32px;
  text-align: center;
}

.empty-state-icon {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background: #F9FAFB;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #D1D5DB;
  margin-bottom: 24px;
}

.empty-state-icon svg {
  width: 48px;
  height: 48px;
}

.empty-state-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.empty-state-description {
  font-size: 14px;
  color: #6B7280;
  max-width: 400px;
  margin-bottom: 24px;
}

.empty-state-action {
  /* Use btn-primary styles */
}
```

---

## 📊 DASHBOARD-SPECIFIC PATTERNS

### Admin Dashboard Layout

```html
<!-- Full layout example -->
<div class="dashboard-layout">
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <div class="sidebar-logo-icon">PP</div>
        <span class="sidebar-logo-text">PausePoint</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <div class="sidebar-section">
        <div class="sidebar-section-title">Main</div>
        <a href="#" class="sidebar-item active">
          <span class="sidebar-item-icon">📊</span>
          <span class="sidebar-item-text">Dashboard</span>
        </a>
        <a href="#" class="sidebar-item">
          <span class="sidebar-item-icon">⚡</span>
          <span class="sidebar-item-text">Electricity</span>
          <span class="sidebar-item-badge">12</span>
        </a>
        <a href="#" class="sidebar-item">
          <span class="sidebar-item-icon">💰</span>
          <span class="sidebar-item-text">Esusu Groups</span>
        </a>
        <a href="#" class="sidebar-item">
          <span class="sidebar-item-icon">🏘️</span>
          <span class="sidebar-item-text">Estates</span>
        </a>
      </div>

      <div class="sidebar-section">
        <div class="sidebar-section-title">Management</div>
        <a href="#" class="sidebar-item">
          <span class="sidebar-item-icon">👥</span>
          <span class="sidebar-item-text">Users</span>
        </a>
        <a href="#" class="sidebar-item">
          <span class="sidebar-item-icon">💳</span>
          <span class="sidebar-item-text">Transactions</span>
        </a>
        <a href="#" class="sidebar-item">
          <span class="sidebar-item-icon">📈</span>
          <span class="sidebar-item-text">Reports</span>
        </a>
      </div>

      <div class="sidebar-section">
        <div class="sidebar-section-title">Settings</div>
        <a href="#" class="sidebar-item">
          <span class="sidebar-item-icon">⚙️</span>
          <span class="sidebar-item-text">Settings</span>
        </a>
        <a href="#" class="sidebar-item">
          <span class="sidebar-item-icon">🔐</span>
          <span class="sidebar-item-text">Security</span>
        </a>
      </div>
    </nav>
  </aside>

  <!-- Main Content -->
  <main class="main-content">
    <!-- Top Navigation -->
    <header class="topbar">
      <div class="topbar-left">
        <div class="topbar-search">
          <input
            type="text"
            placeholder="Search anything..."
            class="topbar-search-input"
          />
          <span class="topbar-search-icon">🔍</span>
        </div>
      </div>

      <div class="topbar-right">
        <button class="topbar-notification-btn">
          🔔
          <span class="topbar-notification-badge">5</span>
        </button>

        <div class="topbar-user">
          <div class="topbar-user-avatar">NU</div>
          <div class="topbar-user-info">
            <div class="topbar-user-name">Ndukwe</div>
            <div class="topbar-user-role">Admin</div>
          </div>
        </div>
      </div>
    </header>

    <!-- Page Content -->
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Dashboard Overview</h1>
        <div class="page-actions">
          <button class="btn-secondary">
            <span>📅</span>
            <span>Last 30 days</span>
          </button>
          <button class="btn-primary">
            <span>📊</span>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="dashboard-grid">
        <div class="col-span-3">
          <div class="stats-card">
            <!-- Stats card content -->
          </div>
        </div>
        <!-- More cards... -->
      </div>
    </div>
  </main>
</div>
```

### Estate Dashboard Sections

```html
<!-- Estate-specific components -->

<!-- Resident Management Card -->
<div class="content-card">
  <div class="content-card-header">
    <div class="content-card-title-wrapper">
      <div class="content-card-icon" style="background: #E0E7FF">
        <span style="color: #6366F1">👥</span>
      </div>
      <div>
        <div class="content-card-title">Active Residents</div>
        <div class="content-card-subtitle">254 registered users</div>
      </div>
    </div>
    <button class="btn-primary btn-sm">Add Resident</button>
  </div>
  <div class="content-card-body">
    <!-- Content -->
  </div>
</div>

<!-- Electricity Units Card -->
<div class="content-card">
  <div class="content-card-header">
    <div class="content-card-title-wrapper">
      <div class="content-card-icon" style="background: #FEF3C7">
        <span style="color: #F59E0B">⚡</span>
      </div>
      <div>
        <div class="content-card-title">Electricity Management</div>
        <div class="content-card-subtitle">₦12.5M processed this month</div>
      </div>
    </div>
    <div class="content-card-actions">
      <button class="btn-icon">📊</button>
      <button class="btn-icon">⚙️</button>
    </div>
  </div>
  <div class="content-card-body">
    <!-- Content -->
  </div>
</div>
```

---

## 🎨 PAGE LAYOUTS

### Dashboard Overview Page

```css
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.02em;
}

.page-subtitle {
  font-size: 14px;
  color: #6B7280;
  margin-top: 4px;
}

.page-actions {
  display: flex;
  gap: 12px;
}

/* Stats Grid - 4 columns */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

/* Content Grid - 2 columns */
.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

/* Mixed Layout */
.mixed-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}
```

### Details/Settings Page

```css
.details-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 32px;
}

.details-sidebar {
  position: sticky;
  top: 104px; /* topbar height + padding */
  height: fit-content;
}

.details-content {
  /* Main content area */
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #E5E7EB;
}
```

### List/Table Page

```css
.list-page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
}

.list-page-title-section {
  /* Title and description */
}

.list-page-filters {
  display: flex;
  gap: 12px;
  align-items: center;
}

.table-section {
  /* Full width table */
}
```

---

## ✅ VALIDATION CHECKLIST

When building a dashboard page, verify:

### Layout
- [ ] Sidebar width is 280px (or 80px collapsed)
- [ ] Topbar height is 72px
- [ ] Container max-width is 1440px
- [ ] Grid uses 24px gap
- [ ] Sticky positioning works correctly

### Colors
- [ ] Background is #F9FAFB
- [ ] Cards are white with proper shadows
- [ ] Primary actions use #10B981
- [ ] Text hierarchy is correct
- [ ] Service colors match mobile

### Typography
- [ ] Page titles are 28px, weight 700
- [ ] Section titles are 18-20px, weight 700
- [ ] Body text is 14px, weight 500
- [ ] Labels are 12-13px, weight 600
- [ ] Letter spacing on headings

### Components
- [ ] All cards have 12px border radius
- [ ] Buttons have proper hover states
- [ ] Forms have focus states
- [ ] Tables have hover rows
- [ ] Modals slide in smoothly

### Spacing
- [ ] Container padding is 24-32px
- [ ] Card padding is 24px
- [ ] Section spacing is 32px
- [ ] All spacing uses multiples of 4
- [ ] Proper vertical rhythm

### Responsive
- [ ] Layout works at 1280px
- [ ] Tables scroll horizontally if needed
- [ ] Sidebar can collapse
- [ ] Grid stacks on smaller screens

---

## 🚀 QUICK START TEMPLATES

### Admin Dashboard Home

```jsx
// React + Tailwind example
import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-[280px] bg-gradient-to-b from-gray-800 to-gray-900 border-r border-white/10">
        {/* Sidebar content */}
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Topbar */}
        <header className="h-[72px] bg-white border-b border-gray-200 sticky top-0 z-50">
          {/* Topbar content */}
        </header>

        {/* Page Content */}
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          {/* Page header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-[28px] font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Welcome back, Ndukwe</p>
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary">Last 30 days</button>
              <button className="btn-primary">Export Report</button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {/* Stats cards */}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Content cards */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
```

### Estate Dashboard Home

```jsx
// Estate-specific dashboard
const EstateDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Light sidebar variant */}
      <aside className="w-[280px] bg-white border-r border-gray-200">
        {/* Sidebar content */}
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Topbar */}
        <header className="h-[72px] bg-white border-b border-gray-200">
          {/* Estate selector, search, notifications */}
        </header>

        {/* Page Content */}
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          {/* Estate overview cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Total residents, units sold, revenue */}
          </div>

          {/* Main content */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              {/* Recent transactions table */}
            </div>
            <div className="col-span-1">
              {/* Quick actions, alerts */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
```

---

## 📱 RESPONSIVE GUIDELINES

### Breakpoint Strategy

```css
/* Mobile First (if needed) */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    position: fixed;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  .sidebar {
    width: 80px;
  }

  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (default) */
@media (min-width: 1025px) {
  /* Default styles already applied */
}

/* Large Desktop */
@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}
```

---

**End of Web Dashboard Design System**

This design system is production-ready and maintains perfect consistency with your mobile PausePoint Design Language while optimizing for desktop/web interfaces.
