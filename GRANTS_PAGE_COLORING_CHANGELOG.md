# Grants Page & Platform Coloring Changelog & Revert Guide

This document maintains an exact, comprehensive audit trail of the color scheme, component styling, and contrast adjustments made to the **Grants Search Page (`/grants`)** and related components.

If the client or stakeholder ever requests reverting to the previous all-dark tone, follow the step-by-step instructions at the bottom of this document.

---

## 1. High-Level Architecture Overview

| Area / Component | Previous Dark Tone | Current Executive Contrast (Light/Dark) | Purpose & Benefit |
| :--- | :--- | :--- | :--- |
| **Main Page Canvas** | `#071220` (Pitch dark) | `#FAFBFC` (Executive off-white) | Harmonizes `/grants` with the Home page and Preferences page. Eliminates eye strain. |
| **Hero Search Header** | `#0C1D33` with heavy dark gradients | `radial-gradient(ellipse at 75% 20%, rgba(20, 45, 76, 0.95) 0%, var(--navy-deep) 100%)` | Preserves executive command center aesthetic with vibrant contrast. |
| **Search Input Box** | `rgba(255, 255, 255, 0.08)` / `rgba(255, 255, 255, 0.18)` | Same translucent navy capsule with `#FFFFFF` text & brass CTA | Unchanged, premium executive look. |
| **Guest Quota Banner** | `#0E1F35` with `rgba(196, 162, 101, 0.35)` | `#FFFFFF` with `var(--line-brass)` border & `var(--navy)` title | High contrast light card, trustworthy, clean. |
| **Navigation Tabs** | Dark `#0E1F35` & `#0B1728` pills | `#FFFFFF` pills with active `var(--navy)` / `#065F46` / `var(--brass-text)` | Crisp tab switching, instant recognition. |
| **Sort & View Switcher** | `#0E1F35` background, `#FFFFFF` text | `#FFFFFF` dropdown with `#CBD5E1` border & `var(--navy)` text | Native executive form controls. |
| **Filter Chips** | `rgba(196, 162, 101, 0.18)` | `#FFFFFF` pills with `var(--line-brass)` & `var(--brass-text)` | Clean readable tags matching Home design system. |
| **Grant Match Cards** | `#0B1728` / `#0E1F35` dark card | `#FFFFFF` card with `#E2E8F0` border & `var(--navy)` heading | Matches modern SaaS standards (Linear, Stripe, Granted AI). |
| **Grant Card Hover** | Border `rgba(196, 162, 101, 0.4)` | Border `var(--brass)`, background `#FAFBFC`, shadow `rgba(20, 45, 76, 0.08)` | Tactile executive interaction. |
| **Lock Overlays (4+)** | Dark navy `rgba(11, 23, 40, 0.88)` | Frosted white `rgba(255, 255, 255, 0.92)` with deep navy lock badge | Premium soft frosted glass effect. |
| **Pagination Bar** | Dark buttons `#0E1F35` / `#0B1728` | Crisp `#FFFFFF` buttons with `#CBD5E1` border & `var(--brass)` active | Easy readability and page navigation. |
| **Loading Skeletons** | Dark shimmer `#0B1728` to `#162740` | Light shimmer `#F1F5F9` to `#E2E8F0` on `#FFFFFF` card | Smooth, clean loading state. |
| **Empty State** | Dark `#0B1728` with `#FFFFFF` text | `#FFFFFF` card with `#E2E8F0` border & `var(--navy)` title | Welcoming, authoritative tone. |
| **Modals (Detail & Guest)** | Dark `#0B1728` with white text | `#FFFFFF` modal card with `var(--line-brass)` / `#E2E8F0` & `var(--navy)` text | Consistent executive lightbox presentation. |

---

## 2. File-by-File Color Breakdown

### A. `src/pages/DashboardPage.jsx`
1. **Outer Container (Line 439)**:
   - *Previous:* `<div style={{ background: '#071220', minHeight: '100vh', color: '#FFFFFF' }}>`
   - *Current:* `<div style={{ background: '#FAFBFC', minHeight: '100vh', color: 'var(--navy)' }}>`
