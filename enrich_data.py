#!/usr/bin/env python3
"""
Data Enrichment Script for Nordic Circular Summit 2025
Adds contact information, LinkedIn profiles, bios, and organization details
"""

import json
import os

# Define enriched speaker data based on research
SPEAKER_ENRICHMENTS = {
    "marthe-haugland": {
        "bio": "Senior Innovation Advisor and Head of the Circular Economy Program at Nordic Innovation. More than 7 years of experience with circular economy and circular business models in Nordic companies and organizations. Holds a master's degree in international relations.",
        "contact": {
            "linkedin": "https://www.linkedin.com/in/marthe-haugland-5315031"
        },
        "sessions": ["circular-frontiers-opening"]
    },
    "agita-baltbarde": {
        "bio": "Board Member at CleanR Grupa and European Climate Pact Ambassador to Latvia. Initiator of the Circular Economy Index, the first scientifically-based circularity assessment tool involving 100% of Latvian municipalities. Corporate and public affairs leader.",
        "contact": {
            "linkedin": "https://www.linkedin.com/in/agita-baltbārde-81105425"
        },
        "sessions": ["circular-frontiers-opening"]
    },
    "kristian-ottesen": {
        "bio": "Director at Royal Greenland, focused on creating value from side-streams in the fishing industry. Experienced entrepreneur in developing innovative food products. Among the first to bring seaweed to commercial level in Northern European market. MSc in Strategy, Organization & Leadership from Copenhagen Business School.",
        "contact": {
            "linkedin": "https://www.linkedin.com/in/kristianottesen"
        },
        "sessions": ["circular-ocean-industries"]
    },
    "alexandra-leeper": {
        "bio": "CEO of Iceland Ocean Cluster. PhD researcher working as scientist intrapreneur in blue and circular economies. Completed industrial doctorate in aquaculture and circular economy in 2021. Co-founder of Hringvarmi, an agri-tech startup utilizing waste heat for controlled environment food production.",
        "contact": {
            "linkedin": "https://www.linkedin.com/in/alexandra-leeper-phd-92410150"
        },
        "sessions": ["circular-ocean-industries"]
    },
    "mika-sulkinoja": {
        "bio": "Leading Specialist, Carbon Neutral Circular Economy at Sitra. Plans and intensifies Sitra's international cooperation in circular economy and climate fields. Master's in social sciences from University of Tampere, with supplemental studies in environmental economy in Berlin and climate themes at Harvard.",
        "contact": {
            "linkedin": "https://www.linkedin.com/in/mikasulkinoja"
        },
        "sessions": ["locally-rooted-materialising"]
    },
    "patrick-schroder": {
        "bio": "Senior Research Fellow at Chatham House, IPCC AR7 Coordinating Lead Author, and UNEP GEO-7 Coordinating Lead Author. Led research on global transition to inclusive circular economy. Academic work published in Nature Sustainability and Journal of Industrial Ecology. Editor of two books on circular economy.",
        "contact": {
            "linkedin": "https://www.linkedin.com/in/patrick-schröder-b5789119"
        },
        "sessions": ["locally-rooted-materialising"]
    },
    "luca-de-lorenzo": {
        "bio": "Former Senior Director/Head of Sustainability & Mandate at Nordic Investment Bank (6.5 years). Previously headed climate, energy and society unit at Stockholm Environment Institute (SEI). Co-founded Stockholm Sustainable Finance Centre. Background as engineer in corporate energy sector and management consulting. Princeton University educated.",
        "contact": {
            "linkedin": "https://www.linkedin.com/in/luca-de-lorenzo-27702b2b"
        },
        "sessions": ["locally-rooted-materialising"]
    },
    "gisle-mariani-mardal": {
        "bio": "Chairman of Nordic Fashion Association and Head of Development at Norwegian Fashion & Textile Agenda (NF&TA). Designer, entrepreneur and political lobbyist specialized in business and industry development in creative industries. MSc in Innovation and Entrepreneurship from BI Norwegian Business School.",
        "contact": {
            "linkedin": "https://www.linkedin.com/in/gisle-mariani-mardal-25a4b420"
        },
        "sessions": ["arctic-nordic-lifestyles"]
    },
    "michel-bajuk": {
        "bio": "Managing Partner at Nordic Circular Hotspot and Director of Cradlenet. Co-author of 'Circular Economy Outlook 2024' examining how Nordic public companies integrate circular strategies. Key figure in accelerating circular economy transition in Nordic region.",
        "sessions": []
    }
}

