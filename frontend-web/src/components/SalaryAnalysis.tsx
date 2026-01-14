import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { Lock } from "lucide-react";

interface SalaryAnalysisProps {
  onUnlock: () => void;
}

export function SalaryAnalysis({ onUnlock }: SalaryAnalysisProps) {
  // Mock Data: Salary Distribution
  const data = [
    { name: "P5", salary: 25, label: "初级" },
    { name: "P6", salary: 45, label: "资深" },
    { name: "You", salary: 38, label: "你的身价" },
    { name: "P7", salary: 80, label: "专家" },
    { name: "P8", salary: 120, label: "高级专家" },
  ];

  return (
    <Card
      className="p-6 bg-white border-white/60 shadow-xl shadow-black/5 flex flex-col h-[320px] relative overflow-hidden group cursor-pointer"
      onClick={onUnlock}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          身价评估 (年薪/万)
        </h3>
        <div className="bg-black/5 px-2 py-1 rounded text-[10px] font-bold text-gray-500">
          PRO FEATURE
        </div>
      </div>

      <div className="flex-1 w-full min-h-0 relative">
        {/* Blur Overlay */}
        <div className="absolute inset-0 z-10 backdrop-blur-[6px] bg-white/30 flex flex-col items-center justify-center transition-all group-hover:backdrop-blur-[4px]">
          <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg mb-3 transform group-hover:scale-110 transition-transform">
            <Lock className="w-5 h-5" />
          </div>
          <p className="text-sm font-bold text-gray-900">
            解锁查看你的真实身价
          </p>
          <p className="text-xs text-gray-500 mt-1">包含同岗对比与涨薪建议</p>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3f4f6"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <Tooltip cursor={{ fill: "transparent" }} />
            <Bar dataKey="salary" radius={[4, 4, 0, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.name === "You" ? "#000000" : "#e5e7eb"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
