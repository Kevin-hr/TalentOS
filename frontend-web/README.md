# TalentOS Frontend Web

The web interface for TalentOS, built with React, TypeScript, and Tailwind CSS.

## 🎨 Design System: "Hog Style" (Stable)

> **Inspired by [PostHog](https://posthog.com)**
> **Status**: Frozen / Production Ready

We have adopted a **Developer-Centric, Retro-Modern** design language.
See the full spec in [docs/frontend_design_system.md](../../docs/frontend_design_system.md).

### Key Characteristics
*   **Colors**: Tan Background (`#F3F4EF`), PostHog Blue (`#1D4AFF`), Hog Orange (`#F54E00`).
*   **Shapes**: Hard borders, `rounded-md` (not full pills), Retro Hard Shadows.
*   **Vibe**: "Not boring". High contrast, pixel art influences, dense information.

## 🛠 Tech Stack

*   **Framework**: React 19 + Vite 7
*   **Styling**: Tailwind CSS v4
*   **Icons**: Lucide React (styled to match the retro vibe)
*   **State**: React Hooks + Context

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/           # Base components (Button, Card, etc. - "Hog Styled")
│   └── ...           # Feature components
├── hooks/            # Custom hooks
├── lib/              # Utilities
└── App.tsx           # Main entry
```
