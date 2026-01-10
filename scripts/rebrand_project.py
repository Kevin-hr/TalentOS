import os

def replace_in_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Specific replacements
        new_content = content.replace("AI Resume Sniper", "TalentOS")
        new_content = new_content.replace("Resume Sniper", "TalentOS")
        new_content = new_content.replace("ResumeSniper", "TalentOS")
        new_content = new_content.replace("resume_sniper", "talentos")
        
        # Replace class names if they were missed (e.g. ResumeSniperError -> TalentOSError)
        # But be careful not to break imports if I haven't renamed files yet.
        # I already renamed Engine and Error classes in previous steps.
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {file_path}")
            
    except UnicodeDecodeError:
        pass # Skip binary files
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def main():
    root_dir = r"C:\Users\52648\Documents\02_baijiahao\AI_Resume_Sniper"
    extensions = ['.py', '.md', '.json', '.yaml', '.yml', '.txt', '.ps1', '.bat', '.tsx', '.ts', '.css', '.html']
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        if ".git" in dirpath or "node_modules" in dirpath or "__pycache__" in dirpath:
            continue
            
        for filename in filenames:
            if filename == "rebrand_project.py": continue
            if any(filename.endswith(ext) for ext in extensions):
                file_path = os.path.join(dirpath, filename)
                replace_in_file(file_path)

if __name__ == "__main__":
    main()
