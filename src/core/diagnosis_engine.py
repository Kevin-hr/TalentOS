"""
Diagnosis Engine Module
Responsible for deep resume diagnosis using advanced LLM prompts.
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
import json
import re

class DiagnosisResult(BaseModel):
    score: int = Field(..., description="Match score (0-100)")
    fatal_flaws: List[str] = Field(..., description="List of fatal flaws")
    boss_reply_probability: int = Field(..., description="Probability of HR reply on Boss Zhipin (0-100)")
    improvement_suggestions: List[str] = Field(..., description="3 immediate improvement suggestions")
    raw_response: Optional[str] = Field(None, description="Raw LLM response")

class DiagnosisEngine:
    def __init__(self, llm_provider):
        self.llm_provider = llm_provider

    def _get_diagnosis_prompt(self) -> str:
        return """
        You are a Senior Technical Recruiter and Career Coach in China's Internet industry (Boss Zhipin style).
        
        Task: Perform a "Deep Diagnosis" of the Candidate Resume against the Job Description.
        
        Input Variables:
        - Candidate Resume
        - Target Job Description (JD)

        Output Requirement:
        Return ONLY a JSON object with the following structure. Do NOT wrap in markdown code blocks.
        {
            "score": <int, 0-100>,
            "fatal_flaws": [<list of strings, critical issues like 'job hopping', 'degree mismatch', 'tech stack missing'>],
            "boss_reply_probability": <int, 0-100, probability of getting a reply>,
            "improvement_suggestions": [<list of strings, 3 specific, actionable changes>]
        }

        Evaluation Criteria (China Context):
        1. **Stability**: Frequent job hopping (e.g., < 1 year) is a FATAL FLAW.
        2. **Match**: Keywords in Resume must match JD requirements (High Concurrency, Distributed Systems, etc.).
        3. **Education**: Check if degree matches JD requirements (985/211 preference).
        4. **Age/Level**: Check if experience matches the expected level (P6/P7).

        Language: Chinese (Simplified).
        """

    def diagnose(self, resume_text: str, jd_text: str) -> DiagnosisResult:
        """
        Diagnose resume against JD.
        """
        system_prompt = self._get_diagnosis_prompt()
        user_prompt = f"CANDIDATE RESUME:\n{resume_text}\n\nTARGET JD:\n{jd_text}"

        response = self.llm_provider.chat(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.2,
            model="deepseek-chat" # Prefer DeepSeek for Chinese context if available, otherwise provider default
        )

        content = response.content.strip()
        
        # Clean up code blocks if present
        if content.startswith("```json"):
            content = content[7:]
        if content.startswith("```"):
            content = content[3:]
        if content.endswith("```"):
            content = content[:-3]
        
        content = content.strip()

        try:
            data = json.loads(content)
            return DiagnosisResult(
                score=data.get("score", 0),
                fatal_flaws=data.get("fatal_flaws", []),
                boss_reply_probability=data.get("boss_reply_probability", 0),
                improvement_suggestions=data.get("improvement_suggestions", []),
                raw_response=content
            )
        except json.JSONDecodeError:
            # Fallback for parsing error
            return DiagnosisResult(
                score=0,
                fatal_flaws=["System Error: Failed to parse diagnosis result"],
                boss_reply_probability=0,
                improvement_suggestions=[],
                raw_response=content
            )