2. **Visitor Quota Banner (Lines 1135–1170)**:
   - *Previous:* `background: '#0E1F35'`, `border: '1px solid rgba(196, 162, 101, 0.35)'`, `color: '#FFFFFF'`
   - *Current:* `background: '#FFFFFF'`, `border: '1px solid var(--line-brass)'`, `color: 'var(--navy)'`, subtext `#64748B`.
3. **Tabs (Lines 1223–1300)**:
   - *Previous:* Inactive tabs: `background: '#0E1F35'`, `color: 'rgba(255,255,255,0.7)'`, `border: '1px solid rgba(255,255,255,0.1)'`
   - *Current:* Inactive tabs: `background: '#FFFFFF'`, `color: '#64748B'`, `border: '1px solid #E2E8F0'`. Active tabs: All (`var(--navy)`), Recommended (`rgba(5, 150, 105, 0.12)` + `#065F46`), Saved (`rgba(149, 128, 100, 0.12)` + `var(--brass-text)`).
4. **Sort Dropdown & View Mode Switcher (Lines 1325–1390)**:
   - *Previous:* Sort: `background: '#0E1F35'`, `border: '1px solid rgba(255,255,255,0.15)'`, `color: '#FFFFFF'`. View Switcher: `background: '#0E1F35'`.
   - *Current:* Sort: `background: '#FFFFFF'`, `border: '1px solid #CBD5E1'`, `color: 'var(--navy)'`. View Switcher: `background: '#F1F5F9'`, active button `#FFFFFF` with shadow.
5. **Active Filter Chips (Lines 1410–1600)**:
   - *Previous:* `background: 'rgba(196, 162, 101, 0.18)'`, `color: 'var(--brass-light)'`
   - *Current:* `background: '#FFFFFF'`, `border: '1px solid var(--line-brass)'`, `color: 'var(--brass-text)'`
6. **Empty State Container (Lines 1705–1755)**:
   - *Previous:* `background: '#0B1728'`, `border: '1px solid rgba(255, 255, 255, 0.08)'`, `color: '#FFFFFF'`
   - *Current:* `background: '#FFFFFF'`, `border: '1px solid #E2E8F0'`, `color: 'var(--navy)'`, subtext `#64748B`.

---

### B. `src/components/dashboard/GrantMatchCard.jsx`
1. **List View Card (Lines 88–115)**:
   - *Previous:* `background: '#0B1728'`, `border: '1px solid rgba(255, 255, 255, 0.08)'`, title `color: '#FFFFFF'`, agency `color: 'rgba(255, 255, 255, 0.6)'`.
   - *Current:* `background: '#FFFFFF'`, `border: '1px solid #E2E8F0'`, title `color: 'var(--navy)'`, agency `color: '#64748B'`.
   - *Hover:* transitions to `border: '1px solid var(--brass)'`, `background: '#FAFBFC'`, shadow `0 6px 20px rgba(20, 45, 76, 0.08)`.
2. **Grid View Card (Lines 435–465)**:
   - *Previous:* `background: '#0B1728'`, `border: '1px solid rgba(255, 255, 255, 0.08)'`, title `color: '#FFFFFF'`.
   - *Current:* `background: '#FFFFFF'`, `border: '1px solid #E2E8F0'`, title `color: 'var(--navy)'`.
   - *Award & Deadline box:* `background: '#F8FAFC'`, `border: '1px solid #F1F5F9'`.
3. **Lock Barrier for Results 4+ (Lines 380–425, 680–725)**:
   - *Previous:* `background: 'rgba(11, 23, 40, 0.88)'`, dark borders.
   - *Current:* `background: 'rgba(255, 255, 255, 0.92)'`, `border: '1px dashed rgba(149, 128, 100, 0.55)'`, center pill `background: 'var(--navy-deep)'`, `color: '#FFFFFF'`, icon `var(--brass-light)`.
4. **Action Buttons (Lines 300–370, 630–675)**:
   - *Previous:* Bookmark and Compare buttons: `background: 'rgba(255, 255, 255, 0.06)'`, `border: '1px solid rgba(255, 255, 255, 0.12)'`.
   - *Current:* `background: '#F8FAFC'`, `border: '1px solid #CBD5E1'`, icon `color: '#64748B'`.

---

