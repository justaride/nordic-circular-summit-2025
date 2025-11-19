#!/usr/bin/env python3
"""
Enrich speaker biographies from SUMMIT LIBRARY bio documents.

This script:
1. Finds all bio Word documents in SUMMIT LIBRARY
2. Converts them to text
3. Extracts biographical information
4. Matches with existing speakers
5. Updates speakers.json with enriched bios
"""

import json
import re
import subprocess
from pathlib import Path
from typing import Dict, List, Optional
import tempfile

# Paths
PROJECT_ROOT = Path(__file__).parent.parent
SUMMIT_LIBRARY = Path("/Users/gabrielboen/Downloads/SUMMIT LIBRARY ")
SPEAKERS_FILE = PROJECT_ROOT / "data" / "speakers" / "speakers.json"

# Manual bio data extracted from documents
BIOS = {
    "agita-baltbarde": {
        "name": "Agita Baltbārde",
        "bio": "Board Member of the leading Latvian environmental services group CleanR Grupa, Co-Founder of Baltic Circular Hotspot, European Climate Pact Ambassador for Latvia. Author of Latvia's first Circular Economy Index, driving national dialogue on sustainable business transformation. Passionate advocate for environmental literacy, dedicated to integrating responsible practices into core business strategies."
    },
    "gorm-vold": {
        "name": "Gorm Vold",
        "bio": "Chief consultant, with the development of entrepreneurship and innovation in Greenland as key responsibilities. Inspire and guide businesses and entrepreneurs in their journey with business development in Greenland. Focus on international funding and projects within the EU, NPA, and other EU programs, as well as NORA under the Nordic Council of Ministers. Strengthen and develop the municipalities and colleagues in Nalik's advisory function for entrepreneurs, and connect the research community to the field through joint projects."
    },
    "einar-kleppe-holthe": {
        "name": "Einar Kleppe Holthe",
        "bio": "CEO and founder of Natural State, an Oslo based consulting studio specialised in Development Strategy and Value Creation. With more than 20 years of experience in market development, value creation and identity building, Holthe has built and realised numerous large development projects in public and private sectors, such as Innovation Cluster Arena Oslo, the international brand strategy for the City of Oslo, as well as several urban development projects. Prior to Natural State Holthe was the CEO of Stockfleths AS for 12 years, which led him to take over, and rebrand/build, Fuglen (Oslo, Tokyo). He is also the founder of Norwegian Icons, a circular promotion programme for the Norwegian furniture industry. Natural State is responsible for the project management and realisation of Nordic Circular Hotspot."
    },
    "marthe-haugland": {
        "name": "Marthe Haugland",
        "bio": "Senior innovation advisor and Head of Programme Circular Economy at Nordic Innovation. Her responsibilities include developing and implementing Nordic Innovation's Circular Business Model programme. Nordic Innovation's aim is to accelerate the transition to a circular and sustainable Nordic region in line with the Nordic 2030 vision. Nordic Innovation especially works with enabling businesses to build resilience and contribute to the transition by adopting circular business models. Before coming to Nordic Innovation, she worked in Innovation Norway, supporting sustainable innovation projects and working with EU, innovation and businesses."
    },
    "frederik-thrane": {
        "name": "Frederik Thrane",
        "bio": "Head of Circular Economy at Lifestyle & Design Cluster. Enthusiastic, strategic and detail-oriented Danish Design Director and Designer, with a strong international background in lifestyle and apparel design. Commitment to Circularity, environmental and financial sustainability - and to changing the lifestyle & design industry."
    },
    "eva-jorgensen": {
        "name": "Eva Jørgensen",
        "bio": "Legal Consultant at Greenland Business Association, the largest employer organization in Greenland with around 325 members. Eva consults members in all business areas in different legal aspects as well as serve as secretariat of the organizations different industry committees. Besides that, Eva is responsible for the sustainability strategy of the organization, aiming to support the Greenlandic businesses in a sustainable development."
    },
    "alisa-mick": {
        "name": "Alisa Mick",
        "bio": "Founder of MiXi, a seasoned business and organizational consultant with extensive experience in both established corporations and startups within the dynamic Israeli business ecosystem. After making the transition from Tel Aviv to Helsinki in 2018, Alisa co-founded The North Mix, driven by the vision of cultivating international business collaborations. Following a significant project on the circular economy with the Finnish Innovation fund, Sitra, she shifted her main focus to this critical area. In 2021, MiXi Ry was established, rooted in the belief that Nordic expertise and knowledge in the Circular Economy can have a substantial global impact. MiXi operates as a community player, actively organizing entrepreneurship-focused events and programs centered around the Circular Economy."
    },
    "patrick-schroder": {
        "name": "Patrick Schröder",
        "bio": "Senior research fellow at Chatham House. An international sustainability expert specializing in climate change, resource governance, the circular economy, and the Sustainable Development Goals (SDGs). He works at the intersection of science, policy, and media to advance evidence-based policies, communicate complex sustainability issues, and promote equitable governance solutions at the multilateral level. He currently serves as Coordinating Lead Author for the IPCC Assessment Report 7 (WG III – Mitigation) and Coordinating Lead Author for the UN Global Environment Outlook 7."
    },
    "mika-sulkinoja": {
        "name": "Mika Sulkinoja",
        "bio": "Senior Lead at SITRA, helping Sitra to plan and intensify its international co-operation in the circular economy, climate and nature related topics. He leads the work on international projects such as the World Circular Economy Forum. Mika has been involved in hands-on sustainability agenda work for some 25 years. He has worked for the United Nations, the Finnish Government climate negotiation team and private sector. His work has particularly focused on market-based policy measures and financing."
    },
    "luca-de-lorenzo": {
        "name": "Luca De Lorenzo",
        "bio": "Vice-President, Head of Sustainability and Mandate, Member of the Executive Committee at Nordic Investment Bank. Luca has over 15 years of experience in the energy sector and sustainable finance. He is currently part of the executive team at the Nordic Investment Bank and heading the bank's sustainability team. The unit is responsible for assessing all loan transactions for their potential productivity gains and environmental benefits, the two pillars of NIB's mandate. Luca ensures that sustainability and mandate are at the core of the banks operations. Previously to NIB, Luca has worked at the Stockholm Environment Institute, where he has founded the Stockholm Sustainable Finance Centre with the aim to promote research and innovation in green finance and has worked with corporate clients on business strategy and sustainability while at The Boston Consulting Group."
    }
}