# Define enriched organization data
ORGANIZATION_ENRICHMENTS = {
    "royal-greenland": {
        "description": "World's largest supplier of cold-water prawns and Greenland halibut. Leading seafood company focused on sustainable fishing practices and innovative by-product utilization.",
        "website": "https://www.royalgreenland.com",
        "contact": {
            "email": "info@royalgreenland.com",
            "phone": "+299 361 300",
            "address": "Qasapi 4, Postbox 1073, 3900 Nuuk, Greenland",
            "linkedin": "https://gl.linkedin.com/company/royal-greenland"
        },
        "details": {
            "industry": "Seafood Processing & Distribution",
            "focus": ["Sustainable fishing", "By-product utilization", "Seafood innovation", "Arctic resources"]
        }
    },
    "iceland-ocean-cluster": {
        "description": "Innovation hub and incubator for ocean-based businesses. Promotes 100% fish utilization and circular practices in marine industries. Provides funding mechanisms for ocean startups.",
        "website": "https://sjavarklasinn.is/en",
        "contact": {
            "email": "sjavarklasinn@sjavarklasinn.is",
            "phone": "+354 577 6200",
            "address": "Grandagarði 16, 101 Reykjavík, Iceland",
            "linkedin": "https://is.linkedin.com/company/iceland-ocean-cluster"
        },
        "details": {
            "industry": "Ocean Economy Innovation",
            "focus": ["100% fish utilization", "Blue economy startups", "Marine innovation", "Circular ocean practices"]
        }
    },
    "sitra": {
        "description": "The Finnish Innovation Fund working for a fair, sustainable and joyful tomorrow. Promotes systemic change towards circular economy and carbon neutrality. Independent public fund under Finnish Parliament's supervision.",
        "website": "https://www.sitra.fi/en",
        "contact": {
            "email": "sitra@sitra.fi",
            "phone": "+358 294 618 991",
            "address": "Itämerenkatu 11-13, PO Box 160, FI-00181 Helsinki, Finland",
            "linkedin": "https://www.linkedin.com/company/sitra"
        },
        "details": {
            "founded": "1967",
            "industry": "Innovation & Future Studies",
            "focus": ["Circular economy", "Carbon neutrality", "Sustainable wellbeing", "Democratic participation"]
        }
    },
    "nordic-innovation": {
        "description": "Organization under Nordic Council of Ministers promoting entrepreneurship, innovation and competitiveness in Nordic businesses. Makes the Nordics a pioneering region for sustainable growth. Final year of funding Nordic Circular Summit (500,000 NOK).",
        "website": "https://www.nordicinnovation.org",
        "contact": {
            "email": "info@nordicinnovation.org",
            "phone": "+47 476 14 400",
            "address": "Stensberggt. 27, 5th Floor, NO-0170 Oslo, Norway",
            "linkedin": "https://no.linkedin.com/company/nordic-innovation"
        },
        "details": {
            "industry": "Nordic Cooperation & Innovation",
            "focus": ["Cross-border innovation", "Sustainable growth", "Nordic cooperation", "Circular economy programs"]
        }
    },
    "chatham-house": {
        "description": "Royal Institute of International Affairs - leading international affairs think tank. Independent policy institute helping build a sustainably secure, prosperous and just world. Home to world-leading research on circular economy and global sustainability transitions.",
        "website": "https://www.chathamhouse.org",
        "contact": {
            "email": "contact@chathamhouse.org",
            "phone": "+44 20 7957 5700",
            "address": "10 St James's Square, London SW1Y 4LE, United Kingdom",
            "linkedin": "https://uk.linkedin.com/company/chatham-house-the-royal-institute-of-international-affairs"
        },
        "details": {
            "founded": "1920",
            "industry": "International Affairs & Policy Research",
            "focus": ["Global governance", "Circular economy", "Climate change", "Sustainable development"]
        }
    },
    "natural-state": {
        "description": "Strategy agency specializing in place development and sustainable economics. Hosts the secretariat for Nordic Circular Hotspot. Small group of purpose-driven strategists with expertise in operations, economics, place building and branding.",
        "website": "https://naturalstate.no",
        "contact": {
            "email": "contact@naturalstate.no",
            "phone": "+47 22 38 00 00",
            "address": "St Halvards gate 33, Oslo, Norway",
            "linkedin": "https://www.linkedin.com/company/naturalstate"
        },
        "details": {
            "industry": "Strategy & Place Development",
            "focus": ["Circular economy", "Sustainable economics", "Place branding", "Nordic cooperation"]
        }
    },
    "nordic-circular-hotspot": {
        "description": "Collaboration platform accelerating transition to circular economy in Nordic region. Provides events, initiatives, networking opportunities and knowledge-sharing. Secretariat hosted by Natural State in Oslo.",
        "website": "https://nordiccircularhotspot.org",
        "contact": {
            "linkedin": "https://no.linkedin.com/company/nordiccircularhotspot"
        },
        "details": {
            "industry": "Circular Economy Network",
            "focus": ["Nordic collaboration", "Circular innovation", "Knowledge sharing", "Sustainable business models"]
        }
    }
}

