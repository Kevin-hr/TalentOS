import { useState, type ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ChevronRight,
  Upload,
  Target,
  Zap,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import LinearPreview from "@/components/LinearPreview";
import { useAnalyzeStream } from "@/hooks/useAnalyzeStream";
import ThumbnailPreview from "@/components/ThumbnailPreview";
import { RoleSelector } from "@/components/RoleSelector";
import { SkillRadar } from "@/components/SkillRadar";
import { SalaryAnalysis } from "@/components/SalaryAnalysis";
import { UpgradeModal } from "@/components/UpgradeModal";
import { InterviewModal } from "@/components/InterviewModal";
import { FileEdit, Send, Wand2, Calculator, Swords } from "lucide-react";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { SmartSearch } from "@/components/CandidateSearch";

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
  const [activeTab, setActiveTab] = useState<"analyze" | "search" | "profile">(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    return (tab === "search" || tab === "profile") ? tab : "analyze";
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

  const { streamedContent, isStreaming, analyzeStream, reset } =
    useAnalyzeStream();

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
      <div className="min-h-screen bg-[#F3F4EF] text-[#111111] font-sans selection:bg-black/10 pb-28">
        {/* Header: Logo + Slogan (Semantic HTML) */}
        <header className="relative z-10 px-5 pt-8 pb-4 flex flex-col items-center text-center space-y-4">
          <div className="flex items-center justify-end w-full">
            <button className="px-6 py-2 rounded-md bg-[#1D4AFF] text-white text-sm font-bold hover:bg-[#1D4AFF]/90 transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none">
              登录
            </button>
          </div>

          <div className="space-y-4 max-w-sm mx-auto">
            <h2 className="text-2xl font-black leading-tight text-black">
              找工作是为了什么？
              <br />
              <span className="bg-black text-white px-4 py-2 inline-block transform -rotate-1 shadow-[4px_4px_0px_0px_#F54E00] mt-2 text-xl">
                是为了不再找工作！
              </span>
            </h2>
            <p className="text-sm font-bold text-gray-800 border-b-2 border-black pb-2 inline-block">
              上 TalentOS，把你的天赋变成终身资产！
            </p>
          </div>

          <div className="pt-2">
            <span className="text-xs font-black bg-[#F54E00] text-white px-3 py-1 rounded-md shadow-[2px_2px_0px_0px_#000] border border-black">
              想创业的人：命定天赋，降维打击！
            </span>
          </div>

          {/* Scrolling Marquee Section */}
          <div className="w-full overflow-hidden bg-yellow-300 border-y-2 border-black py-2 mt-4">
            <div className="whitespace-nowrap animate-marquee flex gap-8 items-center">
              <span className="text-sm font-black uppercase flex items-center gap-2">
                <Zap className="w-4 h-4" /> 老职场：筹码和时机！主打“每一滴血汗都要换成现金”！
              </span>
              <span className="text-sm font-black uppercase flex items-center gap-2">
                <Zap className="w-4 h-4" /> 老职场：筹码和时机！主打“每一滴血汗都要换成现金”！
              </span>
              <span className="text-sm font-black uppercase flex items-center gap-2">
                <Zap className="w-4 h-4" /> 老职场：筹码和时机！主打“每一滴血汗都要换成现金”！
              </span>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-xs font-bold text-gray-500 border-2 border-black px-2 py-1 rounded-full bg-white">
              应届生：避坑和方向！主打“第一步不准踏错”！
            </span>
          </div>
        </header>

        <main className="relative z-10 px-5 pt-6 space-y-6">
          {activeTab === "analyze" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* Value Proposition / Cycle */}
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[
                  { icon: <Zap className="w-4 h-4" />, label: "诊断", color: "bg-red-100 text-red-700 border-red-200" },
                  { icon: <Wand2 className="w-4 h-4" />, label: "改写", color: "bg-blue-100 text-blue-700 border-blue-200" },
                  { icon: <Calculator className="w-4 h-4" />, label: "估值", color: "bg-green-100 text-green-700 border-green-200" },
                  { icon: <Swords className="w-4 h-4" />, label: "演练", color: "bg-orange-100 text-orange-700 border-orange-200" },
                ].map((item, i) => (
                  <div key={i} className={`flex flex-col items-center justify-center p-2 rounded-lg border-2 ${item.color.replace('bg-', 'border-').replace('text-', 'border-opacity-50 ')} bg-white shadow-sm`}>
                    <div className={`mb-1 p-1 rounded-full ${item.color}`}>{item.icon}</div>
                    <span className="text-[10px] font-bold text-gray-600">{item.label}</span>
                  </div>
                ))}
              </div>
              {/* 简历上传 */}
              <section className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-lg flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    上传简历
                  </h2>
                  <span className="text-xs font-mono bg-yellow-200 border border-black px-1">PDF/DOCX</span>
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
              </section>

              {/* 目标职位 */}
              <section className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <button
                  onClick={() => setShowJdInput(!showJdInput)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <h2 className="font-bold text-lg flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    目标职位
                    {!showJdInput && <span className="text-xs bg-gray-100 border border-gray-300 text-gray-500 px-2 py-0.5 rounded-md ml-2">可选</span>}
                  </h2>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showJdInput ? "rotate-90" : ""}`} />
                </button>

                {showJdInput && (
                  <div className="px-5 pb-5 space-y-4 border-t-2 border-black pt-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setJdInputMode("text")}
                        className={`flex-1 py-2 rounded-md border-2 border-black text-sm font-bold transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none ${jdInputMode === "text" ? "bg-[#1D4AFF] text-white" : "bg-white text-black"
                          }`}
                      >
                        粘贴JD
                      </button>
                      <button
                        onClick={() => setJdInputMode("file")}
                        className={`flex-1 py-2 rounded-md border-2 border-black text-sm font-bold transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none ${jdInputMode === "file" ? "bg-[#1D4AFF] text-white" : "bg-white text-black"
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
                        className="w-full h-28 p-4 rounded-md bg-white border-2 border-black focus:ring-2 focus:ring-[#1D4AFF] resize-none text-sm font-mono"
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
              </section>

              {/* Start Diagnosis Button (Floating for easy access) */}
              <div className="pt-4 pb-20">
                <Button
                  size="lg"
                  className="w-full h-14 text-lg rounded-md bg-[#F54E00] text-white hover:bg-[#F54E00]/90 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black transition-all active:translate-y-[2px] active:shadow-none"
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
                      <span className="font-black">{!file ? "请先上传简历" : "开始诊断"}</span>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </div>
            </div>
          )}

          {activeTab === "search" && (
            <div className="pb-20">
              <SmartSearch />
            </div>
          )}

          {activeTab === "profile" && (
            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center border-2 border-black">
                <Briefcase className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold">个人中心</h3>
                <p className="text-gray-500 text-sm">开发中...</p>
              </div>
            </div>
          )}
        </main>

        <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
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
              <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${(result?.score || 0) >= 80 ? "bg-green-500/30 text-green-400" :
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

          {/* 操作按钮 - Hog Style Actions */}
          <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-200 flex flex-col md:flex-row gap-4">
            <Button
              variant="outline"
              onClick={() => setInterviewModalOpen(true)}
              className="flex-1 h-12 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-y-[4px] transition-all bg-[#FF90E8] text-black font-bold hover:bg-[#FF90E8]/90"
            >
              <Swords className="w-5 h-5 mr-2" /> 模拟练兵
            </Button>
            <Button
              variant="outline"
              onClick={() => handleProFeature("optimize")}
              className="flex-1 h-12 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-y-[4px] transition-all bg-[#23C55E] text-white font-bold hover:bg-[#23C55E]/90 hover:text-white"
            >
              <FileEdit className="w-5 h-5 mr-2" /> 简历精修
            </Button>
            <Button
              onClick={() => setActiveTab("search")}
              className="flex-1 h-12 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-y-[4px] transition-all bg-[#F54E00] text-white font-bold hover:bg-[#F54E00]/90"
            >
              <Send className="w-5 h-5 mr-2" /> 匹配投递
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
