#!/usr/bin/env python3
"""
Generate ENRICHED network visualization data.
Combines day1-master.json with extracted themes to create a deep semantic network.
"""

import json
import re
from pathlib import Path
from collections import defaultdict

# Paths
BASE_DIR = Path(__file__).parent.parent
MASTER_FILE = BASE_DIR / 'data' / 'aggregated' / 'day1-master.json'
THEMES_FILE = BASE_DIR / 'data' / 'themes' / 'extracted_themes.json'
OUTPUT_FILE = BASE_DIR / 'data' / 'network' / 'summit-network-enriched.json'

def load_json(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def normalize_key(text):
    """Normalize text to create a stable ID."""
    return re.sub(r'[^a-z0-9]', '', text.lower())

def generate_enriched_network():
    print("Loading data...")
    master_data = load_json(MASTER_FILE)
    themes_data = load_json(THEMES_FILE)

    nodes = []
    edges = []
    
    # Tracking sets to avoid duplicates
    node_ids = set()
    edge_ids = set()
    
    # Lookup tables
    theme_id_map = {} # "Normalized Title" -> "Display Title" 
    
    # --- 1. Process Themes (Create Nodes) ---
    print("\nProcessing themes...")
    
    # We want to merge similar themes across sessions
    all_themes = defaultdict(list)
    
    for session_id, data in themes_data.items():
        for theme in data['themes']:
            norm_title = normalize_key(theme['title'])
            # Skip very short or generic titles if needed
            if len(norm_title) < 3: continue
            
            all_themes[norm_title].append({
                'title': theme['title'],
                'description': theme['description'],
                'session_id': session_id
            })

    for norm_title, occurrences in all_themes.items():
        # Use the most common or longest title as the display label
        display_title = sorted([o['title'] for o in occurrences], key=len, reverse=True)[0]
        
        # ID: theme-{norm_title}
        node_id = f"theme-{norm_title}"
        
        if node_id not in node_ids:
            nodes.append({
                'data': {
                    'id': node_id,
                    'label': display_title,
                    'type': 'theme',
                    'category': 'topic',
                    'size': 40 + (len(occurrences) * 10), # Size based on cross-session frequency
                    'frequency': len(occurrences)
                }
            })
            node_ids.add(node_id)
            theme_id_map[norm_title] = node_id

    print(f"Created {len(nodes)} theme nodes")

    # --- 2. Process People (Nodes) & Session Connections ---
    print("\nProcessing people and sessions...")
    
    session_speakers = defaultdict(list)
    
    for session in master_data['sessions']:
        session_id = session['id']
        
        # Link Speakers to Session
        for speaker in session['speakers']:
            # ID: person-{normalized_name}
            norm_name = normalize_key(speaker['name'])
            person_id = f"person-{norm_name}"
            
            if person_id not in node_ids:
                nodes.append({
                    'data': {
                        'id': person_id,
                        'label': speaker['name'],
                        'name': speaker['name'],
                        'organization': speaker.get('organization', ''),
                        'role': speaker.get('role', ''),
                        'type': 'speaker',
                        'size': 60
                    }
                })
                node_ids.add(person_id)
            
            session_speakers[session_id].append(person_id)
            
            # --- Edge: Speaker -> Organization ---
            org_name = speaker.get('organization', '')
            if org_name:
                norm_org = normalize_key(org_name)
                org_id = f"org-{norm_org}"
                
                # Add Org Node if new
                if org_id not in node_ids:
                    nodes.append({
                        'data': {
                            'id': org_id,
                            'label': org_name,
                            'type': 'organization',
                            'size': 50
                        }
                    })
                    node_ids.add(org_id)
                
                # Edge: Person -> Org
                edge_id = f"affil-{person_id}-{org_id}"
                if edge_id not in edge_ids:
                    edges.append({
                        'data': {
                            'id': edge_id,
                            'source': person_id,
                            'target': org_id,
                            'type': 'organization',
                            'weight': 2
                        }
                    })
                    edge_ids.add(edge_id)

    # --- 3. Create Session Co-occurrence Edges ---
    print("Creating session connections...")
    for session_id, speakers in session_speakers.items():
        # Connect all speakers in session to each other
        for i, p1 in enumerate(speakers):
            for p2 in speakers[i+1:]:
                edge_id = f"sess-{session_id}-{p1}-{p2}"
                # Ensure consistent direction for ID (alphabetical)
                if p1 > p2: p1, p2 = p2, p1
                edge_id = f"sess-{session_id}-{p1}-{p2}"
                
                if edge_id not in edge_ids:
                    edges.append({
                        'data': {
                            'id': edge_id,
                            'source': p1,
                            'target': p2,
                            'type': 'session',
                            'label': session_id,
                            'weight': 1
                        }
                    })
                    edge_ids.add(edge_id)

    # --- 4. Connect Speakers to Themes ---
    print("Connecting speakers to themes...")
    
    # We extracted themes per session in extracted_themes.json
    # We will link ALL speakers of a session to the MAIN themes of that session
    
    for session_id, data in themes_data.items():
        # Get speakers for this session
        speakers = session_speakers.get(session_id, [])
        if not speakers: continue
        
        # Get themes for this session
        for theme in data['themes']:
            norm_title = normalize_key(theme['title'])
            theme_node_id = theme_id_map.get(norm_title)
            
            if not theme_node_id: continue
            
            # Connect every speaker to this theme
            for person_id in speakers:
                edge_id = f"topic-{person_id}-{theme_node_id}"
                
                if edge_id not in edge_ids:
                    edges.append({
                        'data': {
                            'id': edge_id,
                            'source': person_id,
                            'target': theme_node_id,
                            'type': 'topic', # New edge type!
                            'weight': 0.5 # Lighter weight than direct session links
                        }
                    })
                    edge_ids.add(edge_id)
                    
        # --- 5. Key Voices (Quotes) ---
        # If a speaker has a quote, give them a STRONGER link to the themes of that session
        # (Since we can't easily map 1 quote to 1 theme without LLM, we'll boost their weight to ALL session themes)
        
        for quote in data['quotes']:
            speaker_name = quote['speaker']
            # Find the person ID
            # Simple fuzzy match
            norm_speaker = normalize_key(speaker_name)
            
            # Find matching node
            person_id = None
            for pid in session_speakers[session_id]:
                if norm_speaker in pid.replace('-', ''): # Simple check
                    person_id = pid
                    break
            
            if person_id:
                # Boost edges to all themes in this session
                for theme in data['themes']:
                    norm_title = normalize_key(theme['title'])
                    theme_node_id = theme_id_map.get(norm_title)
                    if not theme_node_id: continue
                    
                    # Find the edge and boost weight
                    edge_id = f"topic-{person_id}-{theme_node_id}"
                    for edge in edges:
                        if edge['data']['id'] == edge_id:
                            edge['data']['weight'] = 2.0 # Stronger link
                            edge['data']['type'] = 'key_voice' # Special type
                            break

    # --- 6. Stats & Output ---
    stats = {
        'totalNodes': len(nodes),
        'totalEdges': len(edges),
        'themes': len([n for n in nodes if n['data']['type'] == 'theme']),
        'speakers': len([n for n in nodes if n['data']['type'] == 'speaker']),
        'organizations': len([n for n in nodes if n['data']['type'] == 'organization'])
    }
    
    final_data = {
        'metadata': {
            'title': 'Nordic Circular Summit 2025 - Semantic Network',
            'generated': '2025-01-25',
            'description': 'Enriched network with semantic theme analysis'
        },
        'stats': stats,
        'elements': {
            'nodes': nodes,
            'edges': edges
        }
    }
    
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(final_data, f, indent=2, ensure_ascii=False)
        
    print(f"\nSaved ENRICHED network to {OUTPUT_FILE}")
    print(f"Stats: {stats}")

if __name__ == "__main__":
    generate_enriched_network()