# Additional organizations to add
NEW_ORGANIZATIONS = [
    {
        "id": "cleanr-grupa",
        "name": "CleanR Grupa",
        "type": "corporate",
        "country": "Latvia",
        "description": "Leading waste management and circular economy company in Latvia. Focuses on setting new rules for urban resource management and fostering circular economy practices.",
        "website": "https://cleanrgrupa.lv/en",
        "logo": "",
        "representatives": ["agita-baltbarde"],
        "contact": {
            "linkedin": "https://www.linkedin.com/company/cleanr-grupa"
        },
        "details": {
            "industry": "Waste Management & Circular Economy",
            "focus": ["Urban resource management", "Circular economy", "Municipal waste solutions", "Sustainability"]
        }
    },
    {
        "id": "norwegian-fashion-textile-agenda",
        "name": "Norwegian Fashion & Textile Agenda (NF&TA)",
        "type": "industry",
        "country": "Norway",
        "description": "Industry cluster for fashion and textile companies, academia and entrepreneurs. Supported by Innovation Norway. Promotes circular transformation in Nordic fashion and textile industry.",
        "website": "",
        "logo": "",
        "representatives": ["gisle-mariani-mardal"],
        "details": {
            "industry": "Fashion & Textiles",
            "focus": ["Circular textiles", "Fashion innovation", "Industry collaboration", "Sustainable fashion"]
        }
    },
    {
        "id": "nordic-investment-bank",
        "name": "Nordic Investment Bank",
        "type": "financial",
        "country": "Nordic",
        "description": "International financial institution owned by eight member countries: Denmark, Estonia, Finland, Iceland, Latvia, Lithuania, Norway and Sweden. Finances projects that improve competitiveness and environment of Nordic and Baltic regions.",
        "website": "https://www.nib.int",
        "logo": "",
        "representatives": ["luca-de-lorenzo"],
        "contact": {
            "email": "info@nib.int",
            "linkedin": "https://www.linkedin.com/company/nordic-investment-bank"
        },
        "details": {
            "founded": "1976",
            "industry": "International Finance",
            "focus": ["Sustainable investments", "Circular economy financing", "Green bonds", "Nordic-Baltic development"]
        }
    },
    {
        "id": "cradlenet",
        "name": "Cradlenet",
        "type": "partner",
        "country": "Nordic",
        "description": "Managing partner of Nordic Circular Hotspot. Focuses on circular economy research, consulting and network development across Nordic region.",
        "website": "",
        "logo": "",
        "representatives": ["michel-bajuk"],
        "details": {
            "industry": "Circular Economy Consulting",
            "focus": ["Circular strategy", "Nordic collaboration", "Research", "Business transformation"]
        }
    }
]