### C. `src/components/dashboard/Pagination.jsx`
1. **Summary & Page Size (Lines 70–98)**:
   - *Previous:* Summary `color: 'rgba(255,255,255,0.7)'`, Select `background: '#0E1F35'`, `color: '#FFFFFF'`.
   - *Current:* Summary `color: '#64748B'`, strong `color: 'var(--navy)'`. Select `background: '#FFFFFF'`, `border: '1px solid #CBD5E1'`, `color: 'var(--navy)'`.
2. **Pagination Buttons (Lines 110–250)**:
   - *Previous:* `background: '#0E1F35'`, `border: '1px solid rgba(255, 255, 255, 0.15)'`, `color: '#FFFFFF'`.
   - *Current:* `background: '#FFFFFF'`, `border: '1px solid #CBD5E1'`, `color: 'var(--navy)'`. Active page button: `background: 'var(--brass)'`, `color: '#FFFFFF'`.

---

### D. `src/components/dashboard/SkeletonCard.jsx`
1. **Container**:
   - *Previous:* `background: '#0B1728'`, `border: '1px solid rgba(255, 255, 255, 0.08)'`.
   - *Current:* `background: '#FFFFFF'`, `border: '1px solid #E2E8F0'`.
2. **Shimmer Pulse**:
   - *Previous:* `linear-gradient(90deg, #112238 25%, #1b3252 50%, #112238 75%)`.
   - *Current:* `linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%)`.

---

### E. `src/components/dashboard/GrantDetailModal.jsx` & `src/components/common/GuestSignupModal.jsx`
1. **Modal Lightbox Box**:
   - *Previous:* `background: '#0B1728'`, `border: '1px solid rgba(196, 162, 101, 0.35)'`, `color: '#FFFFFF'`.
   - *Current:* `background: '#FFFFFF'`, `border: '1px solid var(--line-brass)'` or `#E2E8F0`, `color: 'var(--navy)'`, subtext `#64748B`.
2. **Checklist & Badges**:
   - *Previous:* Translucent white on dark.
   - *Current:* Light gray container `#F8FAFC`, emerald checkmark `#059669`, high contrast slate text `#334155`.

---

## 3. How to Revert to Previous Dark Tone (If Requested by Client)

If the client wants the previous all-dark tone back on the Grants page, you can revert either by Git or by manual token swap:

### Option 1: Git Revert (Fastest & 100% Exact)
Run the following commands in the project directory:
```bash
# To discard recent grants page color modifications and restore previous git commit:
git checkout HEAD~1 -- src/pages/DashboardPage.jsx src/components/dashboard/GrantMatchCard.jsx src/components/dashboard/Pagination.jsx src/components/dashboard/SkeletonCard.jsx src/components/dashboard/GrantDetailModal.jsx
npm run build
```

### Option 2: Component-by-Component Manual Token Revert
If you wish to keep specific improvements (e.g. bugfixes, copy changes) while returning only the background colors:
1. In `src/pages/DashboardPage.jsx`:
   - Change line 439 `background: '#FAFBFC'` back to `background: '#071220'`.
   - Change line 439 `color: 'var(--navy)'` back to `color: '#FFFFFF'`.
   - Change line 1135 banner `background: '#FFFFFF'` back to `background: '#0E1F35'`.
   - Change line 1705 empty card `background: '#FFFFFF'` back to `background: '#0B1728'`.
2. In `src/components/dashboard/GrantMatchCard.jsx`:
   - In List View (line 88): change `background: '#FFFFFF'` back to `background: '#0B1728'`.
   - In Grid View (line 435): change `background: '#FFFFFF'` back to `background: '#0B1728'`.
   - Change title link `color: 'var(--navy)'` back to `color: '#FFFFFF'`.
   - Change agency label `color: '#64748B'` back to `color: 'rgba(255, 255, 255, 0.65)'`.
3. In `src/components/dashboard/Pagination.jsx`:
   - Change page button backgrounds from `#FFFFFF` back to `#0E1F35`, and borders from `#CBD5E1` back to `rgba(255, 255, 255, 0.15)`.
4. In `src/components/dashboard/SkeletonCard.jsx`:
   - Change card `background: '#FFFFFF'` back to `background: '#0B1728'`.
   - Change shimmer from `#F1F5F9`/`#E2E8F0` back to `#112238`/`#1b3252`.
