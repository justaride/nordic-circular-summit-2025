#!/usr/bin/env python3
"""
Enrich sessions.json with detailed descriptions and context from SUMMIT LIBRARY
"""

import json
import os

# File paths
SESSIONS_FILE = os.path.join(os.path.dirname(__file__), '..', 'data', 'sessions', 'sessions.json')

# Detailed session enrichment data extracted from SUMMIT LIBRARY master descriptions
SESSION_ENRICHMENT = {
    "circular-frontiers-opening": {
        "detailedDescription": """Opening session exploring how entrepreneurship, circular business models, and funding can evolve the circular transition in the Nordics and beyond. The session addresses the new geopolitical situation creating a circular force in the economy through localized value chains, and examines how the Green Deal (ESPR, circular action plan) is accelerating change.

The session investigates circular innovation across Nordic and Arctic borders, highlighting the unique Nordic spirit of entrepreneurship and how entrepreneurs, intrapreneurs, innovators and founders are key for evolving the new circular market.""",
        "extendedKeywords": [
            "circular economy",
            "innovation",
            "arctic",
            "nordic",
            "circular frontiers",
            "entrepreneurship",
            "geopolitical resilience",
            "value chains",
            "Green Deal",
            "ESPR",
            "circular business models",
            "funding",
            "market transition"
        ],
        "themes": [
            "The new geopolitical situation creating circular economy momentum",
            "Resilience through localized value chains",
            "Green Deal and ESPR implementation",
            "Entrepreneurship as driver for circular transition",
            "Nordic collaboration and innovation"
        ]
    },
    "circular-ocean-industries": {
        "detailedDescription": """Nordic collaboration in blue industry, exploring how ocean-based industries can embrace circular economy principles. The session focuses on sustainable fisheries management, marine resource utilization, and industrial symbiosis in ocean industries.

Key themes include building resilient ocean value chains, reducing waste in fisheries, and creating circular business models for marine resources. Participants examine best practices from Nordic ocean clusters and innovative approaches to ocean sustainability.""",
        "extendedKeywords": [
            "ocean economy",
            "fisheries",
            "marine resources",
            "circular economy",
            "blue industry",
            "nordic collaboration",
            "sustainable fishing",
            "marine waste reduction",
            "ocean clusters",
            "blue bioeconomy"
        ],
        "themes": [
            "Circular principles in fisheries and ocean industries",
            "Nordic ocean cluster collaboration",
            "Marine resource optimization",
            "Waste reduction in fishing operations",
            "Sustainable blue economy business models"
        ]
    },
    "locally-rooted-materialising": {
        "detailedDescription": """Nature is regenerative – it continuously recreates itself without doing any harm. This session investigates how we can reinstate the human connection with nature by learning from natural systems and move towards a flourishing regenerative future.

The session explores regenerative business models, bioeconomy, and biomimicry. Historically, a key motivation for change is business opportunity, so we examine what it takes to build financially viable, nature-positive businesses. Topics include nature valuation, ecosystem services, resource stewardship, and how to transition from nature-negative to nature-positive business models.

Focus on locally sourced materials, seasonal food systems, local production knowledge, and material innovation using Arctic and Nordic resources.""",
        "extendedKeywords": [
            "materials",
            "local sourcing",
            "innovation",
            "circular design",
            "self-sufficiency",
            "local economy",
            "food systems",
            "regenerative business",
            "bioeconomy",
            "biomimicry",
            "nature valuation",
            "resource stewardship",
            "nature-positive business",
            "ecosystem services"
        ],
        "themes": [
            "Nature as regenerative model for business",
            "Biomimicry and learning from natural systems",
            "Economics of nature and nature valuation",
            "Regenerative business models",
            "Local material innovation and self-sufficiency",
            "Seasonal food systems and Arctic resources",
            "Resource stewardship and finite resources"
        ]
    },
    "arctic-nordic-lifestyles": {
        "detailedDescription": """Exploring circular traditions, culture, and knowledge embedded in Arctic and Nordic lifestyles. The session examines how traditional knowledge and cultural practices inform sustainable consumption and circular living.

Topics include textile circularity with focus on Nordic materials (wool, qiviut), sustainable lifestyle choices, behavioral change toward circularity, and the role of design in shaping circular consumption patterns. The session highlights how circularity can evolve from individual actions to societal norms.

Discussion covers the new normal in consumer behavior, sufficiency in consumption, and how Nordic values of trust, collaboration, and inclusiveness support circular transitions.""",
        "extendedKeywords": [
            "lifestyle",
            "consumption",
            "sustainability",
            "culture",
            "textiles",
            "traditional knowledge",
            "behavioral change",
            "circular culture",
            "sustainable fashion",
            "nordic materials",
            "wool",
            "qiviut",
            "sufficiency",
            "design for circularity",
            "consumer behavior"
        ],
        "themes": [
            "Traditional knowledge and circular practices",
            "Textile circularity and Nordic materials",
            "Behavioral change and the new normal",
            "Design for circular lifestyles",
            "Cultural values supporting circularity",
            "Sufficiency in consumption",
            "Indigenous knowledge and sustainability"
        ]
    },
    "circular-cities-regions": {
        "detailedDescription": """How can digitalization and AI accelerate the circular transition in the Nordics? This session explores how AI and emerging technologies drive circular change in business and society. We examine how innovations such as Digital Product Passports (DPP) enhance operational efficiency, improve decision-making processes, and enable new business models that support circularity.

Participants gain insights into how advanced technologies enable development of cutting-edge solutions in dynamic collaborations between corporations and startups. Topics include data sharing, transparency, trust, and human-computer interaction (HCI) in circular systems.

The session also addresses circular leadership at regional level - how cities and regions can take brave decisions and risks to establish circular leadership. Discussion covers organizational culture, communication, KPIs for circularity, and how circular goals are executed across governance levels.""",
        "extendedKeywords": [
            "smart cities",
            "technology",
            "digitalization",
            "regional development",
            "circular economy",
            "AI",
            "enabling technologies",
            "Digital Product Passport",
            "DPP",
            "data sharing",
            "transparency",
            "collaboration",
            "HCI",
            "human-computer interaction",
            "circular leadership",
            "governance",
            "KPIs"
        ],
        "themes": [
            "AI and emerging technologies for circularity",
            "Digital Product Passports and traceability",
            "Data sharing and transparency",
            "Corporation-startup collaboration",
            "Circular leadership and governance",
            "Regional circular strategies",
            "Technology-enabled circular business models",
            "Smart city circular infrastructure"
        ]
    },
    "partner-digital-sessions": {
        "detailedDescription": """Full day of digital sessions hosted by Summit Partners, showcasing circular initiatives, research, and case studies from across the Arctic and Nordic region. Sessions cover diverse topics including textile transition, critical raw materials, circular knowledge sharing, waste management, local production, ocean partnerships, and financing.

These sessions provide platforms for partners to share their work, build networks, and demonstrate circular solutions in action. Thematic focus areas include Nordic Baltic Textile Transition Group initiatives, circular approaches to critical raw materials, knowledge exchange platforms, and innovative financing mechanisms for circular projects.""",
        "extendedKeywords": [
            "research",
            "case studies",
            "initiatives",
            "circular economy",
            "partnerships",
            "textile transition",
            "critical raw materials",
            "circular knowledge",
            "waste management",
            "financing",
            "collaboration",
            "network building"
        ],
        "themes": [
            "Partner-led circular initiatives",
            "Textile industry transition",
            "Critical raw materials circularity",
            "Knowledge sharing and networks",
            "Waste management solutions",
            "Circular financing mechanisms",
            "Multi-stakeholder collaboration",
            "Regional circular case studies"
        ]
    }
}

def enrich_sessions():
    """Enrich sessions with detailed descriptions and context"""

    # Read existing sessions
    with open(SESSIONS_FILE, 'r', encoding='utf-8') as f:
        sessions = json.load(f)

    enriched_count = 0

    # Enrich each session
    for session in sessions:
        session_id = session['id']

        if session_id in SESSION_ENRICHMENT:
            enrichment = SESSION_ENRICHMENT[session_id]

            # Add detailed description (preserve original short description in a new field)
            session['shortDescription'] = session['description']
            session['description'] = enrichment['detailedDescription']

            # Merge keywords (keep existing and add new ones)
            existing_topics = set(session.get('topics', []))
            new_topics = set(enrichment['extendedKeywords'])
            session['topics'] = sorted(list(existing_topics.union(new_topics)))

            # Add themes
            session['themes'] = enrichment['themes']

            enriched_count += 1
            print(f"✓ Enriched: {session['title']}")

    # Write enriched sessions back
    with open(SESSIONS_FILE, 'w', encoding='utf-8') as f:
        json.dump(sessions, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Successfully enriched {enriched_count} sessions")
    print(f"📝 Updated: {SESSIONS_FILE}")

if __name__ == '__main__':
    enrich_sessions()
