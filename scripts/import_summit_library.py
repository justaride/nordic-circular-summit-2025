#!/usr/bin/env python3
"""
Import and transform SUMMIT LIBRARY data into the project data structure.

This script:
1. Imports historical participant network data from CSV
2. Imports session-specific participant data from Notion exports
3. Matches and enriches current speakers with additional contact info
4. Generates comprehensive JSON data files
"""

import csv
import json
import re
from pathlib import Path
from typing import Dict, List, Any, Optional
from collections import defaultdict

# Paths
PROJECT_ROOT = Path(__file__).parent.parent
SUMMIT_LIBRARY = Path("/Users/gabrielboen/Downloads/SUMMIT LIBRARY ")
DATA_DIR = PROJECT_ROOT / "data"
PARTICIPANTS_DIR = DATA_DIR / "participants"

# Source files
HISTORICAL_CSV = SUMMIT_LIBRARY / "Håvard noder og koblinger - Summit Konsolidert.csv"
NAMES_CSV = SUMMIT_LIBRARY / "drive-download-20251119T171303Z-1-001" / "Names 26ff447d5b4380498c0dc0b2267a417e.csv"

SESSION_CSVS = {
    "session-1-opening": SUMMIT_LIBRARY / "drive-download-20251119T171303Z-1-001" / "Opening Session 09 15-10 30 (60 minutes) 29af447d5b43801fa9acf7dc4a5a6fe0.csv",
    "session-2-ocean": SUMMIT_LIBRARY / "drive-download-20251119T171303Z-1-001" / "Circular Ocean Industries 10 45 - 11 45 (60 minute 287f447d5b438046a853f7d4fec65b87.csv",
    "session-3-locally-rooted": SUMMIT_LIBRARY / "drive-download-20251119T171303Z-1-001" / "Locally Rooted 12 45 - 13 30 (45 min) 287f447d5b43809aa391e5acd5e6f98c.csv",
    "session-4-arctic": SUMMIT_LIBRARY / "drive-download-20251119T171303Z-1-001" / "Arctic & Nordic Lifestyles 13 45 - 14 45 (60 minut 287f447d5b4380dc9ea8cf91b05ee8a4.csv",
    "session-5-regions": SUMMIT_LIBRARY / "drive-download-20251119T171303Z-1-001" / "Circular Regions & Cities 15 00 - 16 00 (60 minute 28cf447d5b438076a994d8a19a306b97.csv",
}


def clean_notion_url(text: str) -> str:
    """Remove Notion URLs from text."""
    if not text:
        return ""
    # Remove Notion links like (https://www.notion.so/...)
    return re.sub(r'\s*\(https://www\.notion\.so/[^)]+\)', '', text).strip()


def parse_years(years_str: str) -> List[int]:
    """Parse years string like '2020, 2021, 2023' into list of integers."""
    if not years_str or years_str == "N/A":
        return []

    years = []
    for year in years_str.split(','):
        year = year.strip()
        if year.isdigit():
            years.append(int(year))
    return years


def generate_id(name: str) -> str:
    """Generate a slug-style ID from a name."""
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')


def extract_emails(email_str: str) -> List[str]:
    """Extract multiple email addresses from a string."""
    if not email_str or email_str == "N/A":
        return []

    # Split by comma and clean
    emails = [e.strip() for e in email_str.split(',')]
    return [e for e in emails if e and '@' in e]


