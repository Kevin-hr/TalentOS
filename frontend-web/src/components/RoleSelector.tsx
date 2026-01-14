import { motion } from "framer-motion";
import { ArrowRight, Bot, LayoutDashboard, Lock, Sparkles } from "lucide-react";

interface RoleSelectorProps {
  onStart: () => void;
}

export function RoleSelector({ onStart }: RoleSelectorProps) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#34D399]/30 font-sans overflow-hidden flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0EA5E9] rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Career Hacker</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">核心功能</a>
          <a href="#" className="hover:text-white transition-colors">方法论</a>
          <a href="#" className="hover:text-white transition-colors">定价</a>
        </div>

        <button className="px-6 py-2 rounded-full bg-[#1A1A1A] text-white text-sm font-medium hover:bg-[#2A2A2A] transition-colors border border-white/10">
          登录
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 mt-12 md:mt-20">
          {/* Version Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/50 border border-purple-800/50 text-purple-300 text-xs font-medium mb-4"
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
            揭秘 HR 筛选规则
            <br />
            开启 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6]">职场黑客</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            不要盲目投递。用面试官视角审视你的简历，
            <br className="hidden md:block" />
            精准匹配职位 JD，让面试邀约率提升 300%。
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
              className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all flex items-center gap-2 group min-w-[200px] justify-center"
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

          {/* Dashboard Preview (Mockup) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20 relative w-full max-w-5xl mx-auto rounded-t-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0F0F0F]"
          >
             {/* Window Controls */}
             <div className="h-8 bg-[#1A1A1A] border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                <div className="mx-auto text-[10px] font-mono text-gray-600">resume-sniper.ai/dashboard</div>
             </div>

             {/* Dashboard Content Mock */}
             <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80 pointer-events-none select-none">
                <div className="md:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Analysis Report</h3>
                      <p className="text-sm text-gray-500">Product Manager - ByteDance</p>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded-lg border border-green-500/30">
                      Match Score: 85%
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-24 bg-white/5 rounded-xl border border-white/5 p-4">
                       <div className="flex items-center gap-2 text-green-400 text-sm font-bold mb-2">
                          <Sparkles className="w-4 h-4" />
                          Key Qualifications Met
                       </div>
                       <div className="h-2 w-3/4 bg-white/10 rounded mb-2" />
                       <div className="h-2 w-1/2 bg-white/10 rounded" />
                    </div>
                    <div className="h-24 bg-white/5 rounded-xl border border-white/5 p-4">
                       <div className="flex items-center gap-2 text-red-400 text-sm font-bold mb-2">
                          <Lock className="w-4 h-4" />
                          Fatal Flaws Detected
                       </div>
                       <div className="h-2 w-3/4 bg-white/10 rounded mb-2" />
                       <div className="h-2 w-2/3 bg-white/10 rounded" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">AI Insights</div>
                  <div className="h-20 bg-blue-500/10 border border-blue-500/20 rounded-xl" />
                  <div className="h-20 bg-purple-500/10 border border-purple-500/20 rounded-xl" />
                  <div className="h-32 bg-white/5 border border-white/5 rounded-xl" />
                </div>
             </div>
             
             {/* Gradient Overlay to fade bottom */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black pointer-events-none" />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
