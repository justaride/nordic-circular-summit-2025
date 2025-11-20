#!/usr/bin/env python3
"""
Day 1 Data Aggregation Script
Aggregates all Day 1 session data into a master JSON structure
"""

import json
import os
from pathlib import Path
from datetime import datetime

# Define base paths
BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data"
OUTPUTS_DIR = BASE_DIR / "outputs"

# Session metadata
SESSIONS = [
    {
        "id": "session-1",
        "title": "Circular Frontiers - Shaping our Future",
        "time": "09:15-10:30",
        "transcript": "session-1-circular-frontiers.json",
        "article": "session-1-circular-frontiers-article.md",
        "quotes": "session-1-key-quotes-and-themes.md"
    },
    {
        "id": "session-2",
        "title": "Circular Ocean Industries",
        "time": "10:45-11:45",
        "transcript": "session-2-circular-ocean.json",
        "article": "session-2-circular-ocean-article.md",
        "quotes": "session-2-key-quotes-and-themes.md"
    },
    {
        "id": "session-3",
        "title": "Locally Rooted - Materialising a Circular Future",
        "time": "12:45-13:30",
        "transcript": "session-3-locally-rooted.json",
        "article": "session-3-locally-rooted-article.md",
        "quotes": "session-3-key-quotes-and-themes.md"
    },
    {
        "id": "session-4",
        "title": "Arctic & Nordic Lifestyles",
        "time": "13:45-14:45",
        "transcript": "session-4-arctic-lifestyles.json",
        "article": "session-4-arctic-lifestyles-article.md",
        "quotes": "session-4-key-quotes-and-themes.md"
    },
    {
        "id": "session-5",
        "title": "Circular Cities & Regions",
        "time": "15:00-16:00",
        "transcript": "session-5-circular-cities.json",
        "article": "session-5-circular-cities-article.md",
        "quotes": "session-5-key-quotes-and-themes.md"
    },
    {
        "id": "session-6",
        "title": "Day 1 Summary - Closing Reflections",
        "time": "16:15-16:45",
        "transcript": "session-day1-summary.json",
        "article": "session-day1-summary-reflections.md",
        "quotes": "session-day1-summary-key-quotes.md"
    }
]

def load_json_file(filepath):
    """Load JSON file safely"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return None

def load_text_file(filepath):
    """Load text file safely"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return None

def extract_quotes_from_transcript(transcript_data):
    """Extract all quotes from transcript"""
    quotes = []

    if not transcript_data:
        return quotes

    # Extract from key_quotes field if present
    if 'key_quotes' in transcript_data:
        for quote_obj in transcript_data['key_quotes']:
            quotes.append({
                'text': quote_obj.get('quote', ''),
                'speaker': quote_obj.get('speaker', 'Unknown'),
                'context': quote_obj.get('context', ''),
                'timestamp': quote_obj.get('timestamp', '')
            })

    # Extract highlighted quotes from segments
    if 'segments' in transcript_data:
        for segment in transcript_data['segments']:
            if segment.get('is_key_point', False) or segment.get('highlighted', False):
                quotes.append({
                    'text': segment.get('text', ''),
                    'speaker': segment.get('speaker', 'Unknown'),
                    'timestamp': segment.get('timestamp', ''),
                    'context': 'From transcript segment'
                })

    return quotes

def extract_themes_from_transcript(transcript_data):
    """Extract themes from transcript"""
    themes = []

    if not transcript_data:
        return themes

    if 'key_themes' in transcript_data:
        themes.extend(transcript_data['key_themes'])

    if 'themes' in transcript_data:
        themes.extend(transcript_data['themes'])

    return list(set(themes))  # Remove duplicates

def extract_speakers_from_transcript(transcript_data):
    """Extract speakers from transcript"""
    speakers = []

    if not transcript_data:
        return speakers

    if 'speakers' in transcript_data:
        for speaker in transcript_data['speakers']:
            if isinstance(speaker, dict):
                speakers.append({
                    'name': speaker.get('name', ''),
                    'organization': speaker.get('organization', ''),
                    'role': speaker.get('role', '')
                })
            else:
                speakers.append({'name': speaker, 'organization': '', 'role': ''})

    return speakers

def count_words(text):
    """Count words in text"""
    if not text:
        return 0
    return len(text.split())

def aggregate_session_data(session_meta):
    """Aggregate data for a single session"""
    print(f"\nProcessing: {session_meta['title']}")

    # Load transcript
    transcript_path = DATA_DIR / "transcripts" / session_meta['transcript']
    transcript_data = load_json_file(transcript_path)

    # Load article
    article_path = OUTPUTS_DIR / "articles" / session_meta['article']
    article_text = load_text_file(article_path)

    # Load quotes document
    quotes_path = OUTPUTS_DIR / "highlights" / session_meta['quotes']
    quotes_text = load_text_file(quotes_path)

    # Extract data
    quotes = extract_quotes_from_transcript(transcript_data)
    themes = extract_themes_from_transcript(transcript_data)
    speakers = extract_speakers_from_transcript(transcript_data)

    # Calculate stats
    article_words = count_words(article_text)
    transcript_words = count_words(json.dumps(transcript_data)) if transcript_data else 0

    session_data = {
        'id': session_meta['id'],
        'title': session_meta['title'],
        'time': session_meta['time'],
        'duration_minutes': calculate_duration(session_meta['time']),
        'speakers': speakers,
        'speaker_count': len(speakers),
        'quotes': quotes,
        'quote_count': len(quotes),
        'themes': themes,
        'theme_count': len(themes),
        'article_word_count': article_words,
        'transcript_available': transcript_data is not None,
        'has_article': article_text is not None,
        'has_quotes': quotes_text is not None
    }

    print(f"  ✓ Speakers: {len(speakers)}")
    print(f"  ✓ Quotes: {len(quotes)}")
    print(f"  ✓ Themes: {len(themes)}")
    print(f"  ✓ Article: {article_words:,} words")

    return session_data