def generate_id(name: str) -> str:
    """Generate a slug-style ID from a name."""
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')


def enrich_speakers():
    """Enrich speaker bios from the manual bio data."""
    print("🔍 Enriching speaker biographies...\n")

    # Load existing speakers
    with open(SPEAKERS_FILE, 'r', encoding='utf-8') as f:
        speakers = json.load(f)

    enriched_count = 0
    updated_count = 0

    for speaker in speakers:
        speaker_id = speaker['id']

        # Check if we have bio data for this speaker
        if speaker_id in BIOS:
            bio_data = BIOS[speaker_id]

            # Only update if current bio is short or generic
            current_bio = speaker.get('bio', '')
            if len(current_bio) < 100 or current_bio == "Bio to be added":
                speaker['bio'] = bio_data['bio']
                enriched_count += 1
                print(f"  ✓ Enriched: {speaker['name']}")
            elif len(bio_data['bio']) > len(current_bio):
                # Replace with longer, more detailed bio
                speaker['bio'] = bio_data['bio']
                updated_count += 1
                print(f"  ↻ Updated: {speaker['name']} (more detailed bio)")

    # Save enriched speakers
    with open(SPEAKERS_FILE, 'w', encoding='utf-8') as f:
        json.dump(speakers, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Biography enrichment complete!")
    print(f"  • Enriched {enriched_count} speakers with new bios")
    print(f"  • Updated {updated_count} speakers with improved bios")
    print(f"  • Total speakers processed: {len(speakers)}")


def main():
    """Main execution."""
    print("\n🚀 Starting speaker biography enrichment...\n")
    enrich_speakers()
    print("\n✨ Done!\n")


if __name__ == "__main__":
    main()
