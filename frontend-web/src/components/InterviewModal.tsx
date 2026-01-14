import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Mic, Volume2 } from "lucide-react";
import { useState } from "react";

interface InterviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type WaveformBar = {
  heightPercent: number;
  animationDurationSeconds: number;
};

const WAVEFORM_BAR_COUNT = 20;

function createWaveformBars(count: number): WaveformBar[] {
  return Array.from({ length: count }, () => ({
    heightPercent: Math.round(Math.random() * 100),
    animationDurationSeconds: 0.2 + Math.random() * 0.5,
  }));
}

function InterviewModalContent() {
  const [step, setStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [waveformBars, setWaveformBars] = useState<WaveformBar[]>([]);

  // Mock conversation
  const questions = [
    "请简单介绍一下你自己，以及为什么想申请这个 Java 架构师岗位？",
    "你提到的项目中，如何解决缓存穿透的问题？",
    "如果系统 QPS 突然翻倍，你的第一反应是什么？",
  ];

  return (
    <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-black text-white rounded-3xl border-none shadow-2xl">
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-gray-900 to-black">
        <div>
          <DialogTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            AI 面试模拟器 (Alpha)
          </DialogTitle>
          <DialogDescription className="text-gray-400 mt-1 text-xs">
            正在模拟：Google L5 级别面试官 · 压力面模式
          </DialogDescription>
        </div>
        <div className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono">
          00:14:23
        </div>
      </div>

      <div className="h-[400px] flex flex-col relative">
        <div className="flex-1 flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHJibGZpODV6eXJ6eXJ6eXJ6eXJ6eXJ6eXJ6eXJ6eXJ6eXJ6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L1R1TVThqceK3F8vPA/giphy.gif')] opacity-10 bg-cover bg-center"></div>
          <div className="z-10 flex flex-col items-center gap-6 w-full max-w-md px-6">
            <div className="w-full bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl rounded-tl-none p-4 shadow-xl transform transition-all duration-500">
              <div className="flex items-center gap-2 mb-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Volume2 className="w-3 h-3" /> AI Interviewer
              </div>
              <p className="text-lg font-medium leading-relaxed">
                "{questions[step % questions.length]}"
              </p>
            </div>

            {isRecording && (
              <div className="flex gap-1 h-8 items-center justify-center w-full">
                {waveformBars.map((bar, i) => (
                  <div
                    key={i}
                    className="w-1 bg-green-500 rounded-full animate-pulse"
                    style={{
                      height: `${bar.heightPercent}%`,
                      animationDuration: `${bar.animationDurationSeconds}s`,
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-gray-900 border-t border-white/10 flex items-center justify-center gap-8">
          <Button
            variant="ghost"
            className="rounded-full w-12 h-12 hover:bg-white/10 text-gray-400"
          >
            <Volume2 className="w-5 h-5" />
          </Button>

          <button
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording ? "bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)] scale-110" : "bg-white text-black hover:scale-105"}`}
            onClick={() => {
              if (isRecording) {
                setIsRecording(false);
                setWaveformBars([]);
                setTimeout(() => setStep((s) => s + 1), 1000);
                return;
              }
              setWaveformBars(createWaveformBars(WAVEFORM_BAR_COUNT));
              setIsRecording(true);
            }}
          >
            {isRecording ? (
              <div className="w-8 h-8 bg-white rounded-lg" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>

          <Button
            variant="ghost"
            className="rounded-full w-12 h-12 hover:bg-white/10 text-gray-400"
          >
            <span className="text-xs font-bold">SKIP</span>
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

export function InterviewModal({ open, onOpenChange }: InterviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <InterviewModalContent key={open ? "open" : "closed"} />
    </Dialog>
  );
}
