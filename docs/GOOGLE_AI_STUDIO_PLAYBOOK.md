# Google AI Studio 开发实战指南 (Playbook)

> **目标**: 利用 Google AI Studio (Gemini 1.5 Pro) 的长文本能力，快速生成 TalentOS 的核心逻辑与测试数据。
> **适用场景**: 核心算法验证、Prompt 调试、合成数据生成。

---

## 1. 核心 Prompt 模板 (System Instruction)

**操作步骤**:
1. 打开 [Google AI Studio](https://aistudio.google.com/).
2. 在左侧 "System Instructions" 区域，粘贴以下内容。
3. 把 `docs/01_Product_Requirement_Document.md` 的全文内容作为 context 粘贴到 User Input 里。

```text
你现在是 TalentOS 的首席架构师和 AI 引擎工程师。你熟读了 TalentOS 的 PRD (v6.0 China Battlefield)。
你的任务是根据 PRD，为核心功能模块编写高质量的 Python 代码和 Prompt。

设计原则：
1. **Abstract First**: 先定义数据结构 (Pydantic Models)，再写逻辑。
2. **China Localized**: 所有生成的文案、模拟数据必须符合中国互联网招聘场景 (Boss 直聘风格)。
3. **Robust**: 代码需要包含错误处理。

核心任务清单：
1. 生成 `resume_parser.py`: 基于 Markdown 的简历解析逻辑。
2. 生成 `diagnosis_engine.py`: 核心诊断 Prompt，包含评分标准。
3. 生成 `star_rewriter.py`: 将普通经历改写为 STAR 格式的逻辑。
```

---

## 2. 专项任务：生成“Boss直聘”风格合成数据

**Prompt**:
```text
请生成 3 份高质量的中文简历数据 (Markdown 格式) 和 3 份对应的 JD (职位描述)。

要求：
1. **场景**:
   - 候选人 A: 3年经验 Java 后端，技术栈老旧，想跳槽大厂。
   - 候选人 B: 应届产品经理，只有社团经验，想找 B 端产品岗。
   - 候选人 C: 5年经验前端，但频繁跳槽 (1年1跳)。
2. **JD**:
   - 对应 A: 字节跳动 - 抖音电商 - 后端开发专家 (高并发要求)。
   - 对应 B: 飞书 - B端产品助理 (逻辑能力要求)。
   - 对应 C: 腾讯 - 前端开发 (稳定性要求)。
3. **格式**: 请直接输出 Markdown，不要废话。
```

---

## 3. 专项任务：核心诊断 Prompt 设计

**Prompt**:
```text
现在我们需要设计 TalentOS 的核心功能：**简历诊断 (Diagnosis)**。
请编写一个适用于 DeepSeek-V3 或 Gemini 1.5 Pro 的 System Prompt。

输入变量：
- `{{resume_text}}`: 候选人简历
- `{{jd_text}}`: 目标职位 JD

输出要求 (JSON 格式):
1. `score` (0-100): 匹配度评分。
2. `fatal_flaws` (List[str]): 致命伤 (例如：学历不符、跳槽频繁、技术栈缺失)。
3. `boss_reply_probability` (0-100%): 预测 Boss 直聘上 HR 回复的概率。
4. `improvement_suggestions` (List[str]): 3 个立刻能改的建议。

请输出这个 System Prompt 的完整文本。
```

---

## 4. 专项任务：STAR 改写引擎逻辑

**Prompt**:
```text
请编写一个 Python 函数 `rewrite_bullet_point(original_text, target_jd)`。
该函数需要调用 LLM (假设使用 `call_llm` 接口)，将用户平铺直叙的经历改写为 STAR 法则 (Situation, Task, Action, Result) 的高价值描述。

示例输入: "负责后端接口开发，使用 Java 和 MySQL。"
期望输出: "主导电商核心交易链路重构 (Situation)，面对日均千万级流量挑战 (Task)，采用 Spring Cloud 微服务架构拆分单体应用，引入 Redis 缓存热点数据 (Action)，最终将接口响应时间降低 50%，支撑了双11大促 10W QPS 峰值 (Result)。"

请给出 Python 代码实现。
```

---

## 5. 如何把结果搬回项目？

1. **Mock Data**: 将生成的数据保存到 `tests/fixtures/china_scenarios/` 目录下。
2. **Core Logic**: 将 Python 代码复制到 `src/core/engine.py` 中进行测试。
3. **Prompts**: 将 Prompt 模板保存到 `src/prompts/templates.py` 中。

---

> **最强大脑的建议**: Google AI Studio 是你的“兵工厂”，在这里制造武器（Prompt/Code），然后运到 VS Code (Cursor/Trae) 这个“战场”上去组装和发射。不要试图在兵工厂里打仗。
