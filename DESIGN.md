# Nacencomm Modern Landing Page - Design System & Architecture

This document outlines the production-ready design specifications, component architecture, and implementation details for the **Nacencomm Modern Landing Page** project (Stitch ID: `projects/2468016493130359747`).

## 1. Full Page Hierarchy

The application follows a structured, conversion-optimized hierarchy designed to guide users from initial awareness to product registration.

*   **Trang chủ (Home Page)**
    *   Hero Section (Value Proposition & Main CTAs)
    *   Featured Products Grid
    *   Why Choose Nacencomm (Value Drivers)
    *   Bottom CTA Band
    *   Global Footer
*   **Danh mục Sản phẩm (Products Page)**
    *   Product Categories Filter
    *   Full Product Grid
*   **Chi tiết Sản phẩm (Product Detail Page)**
    *   Product Overview & Pricing
    *   Feature Breakdown
    *   Documentation & Guides
*   **Bảng giá & Đăng ký (Pricing & Registration Flow)**
    *   Product Selection & Cart
    *   Dynamic Routing Flow (Flow A: VNeID / Flow B: General)
    *   Checkout / Final Success Steps

## 2. Section Breakdown

Each primary section is designed as an isolated, reusable block:

*   **`Header`**: Sticky top navigation containing the Nacencomm logo, links, hotline, and primary CTA.
*   **`Hero`**: High-impact visual area featuring `h2` headlines, subtext, trust badges, and primary/secondary CTAs.
*   **`Section Soft`**: Alternate background color (`#f8faff`) sections used to break up content flow (e.g., "Tại sao chọn Nacencomm?").
*   **`Product Grid`**: Responsive CSS Grid displaying product cards (`article.product-card`) with icons, titles, and dual CTAs.
*   **`Registration Layout`**: 2-column asynchronous layout featuring dynamic forms (`.form-section`) on the left and a sticky cart/summary (`.order-sidebar`) on the right.
*   **`Footer`**: Multi-column global footer with links, company info, and support contacts.

## 3. Design System

### Color Palette

The color palette is designed to project trust, security, and modern enterprise professionalism.

| Name | Hex Value | Usage | Tailwind Equivalent |
| :--- | :--- | :--- | :--- |
| **Primary Navy** | `#003087` | Primary buttons, active states, key titles | `bg-blue-900`, `text-blue-900` |
| **Primary Hover** | `#001f5c` | Button hover states | `hover:bg-blue-950` |
| **Light Blue (Accent)** | `#e8eef8` | Selected states, table headers, soft highlights | `bg-blue-50` |
| **Success Green** | `#16a34a` | Success messages, completed steps | `text-green-600` |
| **Success Soft** | `#f0fdf4` | Background for success zones (e.g., uploaded files) | `bg-green-50` |
| **Error/Danger** | `#d62b2b` | Required field stars, error states, total amounts | `text-red-600` |
| **Warning Text** | `#b45309` | Alerts, ticket badges | `text-amber-700` |
| **Warning Soft** | `#fff8e1` | Warning/Info badge backgrounds | `bg-amber-50` |
| **Text Main** | `#1a1c23` | Standard body text, headings | `text-slate-900` |
| **Text Muted** | `#4a4f5e` | Subtitles, secondary text | `text-slate-600` |
| **Text Light** | `#8891a4` | Notes, helper text, chevrons | `text-slate-400` |
| **Border Main** | `#d0d5e0` | Input borders, card borders | `border-slate-300` |
| **Border Soft** | `#f0f2f7` | Table dividers, subtle separators | `border-slate-100` |
| **Surface/Card** | `#ffffff` | Primary background, cards | `bg-white` |
| **Background Soft** | `#fcfcfc` | Form backgrounds, upload zones | `bg-slate-50` |

### Typography

*   **Font Family**: `Inter` or `Roboto` (sans-serif)
*   **Base Size**: `14px` / `15px` for inputs and main body elements.
*   **Headings**:
    *   H1: `32px` (Bold)
    *   H2: `24px` (Semibold, Primary Navy)
    *   H3: `16px` (Semibold)
*   **Small/Helper**: `11px` / `12px` / `13px`

### Spacing

A standard 4pt/8pt spacing system is applied:
*   **Gap/Margins**: `4px`, `8px`, `12px`, `16px`, `20px`, `24px`.
*   **Section Padding**: Standard sections use `60px` vertical padding. Forms use `20px` internal padding.
*   **Border Radius**: Inputs (`6px`), Small Buttons/Cards (`8px`), Large Cards/Modals (`10px` to `12px`).

