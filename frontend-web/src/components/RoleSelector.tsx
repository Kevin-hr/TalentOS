import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Lock, Sparkles, Stethoscope, FileEdit, Target, Swords, Zap, CheckCircle2, CreditCard, Crown, Rocket } from "lucide-react";

interface RoleSelectorProps {
  onStart: () => void;
}

const FEATURES = [
  {
    id: "diagnosis",
    icon: Stethoscope,
    title: "诊断",
    titleEn: "Diagnosis",
    tagline: "30秒看清差距",
    description: "不只给分数，更给\"哪里会挂\"的致命伤预警。模拟 HR 6秒筛选视角，精准定位你的简历短板。",
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    iconBg: "bg-red-500/20",
    iconColor: "text-red-400",
  },
  {
    id: "rewrite",
    icon: FileEdit,
    title: "改写",
    titleEn: "Rewrite",
    tagline: "一键结果导向",
    description: "把\"做了什么\"变成\"带来了什么价值\"。用 STAR 法则重构每一条经历，让成果说话。",
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    iconBg: "bg-yellow-500/20",
    iconColor: "text-yellow-400",
  },
  {
    id: "match",
    icon: Target,
    title: "配岗",
    titleEn: "Match",
    tagline: "技能值多少钱？",
    description: "基于能力的精准岗位匹配，而非关键词堆砌。告诉你哪些岗位最适合你，薪资区间是多少。",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    id: "train",
    icon: Swords,
    title: "训练",
    titleEn: "Train",
    tagline: "面试前实战演练",
    description: "模拟真实追问节奏，把\"能做\"说成\"值钱\"。AI 面试官帮你提前踩坑、补齐话术。",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
];

const DIFFERENTIATORS = [
  "不只是静态报告，而是可执行的 Actionable Steps",
  "模拟真实 HR 视角，而非机械关键词匹配",
  "四步闭环：诊断 → 改写 → 配岗 → 训练",
  "每一步都有具体的改进建议和示例",
];

export function RoleSelector({ onStart }: RoleSelectorProps) {
  const featuresRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#F3F4EF] text-[#111111] font-sans selection:bg-[#F54E00]/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F3F4EF]/90 backdrop-blur-md border-b-2 border-black">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="font-black text-xl tracking-tight">TalentOS</div>
          <button className="px-6 py-2 rounded-md bg-[#1D4AFF] text-white text-sm font-bold hover:bg-[#1D4AFF]/90 transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none">
            登录
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 pt-32 pb-24 bg-[#F3F4EF]">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Version Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FFD02F] border-2 border-black text-black text-xs font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <Sparkles className="w-3 h-3" />
            <span>🧠 职业规划领域的“最强大脑”</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-black"
          >
            挖掘你未曾发现的<br /><span className="text-[#F54E00]">职业天命与潜能</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            求职者不知道投什么？职场人看不清路在哪？
            <br className="hidden md:block" />
            TalentOS 深度扫描过往经历，
            <strong className="text-black bg-yellow-200 px-1 border border-black rounded-sm mx-1">精准计算最适合你的职业赛道</strong>。
            拒绝盲目试错，用算法规划你的黄金十年。
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button 
              onClick={onStart}
              className="px-8 py-4 rounded-md bg-[#F54E00] text-white font-black text-lg hover:bg-[#F54E00]/90 transition-all flex items-center gap-2 group min-w-[200px] justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none"
            >
              立即开始分析
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onStart}
              className="px-8 py-4 rounded-md bg-white text-black font-bold text-lg hover:bg-gray-50 transition-all border-2 border-black min-w-[200px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none"
            >
              查看分析样本
            </button>
          </motion.div>
        </div>
      </section>

      {/* Four Features Section */}
      <section ref={featuresRef} className="relative px-4 py-24 bg-white border-y-2 border-black">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#BFDBFE] border-2 border-black text-[#1D4AFF] text-sm font-bold mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Zap className="w-4 h-4" />
              <span>四功能闭环</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-black">
              一站式解决求职<span className="text-[#1D4AFF]">核心痛点</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              不是零散的工具堆砌，而是从诊断到落地的完整闭环
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-xl bg-[#F3F4EF] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer"
                onClick={onStart}
              >
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-md bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <feature.icon className="w-7 h-7 text-black" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-wider font-bold">{feature.titleEn}</span>
                      <span className="text-2xl font-black text-black">
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-black mb-2 flex items-center gap-3">
                    {feature.title}
                    <span className="text-sm font-bold px-3 py-1 rounded-md bg-white border border-black text-black">
                      {feature.tagline}
                    </span>
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed font-medium">
                    {feature.description}
                  </p>

                  {/* Arrow Indicator */}
                  <div className="mt-6 flex items-center gap-2 text-black font-bold group-hover:underline decoration-2 underline-offset-4 transition-all">
                    <span className="text-sm">立即体验</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Why Choose Us - Core Differentiators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-12 rounded-xl bg-[#1A1A1A] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
          >
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#22C55E] border-2 border-black text-black text-xs font-bold mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <CheckCircle2 className="w-3 h-3" />
                  为什么选择我们
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                  不只给报告<br/>
                  <span className="text-[#22C55E]">更给行动路径</span>
                </h3>
                <p className="text-gray-300 leading-relaxed font-medium">
                  相比 Teal、Jobscan、Rezi 等工具，我们不只提供静态分析报告，而是提供<strong className="text-white">可执行的 Actionable Steps</strong>。
                </p>
              </div>

              <div className="space-y-4">
                {DIFFERENTIATORS.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-md bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#22C55E] border border-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-black font-bold">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="relative z-10 mt-10 pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <p className="text-lg font-bold text-white">准备好升级你的求职策略了吗？</p>
                <p className="text-sm text-gray-400">免费开始，30秒获得第一份诊断报告</p>
              </div>
              <button
                onClick={onStart}
                className="px-8 py-4 rounded-md bg-[#2DD4BF] text-black font-black text-lg hover:bg-[#2DD4BF]/90 transition-all flex items-center gap-2 group border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none"
              >
                免费开始
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="relative px-4 py-24 bg-[#F3F4EF]">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-black">
              看看真实的分析报告
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              专业级诊断 + 能力雷达图 + 薪资分析
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full rounded-xl overflow-hidden border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white"
          >
             {/* Window Controls */}
             <div className="h-10 bg-white border-b-2 border-black flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-white border border-black" />
                <div className="w-3 h-3 rounded-full bg-white border border-black" />
                <div className="w-3 h-3 rounded-full bg-white border border-black" />
                <div className="mx-auto text-[11px] font-mono text-gray-500 font-bold">bmwuv.com / 简历分析报告</div>
             </div>

             {/* Dashboard Content Mock */}
             <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-none select-none">
                <div className="md:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-black">简历分析报告</h3>
                      <p className="text-sm text-gray-500 font-bold">产品经理 · 字节跳动</p>
                    </div>
                    <div className="px-4 py-2 bg-[#DCFCE7] text-[#166534] text-sm font-black rounded-md border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      匹配度: 85%
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-5 bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                       <div className="flex items-center gap-2 text-green-600 text-sm font-bold mb-3">
                          <CheckCircle2 className="w-4 h-4" />
                          核心能力达成
                       </div>
                       <div className="space-y-2">
                         <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden border border-black">
                           <div className="h-full w-[85%] bg-[#22C55E]" />
                         </div>
                         <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden border border-black">
                           <div className="h-full w-[72%] bg-[#22C55E]" />
                         </div>
                       </div>
                    </div>
                    <div className="p-5 bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                       <div className="flex items-center gap-2 text-red-600 text-sm font-bold mb-3">
                          <Lock className="w-4 h-4" />
                          致命伤预警
                       </div>
                       <div className="space-y-2">
                         <div className="h-3 w-3/4 bg-gray-200 rounded border border-gray-300" />
                         <div className="h-3 w-2/3 bg-gray-200 rounded border border-gray-300" />
                       </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-xs font-black text-black uppercase tracking-wider">智能洞察</div>
                  <div className="p-4 bg-[#DBEAFE] border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="h-3 w-3/4 bg-[#3B82F6]/30 rounded mb-2" />
                    <div className="h-3 w-1/2 bg-[#3B82F6]/20 rounded" />
                  </div>
                  <div className="p-4 bg-[#F3E8FF] border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="h-3 w-2/3 bg-[#A855F7]/30 rounded mb-2" />
                    <div className="h-3 w-1/2 bg-[#A855F7]/20 rounded" />
                  </div>
                  <div className="h-32 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-gray-300 font-bold text-2xl">
                    CHART
                  </div>
                </div>
             </div>
             
             {/* Gradient Overlay to fade bottom */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F3F4EF]/90 pointer-events-none" />
             
             {/* CTA Overlay */}
             <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center">
               <button 
                 onClick={onStart}
                 className="pointer-events-auto px-8 py-4 rounded-md bg-[#F54E00] text-white font-black text-lg hover:bg-[#F54E00]/90 transition-all flex items-center gap-2 group border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none"
               >
                 开始分析我的简历
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="relative px-4 py-24 bg-white border-t-2 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#FEF3C7] border-2 border-black text-[#D97706] text-sm font-bold mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CreditCard className="w-4 h-4" />
              <span>简单透明的定价</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-black">
              选择适合你的<span className="text-[#D97706]">方案</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              免费功能足够日常使用，Pro 解锁全部高级能力
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <div className="w-12 h-12 rounded-md bg-gray-100 border-2 border-black flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-black text-black mb-2">免费版</h3>
              <p className="text-3xl font-black text-black mb-6">¥0<span className="text-sm font-bold text-gray-500">/月</span></p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <span>简历诊断 3次/天</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <span>基础匹配分析</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <span>标准报告导出</span>
                </li>
              </ul>
              <button
                onClick={onStart}
                className="w-full py-3 rounded-md bg-white border-2 border-black text-black font-bold hover:bg-gray-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none"
              >
                免费开始
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative p-8 rounded-xl bg-[#FFF7ED] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all transform scale-105 z-10"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-md bg-[#F54E00] border-2 border-black text-white text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                最受欢迎
              </div>
              <div className="w-12 h-12 rounded-md bg-[#F54E00] border-2 border-black flex items-center justify-center mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-black mb-2">Pro 版</h3>
              <p className="text-3xl font-black text-black mb-6">¥49<span className="text-sm font-bold text-gray-500">/月</span></p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-900 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-[#F54E00] flex-shrink-0 mt-0.5" />
                  <span>无限简历诊断</span>
                </li>
                <li className="flex items-start gap-3 text-gray-900 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-[#F54E00] flex-shrink-0 mt-0.5" />
                  <span>AI 一键改写简历</span>
                </li>
                <li className="flex items-start gap-3 text-gray-900 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-[#F54E00] flex-shrink-0 mt-0.5" />
                  <span>深度岗位匹配</span>
                </li>
                <li className="flex items-start gap-3 text-gray-900 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-[#F54E00] flex-shrink-0 mt-0.5" />
                  <span>模拟面试训练</span>
                </li>
                <li className="flex items-start gap-3 text-gray-900 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-[#F54E00] flex-shrink-0 mt-0.5" />
                  <span>薪资参考数据</span>
                </li>
              </ul>
              <button
                onClick={onStart}
                className="w-full py-3 rounded-md bg-[#F54E00] border-2 border-black text-white font-black hover:bg-[#F54E00]/90 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none"
              >
                升级 Pro
              </button>
            </motion.div>

            {/* Team Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-xl bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <div className="w-12 h-12 rounded-md bg-[#E9D5FF] border-2 border-black flex items-center justify-center mb-6">
                <Bot className="w-6 h-6 text-[#7E22CE]" />
              </div>
              <h3 className="text-xl font-black text-black mb-2">团队版</h3>
              <p className="text-3xl font-black text-black mb-6">¥199<span className="text-sm font-bold text-gray-500">/月</span></p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <span>Pro 全部功能</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <span>无限团队成员</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <span>批量简历分析</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <span>API 接入支持</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <span>专属客服</span>
                </li>
              </ul>
              <button
                onClick={onStart}
                className="w-full py-3 rounded-md bg-white border-2 border-black text-black font-bold hover:bg-gray-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none"
              >
                联系商务
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-[#F3F4EF] border-t-2 border-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#1D4AFF] rounded-md border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-black text-black">TalentOS © 2026</span>
          </div>
          <p className="text-sm font-bold text-gray-600">
            Don't Apply. <span className="text-[#F54E00] font-black">Upgrade.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
