# Deployment Strategy & Main Branch Policy

> **Status**: Active
> **Last Updated**: 2026-01-27

## 1. Golden Rule
**The `main` branch is the ONLY source of truth for Production.**

*   ❌ DO NOT push to `master`.
*   ❌ DO NOT manually deploy from local machine.
*   ✅ ALWAYS push to `main` to trigger Vercel deployment.

## 2. Vercel Configuration
To ensure Vercel stays in sync with `main`, the following settings are locked:

*   **Production Branch**: `main`
*   **Connected Repository**: `Kevin-hr/TalentOS`
*   **Root Directory**: `.` (Monorepo root)
*   **Build Settings**: Managed via `vercel.json` (overrides UI settings).

## 3. Workflow
1.  **Develop**: Create feature branches from `main` (e.g., `feat/new-ui`).
2.  **Test**: Run `npm run dev` and `npm run build` locally.
3.  **Merge**: PR into `main`.
4.  **Deploy**: GitHub Actions runs CI checks -> Vercel auto-deploys `main`.

## 4. Troubleshooting
If `bmwuv.com` is not updating:
1.  Check **GitHub Actions** tab for CI failures.
2.  Check **Vercel Dashboard** > Deployments for build errors.
3.  **NEVER** force push `main:master` again. Fix the root cause in `main`.
