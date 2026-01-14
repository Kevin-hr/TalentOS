import { motion } from "framer-motion";
import { FileSearch, MessageCircle, User, Zap } from "lucide-react";

import { FeatureCard } from "./FeatureCard";
import { analytics } from "../utils/conversionAnalytics";

interface RoleSelectorProps {
  onStart: () => void;
}

export function RoleSelector({ onStart }: RoleSelectorProps) {
  return (
    <div className="min-h-screen bg-[#0F172A] relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* OS Background Grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at center, black, transparent 80%)",
        }}
      />

      <div className="max-w-6xl w-full z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 tracking-tighter leading-tight pb-2 whitespace-nowrap">
            别找工作了，让工作来找你
          </h1>
        </motion.div>

        {/* Unified Card Container */}
        <div className="bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="p-6 md:p-10 min-h-[360px] flex flex-col justify-center relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 bg-[#34D399]/10 rounded-2xl border border-[#34D399]/20">
                  <User className="w-10 h-10 text-[#34D399]" />
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold text-[#34D399] tracking-[0.2em]">
                    CAREER HACKER
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    逆向 HR 规则，拿下 Offer
                  </h2>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    简历精修 · 模拟面试 · 薪资谈判。把概率变成确定性。
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { value: "35%", label: "平均涨薪", sub: "↑", delay: 0 },
                  { value: "72h", label: "首个面试", sub: "", delay: 0.1 },
                  { value: "+5", label: "周面试数", sub: "", delay: 0.2 },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + stat.delay }}
                    className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-4 md:p-6 text-center hover:border-[#34D399]/30 transition-colors group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[#34D399]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="flex items-baseline justify-center gap-1 mb-2">
                        <span className="text-3xl md:text-4xl font-black text-white tracking-tight">
                          {stat.value}
                        </span>
                        {stat.sub && (
                          <span className="text-lg font-bold text-[#34D399]">
                            {stat.sub}
                          </span>
                        )}
                      </div>
                      <div className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FeatureCard
                  icon={Zap}
                  title="开口，就是 Offer 面"
                  description="AI 模拟面试"
                  color="#34D399"
                />
                <FeatureCard
                  icon={FileSearch}
                  title="简历，秒过 HR"
                  description="简历一键精修"
                  color="#34D399"
                />
                <FeatureCard
                  icon={MessageCircle}
                  title="薪资，必超期望"
                  description="薪资谈判助手"
                  color="#34D399"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => {
                    analytics.track("free_trial_start", { userType: "candidate" });
                    onStart();
                  }}
                  className="flex-1 py-4 rounded-xl bg-[#34D399] hover:bg-[#10B981] text-[#061018] font-bold text-lg shadow-lg shadow-[#34D399]/20 hover:shadow-[#34D399]/40 hover:-translate-y-0.5 transition-all"
                >
                  立即开始
                </button>
                <button
                  onClick={() => {
                    analytics.track("case_study_view", { userType: "candidate" });
                    window.open("/success-cases", "_blank");
                  }}
                  className="flex-1 py-4 rounded-xl border border-white/10 text-white hover:bg-white/5 font-bold text-lg transition-all"
                >
                  查看成功案例
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
