# Frontend Design System: "Hog Style" (PostHog-Inspired)

> **Status**: **FROZEN / FINALIZED** (As of 2026-01-26)
> **Design Philosophy**: Developer-focused, Retro-Modern, Quirky, Bold.
> **Reference**: [PostHog Design System](https://posthog.com/handbook/company/brand-assets)

This document defines the **finalized** visual language for TalentOS.
**STRICT ADHERENCE REQUIRED.** No deviations from this system are permitted without a major version update.

## 1. Core Visual Identity

### 1.1 Color Palette (Retro & Bold)
We adopt a high-contrast, warm palette.

| Role | Color Name | Hex | Description |
| :--- | :--- | :--- | :--- |
| **Background** | **Tan / Beige** | `#F3F4EF` | The signature background color. Warm, not stark white. |
| **Surface** | **White** | `#FFFFFF` | For cards and inputs, with hard borders. |
| **Primary** | **PostHog Blue** | `#1D4AFF` | Primary actions, links, active states. |
| **Accent** | **Hog Orange** | `#F54E00` | CTA buttons, "Hog" personality elements. |
| **Text** | **Near Black** | `#111111` | High contrast text. |
| **Border** | **Dark Gray** | `#2D2D2D` | Hard borders (1px or 2px) for a retro feel. |

### 1.2 Typography
*   **Font Family**: `Matter` (or `Inter` / `System UI` as fallback, but styled boldly).
*   **Headings**: Bold, tight tracking.
*   **Body**: Readable, slightly larger base size (16px+).

### 1.3 UI Components (Neo-Brutalist / Retro)

*   **Cards**:
    *   Background: `#FFFFFF`
    *   Border: `1px solid #E5E7EB` (or darker `#DADBDD` for contrast)
    *   Shadow: **Hard Shadow** (no blur). e.g., `box-shadow: 4px 4px 0px #000000;`
    *   Radius: Small radius (`rounded-md` or `rounded-lg`), not full pills.

*   **Buttons**:
    *   **Primary**: Blue (`#1D4AFF`) or Orange (`#F54E00`) background, White text.
    *   **Style**: Flat with hard shadow or simple border. `rounded-md`.
    *   **Hover**: Slight translate (move up/left) or shadow expansion.

*   **Illustrations**:
    *   Use **Pixel Art** or "Rough Sketch" style icons.
    *   **Mascot**: "TalentHog" (a hedgehog adaptation for recruitment).

## 2. Layout & Vibe

*   **Dense but Organized**: Information density is higher than consumer apps, suitable for "Pro Tools".
*   **Humor & Personality**: Copywriting should be direct, slightly witty (e.g., "Don't just apply, dominate.").
*   **Data-First**: Charts and numbers should look like engineering tools (monospaced fonts for numbers).

## 3. Implementation Status (Completed)

The following theme configuration has been applied to `frontend-web/src/index.css` and is now **LOCKED**.

### 3.1 Theme Configuration
```css
@theme {
  --color-primary: #1D4AFF;
  --color-accent: #F54E00;
  --color-background: #F3F4EF;
  --color-surface: #FFFFFF;
  --color-border: #DADBDD;
  
  --font-display: "Matter", -apple-system, sans-serif;
  --font-body: "Inter", -apple-system, sans-serif;
  
  /* Retro Shadows */
  --shadow-retro: 4px 4px 0px 0px rgba(0,0,0,1);
  --shadow-retro-sm: 2px 2px 0px 0px rgba(0,0,0,1);
}
```

### 3.2 Component Standards
*   **Button.tsx**: Must use `rounded-md`, `border-2 border-black`, and `shadow-retro`.
*   **Card.tsx**: Must use `bg-white`, `border-2 border-black`, and `shadow-retro` (or larger).
*   **RoleSelector.tsx**: Implements the definitive "Hog Style" landing page.

## 4. Copywriting Tone
*   **Old**: "Professional, Clean, Trustworthy"
*   **New**: "Smart, Direct, Engineer-to-Engineer"
*   *Example*: Instead of "Upload Resume", use "Drop your CV here" or "Let's debug your career".
