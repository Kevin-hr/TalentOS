
import sys
import os
from unittest.mock import MagicMock
from pathlib import Path

# Add src to path
sys.path.append(str(Path(__file__).parent.parent))

from src.core.engine import TalentOSEngine
from src.interfaces.illm_provider import LLMResponse

def test_super_brain_logic():
    print("Initializing TalentOS Engine...")
    # Mock config and provider to avoid actual API calls
    engine = TalentOSEngine()
    
    # Mock the LLM provider
    mock_provider = MagicMock()
    engine._llm_provider = mock_provider
    
    # Re-initialize sub-engines with the mock provider
    from src.core.diagnosis_engine import DiagnosisEngine
    from src.core.star_rewriter import STARRewriter
    engine.diagnosis_engine = DiagnosisEngine(mock_provider)
    engine.star_rewriter = STARRewriter(mock_provider)

    # 1. Test Diagnosis V2
    print("\n--- Testing Diagnosis V2 ---")
    
    # Mock Response for Diagnosis
    mock_diagnosis_json = """
    {
        "score": 85,
        "fatal_flaws": [],
        "boss_reply_probability": 90,
        "improvement_suggestions": ["Add more quantitative metrics", "Highlight leadership"]
    }
    """
    mock_provider.chat.return_value = LLMResponse(content=mock_diagnosis_json, model="mock", tokens_used=100, latency_ms=100.0)
    
    resume_path = Path("tests/fixtures/china_scenarios/resume_a_java.md")
    jd_path = Path("tests/fixtures/china_scenarios/jd_a_bytedance.txt")
    
    with open(resume_path, "r", encoding="utf-8") as f:
        resume_text = f.read()
    with open(jd_path, "r", encoding="utf-8") as f:
        jd_text = f.read()
        
    result = engine.diagnose_resume_v2(resume_text, jd_text)
    print(f"Score: {result.score}")
    print(f"Reply Probability: {result.boss_reply_probability}%")
    print(f"Suggestions: {result.improvement_suggestions}")
    
    assert result.score == 85
    assert result.boss_reply_probability == 90
    
    # 2. Test STAR Rewriter
    print("\n--- Testing STAR Rewriter ---")
    
    # Mock Response for STAR
    mock_star_response = "Optimized STAR Bullet Point: Led the refactoring..."
    mock_provider.chat.return_value = LLMResponse(content=mock_star_response, model="mock", tokens_used=50, latency_ms=50.0)
    
    original_bullet = "Responsible for backend API development."
    rewritten = engine.rewrite_bullet_star(original_bullet, jd_text)
    print(f"Original: {original_bullet}")
    print(f"Rewritten: {rewritten}")
    
    assert rewritten == mock_star_response
    
    print("\n✅ Super Brain Logic Verified Successfully!")

if __name__ == "__main__":
    test_super_brain_logic()
