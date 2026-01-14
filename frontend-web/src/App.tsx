import { useState, type ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ChevronRight,
  FileText,
  RefreshCw,
} from "lucide-react";
import LinearPreview from "@/components/LinearPreview";
import { useAnalyzeStream } from "@/hooks/useAnalyzeStream";
import ThumbnailPreview from "@/components/ThumbnailPreview";
import { RoleSelector } from "@/components/RoleSelector";
import { SmartSearch } from "@/components/CandidateSearch";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { SkillRadar } from "@/components/SkillRadar";

import { SalaryAnalysis } from "@/components/SalaryAnalysis";
import { UpgradeModal } from "@/components/UpgradeModal";
import { InterviewModal } from "@/components/InterviewModal";
import { Zap, FileEdit, Send } from "lucide-react";

interface AnalysisResult {
  report: string;
  score?: number;
  model?: string;
  tokens_used?: number;
  latency_ms?: number;
}

type MarkdownCodeProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
};

const DEMO_REPORT = `
# 简历诊断报告（示例）

## 结论摘要
- 你能过筛，但会卡在「职责堆砌、缺少结果」这类问题
- 先补 3 条可量化成果，再统一用 STAR 结构改写

## 关键问题（面试官视角）
1. 亮点不够聚焦：同一段经历同时写技术栈、流程、工具，缺少一句“你带来了什么结果”
2. 关键指标缺失：没有可验证的数据（QPS、成本、转化率、延迟、故障率等）
3. 项目表达偏“做了什么”，不回答“为什么是你”

## 可直接复制的改法
- 每条经历固定 3 行：背景/动作/结果（数字化）
- 每段至少 1 个指标：性能、稳定性、成本、效率四选一

\`\`\`json
{
  "radar": {
    "dimensions": [
      { "name": "硬技能", "value": 78 },
      { "name": "业务理解", "value": 64 },
      { "name": "项目影响", "value": 58 },
      { "name": "表达结构", "value": 52 },
      { "name": "岗位匹配", "value": 71 }
    ]
  }
}
\`\`\`

## 下一步
- 把你最强的 1 个项目改成“结果导向版本”，再扩展到全简历
`;