def import_historical_network() -> Dict[str, Any]:
    """Import historical participant network data from CSV."""
    print("📊 Importing historical network data...")

    network_contacts = []
    participants_map = {}

    with open(HISTORICAL_CSV, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)

        for row in reader:
            name = row.get('Navn', '').strip()
            if not name or name == "NAME":
                continue

            participant_id = generate_id(name)
            organization = row.get('Selskap/organisasjon', '').strip() or "N/A"
            title = row.get('Tittel', '').strip() or ""
            email = row.get('epost', '').strip() or None
            phone = row.get('Phone', '').strip() or None
            linkedin = row.get('LinkedIN (or other SoMe)', '').strip() or None
            country = row.get('Country', '').strip() or None
            segment = row.get('Segment', '').strip() or None
            years_str = row.get('Årstall ', '').strip() or ""

            # Parse years participated
            years = parse_years(years_str)

            # Create participation history records
            participation_history = []
            for year in years:
                participation_history.append({
                    "year": year,
                    "organization": organization,
                    "title": title if title else None
                })

            # Create participant object
            participant = {
                "id": participant_id,
                "name": name,
                "title": title or "",
                "organization": organization,
                "country": country or "",
                "email": email,
                "phone": phone,
                "linkedin": linkedin,
                "participationHistory": participation_history,
                "sessionRoles": [],  # Will be populated from session CSVs
                "segment": segment
            }

            participants_map[participant_id] = participant

            # Also create network contact entry
            network_contact = {
                "id": participant_id,
                "name": name,
                "organization": organization,
                "yearsParticipated": years
            }

            # Add optional fields only if they exist
            if title:
                network_contact["title"] = title
            if email:
                network_contact["email"] = email
            if phone:
                network_contact["phone"] = phone
            if linkedin:
                network_contact["linkedin"] = linkedin
            if country:
                network_contact["country"] = country
            if segment:
                network_contact["segment"] = segment

            network_contacts.append(network_contact)

    print(f"  ✓ Imported {len(network_contacts)} historical contacts")

    return {
        "participants": participants_map,
        "network_contacts": network_contacts
    }


def import_session_participants(participants_map: Dict[str, Any]) -> Dict[str, List[Any]]:
    """Import session-specific participant data from Notion CSV exports."""
    print("📋 Importing session participant data...")

    session_participants = defaultdict(list)

    for session_id, csv_path in SESSION_CSVS.items():
        if not csv_path.exists():
            print(f"  ⚠ Warning: {csv_path.name} not found, skipping")
            continue

        with open(csv_path, 'r', encoding='utf-8') as f:
            # Skip BOM if present
            content = f.read()
            if content.startswith('\ufeff'):
                content = content[1:]

            reader = csv.DictReader(content.splitlines())

            for row in reader:
                # Get name - it might be in 'Name' or 'Name ' column
                name = row.get('Name', '') or row.get('Name ', '')
                name = clean_notion_url(name).strip()

                if not name or name == "SESSION" or not name:
                    continue

                # Handle multiple names in one cell (separated by comma)
                names = [n.strip() for n in name.split(',')]

                for individual_name in names:
                    if not individual_name:
                        continue

                    participant_id = generate_id(individual_name)

                    # Extract other fields
                    email_raw = row.get('E-mail', '') or row.get('CC - E-mail', '')
                    emails = extract_emails(email_raw)
                    email = emails[0] if emails else None

                    role = row.get('Role', '').lower().strip()
                    if 'speaker' in role:
                        role = 'speaker'
                    elif 'moderator' in role:
                        role = 'moderator'
                    elif 'panelist' in role:
                        role = 'panelist'
                    else:
                        role = 'attendee'

                    status = row.get('Status', '').lower().strip()
                    if not status or status not in ['confirmed', 'declined', 'pending', 'in_contact']:
                        status = 'confirmed'

                    presence = row.get('Presence', '').lower().strip()
                    if 'nuuk' in presence and 'digital' in presence:
                        presence = 'hybrid'
                    elif 'nuuk' in presence:
                        presence = 'nuuk'
                    elif 'digital' in presence:
                        presence = 'digital'
                    else:
                        presence = 'nuuk'  # default

                    segment = row.get('segment', '').strip() or None
                    time_slot = row.get('Time', '').strip() or None

                    # Create session role
                    session_role = {
                        "sessionId": session_id,
                        "role": role,
                        "status": status,
                        "presence": presence,
                        "timeSlot": time_slot,
                        "segment": segment
                    }

                    # Add to or update participant
                    if participant_id in participants_map:
                        # Existing participant - add session role
                        participants_map[participant_id]['sessionRoles'].append(session_role)

                        # Update email if not present
                        if email and not participants_map[participant_id].get('email'):
                            participants_map[participant_id]['email'] = email
                    else:
                        # New participant (2025 only, not in historical data)
                        organization = row.get('Organization', '').strip()
                        organization = clean_notion_url(organization) if organization else "N/A"

                        country = row.get('Country', '').strip() or ""
                        gender = row.get('Gender', '').strip() or None

                        participants_map[participant_id] = {
                            "id": participant_id,
                            "name": individual_name,
                            "title": "",  # Not in session CSVs
                            "organization": organization,
                            "country": country,
                            "email": email,
                            "gender": gender,
                            "participationHistory": [{
                                "year": 2025,
                                "organization": organization
                            }],
                            "sessionRoles": [session_role]
                        }

                    # Also create session participant entry
                    session_participants[session_id].append({
                        "sessionId": session_id,
                        "participantId": participant_id,
                        "role": role,
                        "status": status,
                        "presence": presence,
                        "timeSlot": time_slot
                    })

        print(f"  ✓ Imported {len(session_participants[session_id])} participants for {session_id}")

    return dict(session_participants)


