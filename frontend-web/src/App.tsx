import { useState, type ComponentPropsWithoutRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ChevronRight,
  FileText,
  RefreshCw,
  Upload,
  Target,
  Zap,
  Sparkles,
  Briefcase,
  MapPin,
  DollarSign,
  ArrowRight,
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
import { Zap as ZapIcon, FileEdit, Send } from "lucide-react";

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

// 今日推荐岗位数据
const RECOMMENDED_JOBS = [
  {
    id: 1,
    company: "字节跳动",
    title: "高级后端工程师",
    location: "北京·远程",
    salary: "35-60K",
    match: 92,
    tags: ["Go", "微服务", "Kubernetes"],
  },
  {
    id: 2,
    company: "阿里云",
    title: "资深Java架构师",
    location: "杭州",
    salary: "40-70K",
    match: 87,
    tags: ["Java", "云原生", "高并发"],
  },
  {
    id: 3,
    company: "腾讯音乐",
    title: "数据平台工程师",
    location: "深圳",
    salary: "30-55K",
    match: 84,
    tags: ["Flink", "Spark", "数据湖"],
  },
];

const DEMO_REPORT = `
# 简历诊断报告（示例）

## 结论摘要
- 你能过筛，但会卡在「职责堆砌、缺少结果」这类问题
- 先补 3 条可量化成果，再统一用 STAR 结构改写

## 关键问题（面试官视角）
1. 亮点不够聚焦：同一段经历同时写技术栈、流程、工具，缺少一句"你带来了什么结果"
2. 关键指标缺失：没有可验证的数据（QPS、成本、转化率、延迟、故障率等）
3. 项目表达偏"做了什么"，不回答"为什么是你"

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
- 把你最强的 1 个项目改成"结果导向版本"，再扩展到全简历
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

  // ========== 移动端首页视图 ==========
  const MobileHomeView = () => {
    const [showJdInput, setShowJdInput] = useState(false);

    return (
      <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-black/10 pb-28">
        {/* Background Gradient */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
        </div>

        <div className="relative z-10 px-5 pt-6 space-y-6">
          {/* Header: Logo + Slogan */}
          <header className="flex flex-col items-center text-center space-y-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">TalentOS</h1>
              <p className="text-sm text-gray-500 mt-1">别海投，用算法重构职业路径</p>
            </div>
          </header>

          {/* 核心功能区 */}
          <div className="space-y-4">
            {/* 简历上传 - 最大按钮 */}
            <div className="bg-white rounded-3xl shadow-lg shadow-black/5 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  上传简历
                </h2>
                <span className="text-xs text-gray-400">PDF/DOCX</span>
              </div>
              <FileUpload
                onFileSelect={(f) => {
                  setFile(f);
                  setResult(null);
                }}
                selectedFile={file}
                onClear={() => {
                  setFile(null);
                  setResult(null);
                }}
              />
            </div>

            {/* 目标职位 - 可折叠 */}
            <div className="bg-white rounded-3xl shadow-lg shadow-black/5 overflow-hidden">
              <button
                onClick={() => setShowJdInput(!showJdInput)}
                className="w-full p-5 flex items-center justify-between text-left"
              >
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  目标职位
                  {!showJdInput && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full ml-2">可选</span>}
                </h2>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showJdInput ? "rotate-90" : ""}`} />
              </button>

              {showJdInput && (
                <div className="px-5 pb-5 space-y-4 border-t border-gray-50 pt-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setJdInputMode("text")}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                        jdInputMode === "text" ? "bg-black text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      粘贴JD
                    </button>
                    <button
                      onClick={() => setJdInputMode("file")}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                        jdInputMode === "file" ? "bg-black text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      上传文件
                    </button>
                  </div>

                  {jdInputMode === "file" ? (
                    <FileUpload
                      onFileSelect={(f) => {
                        setJdFile(f);
                        setJdText("");
                      }}
                      selectedFile={jdFile}
                      onClear={() => setJdFile(null)}
                      label="拖放JD文件到此处"
                    />
                  ) : (
                    <textarea
                      className="w-full h-28 p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-black/20 resize-none text-sm"
                      placeholder="粘贴职位描述..."
                      value={jdText}
                      onChange={(e) => {
                        setJdText(e.target.value);
                        setJdFile(null);
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 今日推荐岗位 */}
          {!showResult && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  今日推荐
                </h2>
                <button className="text-sm text-gray-500 flex items-center gap-1">
                  更多 <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {RECOMMENDED_JOBS.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl p-4 shadow-md shadow-black/5 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-bold text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-500">{job.company}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-600">{job.match}% 匹配</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{job.salary}</span>
                    </div>
                    <div className="flex gap-2">
                      {job.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 吸底诊断按钮 */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#F5F5F7] via-[#F5F5F7] to-transparent">
          <Button
            size="lg"
            className="w-full h-14 text-lg rounded-2xl bg-black hover:bg-gray-800 shadow-xl shadow-black/20"
            disabled={isStreaming || !file}
            onClick={handleAnalyze}
          >
            {isStreaming ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>正在分析...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span className="font-bold">{!file ? "请先上传简历" : "开始诊断"}</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            )}
          </Button>
        </div>
      </div>
    );
  };

  // ========== 诊断结果视图 ==========
  const ResultView = () => (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-black/10">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto p-4 md:p-6 space-y-6 pb-28">
        {/* 简化 Header */}
        <header className="flex items-center justify-between py-3">
          <button
            onClick={handleBackHome}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <ArrowRight className="w-5 h-5 rotate-180" />
            </div>
            <span className="hidden sm:inline font-medium">返回</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-current stroke-2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-bold hidden sm:block">TalentOS</span>
          </div>
        </header>

        {/* HUD: 核心指标卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 匹配分数 */}
          <Card className="p-6 bg-black text-white border-none shadow-xl rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">匹配指数</span>
              <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                (result?.score || 0) >= 80 ? "bg-green-500/30 text-green-400" :
                (result?.score || 0) >= 60 ? "bg-yellow-500/30 text-yellow-400" : "bg-red-500/30 text-red-400"
              }`}>
                {(result?.score || 0) >= 80 ? "极佳" : (result?.score || 0) >= 60 ? "潜力" : "待提升"}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-bold tracking-tighter">{result?.score || 0}</span>
              <span className="text-xl text-gray-500">/100</span>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
              <span>{(result?.score || 0) >= 80 ? "高级架构师" : (result?.score || 0) >= 60 ? "资深工程师" : "初级/助理"}</span>
              <span>|</span>
              <span>{result?.latency_ms ? `${(result?.latency_ms / 1000).toFixed(1)}s` : "-"}</span>
            </div>
          </Card>

          {/* 能力雷达 */}
          <Card className="p-5 bg-white shadow-xl rounded-3xl">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              能力矩阵
            </h3>
            <div className="h-32 flex items-center justify-center">
              {radarData ? <SkillRadar data={radarData} /> : <span className="text-gray-400 text-sm">解析中...</span>}
            </div>
          </Card>

          {/* 薪资分析 */}
          <div className="h-full">
            <SalaryAnalysis onUnlock={() => handleProFeature("salary")} />
          </div>
        </div>

        {/* 诊断报告 */}
        <Card className="p-6 md:p-8 bg-white shadow-xl rounded-3xl">
          {isStreaming && !displayReport && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-20 gap-4 rounded-3xl">
              <div className="w-12 h-12 border-3 border-gray-100 border-t-black rounded-full animate-spin" />
              <p className="text-sm text-gray-500">正在生成分析报告...</p>
            </div>
          )}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                code({ inline, className, children, ...props }: MarkdownCodeProps) {
                  const match = /language-(\w+)/.exec(className || "");
                  if (!inline && match && match[1] === "json" && String(children).includes('"radar"')) return null;
                  return !inline ? (
                    <pre className="bg-gray-50 rounded-xl p-4 overflow-x-auto text-sm border border-gray-100">
                      <code className={className} {...props}>{children}</code>
                    </pre>
                  ) : (
                    <code className={className} {...props}>{children}</code>
                  );
                },
              }}
            >
              {displayReport}
            </ReactMarkdown>
            {isStreaming && <span className="inline-block w-2 h-5 bg-black ml-1 animate-pulse" />}
          </div>

          {/* 操作按钮 */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => setInterviewModalOpen(true)} className="rounded-xl border-red-200 bg-red-50 text-red-600 hover:bg-red-100">
              <ZapIcon className="w-4 h-4 mr-2" /> 练一练
            </Button>
            <Button variant="outline" onClick={() => handleProFeature("optimize")} className="rounded-xl border-yellow-200 bg-yellow-50 text-yellow-600 hover:bg-yellow-100">
              <FileEdit className="w-4 h-4 mr-2" /> 改一改
            </Button>
            <Button onClick={() => handleProFeature("export")} className="rounded-xl bg-green-500 text-white hover:bg-green-600 ml-auto">
              <Send className="w-4 h-4 mr-2" /> 投一投
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <>
      {showResult ? <ResultView /> : <MobileHomeView />}
      <UpgradeModal open={upgradeModalOpen} onOpenChange={setUpgradeModalOpen} trigger={upgradeTrigger} />
      <InterviewModal open={interviewModalOpen} onOpenChange={setInterviewModalOpen} />
    </>
  );
}

export default App;