function App() {
  const [previewMode] = useState<"none" | "linear" | "thumbs">(() => {
    const params = new URLSearchParams(window.location.search);
    const preview = params.get("preview");
    if (preview === "linear") return "linear";
    if (preview === "thumbs") return "thumbs";
    return "none";
  });

  const [started, setStarted] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("start") === "1" || params.get("demo") === "1";
  });

  const [file, setFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState("");
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [jdInputMode, setJdInputMode] = useState<"file" | "text">("file");
  const [persona, setPersona] = useState("strict");
  const [result, setResult] = useState<AnalysisResult | null>(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("demo") !== "1") return null;
    return {
      report: DEMO_REPORT,
      score: 86,
    };
  });
  const [validationError, setValidationError] = useState("");
  const [activeTab, setActiveTab] = useState<"analyze" | "search">(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") === "search" ? "search" : "analyze";
  });

  // Pro Features State
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("upgrade") === "1";
  });
  const [upgradeTrigger, setUpgradeTrigger] = useState<
    "optimize" | "salary" | "export"
  >("optimize");
  const [interviewModalOpen, setInterviewModalOpen] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("interview") === "1";
  });

  const { streamedContent, isStreaming, error, analyzeStream, reset } =
    useAnalyzeStream();

  const handleRetry = () => {
    setValidationError("");
    reset();
  };

  const handleProFeature = (trigger: "optimize" | "salary" | "export") => {
    setUpgradeTrigger(trigger);
    setUpgradeModalOpen(true);
  };

  const handleBackHome = () => {
    setStarted(false);
    setFile(null);
    setJdText("");
    setJdFile(null);
    setJdInputMode("file");
    setPersona("strict");
    setResult(null);
    setValidationError("");
    setActiveTab("analyze");
    reset();
  };

  if (previewMode === "linear") {
    return <LinearPreview />;
  }
  if (previewMode === "thumbs") {
    return <ThumbnailPreview />;
  }

  if (!started) {
    return <RoleSelector onStart={() => setStarted(true)} />;
  }

  // Mock Data for Testing
  const MOCK_RESUME_TEXT = `
  Name: 张三
  Role: Senior Java Engineer
  Experience: 5 years at Alibaba
  Skills: Java, Spring Boot, MySQL, Redis, Kafka
  `;
  const MOCK_JD_TEXT = `
  Position: Java Architect
  Requirements: 
  - 5+ years Java experience
  - Deep understanding of JVM, Spring Cloud
  - Experience with high concurrency systems
  `;

  // 3. Candidate Application Layer (Existing Logic)
  const handleAnalyze = async () => {
    // DEV MODE: Auto-fill if empty
    let fileToUpload = file;
    let textToSend = jdText;

    if (!file && !fileToUpload) {
      // Create a mock file for testing
      const blob = new Blob([MOCK_RESUME_TEXT], { type: "text/plain" });
      fileToUpload = new File([blob], "mock_resume.txt", {
        type: "text/plain",
      });
      setFile(fileToUpload);
    }

    if (!jdText && !jdFile && !textToSend) {
      textToSend = MOCK_JD_TEXT;
      setJdText(textToSend);
    }

    if (!fileToUpload) return; // Should not happen with mock

    setValidationError("");
    const formData = new FormData();
    formData.append("resume_file", fileToUpload);
    if (jdFile) {
      formData.append("jd_file", jdFile);
    } else {
      formData.append("jd_text", textToSend);
    }
    formData.append("persona", persona);

    setResult(null);

    await analyzeStream(formData);
  };

  const displayReport = streamedContent || result?.report;
  const showResult = !!displayReport || isStreaming;

  // Extract Skill Radar JSON from report
  const extractRadarData = (report: string) => {
    try {
      const match = report.match(
        /```json\s*(\{[\s\S]*?"radar"[\s\S]*?\})\s*```/,
      );
      if (match && match[1]) {
        const json = JSON.parse(match[1]);
        return json.radar || null;
      }
    } catch {
      return null;
    }
    return null;
  };

  const radarData = displayReport ? extractRadarData(displayReport) : null;

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-black/10">
      {/* Background Mesh Gradient (Subtle) */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 100% 0%, rgba(0, 122, 255, 0.05) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto p-6 lg:p-10 space-y-8">
        {/* Header - Minimalist & Glassy */}
        <header className="flex items-center justify-between py-4 px-6 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm sticky top-4 z-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-lg shadow-black/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 stroke-current stroke-2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight leading-none">
                TalentOS
              </h1>
              <p className="text-[10px] font-semibold text-gray-500 tracking-widest uppercase mt-0.5">
                专业版
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-100/50 p-1 rounded-full flex items-center">
              <button
                onClick={() => setActiveTab("analyze")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === "analyze" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
              >
                诊断
              </button>
              <button
                onClick={() => setActiveTab("search")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === "search" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
              >
                配岗
              </button>
            </div>

            <div className="h-6 w-px bg-gray-200 mx-2" />

            <Button
              variant="ghost"
              onClick={handleBackHome}
              className="group flex items-center gap-2 hover:bg-transparent"
            >
              <div className="text-right hidden sm:block">
                <div className="text-xs font-medium text-gray-500 group-hover:text-gray-800 transition-colors">
                  返回
                </div>
                <div className="text-sm font-bold">首页</div>
              </div>
              <div className="w-10 h-10 bg-gray-100 group-hover:bg-gray-200 rounded-full flex items-center justify-center transition-all">
                <RefreshCw className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
              </div>
            </Button>
          </div>
        </header>

        {activeTab === "search" ? (
          <div className="max-w-5xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <SmartSearch />
          </div>
        ) : (
          <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <UpgradeModal
              open={upgradeModalOpen}
              onOpenChange={setUpgradeModalOpen}
              trigger={upgradeTrigger}
            />
            <InterviewModal
              open={interviewModalOpen}
              onOpenChange={setInterviewModalOpen}
            />

            {/* Left Panel: Control Center */}
            <div className="lg:col-span-4 space-y-6 sticky top-28">
              <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/50 shadow-xl shadow-black/5 p-6 space-y-8">
                {/* Section 1: Resume */}
                <section className="space-y-4">
                  <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                    01 / 简历来源
                  </h2>
                  <FileUpload
                    onFileSelect={setFile}
                    selectedFile={file}
                    onClear={() => {
                      setFile(null);
                      setResult(null);
                      reset();
                    }}
                  />
                </section>

                {/* Section 2: Target */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                      02 / 目标职位
                    </h2>
                    <button
                      onClick={() =>
                        setJdInputMode((prev) =>
                          prev === "file" ? "text" : "file",
                        )
                      }
                      className="text-[10px] font-bold bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-md text-gray-600 transition-colors"
                    >
                      {jdInputMode === "file" ? "切换输入" : "切换上传"}
                    </button>
                  </div>

                  {jdInputMode === "file" ? (
                    <FileUpload
                      onFileSelect={(file) => {
                        setJdFile(file);
                        setJdText("");
                        setValidationError("");
                      }}
                      selectedFile={jdFile}
                      onClear={() => setJdFile(null)}
                      label="将 JD 文件拖放到此处"
                    />
                  ) : (
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <textarea
                        className="w-full h-40 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 resize-none transition-all text-sm leading-relaxed"
                        placeholder="在此粘贴职位描述..."
                        value={jdText}
                        onChange={(e) => {
                          setJdText(e.target.value);
                          setJdFile(null);
                          setValidationError("");
                        }}
                      />
                    </div>
                  )}
                </section>

                {/* Section 3: Persona */}
                <section className="space-y-4">
                  <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                    03 / 分析模式
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        id: "strict",
                        label: "毒舌模式",
                        desc: "严厉找茬 · 模拟真实面试 · 守门员视角",
                        icon: "👔",
                      },
                      {
                        id: "coach",
                        label: "教练模式",
                        desc: "温和建议 · 挖掘亮点 · 战略指导",
                        icon: "🌱",
                      },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPersona(p.id)}
                        className={`
                          relative overflow-hidden group px-5 py-4 rounded-2xl text-left transition-all duration-300 border
                          ${
                            persona === p.id
                              ? "bg-black text-white border-black shadow-lg shadow-black/20 scale-[1.02]"
                              : "bg-white text-gray-600 border-gray-100 hover:border-gray-300 hover:bg-gray-50"
                          }
                        `}
                      >
                        <div className="flex items-center gap-4 relative z-10">
                          <span className="text-2xl">{p.icon}</span>
                          <div>
                            <div className="font-bold text-sm">{p.label}</div>
                            <div
                              className={`text-xs mt-0.5 ${persona === p.id ? "text-gray-400" : "text-gray-400"}`}
                            >
                              {p.desc}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                <Button
                  size="lg"
                  className="w-full h-16 text-lg rounded-2xl bg-black hover:bg-gray-800 shadow-xl shadow-black/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isStreaming}
                  onClick={handleAnalyze}
                >
                  {isStreaming ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="tracking-wide font-medium">
                        正在深度分析...
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="tracking-wide font-bold">
                        {!file && !jdText && !jdFile
                          ? "试一试 (自动填充)"
                          : "开始分析"}
                      </span>
                      <ChevronRight className="w-5 h-5 opacity-60" />
                    </div>
                  )}
                </Button>

                {(validationError || error) && (
                  <ErrorDisplay
                    message={validationError || error || ""}
                    onRetry={handleRetry}
                  />
                )}
              </div>
            </div>

            {/* Right Panel: Intelligence Hub */}
            <div className="lg:col-span-8 space-y-6">
              {showResult ? (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6">
                  {/* 1. The HUD (Heads-Up Display) */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[340px]">
                    {/* Score Card - 4 cols */}
                    <Card className="col-span-12 md:col-span-4 p-8 bg-black text-white border-none shadow-2xl shadow-black/20 relative overflow-hidden group h-full flex flex-col justify-between rounded-[2rem]">
                      {/* Dynamic Background */}
                      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000"></div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                          <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
                            匹配指数
                          </span>
                          <div
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              (result?.score || 0) >= 80
                                ? "bg-green-500/20 text-green-400"
                                : (result?.score || 0) >= 60
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {(result?.score || 0) >= 80
                              ? "极佳"
                              : (result?.score || 0) >= 60
                                ? "潜力"
                                : "不匹配"}
                          </div>
                        </div>

                        <div className="flex items-baseline gap-1">
                          <span className="text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                            {result?.score || 0}
                          </span>
                          <span className="text-2xl text-gray-500 font-light">
                            /100
                          </span>
                        </div>

                        {/* Before/After Tagline */}
                        <div className="mt-4 px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
                          <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                            Impact Prediction
                          </div>
                          <div className="text-sm font-medium text-white flex items-center gap-2">
                            <span className="opacity-60 line-through">
                              面试通过率 10%
                            </span>
                            <span className="text-green-400">→ 85%</span>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                            建议投递岗位
                          </span>
                          <span className="text-xs font-medium text-gray-300 mt-1">
                            {(result?.score || 0) >= 80
                              ? "高级技术专家 / 架构师"
                              : (result?.score || 0) >= 60
                                ? "资深开发工程师"
                                : "初级开发 / 助理"}
                          </span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                            耗时
                          </span>
                          <span className="text-xs font-medium text-gray-300 mt-1">
                            {result?.latency_ms
                              ? `${(result?.latency_ms / 1000).toFixed(1)}s`
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </Card>

                    {/* Radar Card - 4 cols */}
                    <Card className="col-span-12 md:col-span-4 p-6 bg-white border-white/60 shadow-xl shadow-black/5 flex flex-col h-full rounded-[2rem]">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                          能力矩阵
                        </h3>
                      </div>
                      <div className="flex-1 w-full min-h-0 flex items-center justify-center">
                        {radarData ? (
                          <SkillRadar data={radarData} />
                        ) : (
                          <div className="text-center text-gray-400 text-xs">
                            正在解析维度...
                          </div>
                        )}
                      </div>
                    </Card>

                    {/* Salary Card - 4 cols */}
                    <div className="col-span-12 md:col-span-4 h-full">
                      <SalaryAnalysis
                        onUnlock={() => handleProFeature("salary")}
                      />
                    </div>
                  </div>

                  {/* 2. The Report (Paper Look) */}
                  <div className="relative">
                    {/* Paper Shadow Effect */}
                    <div className="absolute top-4 left-4 right-4 bottom-0 bg-gray-200 rounded-[2.5rem] -z-10 blur-sm"></div>

                    <Card className="p-10 md:p-14 min-h-[800px] bg-white rounded-[2rem] border-none shadow-2xl shadow-black/5 relative overflow-hidden">
                      {isStreaming && !displayReport && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-20 gap-6">
                          <div className="w-16 h-16 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
                          <div className="text-center space-y-2">
                            <p className="text-lg font-bold text-gray-900">
                              正在生成分析报告...
                            </p>
                            <p className="text-sm text-gray-500">
                              正在交叉验证 50+ 个关键数据点
                            </p>
                          </div>
                        </div>
                      )}

                      <div
                        className="prose prose-lg max-w-none 
                            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-black
                            prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:pb-4 prose-h2:border-gray-100
                            prose-p:text-gray-600 prose-p:leading-relaxed
                            prose-li:text-gray-600 prose-li:marker:text-black
                            prose-strong:text-gray-900 prose-strong:font-bold
                            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:text-gray-800 prose-code:before:content-none prose-code:after:content-none
                        "
                      >
                        <ReactMarkdown
                          components={{
                            code({
                              inline,
                              className,
                              children,
                              ...props
                            }: MarkdownCodeProps) {
                              const match = /language-(\w+)/.exec(
                                className || "",
                              );
                              if (
                                !inline &&
                                match &&
                                match[1] === "json" &&
                                String(children).includes('"radar"')
                              ) {
                                return null;
                              }
                              return !inline ? (
                                <pre className="bg-gray-50 rounded-xl p-4 overflow-x-auto text-sm border border-gray-100">
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                </pre>
                              ) : (
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {displayReport}
                        </ReactMarkdown>
                        {isStreaming && (
                          <span className="inline-block w-2 h-5 bg-black ml-1 animate-pulse align-middle"></span>
                        )}
                      </div>

                      {/* Actions Footer */}
                      <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-xs text-gray-400 font-medium">
                          由 TalentOS AI 引擎生成
                        </div>

                        {/* V4.0 Action Buttons */}
                        <div className="flex flex-wrap justify-end gap-4">
                          {/* 1. Practice */}
                          <div className="relative group">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              这几个坑，面试官肯定会问
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-black rotate-45"></div>
                            </div>
                            <Button
                              variant="outline"
                              onClick={() => setInterviewModalOpen(true)}
                              className="rounded-xl border-red-100 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 hover:border-red-200 h-11 px-5"
                            >
                              <Zap className="w-4 h-4 mr-2" />
                              练一练
                            </Button>
                          </div>

                          {/* 2. Rewrite */}
                          <div className="relative group">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              这句描述太弱了，点我一键升华
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-black rotate-45"></div>
                            </div>
                            <Button
                              variant="outline"
                              onClick={() => handleProFeature("optimize")}
                              className="rounded-xl border-yellow-100 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700 hover:border-yellow-200 h-11 px-5"
                            >
                              <FileEdit className="w-4 h-4 mr-2" />
                              改一改
                            </Button>
                          </div>

                          {/* 3. Apply */}
                          <div className="relative group">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              这有 5 个缺人的老板，刚好喜欢你这款
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-black rotate-45"></div>
                            </div>
                            <Button
                              onClick={() => handleProFeature("export")}
                              className="rounded-xl bg-[#34D399] text-[#061018] hover:bg-[#10B981] shadow-lg shadow-green-500/20 h-11 px-6 font-bold"
                            >
                              <Send className="w-4 h-4 mr-2" />
                              投一投
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[600px] rounded-[2.5rem] bg-white/40 border-2 border-dashed border-gray-300/50 flex flex-col items-center justify-center text-gray-400 gap-6 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="relative z-10 flex flex-col items-center gap-6 p-10 transition-transform duration-500 group-hover:scale-105">
                    <div className="w-24 h-24 rounded-3xl bg-white shadow-xl shadow-black/5 flex items-center justify-center">
                      <FileText className="w-10 h-10 text-gray-300 group-hover:text-black transition-colors duration-300" />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        准备就绪
                      </h3>
                      <p className="text-sm text-gray-500 max-w-xs mx-auto">
                        上传简历和职位描述，解锁深度洞察。
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
