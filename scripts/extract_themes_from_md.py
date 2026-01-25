#!/usr/bin/env python3
"""
Extract themes and quotes from NotebookLM Markdown exports.
Parses session-*-key-quotes-and-themes.md files.
"""

import re
import json
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).parent.parent
NOTEBOOK_DIR = BASE_DIR / 'notebooklm-export'
OUTPUT_DIR = BASE_DIR / 'data' / 'themes'

def extract_content(md_content):
    """Parses the MD content to extract themes and quotes using chunking."""
    data = {
        'themes': [],
        'quotes': []
    }

    # Split by level 3 headers (usually where items start)
    chunks = re.split(r'\n### ', md_content)
    
    for chunk in chunks:
        chunk = chunk.strip()
        if not chunk:
            continue
            
        # Clean leading numbers/formatting for checking
        clean_chunk = re.sub(r'^\d+\.\s+', '', chunk)
        
        # --- Check if it's a Quote ---
        
        # Logic: If it starts with > " or contains > " early on and has an attribution
        is_quote = False
        
        # Format A: (Title) \n > "Quote"
        lines = chunk.split('\n')
        # Check if the first non-empty line after title (if any) starts with >
        content_start_line_idx = 0
        if chunk.startswith('**') or re.match(r'^\d+\.', chunk):
             # Has a title line, look at next line
             for i, line in enumerate(lines[1:]):
                 if line.strip():
                     content_start_line_idx = i + 1
                     break
        
        first_content_line = lines[content_start_line_idx].strip() if len(lines) > content_start_line_idx else ""
        
        if first_content_line.startswith('>'):
            is_quote = True
        elif '"' in lines[0] and '**Speaker**:' in chunk: # Format B
            is_quote = True
            
        if is_quote:
            # Try to extract quote details
            # Format A
            quote_match = re.search(r'> "(.*?)"', chunk, re.DOTALL)
            author_match = re.search(r'\*\*— (.*?)\*\*(?:, (.*))?', chunk)
            
            if quote_match and author_match:
                text = quote_match.group(1).replace('\n', ' ').strip()
                speaker = author_match.group(1).strip()
                affiliation = author_match.group(2).strip() if author_match.group(2) else ""
                
                data['quotes'].append({
                    'text': text,
                    'speaker': speaker,
                    'affiliation': affiliation
                })
                continue
            
            # Format B
            quote_match_b = re.search(r'"(.*?)"', chunk, re.DOTALL)
            speaker_match_b = re.search(r'\*\*Speaker\*\*: (.*?)(?:\n|$)', chunk)
             
            if quote_match_b and speaker_match_b:
                text = quote_match_b.group(1).replace('\n', ' ').strip()
                speaker_raw = speaker_match_b.group(1).strip()
                
                # Parse Name (Org)
                speaker = speaker_raw
                affiliation = ""
                if "(" in speaker_raw and speaker_raw.endswith(")"):
                    parts = speaker_raw[:-1].split("(", 1)
                    speaker = parts[0].strip()
                    affiliation = parts[1].strip()
                    
                data['quotes'].append({
                    'text': text,
                    'speaker': speaker,
                    'affiliation': affiliation
                })
                continue


        # --- Check if it's a Theme ---
        
        # Format B: 1. **Title** ... **What**:
        if '**What**:' in chunk:
             title_match = re.match(r'^\d+\.\s+\*\*(.*?)\*\*', chunk)
             if title_match:
                 title = title_match.group(1).strip()
                 desc_match = re.search(r'\*\*What\*\*: (.*?)(?:\n\*\*|$)', chunk, re.DOTALL)
                 description = desc_match.group(1).strip() if desc_match else ""
                 
                 data['themes'].append({'title': title, 'description': description})
                 continue

        # Format A: **1. Title** (or just **Title**) ... Description
        if not is_quote:
             # Look for bold title at start
             title_match = re.match(r'^\*\*(\d+\.\s+)?(.*?)\*\*', clean_chunk)
             if title_match:
                 title = title_match.group(2).strip()
                 
                 # Extract body: everything after the first line/title
                 lines = chunk.split('\n', 1)
                 if len(lines) > 1:
                     description = lines[1].strip()
                     # Cleanup
                     if "**Quote:**" in description:
                         description = description.split("**Quote:**")[0].strip()
                     
                     if len(description) > 20: 
                        data['themes'].append({'title': title, 'description': description})

    return data

def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    extracted_data = {}
    
    # Find all matching files
    files = sorted(NOTEBOOK_DIR.glob('session-*-key-quotes-and-themes.md'))
    
    if not files:
        print("No theme files found in", NOTEBOOK_DIR)
        return

    for file_path in files:
        print(f"Processing {file_path.name}...")
        try:
            content = file_path.read_text(encoding='utf-8')
            
            # Extract session ID from filename (session-1, session-2, etc.)
            session_match = re.search(r'(session-\d+|session-day1-summary)', file_path.name)
            if session_match:
                session_id = session_match.group(1)
            else:
                session_id = file_path.stem
                
            extracted = extract_content(content)
            extracted_data[session_id] = extracted
            print(f"  Found {len(extracted['themes'])} themes and {len(extracted['quotes'])} quotes.")
            
        except Exception as e:
            print(f"  Error processing {file_path.name}: {e}")

    # Save to JSON
    output_file = OUTPUT_DIR / 'extracted_themes.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(extracted_data, f, indent=2, ensure_ascii=False)
        
    print(f"\nSaved extracted data to {output_file}")

if __name__ == "__main__":
    main()
