import {
  Dialog,
  DialogContent,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Check, Crown, Star } from "lucide-react";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: "optimize" | "salary" | "export";
}

export function UpgradeModal({
  open,
  onOpenChange,
  trigger,
}: UpgradeModalProps) {
  const content = {
    optimize: {
      title: "解锁 AI 智能简历重写",
      desc: "获得由千万级数据训练的 AI 专家为您量身定制的简历优化版本，通过率提升 300%。",
    },
    salary: {
      title: "查看真实薪资评估",
      desc: "基于您的能力模型与市场大数据的精准匹配，揭示您的真实身价。",
    },
    export: {
      title: "导出专业分析报告",
      desc: "获取 PDF 版本的深度分析报告，包含详细的改进建议和面试指南。",
    },
  }[trigger];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-[#0F1115] text-white rounded-[2rem] border border-white/10 shadow-2xl">
        <div className="relative">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-purple-900/20 via-[#0F1115] to-[#0F1115] pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Crown className="w-3 h-3" /> TalentOS VIP
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-gray-400 mb-3">
                {content.title}
              </h2>
              <p className="text-gray-400 text-sm">
                {content.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Free Plan */}
              <div className="relative p-6 rounded-2xl bg-[#1A1D24] border border-white/5 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-1">
                    普通用户
                  </h3>
                  <div className="text-2xl font-bold text-gray-400">免费</div>
                </div>
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white mb-6">
                  正在使用
                </Button>
                <div className="space-y-3 flex-1">
                  {[
                    { label: "基础简历解析", included: true },
                    { label: "一键润色简历", value: "1次/天", included: true },
                    { label: "导入解析简历", value: "1次/天", included: true },
                    { label: "AI 模拟面试", value: "3题/次", included: true },
                    { label: "竞争力分析", included: false },
                    { label: "专属简历模板", included: false },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-sm"
                    >
                      <span
                        className={
                          item.included ? "text-gray-300" : "text-gray-600"
                        }
                      >
                        {item.label}
                      </span>
                      {item.included ? (
                        <span className="text-gray-400">
                          {item.value || <Check className="w-4 h-4" />}
                        </span>
                      ) : (
                        <span className="text-gray-700">×</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Plan */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-b from-[#2A2D36] to-[#1A1D24] border border-purple-500/30 flex flex-col transform md:-translate-y-4 shadow-xl shadow-purple-900/20">
                <div className="absolute -top-3 right-4 px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded text-[10px] font-bold text-black">
                  优惠 7.2折
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    60天卡
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">98</span>
                    <span className="text-sm text-gray-400">直豆</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-none mb-6">
                  立即购买
                </Button>
                <div className="space-y-3 flex-1">
                  {[
                    { label: "全套简历模板", included: true },
                    { label: "一键润色简历", value: "无限次", included: true },
                    { label: "导入解析简历", value: "无限次", included: true },
                    {
                      label: "AI 模拟面试",
                      value: "无限次",
                      included: true,
                      highlight: true,
                    },
                    {
                      label: "竞争力分析",
                      value: "不限次数",
                      included: true,
                      highlight: true,
                    },
                    { label: "专属简历模板", included: true, highlight: true },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-sm"
                    >
                      <span
                        className={
                          item.highlight ? "text-purple-200" : "text-gray-300"
                        }
                      >
                        {item.label}
                      </span>
                      <span
                        className={
                          item.highlight ? "text-purple-200" : "text-gray-400"
                        }
                      >
                        {item.value || (
                          <Check className="w-4 h-4 text-purple-400" />
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Plan */}
              <div className="relative p-6 rounded-2xl bg-[#1A1D24] border border-white/5 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-1">30天卡</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">68</span>
                    <span className="text-sm text-gray-400">直豆</span>
                  </div>
                </div>
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white mb-6">
                  立即购买
                </Button>
                <div className="space-y-3 flex-1">
                  {[
                    { label: "全套简历模板", included: true },
                    { label: "一键润色简历", value: "无限次", included: true },
                    { label: "导入解析简历", value: "无限次", included: true },
                    { label: "AI 模拟面试", value: "无限次", included: true },
                    { label: "竞争力分析", value: "不限次数", included: true },
                    { label: "专属简历模板", included: true },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-sm"
                    >
                      <span
                        className={
                          item.included ? "text-gray-300" : "text-gray-600"
                        }
                      >
                        {item.label}
                      </span>
                      {item.included ? (
                        <span className="text-gray-400">
                          {item.value || <Check className="w-4 h-4" />}
                        </span>
                      ) : (
                        <span className="text-gray-700">×</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mt-12 pt-8 border-t border-white/5">
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/50"></div>
                <span className="text-sm font-bold text-purple-200">
                  会员评价
                </span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/50"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    name: "周女士",
                    role: "新媒体运营 · 应届生",
                    text: "刚毕业的时候简历一片空白，多亏参考了丰富的简历模板库。获得了比通过过程项目经历整理清晰得梳理下来，面试官都夸我的简历非常专业。",
                  },
                  {
                    name: "李先生",
                    role: "后端开发 · 7年工作经验",
                    text: "我的职业技能非常多元，考虑在不同企业在发力要求上的不同，每次找工作我都会准备多份简历。开通会员后不仅能准备多份，还可以将一份简历保存多个版本方便查找。",
                  },
                  {
                    name: "舒女士",
                    role: "影视传媒 · 2年工作经验",
                    text: "AI智能简历润色工具非常实用，简单写一句就能帮我扩展成几条关键句。写的修饰了逻辑清晰精准内容丰富，而且还补充了各种数据指标辅助说明，让简历更能凸显业绩成就，非常实用！",
                  },
                ].map((user, i) => (
                  <div
                    key={i}
                    className="bg-[#1A1D24] p-4 rounded-xl border border-white/5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold">
                        {user.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          {user.name}
                        </div>
                        <div className="text-[10px] text-gray-500">
                          {user.role}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      "{user.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
