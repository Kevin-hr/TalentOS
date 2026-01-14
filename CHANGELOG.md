# Changelog

## [3.0.0] - 2026-01-15

### Features
- **SEO Configuration:**
  - Added `robots.txt` for crawler directives.
  - Updated `index.html` with optimized meta tags (description, viewport) and title.
  - Configured `vite.config.ts` `allowedHosts` for deployment.
- **Deep Linking:**
  - Implemented URL parameter support (`?start=1`, `?tab=analyze`, `?upgrade=1`) to enable direct navigation to specific app states.
- **Marketing & Content:**
  - Refined `LinearPreview` copy to focus on user-centric benefits ("30 秒看清差距") rather than technical model specs.
  - Integrated "Investor Slide" narratives into the product UI, highlighting differentiation from Teal/Jobscan/Rezi.
- **UI/UX:**
  - Updated `UpgradeModal` to reflect the new "Diagnosis -> Rewrite -> Training" closed-loop value proposition.
  - Streamlined `CandidateSearch` (Job Match) demo data for better investor presentation.

### Fixes
- Fixed broken navigation buttons in the landing page that previously pointed to mock interfaces.
- Resolved styling inconsistencies in `InterviewModal` for better mobile responsiveness.

### Chore
- Updated dependency lockfile (`pnpm-lock.yaml`) to ensure consistency.
- Added comprehensive unit tests for `RoleSelector`, `conversionAnalytics`, and `tierManager`.
