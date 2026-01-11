import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { Check, Sparkles, Lock } from 'lucide-react'

interface UpgradeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger: 'optimize' | 'salary' | 'export'
}

export function UpgradeModal({ open, onOpenChange, trigger }: UpgradeModalProps) {
  const content = {
    optimize: {
      title: '解锁 AI 智能简历重写',
      desc: '获得由千万级数据训练的 AI 专家为您量身定制的简历优化版本，通过率提升 300%。',
      features: ['针对 JD 关键词深度优化', 'STAR 法则重构工作经历', '专业术语润色', '去除冗余信息']
    },
    salary: {
      title: '查看真实薪资评估',
      desc: '基于您的能力模型与市场大数据的精准匹配，揭示您的真实身价。',
      features: ['精准薪资范围预测', '同级别岗位薪资对比', '涨薪潜力评估', '谈判策略建议']
    },
    export: {
      title: '导出专业分析报告',
      desc: '获取 PDF 版本的深度分析报告，包含详细的改进建议和面试指南。',
      features: ['高清 PDF 格式', '无水印专业排版', '包含所有图表分析', '永久保存']
    }
  }[trigger]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white rounded-3xl border-none shadow-2xl">
        {/* Header Background */}
        <div className="bg-black text-white p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-600/40 to-purple-600/40 rounded-full blur-[60px] -mr-16 -mt-16"></div>
            <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
                <DialogTitle className="text-2xl font-bold tracking-tight">{content.title}</DialogTitle>
                <DialogDescription className="text-gray-400 mt-2 text-base">
                    {content.desc}
                </DialogDescription>
            </div>
        </div>

        {/* Features */}
        <div className="p-8 space-y-6">
            <div className="space-y-3">
                {content.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{feature}</span>
                    </div>
                ))}
            </div>

            <div className="pt-6 border-t border-gray-100">
                <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold text-gray-900">¥9.9</span>
                    <span className="text-sm text-gray-500 line-through">¥49.9</span>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full ml-2">限时特惠</span>
                </div>
                
                <Button className="w-full h-12 text-base bg-black hover:bg-gray-800 shadow-lg shadow-black/10 rounded-xl group" onClick={() => {}}>
                    <span className="mr-2">立即解锁</span>
                    <Lock className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </Button>
                <p className="text-center text-xs text-gray-400 mt-3">支持微信 / 支付宝支付 · 7天无理由退款</p>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
