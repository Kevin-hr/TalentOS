Based on my analysis of the codebase, here is the comprehensive report on the current frontend style:

### 1. Technology Stack
- **Framework**: React 19 + Vite 7
- **Styling Engine**: Tailwind CSS v4 (using the new `@import "tailwindcss";` and `@theme` configuration)
- **Component System**: Custom components (`components/ui`) built with Radix UI primitives and Tailwind CSS
- **Icons**: Lucide React

### 2. Design Aesthetic: "Apple Style"
The project explicitly adopts an iOS/macOS design language, characterized by:

- **Color Palette**:
  - **Primary**: `#007AFF` (Apple Blue) - Used for main buttons and active states.
  - **Background**: `#F5F5F7` (Apple Gray) - Used as the main page background.
  - **Text**: `#1D1D1F` (Near Black) - High contrast for readability.
  - **Surface**: Pure White (`#FFFFFF`) for cards and elevated elements.

- **Visual Elements**:
  - **Rounded Corners**: Heavy use of `rounded-2xl`, `rounded-3xl`, and `rounded-full` (capsule buttons).
  - **Shadows**: Soft, diffused shadows (e.g., `shadow-lg shadow-black/5`) to create depth without harsh borders.
  - **Typography**: Uses system fonts (`-apple-system`, `SF Pro Text`) for a native feel.
  - **Glassmorphism**: Use of transparency and background blurs (implied by `bg-white/40` and gradients).

### 3. Key Components
- **Cards**: Large, white cards with soft shadows and ample padding, serving as the main containers for content.
- **Buttons**:
  - **Primary**: Blue pill-shaped buttons (`rounded-full`) with white text.
  - **Secondary/Outline**: White or transparent backgrounds with subtle borders.
- **Interactive Elements**: Smooth transitions (`transition-all`, `active:scale-95`) giving a tactile feel to interactions.

### 4. Layout Structure
- **Mobile-First**: The `App.tsx` shows a dedicated `MobileHomeView` and `ResultView`.
- **Clean Interface**: Minimalist layout with plenty of whitespace, focusing user attention on the central "Upload" and "Analyze" actions.
- **Floating Elements**: Fixed bottom action bars (e.g., the "Start Diagnosis" button) with gradient fades.

I am ready to help you modify or extend this design system. Please confirm if you would like to proceed with any specific changes.