def enrich_speakers(participants_map: Dict[str, Any]) -> None:
    """Match and enrich current speakers with data from participants map."""
    print("🔍 Enriching current speakers...")

    speakers_file = DATA_DIR / "speakers" / "speakers.json"

    with open(speakers_file, 'r', encoding='utf-8') as f:
        speakers = json.load(f)

    enriched_count = 0

    for speaker in speakers:
        speaker_id = speaker['id']

        # Try to find matching participant
        if speaker_id in participants_map:
            participant = participants_map[speaker_id]

            # Enrich contact info if not present
            if not speaker.get('contact'):
                speaker['contact'] = {}

            if participant.get('email') and not speaker['contact'].get('email'):
                speaker['contact']['email'] = participant['email']
                enriched_count += 1

            if participant.get('phone') and not speaker['contact'].get('phone'):
                speaker['contact']['phone'] = participant['phone']
                enriched_count += 1

            if participant.get('linkedin') and not speaker['contact'].get('linkedin'):
                speaker['contact']['linkedin'] = participant['linkedin']
                enriched_count += 1

    # Write back enriched speakers
    with open(speakers_file, 'w', encoding='utf-8') as f:
        json.dump(speakers, f, indent=2, ensure_ascii=False)

    print(f"  ✓ Enriched {enriched_count} speaker contact fields")


def save_data(participants_map: Dict[str, Any], network_contacts: List[Any],
              session_participants: Dict[str, List[Any]]) -> None:
    """Save all data to JSON files."""
    print("💾 Saving data files...")

    # Create participants directory if needed
    PARTICIPANTS_DIR.mkdir(parents=True, exist_ok=True)

    # Convert participants map to list
    participants = list(participants_map.values())

    # Save participants
    participants_file = PARTICIPANTS_DIR / "participants.json"
    with open(participants_file, 'w', encoding='utf-8') as f:
        json.dump(participants, f, indent=2, ensure_ascii=False)
    print(f"  ✓ Saved {len(participants)} participants to {participants_file.relative_to(PROJECT_ROOT)}")

    # Save network contacts
    network_file = PARTICIPANTS_DIR / "network-contacts.json"
    with open(network_file, 'w', encoding='utf-8') as f:
        json.dump(network_contacts, f, indent=2, ensure_ascii=False)
    print(f"  ✓ Saved {len(network_contacts)} network contacts to {network_file.relative_to(PROJECT_ROOT)}")

    # Save session participants
    session_participants_file = PARTICIPANTS_DIR / "session-participants.json"
    with open(session_participants_file, 'w', encoding='utf-8') as f:
        json.dump(session_participants, f, indent=2, ensure_ascii=False)

    total_session_participants = sum(len(v) for v in session_participants.values())
    print(f"  ✓ Saved {total_session_participants} session participant records to {session_participants_file.relative_to(PROJECT_ROOT)}")


def main():
    """Main execution."""
    print("\n🚀 Starting SUMMIT LIBRARY data import...\n")

    # Step 1: Import historical network
    data = import_historical_network()
    participants_map = data['participants']
    network_contacts = data['network_contacts']

    # Step 2: Import session participants
    session_participants = import_session_participants(participants_map)

    # Step 3: Enrich current speakers
    enrich_speakers(participants_map)

    # Step 4: Save all data
    save_data(participants_map, network_contacts, session_participants)

    print("\n✅ Data import complete!")
    print(f"\n📊 Summary:")
    print(f"  • Total participants: {len(participants_map)}")
    print(f"  • Network contacts: {len(network_contacts)}")
    print(f"  • Sessions with participants: {len(session_participants)}")
    print(f"  • Total session participant records: {sum(len(v) for v in session_participants.values())}")


if __name__ == "__main__":
    main()
