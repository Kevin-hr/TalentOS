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
        You are a Resume Optimization Expert.
        
        Task: Rewrite the user's resume bullet point using the STAR Method (Situation, Task, Action, Result).
        
        Goal: Make the experience sound impactful, data-driven, and aligned with the Target JD.
        
        Input:
        - Original Bullet Point
        - Target Job Description (JD)
        
        Rules:
        1. **Quantitative**: Must include numbers (%, $, QPS, Latency). If unknown, estimate reasonably based on context or use placeholders like [X]%.
        2. **Keywords**: Incorporate keywords from the JD (e.g., "High Concurrency", "Microservices", "User Growth").
        3. **Structure**: 
           - Situation/Task: What was the challenge?
           - Action: What specifically did YOU do? (Use strong verbs: Led, Architected, Optimized).
           - Result: What was the business outcome?
        
        Output:
        Return ONLY the rewritten bullet point text. Do not explain.
        
        Example:
        Input: "Responsible for backend API development using Java."
        Output: "Lead the refactoring of the core transaction system (Situation), handling 10M+ daily requests (Task); implemented Spring Cloud microservices and Redis caching strategies (Action), reducing latency by 40% and supporting 99.99% availability during peak sales (Result)."
        
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
