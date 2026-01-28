# TalentOS Infrastructure & Deployment Truth
> **IMPORTANT FOR AI AGENTS**: Read this file first to understand the production environment. Do not make assumptions based on local dev files.

## 1. Production Architecture (Verified 2026-01-28)

The system is deployed using a decoupled frontend/backend architecture on cloud platforms.

### 🌍 Domain & DNS
*   **Domain**: `bmwuv.com`
*   **Registrar**: Aliyun (But DNS is hosted elsewhere!)
*   **DNS Authority**: **Cloudflare** (Verified via NS records: `margaret.ns.cloudflare.com`)
    *   *Note*: Any changes in Aliyun DNS console are IGNORED. Changes MUST be made in Cloudflare.

### 🖥️ Frontend (Vercel)
*   **Hosting**: Vercel
*   **Repo Connection**: Linked to GitHub `TalentOS/frontend-web` branch `main`.
*   **Target IP**: `76.76.21.21` (Vercel Global Edge)
*   **CNAME Target**: `cname.vercel-dns.com`
*   **Current State**: Deployed & Green. Waiting for DNS propagation.

### ⚙️ Backend (Railway)
*   **Hosting**: Railway
*   **Service Name**: `talentos-production-35e8`
*   **Public URL**: `https://talentos-production-35e8.up.railway.app`
*   **Health Check**: `GET /health` -> 200 OK (Verified)
*   **Deployment Config**: Uses `Procfile` / `requirements.txt`.

---

## 2. Critical Configuration (Do Not Change Without Validation)

### Correct DNS Records (Cloudflare)
| Type | Name | Content | Proxy In Use |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `216.198.79.1` | DNS Only (Gray Cloud) first (Vercel New Standard) |
| **CNAME** | `www` | `cname.vercel-dns.com` | DNS Only (Gray Cloud) first |
| **A** | (Legacy) | `76.76.21.21` | **Legacy** (Update to 216.198.79.1 recommended) |

### Backend Environment (Railway)
*   **Python Version**: 3.10+
*   **Startup Command**: `python -m uvicorn src.api_server:app --host 0.0.0.0 --port $PORT`
*   **Key Dependencies**: `numpy`, `uvicorn[standard]`, `pydantic`.

---

## 3. Troubleshooting History
*   **2026-01-28**: Backend 502 Error. **Fix**: Added `numpy` and `Procfile`. Back online.
*   **2026-01-28**: Frontend Stale Content. **Fix**: Identified DNS was pointing to old shared hosting (`216.198.79.1`) instead of Vercel. User instructed to update Cloudflare DNS.