def calculate_duration(time_range):
    """Calculate duration in minutes from time range"""
    try:
        start, end = time_range.split('-')
        start_hour, start_min = map(int, start.split(':'))
        end_hour, end_min = map(int, end.split(':'))

        start_total = start_hour * 60 + start_min
        end_total = end_hour * 60 + end_min

        return end_total - start_total
    except:
        return 0

def identify_cross_session_themes(all_sessions):
    """Identify themes that appear in multiple sessions"""
    theme_sessions = {}

    for session in all_sessions:
        for theme in session['themes']:
            theme_lower = theme.lower()
            if theme_lower not in theme_sessions:
                theme_sessions[theme_lower] = []
            theme_sessions[theme_lower].append({
                'session_id': session['id'],
                'session_title': session['title']
            })

    # Filter to themes appearing in 2+ sessions
    cross_session = {
        theme: sessions
        for theme, sessions in theme_sessions.items()
        if len(sessions) >= 2
    }

    return cross_session

def aggregate_all_data():
    """Main aggregation function"""
    print("=" * 60)
    print("DAY 1 DATA AGGREGATION")
    print("=" * 60)

    # Process all sessions
    all_sessions = []
    for session_meta in SESSIONS:
        session_data = aggregate_session_data(session_meta)
        all_sessions.append(session_data)

    # Aggregate cross-session data
    print("\n" + "=" * 60)
    print("CROSS-SESSION ANALYSIS")
    print("=" * 60)

    all_quotes = [quote for session in all_sessions for quote in session['quotes']]
    all_themes = list(set([theme for session in all_sessions for theme in session['themes']]))
    all_speakers = []
    speaker_names = set()

    for session in all_sessions:
        for speaker in session['speakers']:
            name = speaker['name']
            if name and name not in speaker_names:
                speaker_names.add(name)
                all_speakers.append(speaker)

    cross_session_themes = identify_cross_session_themes(all_sessions)

    # Calculate statistics
    total_duration = sum(s['duration_minutes'] for s in all_sessions)
    total_words = sum(s['article_word_count'] for s in all_sessions)

    print(f"\n✓ Total Sessions: {len(all_sessions)}")
    print(f"✓ Total Duration: {total_duration} minutes ({total_duration/60:.1f} hours)")
    print(f"✓ Total Speakers: {len(all_speakers)}")
    print(f"✓ Total Quotes: {len(all_quotes)}")
    print(f"✓ Unique Themes: {len(all_themes)}")
    print(f"✓ Cross-Session Themes: {len(cross_session_themes)}")
    print(f"✓ Total Article Words: {total_words:,}")

    # Create master data structure
    master_data = {
        'metadata': {
            'event': 'Nordic Circular Summit 2025 - Day 1',
            'date': '2025-11-19',
            'location': 'Hans Egede Hotel, Nuuk, Greenland',
            'generated': datetime.now().isoformat(),
            'session_count': len(all_sessions),
            'total_duration_minutes': total_duration,
            'total_speakers': len(all_speakers),
            'total_quotes': len(all_quotes),
            'total_themes': len(all_themes),
            'cross_session_themes': len(cross_session_themes),
            'total_article_words': total_words
        },
        'sessions': all_sessions,
        'aggregated': {
            'all_quotes': all_quotes,
            'all_themes': all_themes,
            'all_speakers': all_speakers,
            'cross_session_themes': cross_session_themes
        },
        'statistics': {
            'quotes_per_session': len(all_quotes) / len(all_sessions),
            'themes_per_session': len(all_themes) / len(all_sessions),
            'speakers_per_session': len(all_speakers) / len(all_sessions),
            'words_per_session': total_words / len(all_sessions),
            'duration_per_session': total_duration / len(all_sessions)
        }
    }

    # Save master data
    output_dir = DATA_DIR / "aggregated"
    output_dir.mkdir(exist_ok=True)

    output_path = output_dir / "day1-master.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(master_data, f, indent=2, ensure_ascii=False)

    print(f"\n✓ Master data saved to: {output_path}")
    print(f"  File size: {output_path.stat().st_size / 1024:.1f} KB")

    # Print top cross-session themes
    print("\n" + "=" * 60)
    print("TOP CROSS-SESSION THEMES")
    print("=" * 60)

    sorted_themes = sorted(
        cross_session_themes.items(),
        key=lambda x: len(x[1]),
        reverse=True
    )[:10]

    for theme, sessions in sorted_themes:
        print(f"\n{theme.title()} ({len(sessions)} sessions):")
        for session in sessions:
            print(f"  - {session['session_title']}")

    return master_data

if __name__ == "__main__":
    master_data = aggregate_all_data()
    print("\n" + "=" * 60)
    print("✓ PHASE 1 COMPLETE")
    print("=" * 60)
