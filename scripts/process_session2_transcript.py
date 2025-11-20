#!/usr/bin/env python3
"""
Process Session 2 Whisper transcription and create structured JSON
"""
import json
import re

# Speaker mapping from Whisper to actual IDs
SPEAKER_MAP = {
    "Speaker 1": "cathrine-barth",
    "Speaker 2": "alexandra-leeper",
    "Speaker 3": "kristian-ottesen",
    "Speaker 4": None,  # Video testimonial
    "Speaker 5": None,  # Video testimonial
    "Speaker 6": "michaela-lindstrom",
    "Speaker 7": "linn-indrestrand",
    "Speaker 8": "monika-poulsen"
}

def process_transcript():
    # Read Whisper transcription
    with open("/Users/gabrielboen/Downloads/Circular ocean industries .json", 'r') as f:
        whisper_data = json.load(f)

    # Define session parts based on content analysis
    parts = [
        {
            "id": "part-introduction",
            "title": "Introduction & Iceland Ocean Cluster",
            "startTime": "10:45",
            "endTime": "11:05",
            "description": "Introduction by moderator and presentation by Alexandra Leeper on 100% Fish philosophy and Iceland Ocean Cluster's work",
            "speakers": ["cathrine-barth", "alexandra-leeper"],
            "segments": [],
            "notes": "Alexandra presenting remotely from Reykjavik. Covers 100% Fish methodology, sister clusters network, 100% Shrimp project with Royal Greenland, and Nordic Nexus Network."
        },
        {
            "id": "part-royal-greenland",
            "title": "Royal Greenland 100% Shrimp Project",
            "startTime": "11:05",
            "endTime": "11:20",
            "description": "Kristian Ottesen presents Royal Greenland's transformation journey from waste to value",
            "speakers": ["kristian-ottesen", "cathrine-barth"],
            "segments": [],
            "notes": "Includes testimonial video from project partners. Covers transformation of shrimp meal factory from -800K DKK annual loss to profitable operation. Key stats: 12-15K tons raw material, 56-66% historically discarded."
        },
        {
            "id": "part-hylia-startup",
            "title": "Hylia Nordic - Startup Perspective",
            "startTime": "11:20",
            "endTime": "11:30",
            "description": "Michaela Lindström shares startup journey transforming seafood side streams into food products",
            "speakers": ["michaela-lindstrom", "cathrine-barth"],
            "segments": [],
            "notes": "Focus on Baltic herring, 15% of global seafood wasted at processing stage. Products launched in Finnish retail. Side streams are 'superfood' with superior nutrition to fillets."
        },
        {
            "id": "part-panel-discussion",
            "title": "Panel Discussion - Enablers & Collaboration",
            "startTime": "11:30",
            "endTime": "11:43",
            "description": "Panel discussion on role of clusters, cross-sectoral collaboration, logistics, and trust-building",
            "speakers": ["linn-indrestrand", "monika-poulsen", "kristian-ottesen", "cathrine-barth"],
            "segments": [],
            "notes": "Key themes: trust as foundation, cross-sectoral partnerships, logistics critical for volumes, ports as enablers, cluster role in scouting and connecting partners."
        },
        {
            "id": "part-closing",
            "title": "Closing Reflections",
            "startTime": "11:43",
            "endTime": "11:45",
            "description": "Final reflections from Alexandra Leeper and closing by moderator",
            "speakers": ["alexandra-leeper", "cathrine-barth"],
            "segments": [],
            "notes": "Alexandra emphasizes importance of trust, relationship building, finding connecting pieces across ecosystems."
        }
    ]

    # Assign segments to parts based on content and speaker sequence
    current_part = 0
    segment_index = 0

    for i, item in enumerate(whisper_data):
        speaker_id = SPEAKER_MAP.get(item.get("speaker"))
        text = item.get("text", "").strip()

        if not text:
            continue

        # Determine which part this segment belongs to
        # Part transitions based on speaker changes and content
        if i > 25 and speaker_id == "kristian-ottesen" and current_part == 0:
            current_part = 1  # Transition to Royal Greenland part
        elif i > 90 and speaker_id == "michaela-lindstrom" and current_part <= 1:
            current_part = 2  # Transition to Hylia part
        elif i > 105 and (speaker_id in ["linn-indrestrand", "monika-poulsen"]) and current_part <= 2:
            current_part = 3  # Transition to panel discussion
        elif i > 210 and speaker_id == "alexandra-leeper" and current_part <= 3:
            current_part = 4  # Transition to closing

        segment = {
            "startTime": parts[current_part]["startTime"],
            "endTime": parts[current_part]["endTime"],
            "text": text,
            "speakerId": speaker_id
        }

        parts[current_part]["segments"].append(segment)

    # Create final transcript structure
    transcript = {
        "id": "transcript-session-2-ocean",
        "sessionId": "circular-ocean-industries",
        "date": "2025-11-19",
        "recordingFile": "Circular ocean industries",
        "transcriptionStatus": "completed",
        "notes": "Complete transcription from Whisper. All speakers identified and mapped. Focus on 100% Fish/Shrimp philosophy, Royal Greenland transformation, Hylia startup journey, and ocean clusters as enablers.",
        "metadata": {
            "duration": "60 minutes",
            "language": "English",
            "transcribedBy": "Whisper AI",
            "reviewedBy": "Claude Code",
            "transcriptionDate": "2025-11-19",
            "participantCount": 6
        },
        "parts": parts
    }

    # Write output
    output_path = "/Users/gabrielboen/nordic-circular-summit-2025/nordic-circular-summit-2025/data/transcripts/session-2-circular-ocean.json"
    with open(output_path, 'w') as f:
        json.dump(transcript, f, indent=2, ensure_ascii=False)

    print(f"✅ Created: {output_path}")
    print(f"📊 Parts: {len(parts)}")
    print(f"📝 Total segments: {sum(len(p['segments']) for p in parts)}")

    return transcript

if __name__ == "__main__":
    process_transcript()
