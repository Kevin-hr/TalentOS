# Product Requirement Document (PRD): TalentOS

> **Version**: 3.0 (Pure C-Side)
> **Status**: Development
> **Owner**: TalentOS Team
> **Type**: Consumer SaaS

## 1. Product Overview (产品概览)

### 1.1 Vision (愿景)
To empower job seekers with an "Exoskeleton" (外骨骼) to hack the recruitment process, using AI to decode, optimize, and match their career path.

### 1.2 Core Value Proposition (核心价值)
*   **For Users (Career Hacker)**:
    *   **Decode**: Understand *why* you are rejected.
    *   **Upgrade**: Transform "experience" into "value".
    *   **Match**: Find where you belong and how much you are worth.
    *   **Train**: Fail here, so you win there.

### 1.3 Success Metrics (KPIs)
*   **Conversion Rate**: Visitor to Diagnosis > 20%.
*   **Paid Conversion**: Diagnosis to VIP Upgrade > 3%.
*   **Retention**: Weekly Active Users (WAU) driven by "Training" and "Job Matching".

---

## 2. User Stories (用户故事)

| ID | Persona | Trigger | Action | Expected Outcome |
| :--- | :--- | :--- | :--- | :--- |
| US-01 | **Desperate Job Seeker** | Receiving 0 interviews | Uploads Resume + Target JD | Receives a "Brutal Truth" score and critical "Red Flags". |
| US-02 | **Career Switcher** | Unsure of transferable skills | Uses **Rewrite** function | Sees their past experience reframed into target role language (STAR format). |
| US-03 | **Anxious Interviewee** | Fear of unknown questions | Uses **Training** mode | Practices with AI Interviewer, gets real-time feedback and scores. |
| US-04 | **Passive Candidate** | Curious about market value | Uses **Match** function | Sees "Salary Estimation" and "Gap Analysis" for dream roles. |

---

## 3. Functional Specifications (功能规格)

### 3.1 Core Workflow (The Loop)
1.  **Diagnosis (诊断)**:
    *   Input: Resume (PDF/Text) + JD.
    *   Output: Score (0-100), Red Flags, Radar Chart (Hard/Soft Skills).
2.  **Rewrite (改写)**:
    *   Action: One-click optimize specific bullet points.
    *   Logic: Convert "Task-based" to "Result-based" (STAR method).
3.  **Match (配岗)**:
    *   Input: User Profile / Preferences.
    *   Output: Matched Roles list with "Match Score" and "Impact Prediction".
4.  **Train (训练)**:
    *   Mode: Chat-based Interview Simulation.
    *   Feedback: Tone analysis, content coverage, logical structure.

### 3.2 Data Models (Simplified)

```typescript
// The Analysis Result
interface AnalysisResult {
  report: string; // Markdown formatted
  score: number;
  radar: {
    dimensions: Array<{ name: string; value: number }>;
  };
  actionableSteps: string[];
}

// The VIP Plan
interface VipPlan {
  id: 'pro_monthly' | 'pro_quarterly';
  features: [
    'Unlimited Rewrites',
    'Deep Match Report',
    'AI Interview Trainer',
    'Salary Analysis'
  ];
}
```

---

## 4. Technical Architecture (技术架构)

### 4.1 Tech Stack
*   **Frontend**: React 18 + Vite + TailwindCSS (Mobile First).
*   **Backend**: Python FastAPI (Stateless API).
*   **AI Engine**: DeepSeek-V3 (Reasoning Mode) for complex analysis.
*   **Parsing**: MarkItDown / Docling for high-fidelity resume parsing.

### 4.2 Security & Privacy
*   **Data Minimization**: No permanent storage of resume text in MVP (Stateless processing).
*   **Local Processing**: Ready for Local LLM integration (Roadmap).

---

## 5. Go-to-Market Strategy (GTM)

### 5.1 Pricing Strategy (The Funnel)
*   **Free**:
    *   1 Diagnosis / Day.
    *   Limited Rewrite (1 bullet point).
    *   Basic Match List.
*   **VIP ($9.9 - $29/mo)**:
    *   Unlimited Diagnosis & Rewrites.
    *   Full Interview Training.
    *   Advanced Salary & Gap Analysis.

### 5.2 Content Strategy
*   **Hook**: "Stop guessing. See your resume through an HR's eyes."
*   **Channels**: Social Media (Career advice), SEO (Resume Checker, AI Resume Builder).

---

## 6. Action Plan (执行计划)

- [x] **Kernel**: Develop `engine.py` (Completed).
- [x] **Web UI**: Build Candidate Web with React (Completed).
- [x] **Features**: Implement Diagnosis, Rewrite, Match, Train (Alpha).
- [ ] **Growth**: SEO Optimization & Deep Linking (In Progress).
- [ ] **Monetization**: Integrate Payment Gateway (Stripe/WeChat).