def enrich_speakers(speakers_file):
    """Enrich speaker data with contact info, bios, and LinkedIn profiles"""

    with open(speakers_file, 'r', encoding='utf-8') as f:
        speakers = json.load(f)

    enriched_count = 0

    for speaker in speakers:
        speaker_id = speaker['id']

        if speaker_id in SPEAKER_ENRICHMENTS:
            enrichment = SPEAKER_ENRICHMENTS[speaker_id]

            # Update bio if provided
            if 'bio' in enrichment and enrichment['bio']:
                speaker['bio'] = enrichment['bio']
                enriched_count += 1

            # Add contact information
            if 'contact' in enrichment:
                speaker['contact'] = enrichment['contact']

            # Update sessions
            if 'sessions' in enrichment:
                speaker['sessions'] = enrichment['sessions']

    # Write back enriched data
    with open(speakers_file, 'w', encoding='utf-8') as f:
        json.dump(speakers, f, indent=2, ensure_ascii=False)

    print(f"✅ Enriched {enriched_count} speakers with detailed information")
    return enriched_count


def enrich_organizations(orgs_file):
    """Enrich organization data with contact info and descriptions"""

    with open(orgs_file, 'r', encoding='utf-8') as f:
        organizations = json.load(f)

    enriched_count = 0

    # Enrich existing organizations
    for org in organizations:
        org_id = org['id']

        if org_id in ORGANIZATION_ENRICHMENTS:
            enrichment = ORGANIZATION_ENRICHMENTS[org_id]

            # Update fields
            if 'description' in enrichment:
                org['description'] = enrichment['description']
            if 'website' in enrichment:
                org['website'] = enrichment['website']
            if 'contact' in enrichment:
                org['contact'] = enrichment['contact']
            if 'details' in enrichment:
                org['details'] = enrichment['details']

            enriched_count += 1

    # Add new organizations
    for new_org in NEW_ORGANIZATIONS:
        if not any(o['id'] == new_org['id'] for o in organizations):
            organizations.append(new_org)
            enriched_count += 1

    # Write back enriched data
    with open(orgs_file, 'w', encoding='utf-8') as f:
        json.dump(organizations, f, indent=2, ensure_ascii=False)

    print(f"✅ Enriched {enriched_count} organizations with detailed information")
    return enriched_count


def main():
    """Main enrichment process"""

    base_dir = os.path.dirname(os.path.abspath(__file__))
    speakers_file = os.path.join(base_dir, 'data/speakers/speakers.json')
    orgs_file = os.path.join(base_dir, 'data/organizations/organizations.json')

    print("🔄 Starting data enrichment...")
    print()

    # Enrich speakers
    speaker_count = enrich_speakers(speakers_file)

    # Enrich organizations
    org_count = enrich_organizations(orgs_file)

    print()
    print("=" * 60)
    print("📊 ENRICHMENT SUMMARY")
    print("=" * 60)
    print(f"Speakers enriched: {speaker_count}")
    print(f"Organizations enriched: {org_count}")
    print()
    print("✅ Data enrichment complete!")
    print()
    print("New information added:")
    print("  - LinkedIn profiles for key speakers")
    print("  - Detailed professional bios")
    print("  - Organization contact details (email, phone, address)")
    print("  - Company descriptions and focus areas")
    print("  - 4 new organizations added to database")
    print()


if __name__ == "__main__":
    main()
