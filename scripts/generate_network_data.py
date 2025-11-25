#!/usr/bin/env python3
"""
Generate network visualization data for Nordic Circular Summit 2025
Focuses on Day 1 speakers and participants with connections
"""

import json
from pathlib import Path
from collections import defaultdict

# Paths
BASE_DIR = Path(__file__).parent.parent
SPEAKERS_FILE = BASE_DIR / 'data' / 'speakers' / 'speakers.json'
SESSION_PARTICIPANTS_FILE = BASE_DIR / 'data' / 'participants' / 'session-participants.json'
PARTICIPANTS_FILE = BASE_DIR / 'data' / 'participants' / 'participants.json'
SESSIONS_FILE = BASE_DIR / 'data' / 'sessions' / 'sessions.json'
OUTPUT_FILE = BASE_DIR / 'data' / 'network' / 'summit-network.json'

def load_json(filepath):
    """Load JSON file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(data, filepath):
    """Save JSON file"""
    filepath.parent.mkdir(parents=True, exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def generate_network():
    """Generate network data for visualization"""

    print("Loading data...")
    speakers = load_json(SPEAKERS_FILE)
    session_participants = load_json(SESSION_PARTICIPANTS_FILE)
    all_participants = load_json(PARTICIPANTS_FILE)
    sessions = load_json(SESSIONS_FILE)

    # Create nodes and edges
    nodes = []
    edges = []
    node_ids = set()

    # Track who's in which session
    session_members = defaultdict(list)
    person_data = {}
    person_sessions = defaultdict(list)
    person_organizations = {}
    person_countries = {}

    print("\nProcessing speakers...")
    # Add speakers as nodes
    for speaker in speakers:
        speaker_id = speaker['id']
        node_ids.add(speaker_id)

        person_data[speaker_id] = {
            'id': speaker_id,
            'name': speaker['name'],
            'title': speaker.get('title', ''),
            'organization': speaker.get('organization', ''),
            'country': speaker.get('country', ''),
            'category': speaker.get('category', 'speaker'),
            'topics': speaker.get('topics', [])
        }

        person_organizations[speaker_id] = speaker.get('organization', '')
        person_countries[speaker_id] = speaker.get('country', '')

        nodes.append({
            'data': {
                'id': speaker_id,
                'label': speaker['name'],
                'name': speaker['name'],
                'title': speaker.get('title', ''),
                'organization': speaker.get('organization', ''),
                'country': speaker.get('country', ''),
                'type': 'speaker',
                'category': speaker.get('category', 'speaker'),
                'topics': speaker.get('topics', []),
                'size': 60  # Larger size for speakers
            }
        })

    print(f"Added {len(speakers)} speakers")

    # Process session participants
    print("\nProcessing session participants...")
    participant_count = 0
    for session_id, participants in session_participants.items():
        for participant in participants:
            pid = participant['participantId']
            role = participant['role']

            # Track session membership
            session_members[session_id].append(pid)
            person_sessions[pid].append(session_id)

            # Add as node if not already added
            if pid not in node_ids:
                node_ids.add(pid)
                participant_count += 1

                # Try to find full participant data
                full_data = next((p for p in all_participants if p['id'] == pid), None)

                if full_data:
                    org = full_data.get('organization', '')
                    country = full_data.get('country', '')
                    title = full_data.get('title', '')
                else:
                    org = ''
                    country = ''
                    title = ''

                person_data[pid] = {
                    'id': pid,
                    'name': pid.replace('-', ' ').title(),
                    'title': title,
                    'organization': org,
                    'country': country,
                    'category': role,
                    'topics': []
                }

                person_organizations[pid] = org
                person_countries[pid] = country

                # Determine node size based on role
                node_size = {
                    'speaker': 60,
                    'moderator': 50,
                    'panelist': 45,
                    'attendee': 35
                }.get(role, 40)

                nodes.append({
                    'data': {
                        'id': pid,
                        'label': pid.replace('-', ' ').title(),
                        'name': pid.replace('-', ' ').title(),
                        'title': title,
                        'organization': org,
                        'country': country,
                        'type': 'participant',
                        'category': role,
                        'topics': [],
                        'size': node_size
                    }
                })

    print(f"Added {participant_count} participants")

    print("\nGenerating connections...")
    # Generate edges based on different connection types
    edge_id = 0

    # 1. Same session connections
    session_edges = set()
    for session_id, members in session_members.items():
        session_name = next((s['title'] for s in sessions if s['id'] == session_id), session_id)

        for i, person1 in enumerate(members):
            for person2 in members[i+1:]:
                edge_key = tuple(sorted([person1, person2]))
                if edge_key not in session_edges:
                    session_edges.add(edge_key)
                    edges.append({
                        'data': {
                            'id': f'edge-{edge_id}',
                            'source': person1,
                            'target': person2,
                            'type': 'session',
                            'label': f'Session: {session_name}',
                            'weight': 1
                        }
                    })
                    edge_id += 1

    print(f"Created {len(session_edges)} session connections")

    # 2. Same organization connections
    org_groups = defaultdict(list)
    for pid, org in person_organizations.items():
        if org:
            org_groups[org].append(pid)

    org_edges = set()
    for org, members in org_groups.items():
        if len(members) > 1:
            for i, person1 in enumerate(members):
                for person2 in members[i+1:]:
                    edge_key = tuple(sorted([person1, person2]))
                    if edge_key not in org_edges:
                        org_edges.add(edge_key)
                        edges.append({
                            'data': {
                                'id': f'edge-{edge_id}',
                                'source': person1,
                                'target': person2,
                                'type': 'organization',
                                'label': f'Organization: {org}',
                                'weight': 2
                            }
                        })
                        edge_id += 1

    print(f"Created {len(org_edges)} organization connections")

    # 3. Same country connections (optional, can be toggled)
    country_groups = defaultdict(list)
    for pid, country in person_countries.items():
        if country:
            country_groups[country].append(pid)

    country_edges = set()
    for country, members in country_groups.items():
        if len(members) > 1 and len(members) <= 10:  # Only connect if reasonable number
            for i, person1 in enumerate(members):
                for person2 in members[i+1:]:
                    edge_key = tuple(sorted([person1, person2]))
                    if edge_key not in country_edges and edge_key not in session_edges and edge_key not in org_edges:
                        country_edges.add(edge_key)
                        edges.append({
                            'data': {
                                'id': f'edge-{edge_id}',
                                'source': person1,
                                'target': person2,
                                'type': 'country',
                                'label': f'Country: {country}',
                                'weight': 0.5
                            }
                        })
                        edge_id += 1

    print(f"Created {len(country_edges)} country connections")

    # Generate statistics
    stats = {
        'totalNodes': len(nodes),
        'totalEdges': len(edges),
        'speakers': len([n for n in nodes if n['data']['type'] == 'speaker']),
        'participants': len([n for n in nodes if n['data']['type'] == 'participant']),
        'sessionConnections': len(session_edges),
        'organizationConnections': len(org_edges),
        'countryConnections': len(country_edges),
        'organizations': len([org for org in org_groups.keys() if org]),
        'countries': len([country for country in country_groups.keys() if country]),
        'sessions': len(session_members)
    }

    # Build final network data
    network_data = {
        'metadata': {
            'title': 'Nordic Circular Summit 2025 - Network Map',
            'description': 'Day 1 speakers and participants network visualization',
            'generated': '2025-11-20',
            'focus': 'Day 1 - November 19, 2025'
        },
        'stats': stats,
        'elements': {
            'nodes': nodes,
            'edges': edges
        },
        'sessionData': {
            session_id: {
                'title': next((s['title'] for s in sessions if s['id'] == session_id), session_id),
                'memberCount': len(members)
            }
            for session_id, members in session_members.items()
        }
    }

    # Save
    save_json(network_data, OUTPUT_FILE)

    print(f"\n✅ Network data generated successfully!")
    print(f"📁 Saved to: {OUTPUT_FILE}")
    print(f"\n📊 Statistics:")
    print(f"   Nodes: {stats['totalNodes']} ({stats['speakers']} speakers, {stats['participants']} participants)")
    print(f"   Edges: {stats['totalEdges']}")
    print(f"   - Session connections: {stats['sessionConnections']}")
    print(f"   - Organization connections: {stats['organizationConnections']}")
    print(f"   - Country connections: {stats['countryConnections']}")
    print(f"   Organizations: {stats['organizations']}")
    print(f"   Countries: {stats['countries']}")
    print(f"   Sessions: {stats['sessions']}")

    return network_data

if __name__ == '__main__':
    generate_network()
