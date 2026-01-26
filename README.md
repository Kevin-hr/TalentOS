<div align="center">
  <img src="docs/assets/cover_promo.svg" alt="TalentOS Cover" width="100%" />

  # TalentOS：智能招聘操作系统
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.95+-009688.svg)](https://fastapi.tiangolo.com)
  [![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev)
</div>

**TalentOS 不是工具，是求职者的“外骨骼装甲”。**

告别海投盲赌，用算法重构职业路径。
*   **C端“职场黑客”**：逆向解析筛选逻辑，让才华不被算法埋没。

**数据驱动，降维打击。**

---

## 💰 商业变现 (Monetization Strategy)

我们不只是写代码，我们是在构建**资产**。TalentOS 专注服务于求职者的职业成长：

### C端增值服务 (VIP 权益)
*   **无限改写**: 基于 JD 的针对性简历优化建议，突破每日次数限制。
*   **模拟面试训练**: AI 面试官实战演练（压力面/行为面），生成能力评估报告。
*   **深度竞争力分析**: 解锁完整人岗匹配报告与身价评估数据。

---

## ⚡ 核心战役 (The Campaign)

### 🏴‍☠️ Career Hacker (职场黑客)
> **Slogan**: "Don't Apply. Upgrade." (别投递，去升级。)

我们通过 **“四功能闭环”** 解决求职者的核心痛点：

1.  **诊断 (Diagnosis)**: 30秒看清差距。不只给分数，更给“哪里会挂”的致命伤预警。
2.  **改写 (Rewrite)**: 一键生成“结果导向”版本。把“做了什么”变成“带来了什么价值”。
3.  **配岗 (Match)**: 你的技能值多少钱？基于能力的精准岗位匹配，而非关键词堆砌。
4.  **训练 (Train)**: 面试前的实战演练。模拟真实追问节奏，把“能做”说成“值钱”。

**核心差异化**: 相比 Teal/Jobscan/Rezi 等工具，我们不只提供静态报告，而是提供**可执行的 Actionable Steps**。

---

## 🚀 1. 系统模块 (System Modules)

我们已经完成了从“单点工具”到“智能求职助手”的闭环构建：

### 🧠 核心引擎 (Core Engine)
*   **全格式解析**: 强力解析 PDF, DOCX, TXT, MD 等多种格式的简历与 JD（基于 `pdfplumber` & `python-docx`）。
*   **结构化提取**: 利用 LLM 将非结构化简历转化为标准 JSON（个人信息、教育、经历、技能）。
*   **智能诊断**: 模拟资深 HR 视角，提供 6 秒简历速览评分、致命伤预警及 STAR 法则重写建议。

### 🖥️ 职场黑客 (Candidate Web)
*   **Deep Linking**: 支持 `?start=1` (诊断), `?tab=search` (配岗), `?upgrade=1` (VIP) 等参数直达核心功能。
*   **SEO 优化**: 完整的 Meta 标签、`robots.txt` 配置，确保搜索引擎友好。
*   **移动端适配**: 响应式设计，支持手机端流畅体验。

---

## 💡 2. 技术亮点 (Key Highlights)

*   **架构灵活性 (Abstract First)**:
    *   **LLM-First Design**: 核心逻辑由 Prompt (`engine.py`) 驱动而非硬编码规则，适应新行业/语种只需调整 Prompt。
    *   **Plugin Architecture**: 简历解析器与 LLM 提供商均采用插件化设计，易于扩展。
*   **数据驱动决策 (Data-Driven)**:
    *   人岗匹配不再是简单的关键词匹配 (Keyword Matching)，而是基于语义理解 (Semantic Understanding) 的多维度加权打分系统。
*   **极致开发者体验 (DX)**:
    *   **Type-Safe**: 全栈 TypeScript + Python 类型提示。
    *   **Mock Data**: 内置 `generate_mock_resumes.py` 脚本，一键生成高质量合成数据用于测试。
    *   **Separation of Concerns**: 清晰的前后端分离架构 (React + FastAPI)。

---

## 🗺️ 3. 迭代计划 (Roadmap)

### P0: 架构稳健性 (Stability)
- [ ] **异步任务队列**: 引入 `Celery` + `Redis` 替代当前的同步循环处理，解决大批量解析时的超时问题。
- [ ] **数据持久化**: 引入 `PostgreSQL` 或 `SQLite`，持久化存储候选人库、解析记录和匹配历史。

### P1: 深度智能 (Deep AI)
- [ ] **RAG 增强**: 引入向量数据库 (ChromaDB/Milvus)，构建企业人才知识库，支持自然语言搜索（例：“找一个懂 React 且做过电商项目的 5 年经验前端”）。
- [ ] **本地模型支持**: 支持 Ollama/LocalLLM，允许企业在本地运行 DeepSeek/Llama 模型，确保数据隐私。

### P2: 体验升级 (UX)
- [ ] **可视化报表**: Dashboard 增加人才分布图表（学历分布、技能词云、匹配度直方图）。
- [ ] **AI 面试官**: 实现 Chatbot 预面试功能，自动与候选人对话并生成面试摘要。

---

## ⚡ 4. 快速开始 (Quick Start)

### 后端 (Backend)
```bash
# 1. 环境准备
cd TalentOS
python -m venv venv
.\venv\Scripts\activate  # Windows

# 2. 安装依赖
pip install -r requirements.txt

# 3. 配置密钥 (复制 config/.env.example 到 .env 并填入 Key)
# DEEPSEEK_API_KEY="sk-..."

# 4. 启动服务
python -m uvicorn src.api_server:app --reload
```

### 前端 (Frontend)
```bash
# 1. 进入目录
cd frontend-web

# 2. 安装依赖 (推荐 pnpm)
pnpm install

# 3. 启动开发服
pnpm dev
```

---

## 🛠️ 技术栈 (Tech Stack)

*   **Backend**: Python 3.9+, FastAPI, Pydantic
*   **Frontend**: React 18, TypeScript, TailwindCSS v4
*   **Design System**: **"Hog Style"** (PostHog-inspired Retro/Bold UI)
*   **AI Engine**: DeepSeek-V3 (Reasoning Mode), OpenAI
*   **Parsing**: pdfplumber, python-docx, MarkItDown (Planned)
