# Product Requirement Document (PRD): TalentOS
> **Code Name**: 卷王 (The Involution King)
> **Version**: 6.0 (China Battlefield)
> **Status**: Strategic Planning
> **Owner**: TalentOS China Team
> **Philosophy**: 本土化、结果导向、私域运营
> **Visual Style**: **PostHog-Inspired (Retro-Modern / Engineer-Centric)**

---

## 0. Design System & UX Identity
> **"Not another boring SaaS."**
> **STATUS: FROZEN.** The "Hog Style" implementation is complete.

*   **Core Vibe**: 极客、复古、直接、有趣 (Quirky & Bold)。
*   **Visual Language**:
    *   **Background**: 暖色调米白 (`#F3F4EF`)，拒绝冷淡的纯白/灰。
    *   **Colors**: 高饱和度的 **PostHog Blue (`#1D4AFF`)** 和 **Hog Orange (`#F54E00`)**。
    *   **Elements**: 硬朗的边框 (Hard Borders)、复古硬阴影 (Retro Shadows, no blur)、像素风图标。
    *   **Typography**: 粗犷的标题字体，高密度的信息展示。
*   **Reference**: 详见 [Frontend Design System](./frontend_design_system.md)。

---

## 1. Commercial Strategy (商业化战略 - 中国版)

在中国市场，我们不卖“SaaS 订阅”，我们卖**“上岸服务”**。

### 1.1 The "Value Ladder" (价值阶梯)
| 权益等级 | 名称 | 核心价值 | 定价策略 | 核心功能 (Hook) |
| :--- | :--- | :--- | :--- | :--- |
| **L1** | **体验版** | 认知觉醒 | ¥0 | 简历诊断 + 1次“Boss打招呼”优化 |
| **L2** | **会员版** | 效率提升 | ¥29/月 (连续包月 ¥19) | 无限改写 + 职位竞争力分析 |
| **L3** | **冲刺版** | 结果承诺 | ¥199/季 | 模拟面试 + **面试险** (无面试退款) |
| **L4** | **私教版** | 全程托管 | ¥2999+ | AI + 真人顾问 (私域服务) |

### 1.2 Unfair Advantage (中国特色优势)
1.  **Boss 直聘“开撩”神器**:
    *   针对 Boss 直聘的“打招呼”场景，生成高回复率的开场白（摒弃“您好，我对这个职位感兴趣”的废话）。
    *   *核心指标*: **“已读回复率”** 提升 3 倍。
2.  **面试险 (本土化)**:
    *   结合国内“考公/考研保过班”的心智，推出“30天无面试全额退款”，建立极强信任背书。
3.  **私域流量池**:
    *   所有高意向用户引导至**企业微信/社群**，进行高客单转化（面试辅导、职业规划）。

---

## 2. Core Architecture Evolution (架构演进)

### 2.1 New Module: "Boss Sniper" (L4 Feature)
从“被动等待”升级为“主动出击”。
*   **Auto-Greeting (自动打招呼)**: (浏览器插件) 在 Boss 直聘网页版运行，自动筛选匹配职位并发送定制化开场白。
*   **Chat Assistant (聊天助手)**: 当 HR 回复时，AI 实时生成高情商回复建议（例如：如何优雅地谈薪资、如何解释空窗期）。

### 2.2 New Module: "Interview Simulator Pro" (L3 Feature)
从“通用题库”升级为“八股文特训”。
*   **Local Tech Stack**: 针对国内大厂（阿里/字节/美团）的高频考点（Java并发、MySQL调优、Redis）进行专项训练。
*   **Behavioral Question**: 针对国内 HR 喜欢的“抗压能力”、“加班看法”等问题进行“高情商话术”训练。

---

## 3. Functional Specifications (本土化功能增强)

#### 💎 Module E: Value Quantification (身价量化)
*   **Definition**: 你的技能在 Boss 直聘上值多少钱？
*   **Logic**: 爬取 Boss/猎聘 实时薪资数据，结合城市（北上广深 vs 二线）进行精准锚定。
*   **Output**: "你在上海的期望薪资是 25k，但你的技能组合（缺少微服务经验）在 Boss 上中位数为 18k。建议补充：Spring Cloud 项目实战。"

#### 🛡️ Module F: Social Proof (社交裂变)
*   **Definition**: 利用微信生态进行裂变。
*   **Logic**: 生成“我的职业竞争力报告”图片（带二维码），分享朋友圈解锁 VIP 天数。
*   **Content**: "我的简历击败了 95% 的求职者，你的呢？"（利用攀比心理）。

---

## 4. Execution Roadmap (落地计划)

### Phase 1: Local Adaptation (Q1 2026)
*   [ ] **Payment**: 接入 **微信支付 (WeChat Pay)** 和 **支付宝 (Alipay)**。
*   [ ] **Login**: 支持 **微信扫码登录** (抛弃 Email 登录)。
*   [ ] **Data Source**: 适配 Boss 直聘、猎聘的 JD 格式解析。

### Phase 2: High LTV Features (Q2 2026)
*   [ ] **Interview Simulator**: 上线中文语音对话功能，涵盖“八股文”和“场景题”。
*   [ ] **Private Domain**: 打通公众号/企微，构建私域流量闭环。

### Phase 3: The Ecosystem (Q3 2026)
*   [ ] **Course Referral**: 推荐国内主流技术课程（如极客时间、掘金），赚取佣金。
*   [ ] **Headhunter Network**: 对接国内猎头，提供“人才库”查询服务。

---

## 5. Success Metrics (北极星指标)

*   **ARPU (Average Revenue Per User)**: 平均用户收入。
*   **Reply Rate**: 用户在 Boss 直聘上的 **回复率** 提升幅度。
*   **Viral Coefficient**: 病毒系数（平均每个用户带来多少新用户）。
*   **Paid Conversion**: 免费 -> 会员 转化率 (目标 > 8%)。

---

> **Note**: 在中国，产品不仅要好用，更要**“懂事”**。我们要做的，是每一个求职者在内卷浪潮中的**“作弊神器”**。
