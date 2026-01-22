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
    description: "不只给分数，更给"哪里会挂"的致命伤预警。模拟 HR 6秒筛选视角，精准定位你的简历短板。",
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
    description: "把"做了什么"变成"带来了什么价值"。用 STAR 法则重构每一条经历，让成果说话。",
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
    description: "模拟真实追问节奏，把"能做"说成"值钱"。AI 面试官帮你提前踩坑、补齐话术。",
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
    <div className="min-h-screen bg-black text-white selection:bg-[#34D399]/30 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-end px-6 py-4 max-w-7xl mx-auto w-full">
          <button className="px-6 py-2 rounded-full bg-[#1A1A1A] text-white text-sm font-medium hover:bg-[#2A2A2A] transition-colors border border-white/10">
            登录
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 pt-16 pb-24">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Version Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/50 border border-purple-800/50 text-purple-300 text-xs font-medium"
          >
            <Sparkles className="w-3 h-3" />
            <span>30秒看清差距：哪一句拖后腿、怎么改</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            求职者的<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6]">外骨骼装甲</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            告别海投盲赌，用算法重构职业路径。
            <br className="hidden md:block" />
            30秒诊断差距，一键改写简历，精准匹配岗位。
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
              className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all flex items-center gap-2 group min-w-[200px] justify-center shadow-lg shadow-white/10"
            >
              立即开始分析
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onStart}
              className="px-8 py-4 rounded-full bg-[#1A1A1A] text-white font-semibold text-lg hover:bg-[#2A2A2A] transition-all border border-white/10 min-w-[200px]"
            >
              查看分析样本
            </button>
          </motion.div>
        </div>
      </section>

      {/* Four Features Section */}
      <section ref={featuresRef} className="relative px-4 py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>四功能闭环</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              一站式解决求职<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6]">核心痛点</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
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
                className={`group relative p-8 rounded-3xl ${feature.bgColor} ${feature.borderColor} border backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden`}
                onClick={onStart}
              >
                {/* Hover Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center`}>
                      <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">{feature.titleEn}</span>
                      <span className={`text-2xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                    {feature.title}
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${feature.bgColor} ${feature.iconColor}`}>
                      {feature.tagline}
                    </span>
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Arrow Indicator */}
                  <div className="mt-6 flex items-center gap-2 text-gray-500 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">立即体验</span>
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
            className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border border-white/10 overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-full blur-[80px] -mr-40 -mt-40" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium mb-4">
                  <CheckCircle2 className="w-3 h-3" />
                  为什么选择我们
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  不只给报告<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">更给行动路径</span>
                </h3>
                <p className="text-gray-400 leading-relaxed">
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
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-white">准备好升级你的求职策略了吗？</p>
                <p className="text-sm text-gray-500">免费开始，30秒获得第一份诊断报告</p>
              </div>
              <button
                onClick={onStart}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] text-black font-bold text-lg hover:opacity-90 transition-all flex items-center gap-2 group shadow-lg shadow-cyan-500/20"
              >
                免费开始
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="relative px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              看看真实的分析报告
            </h2>
            <p className="text-lg text-gray-400">
              专业级诊断 + 能力雷达图 + 薪资分析
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0F0F0F]"
          >
             {/* Window Controls */}
             <div className="h-10 bg-[#1A1A1A] border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                <div className="mx-auto text-[11px] font-mono text-gray-500">bmwuv.com / 简历分析报告</div>
             </div>

             {/* Dashboard Content Mock */}
             <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-none select-none">
                <div className="md:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">简历分析报告</h3>
                      <p className="text-sm text-gray-500">产品经理 · 字节跳动</p>
                    </div>
                    <div className="px-4 py-2 bg-green-500/20 text-green-400 text-sm font-bold rounded-xl border border-green-500/30">
                      匹配度: 85%
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                       <div className="flex items-center gap-2 text-green-400 text-sm font-bold mb-3">
                          <CheckCircle2 className="w-4 h-4" />
                          核心能力达成
                       </div>
                       <div className="space-y-2">
                         <div className="h-2 w-full bg-green-500/30 rounded-full overflow-hidden">
                           <div className="h-full w-[85%] bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" />
                         </div>
                         <div className="h-2 w-full bg-green-500/30 rounded-full overflow-hidden">
                           <div className="h-full w-[72%] bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" />
                         </div>
                       </div>
                    </div>
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                       <div className="flex items-center gap-2 text-red-400 text-sm font-bold mb-3">
                          <Lock className="w-4 h-4" />
                          致命伤预警
                       </div>
                       <div className="space-y-2">
                         <div className="h-2 w-3/4 bg-white/10 rounded" />
                         <div className="h-2 w-2/3 bg-white/10 rounded" />
                       </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">智能洞察</div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                    <div className="h-2 w-3/4 bg-blue-400/30 rounded mb-2" />
                    <div className="h-2 w-1/2 bg-blue-400/20 rounded" />
                  </div>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
                    <div className="h-2 w-2/3 bg-purple-400/30 rounded mb-2" />
                    <div className="h-2 w-1/2 bg-purple-400/20 rounded" />
                  </div>
                  <div className="h-32 bg-white/5 border border-white/5 rounded-2xl" />
                </div>
             </div>
             
             {/* Gradient Overlay to fade bottom */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none" />
             
             {/* CTA Overlay */}
             <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center">
               <button 
                 onClick={onStart}
                 className="pointer-events-auto px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all flex items-center gap-2 group shadow-2xl"
               >
                 开始分析我的简历
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="relative px-4 py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
              <CreditCard className="w-4 h-4" />
              <span>简单透明的定价</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              选择适合你的<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">方案</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              免费功能足够日常使用，Pro 解锁全部高级能力
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-[#1A1A1A] border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-500/20 flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">免费版</h3>
              <p className="text-3xl font-bold text-white mb-6">¥0<span className="text-sm font-normal text-gray-400">/月</span></p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>简历诊断 3次/天</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>基础匹配分析</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>标准报告导出</span>
                </li>
              </ul>
              <button
                onClick={onStart}
                className="w-full py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all"
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
              className="relative p-8 rounded-3xl bg-gradient-to-br from-[#2DD4BF]/20 to-[#3B82F6]/20 border border-[#2DD4BF]/30 hover:scale-[1.02] transition-all"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] text-black text-xs font-bold">
                最受欢迎
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] flex items-center justify-center mb-6">
                <Crown className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pro 版</h3>
              <p className="text-3xl font-bold text-white mb-6">¥49<span className="text-sm font-normal text-gray-400">/月</span></p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#2DD4BF] flex-shrink-0 mt-0.5" />
                  <span>无限简历诊断</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#2DD4BF] flex-shrink-0 mt-0.5" />
                  <span>AI 一键改写简历</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#2DD4BF] flex-shrink-0 mt-0.5" />
                  <span>深度岗位匹配</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#2DD4BF] flex-shrink-0 mt-0.5" />
                  <span>模拟面试训练</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#2DD4BF] flex-shrink-0 mt-0.5" />
                  <span>薪资参考数据</span>
                </li>
              </ul>
              <button
                onClick={onStart}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] text-black font-bold hover:opacity-90 transition-all"
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
              className="p-8 rounded-3xl bg-[#1A1A1A] border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                <Bot className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">团队版</h3>
              <p className="text-3xl font-bold text-white mb-6">¥199<span className="text-sm font-normal text-gray-400">/月</span></p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>Pro 全部功能</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>无限团队成员</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>批量简历分析</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>API 接入支持</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>专属客服</span>
                </li>
              </ul>
              <button
                onClick={onStart}
                className="w-full py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all"
              >
                联系商务
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#0EA5E9] rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-400">TalentOS © 2026</span>
          </div>
          <p className="text-sm text-gray-600">
            Don't Apply. <span className="text-white font-medium">Upgrade.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
