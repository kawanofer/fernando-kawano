# Portfolio UI Redesign — Design Spec

**Date:** 2026-04-23  
**Status:** Approved  

---

## Overview

Redesign the Fernando Kawano portfolio UI to feel more interactive and animated while keeping the existing dark blue-grey theme and single-page scroll structure. The Hero section stays unchanged. Framer Motion replaces the current CSS transition approach for all animations.

---

## Constraints

- Dark theme (not black) — keep current color palette unchanged
- Single-page scroll layout — no structural route changes
- Hero section unchanged (layout, content, and kanji SVG)
- Accessibility: respect `prefers-reduced-motion` (already handled — Framer Motion supports this natively)
- Existing mobile menu stays as-is

---

## Color Palette (unchanged)

| Token | Value |
|---|---|
| `--color-background` | `#27323E` |
| `--color-background-2` | `#212529` |
| `--color-primary` | `#435585` |
| `--color-secondary` | `#818FB4` |
| `--color-tertiary` | `#F5E8c6` (gold accent) |
| `--color-text` | `#F7F7F7` |
| `--color-card` | `#3a4750` |
| `--color-border` | `#4a5865` |

---

## Stack Changes

- **Add:** `framer-motion`
- **Remove:** `useScrollAnimation` hook (replaced by Framer Motion `useInView` + `motion` components)
- **Keep:** all existing dependencies

---

## Components

### Navbar

**What changes:** Replace the current top bar with a floating pill navbar, centered horizontally, sticky on scroll.

**Layout (left to right):**
1. `kawa-head-icon.svg` logo in a 28×28 circular container
2. Vertical separator
3. Nav links: About · Skills · Projects · Contact — active link shown in a dark rounded chip with gold text
4. Vertical separator
5. Language switcher: flag emoji + language code (🇺🇸 EN / 🇧🇷 PT) in a small pill — clicking toggles language (same behavior as current switcher)

**Behavior:**
- Pill has `background: rgba(33,37,41,0.92)` with `backdrop-filter: blur(8px)` and a subtle border
- Active nav link updates as user scrolls through sections (IntersectionObserver)
- Mobile: pill collapses to show only logo + hamburger; existing mobile menu behavior preserved

---

### Hero

**What changes:** Animation only — replace CSS `translate`/`opacity` transitions with Framer Motion.

**Animation:**
- Text block: enters from left (`x: -48 → 0`, `opacity: 0 → 1`, `duration: 0.7s`)
- Kanji image: enters from right (`x: 48 → 0`, `opacity: 0 → 1`, `duration: 0.7s`, `delay: 0.2s`)
- Triggered once on mount (not scroll-triggered, same as current behavior)

---

### About Me

**What changes:** Swap CSS transitions for Framer Motion scroll-triggered animations.

**Animation:**
- Photo: slides in from left on scroll (`x: -48 → 0`, `opacity: 0 → 1`)
- Text block: slides in from right on scroll (`x: 48 → 0`, `opacity: 0 → 1`, `delay: 0.15s`)
- Language flag pills: `whileHover` scale up slightly (`scale: 1.05`) + border brightens

---

### Skills

**What changes:** Add tech icons to pills; replace CSS hover with Framer Motion `whileHover`.

**Pill structure:** `[icon 20×20] [label]`

**Icons:** Use `react-icons` (already installed) — `Di*` and `Si*` prefixes cover most tech skills. Skills with a matching icon show it; skills without a matching icon (e.g. Agile Methodologies, Scrum, Kanban, Clean Code, Responsive Web Design) show a small fallback dot instead. The full skills list has 36 items — icon mapping is done in a static config object inside the Skills component.

**Interactions:**
- `whileHover`: `y: -3`, box-shadow (`0 6px 18px rgba(67,85,133,0.3)`), border-color → `--color-secondary`, text-color → `--color-text`
- Scroll entrance: staggered fade+slide-up per pill (`staggerChildren: 0.05s`)

---

### Education

**What changes:** Replace current logo+text list with a vertical click-to-expand timeline.

**Structure:**
- Vertical gradient line on the left (`#435585` → `#F5E8c6` → `#435585` → `#818FB4`)
- Each entry has a circular dot on the line; dot glows gold on hover/active
- Entries:
  1. Degree 1 (Positivo University)
  2. Degree 2 (Positivo University)
  3. Section label: "Certifications"
  4. Microsoft Exam 480 — with "See Credential" button linking to Credly

**Expand behavior:**
- Click any entry to expand a detail panel below it
- Detail panel animates open/closed via Framer Motion `AnimatePresence` + `height: 0 → auto`
- Only one entry expanded at a time (accordion behavior)

**Scroll entrance:** entries stagger in (`staggerChildren: 0.15s`, `y: 24 → 0`, `opacity: 0 → 1`)

---

### Projects

**What changes:** Add hover interactions to existing cards; keep carousel/grid structure.

**Interactions per card:**
- `whileHover`: card lifts (`y: -4`), border-color → `--color-primary`, box-shadow (`0 8px 24px rgba(67,85,133,0.25)`)
- Overlay: on hover, a semi-transparent overlay fades in over the card thumbnail containing two buttons: **Demo** and **GitHub** (only shown if URLs exist)
- Overlay fade: Framer Motion `AnimatePresence`, `opacity: 0 → 1`, `duration: 0.2s`

**Scroll entrance:** cards stagger in on scroll

---

### Contact

**What changes:** Animation only — scroll entrance via Framer Motion.

**Animation:** section fades + slides up on scroll (`y: 24 → 0`, `opacity: 0 → 1`)

No structural or form changes.

---

## Animation Defaults (Framer Motion)

| Property | Value |
|---|---|
| Scroll trigger | `useInView({ once: true, margin: "-15%" })` |
| Default duration | `0.7s` |
| Default easing | `easeOut` |
| Reduced motion | Framer Motion respects `prefers-reduced-motion` automatically when using `useReducedMotion()` hook |

---

## Out of Scope

- New pages or routes
- Color palette changes
- Contact form changes
- SEO/structured data changes
- Any backend changes
