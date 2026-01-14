import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";

interface SkillRadarProps {
  data: Record<string, number>;
}

export function SkillRadar({ data }: SkillRadarProps) {
  // Transform dictionary to array format for Recharts
  const chartData = Object.entries(data).map(([key, value]) => ({
    subject: key,
    A: value,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Capability"
            dataKey="A"
            stroke="#2563eb"
            strokeWidth={3}
            fill="#3b82f6"
            fillOpacity={0.2}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            itemStyle={{ color: "#2563eb", fontWeight: 600 }}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Before/After Overlay */}
      <div className="absolute bottom-0 right-0 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
          Skill Gap
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
          <span className="w-2 h-2 rounded-full bg-red-400"></span>
          <span>当前</span>
          <span className="text-gray-300">vs</span>
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="text-blue-600">目标</span>
        </div>
      </div>
    </div>
  );
}
