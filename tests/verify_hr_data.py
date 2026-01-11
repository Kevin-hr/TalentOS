import sys
import os
import json
import time
from typing import List, Dict

# Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.core.engine import TalentOSEngine

def main():
    print("Initializing Engine...")
    try:
        # Use OpenAI for embeddings (required for RAG)
        engine = TalentOSEngine(llm_provider="openai")
    except Exception as e:
        print(f"Failed to initialize engine: {e}")
        # Fallback for testing if OpenAI not configured
        print("Warning: Falling back to default provider (RAG embedding might be mocked).")
        engine = TalentOSEngine()
        
        # Inject mock embedder if needed
        # We need to forcefully override the embed method even if it exists but raises NotImplementedError
        def mock_embed(text):
            import hashlib
            import numpy as np
            hash_val = int(hashlib.md5(text.encode()).hexdigest(), 16)
            np.random.seed(hash_val % 2**32)
            return np.random.rand(1536).tolist()
        
        engine._llm_provider.embed = mock_embed
        print("Injected mock embedding function.")

    # 1. Load Data
    data_path = os.path.join(os.path.dirname(__file__), "fixtures", "real_world_data", "hr_cases.json")
    if not os.path.exists(data_path):
        print(f"Error: Data file not found at {data_path}")
        return

    with open(data_path, "r", encoding="utf-8") as f:
        cases = json.load(f)

    print(f"\nLoaded {len(cases)} test cases.")

    # 2. Inject into RAG (Vector Store)
    print("\n--- Phase 1: Injecting Resumes into RAG ---")
    for case in cases:
        resume = case["resume"]
        # Convert structured resume to text for indexing
        resume_text = f"""
        Name: {resume['candidate_name']}
        Title: {resume['current_title']}
        Experience: {resume['years_of_experience']} years
        Education: {resume['education']['degree']} in {resume['education']['major']} from {resume['education']['school']}
        Summary: {resume['summary']}
        Skills: {', '.join(resume['skills'])}
        Work History:
        """
        for job in resume['work_experience']:
            resume_text += f"\n- {job['title']} at {job['company']} ({job['duration']}):\n  " + "\n  ".join(job['achievements'])

        metadata = {
            "name": resume['candidate_name'],
            "role": resume['current_title'],
            "level": case["level_description"],
            "id": resume['id']
        }
        
        success = engine.index_resume(resume_text, metadata=metadata)
        status = "Success" if success else "Failed"
        print(f"Indexing {resume['candidate_name']} ({resume['current_title']})... {status}")

    # 3. Verify Search (RAG)
    print("\n--- Phase 2: Verifying RAG Search ---")
    queries = [
        "Looking for an HRD with strategic planning experience",
        "Need a junior HR for attendance and payroll",
        "Recruiter for technical roles",
        "OD specialist for organizational diagnosis"
    ]

    for q in queries:
        print(f"\nQuery: '{q}'")
        results = engine.search_candidates(q, limit=1)
        if results:
            top = results[0]
            print(f"  -> Top Match: {top['metadata']['name']} - {top['metadata']['role']}")
            print(f"  -> Score: {top['score']:.4f}")
        else:
            print("  -> No results found.")

    # 4. Verify Matching Algorithm (LLM Analysis)
    print("\n--- Phase 3: Verifying Matching Algorithm (LLM) ---")
    print("(Sampling 1 case for deep analysis to save tokens/time)")
    
    # Pick the 'Senior' case (Index 2)
    sample_case = cases[2] 
    jd = sample_case["jd"]
    resume = sample_case["resume"]
    
    # Construct texts
    jd_text = f"Title: {jd['title']}\nResponsibilities:\n" + "\n".join(jd['responsibilities']) + "\nRequirements:\n" + "\n".join(jd['requirements'])
    
    resume_text = f"Name: {resume['candidate_name']}\nSummary: {resume['summary']}\nExperience:\n" 
    for job in resume['work_experience']:
        resume_text += f"- {job['title']} at {job['company']}\n"

    print(f"\nAnalyzing Match: {resume['candidate_name']} vs {jd['title']}...")
    
    try:
        result = engine.analyze(
            resume_text=resume_text,
            jd_text=jd_text,
            persona="hrbp"
        )
        print("\nAnalysis Report Summary:")
        print(f"  Score: {result.score}")
        print(f"  Model: {result.model}")
        print(f"  Latency: {result.latency_ms:.2f}ms")
        # Print first 200 chars of report
        print(f"  Preview: {result.report[:200].replace(chr(10), ' ')}...")
    except Exception as e:
        print(f"Analysis failed: {e}")

if __name__ == "__main__":
    main()
