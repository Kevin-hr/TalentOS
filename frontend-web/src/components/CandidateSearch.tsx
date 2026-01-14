import { useState } from "react";
import { Briefcase, ChevronRight, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface SearchResultItem {
  id: string;
  score: number;
  metadata: {
    name?: string;
    role?: string;
    company?: string;
    salary?: string;
    [key: string]: unknown;
  };
  preview: string;
}

export function SmartSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setError("");
    setResults([]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setResults([
        {
          id: "job-1",
          score: 0.92,
          metadata: {
            name: "Senior Python Engineer",
            company: "TechFlow AI",
            salary: "40k-60k",
            role: "Backend",
          },
          preview:
            "Looking for a Python expert with RAG and Vector Database experience. Must have strong system design skills...",
        },
        {
          id: "job-2",
          score: 0.85,
          metadata: {
            name: "AI Solutions Architect",
            company: "FutureWave",
            salary: "50k-80k",
            role: "Architect",
          },
          preview:
            "Lead the design of enterprise AI solutions. Experience with LLM integration and retrieval systems is a must...",
        },
        {
          id: "job-3",
          score: 0.78,
          metadata: {
            name: "Full Stack Developer",
            company: "StartUp Inc",
            salary: "25k-40k",
            role: "Fullstack",
          },
          preview:
            "Join our fast-paced team. Python/Django backend with React frontend. AI feature implementation experience is a plus...",
        },
      ]);
    } catch {
      setError("搜索失败，请稍后重试。");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Search Input Section */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs">
            S
          </span>
          职位智能匹配 (Job Match)
        </h2>
        <div className="relative">
          <input
            type="text"
            className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm text-lg"
            placeholder={
              "输入你的核心技能或职业目标 (例如: 'Python Expert looking for AI roles')..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <Button
            className="absolute right-2 top-2 bottom-2 rounded-xl"
            disabled={isSearching || !query.trim()}
            onClick={handleSearch}
          >
            {isSearching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "搜索"
            )}
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
      </section>

      {/* Results Section */}
      <div className="grid grid-cols-1 gap-4">
        {results.length > 0
          ? results.map((item) => (
              <Card
                key={item.id}
                className="p-6 hover:shadow-md transition-all border-l-4 border-l-blue-500"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center"
                    >
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {item.metadata?.name || "Unknown"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.metadata?.company} · {item.metadata?.salary}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                      Match Score
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      {(item.score * 100).toFixed(0)}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mt-3">
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    <span className="font-medium text-gray-900 mr-2">
                      Preview:
                    </span>
                    {item.preview}
                  </p>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    查看详情
                  </Button>
                  <Button size="sm" className="rounded-full">
                    立即申请
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Card>
            ))
          : !isSearching &&
            query &&
            !error && (
              <div className="text-center py-12 text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>未找到匹配的职位</p>
              </div>
            )}
      </div>
    </div>
  );
}
