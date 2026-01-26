# Problem Log

## 2026-01-26: Vite Error Overlay - Syntax Error in RoleSelector.tsx

### Issue
The entire frontend crashed with a `<vite-error-overlay>` covering the screen.
The build log (`npm run build`) revealed multiple `TS1005: ',' expected` errors in `src/components/RoleSelector.tsx`.

### Root Cause
Unescaped double quotes inside double-quoted strings in the `FEATURES` array.
**Bad Code**:
```typescript
description: "不只给分数，更给"哪里会挂"的致命伤预警...",
```
The inner quotes `"哪里会挂"` were interpreted as terminating the string, causing a syntax error.

### Fix
Escaped the inner double quotes using backslashes (`\"`).
**Fixed Code**:
```typescript
description: "不只给分数，更给\"哪里会挂\"的致命伤预警...",
```

### Prevention
1.  **Linter Rule**: Ensure ESLint catches parsing errors before runtime (already configured, but blocked the build).
2.  **Code Review**: Watch out for unescaped quotes in JSON-like structures or large text blocks.
3.  **Use Template Literals**: Prefer backticks (`) for strings containing quotes to avoid escaping hell.
    *   *Recommendation*: `description: \`不只给分数，更给"哪里会挂"的致命伤预警...\`,`