## 4. Component Architecture & Reusable Components

The UI relies on composable, reusable parts:

1.  **Buttons (`.btn`)**
    *   `.btn-primary` / `.btn-submit`: Solid Navy `#003087` background.
    *   `.btn-outline`: Transparent background with border, hover state switches to soft accent.
    *   `.btn-accent`: Used for high-conversion CTAs (often incorporating icons).
2.  **Cards (`.product-card`, `.sidebar-card`)**
    *   White background, `#d0d5e0` border, `10px` radius, subtle hover shadow.
3.  **Form Sections (`.form-section`)**
    *   Accordion-style panels with `.section-header` and collapsible `.section-body`.
4.  **Inputs & Controls (`.field`)**
    *   Standardized labels (with red `.req` indicators).
    *   Focused states outline in `#003087`.
    *   Error states outline in `#d62b2b`.
5.  **Upload Zones (`.upload-zone`, `.upload-item`)**
    *   Dashed borders, click-to-upload areas that turn solid green (`.uploaded`) upon success.
6.  **Progress Indicators (`.act-step`)**
    *   Numbered circles (`.act-step-num`), greyed out for disabled/future steps.

## 5. CTA Structure

Calls to Action are mapped to primary user intentions:
*   **Primary Conversion (🛒 Mua ngay / Đăng ký online)**: Solid backgrounds, prominent placement.
*   **Secondary/Info (Tìm hiểu thêm / Xem sản phẩm)**: Outline buttons.
*   **Support/Trust (☎ Gọi tư vấn miễn phí)**: Text links with icons or secondary styling to prevent distracting from primary conversions.

## 6. Responsive Behaviors

*   **Desktop (`> 1100px`)**: Full max-width layouts. Two-column sticky sidebar for registration.
*   **Tablet (`768px - 1024px`)**: Grid layouts collapse from 4 columns to 2 columns.
*   **Mobile (`< 768px`)**:
    *   Registration layout `.register-layout` stacks into a single column (`1fr`).
    *   Sidebar `.order-sidebar` loses `position: sticky` and flows inline.
    *   Form grids (`.form-grid-2`, `.form-grid-3`) collapse to `1fr`.
    *   Upload grids stack to `1fr`.
    *   Action buttons expand to `width: 100%` for easy thumb-tapping.

## 7. Accessibility Notes

*   **Contrast ratios**: Navy `#003087` on White provides AAA accessibility contrast.
*   **Focus States**: All inputs and buttons must have visible focus rings (handled via `input:focus` border-color overrides).
*   **Labels**: All form fields use explicit `<label>` elements connected to inputs.
*   **Error Messaging**: Errors use both color (`#d62b2b`) and explicit helper text (`.field-error.show`).
*   **Aria Roles**: Accordion headers should utilize `aria-expanded` and `role="button"`.

## 8. Animation Behaviors

*   **Fade In**: Elements entering the viewport use a `.fade-in` utility for smooth appearance.
*   **Hover Transitions**: Buttons and cards use `transition: all 0.2s;` to provide snappy but smooth feedback.
*   **Modals**: `.success-modal` utilizes an `@keyframes scaleIn` animation (0.8 scale to 1.0, accompanied by opacity fade) taking `0.4s` with an `ease` timing function.
*   **Accordions**: Icon rotations (`.chevron`) rotate `180deg` over `0.3s`.

## 9. Tailwind Utility Mapping

If migrating to Tailwind CSS, the following mapping applies:

*   `.register-layout` -> `grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6 max-w-6xl mx-auto p-6`
*   `.sidebar-card` -> `bg-white border border-slate-300 rounded-xl p-4`
*   `.btn-submit` -> `w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-3 px-4 rounded-lg transition-colors`
*   `.field input` -> `w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900`
*   `.upload-item` -> `border-2 border-dashed border-slate-300 rounded-lg p-5 text-center cursor-pointer bg-slate-50 hover:border-blue-900 transition-colors`

## 10. Frontend Implementation Notes

*   **DOM Structure**: Use semantic HTML (`<main>`, `<section>`, `<article>`, `<nav>`).
*   **Event Delegation**: Attach event listeners to parent containers for dynamically added elements (like cart items or dynamically rendered flow screens).
*   **State Management**: Complex flows (Flow A vs. Flow B) should manage an internal state object (e.g., `currentStep`, `cartItems`, `userType`) and re-render the view function rather than toggling inline styles directly.
*   **Performance**: Defer loading of non-critical Javascript. Optimize images/SVG icons to keep the landing page First Contentful Paint (FCP) under 1.5 seconds.
