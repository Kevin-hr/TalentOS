"""
STAR Rewriter Module
Responsible for rewriting resume bullet points using the STAR method.
"""

from typing import List, Optional
from pydantic import BaseModel, Field

class STARRewriter:
    def __init__(self, llm_provider):
        self.llm_provider = llm_provider

    def _get_star_prompt(self) -> str:
        return """
        You are a **Career Hacker** specializing in "Resume Value Engineering".
        
        Task: Rewrite the user's bullet point to maximize its "Market Value" using the STAR+Data Method.
        
        Goal: Transform "Labor-based" descriptions (I did X) into "Value-based" achievements (I generated Y value by doing X).
        
        Input:
        - Original Bullet Point
        - Target Job Description (JD)
        
        Rules:
        1. **Quantify Everything**: If exact numbers are missing, estimate reasonable metrics (Efficiency +X%, Cost -Y%, QPS +Z%). Mark estimates with [verify].
        2. **Keyword Injection**: Aggressively insert high-value keywords from the JD (e.g., "High Availability", "End-to-End Ownership").
        3. **Active Voice**: Start with power verbs (Architected, Spearheaded, Engineered). Avoid "Assisted", "Responsible for".
        
        Output:
        Return ONLY the rewritten bullet point text.
        
        Example:
        Input: "Wrote code for the payment system."
        Output: "Architected the core payment settlement engine (Situation) handling $1B/year transaction volume (Task); introduced Idempotency Keys and Distributed Locks (Action) to eliminate double-payment errors, achieving 99.999% financial accuracy (Result)."
        
        Language: Chinese (Simplified).
        """

    def rewrite_bullet(self, original_text: str, target_jd: str) -> str:
        """
        Rewrite a single bullet point using STAR method.
        """
        system_prompt = self._get_star_prompt()
        user_prompt = f"TARGET JD:\n{target_jd}\n\nORIGINAL BULLET:\n{original_text}"

        response = self.llm_provider.chat(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7, # Slightly higher temp for creativity
            model="deepseek-chat"
        )

        return response.content.strip()

    def rewrite_experience(self, experience_text: str, target_jd: str) -> str:
        """
        Rewrite a whole block of experience text.
        """
        # Simple implementation: Treat the whole block as input to context, 
        # but prompt to rewrite line by line or as a cohesive paragraph.
        # For now, let's just use a modified prompt for block rewriting.
        
        prompt = """
        You are a Resume Optimization Expert.
        Rewrite the following Experience Section using the STAR Method.
        Make it data-driven and aligned with the JD.
        Keep the original format (bullet points).
        
        TARGET JD:
        {jd}
        
        ORIGINAL EXPERIENCE:
        {exp}
        
        Output ONLY the rewritten text.
        """
        
        response = self.llm_provider.chat(
            messages=[
                {"role": "system", "content": "You are a Resume Expert."},
                {"role": "user", "content": prompt.format(jd=target_jd, exp=experience_text)}
            ],
            temperature=0.7
        )
        
        return response.content.strip()
