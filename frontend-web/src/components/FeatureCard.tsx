import React from "react";

interface FeatureCardProps {
  icon: React.ElementType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  color: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
}: FeatureCardProps) {
  return (
    <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex flex-col gap-3 group hover:bg-white/10 transition-colors">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-5 h-5" style={{ color: color }} />
      </div>
      <div>
        <div className="font-bold text-white mb-1">{title}</div>
        <div className="text-xs text-gray-400">{description}</div>
      </div>
    </div>
  );
}
