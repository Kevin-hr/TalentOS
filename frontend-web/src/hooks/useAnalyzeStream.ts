import { useCallback, useRef, useState } from "react";

interface UseAnalyzeStreamReturn {
  streamedContent: string;
  isStreaming: boolean;
  error: string | null;
  analyzeStream: (formData: FormData) => Promise<void>;
  reset: () => void;
  cancel: () => void;
}

type ErrorResponseData = {
  detail?: string;
};

export async function getErrorMessageFromResponse(
  response: Response,
): Promise<string> {
  const statusPart = `${response.status}${response.statusText ? ` ${response.statusText}` : ""}`;

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      const data = (await response.json()) as unknown as ErrorResponseData;
      if (typeof data?.detail === "string" && data.detail.trim().length > 0) {
        return `${statusPart}: ${data.detail}`;
      }
      return statusPart;
    } catch {
      return statusPart;
    }
  }

  try {
    const text = await response.text();
    if (text.trim().length > 0) return `${statusPart}: ${text}`;
  } catch {
    return statusPart;
  }

  return statusPart;
}

export const useAnalyzeStream = (): UseAnalyzeStreamReturn => {
  const [streamedContent, setStreamedContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setStreamedContent("");
    setError(null);
    setIsStreaming(false);
  }, []);

  const cancel = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsStreaming(false);
  }, []);

  const analyzeStream = useCallback(
    async (formData: FormData) => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setStreamedContent("");
      setError(null);
      setIsStreaming(true);

      try {
        const response = await fetch("/api/analyze_stream", {
          method: "POST",
          body: formData,
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorMessage = await getErrorMessageFromResponse(response);
          throw new Error(errorMessage);
        }

        if (!response.body) {
          const fallbackText = await response.text().catch(() => "");
          if (fallbackText.trim().length > 0) {
            throw new Error(fallbackText);
          }
          throw new Error("流式响应不可用，请升级浏览器或检查代理配置。");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let skippedInitialWhitespace = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          if (!skippedInitialWhitespace && chunk.trim().length === 0) {
            skippedInitialWhitespace = true;
            continue;
          }
          skippedInitialWhitespace = true;
          setStreamedContent((prev) => prev + chunk);
        }

        const finalChunk = decoder.decode();
        if (finalChunk.trim().length > 0) {
          setStreamedContent((prev) => prev + finalChunk);
        }
      } catch (err: unknown) {
        if (
          err instanceof DOMException &&
          typeof err.name === "string" &&
          err.name === "AbortError"
        ) {
          return;
        }

        if (err instanceof Error) {
          if (err.message.includes("Failed to fetch")) {
            setError("网络错误：无法连接后端服务（检查 127.0.0.1:8000）。");
            return;
          }
          setError(err.message);
        } else {
          setError("An unexpected error occurred during streaming.");
        }
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [],
  );

  return {
    streamedContent,
    isStreaming,
    error,
    analyzeStream,
    reset,
    cancel,
  };
};
