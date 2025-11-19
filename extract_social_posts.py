#!/usr/bin/env python3
"""
Social Media Post Extractor for Nordic Circular Summit 2025
Extracts and structures Instagram and LinkedIn posts from PDF exports
"""

import json
import os
from datetime import datetime
from typing import List, Dict

# Instagram posts extracted from PDF
INSTAGRAM_POSTS = [
    {
        "id": "ig-001",
        "platform": "instagram",
        "date": "2025-11-18",  # "21 h" before Nov 19
        "time_relative": "21h",
        "content": "Tomorrow we kick off the 6th Nordic Circular Summit — this year hosted in Nuuk, Greenland and streamed globally on 19–20 November.\n\nAs the largest annual circular economy conference in the Nordics, the Summit brings together changemakers, policymakers, researchers, and businesses accelerating the transition to a regenerative economy.\n\nThis year's theme, \"Circular Frontiers: Shaping Our Future,\" explores how Arctic and Nordic communities can turn remote realities into global blueprints for circular innovation.\n\nThe Arctic's unique balance of rich resources and fragile environments makes Greenland a powerful place to rethink how we use, share, and govern materials — from circular ocean industries to resilient local economies and international materials governance.\n\nSee the full program and join us online - link in our bio with all the info ✨\n\nWe look forward to welcoming the global circular community to Nuuk!",
        "hashtags": [],
        "mentions": [],
        "media": ["announcement"],
        "engagement": {"likes": 0, "comments": 0},
        "status": "published",
        "post_type": "announcement"
    },
    {
        "id": "ig-002",
        "platform": "instagram",
        "date": "2025-11-19",
        "time_relative": "4h",
        "content": "From Pilots to Practice: Next Steps to Scale Circular Construction in the Nordics\n\nThe Nordic construction sector must rapidly become more circular if the region is to meet its climate and nature goals. Despite strong ambitions — including the Nordic Council of Ministers' 2030 vision — the Nordics still lag behind Europe and global frontrunners on circular practices.\n\nThis session asks: What have these efforts achieved—and what are the concrete next steps to accelerate scaling now?\n\nTopics include:\n- Supply–demand paradox\n- Value-chain design\n- Regulatory fit\n\nNordic Circular Summit 2025 is live from Nuuk!\nOur live broadcast has now started. Join us for the opening session!",
        "hashtags": [],
        "mentions": ["@ungeholthe", "@xathrine", "@nordicinnovation", "@newnaturalstate"],
        "media": ["session"],
        "engagement": {"likes": 0, "comments": 0},
        "status": "published",
        "post_type": "live_update"
    },
    {
        "id": "ig-003",
        "platform": "instagram",
        "date": "2025-11-19",
        "time_relative": "6h",
        "content": "We're counting down the minutes — the Nordic Circular Summit 2025 begins TODAY at 09:30 GMT-2 in Nuuk and online!\n\nBefore we kick off, we're proud to present the final group of speakers:\n\n🟠 Malene Vahl Rasmussen, Mayor, Kommune Kujalleq\n🟠 Peter Borg, Naalakkersuisoq (Minister), Greenland Ministry of Fisheries, Hunting, Agriculture and Self-Sufficiency\n🟠 Embla Kristjánsdóttir, Head of Department for Construction\n🟠 Carl Egede Bøggild, Special Advisor\n🟠 Edward Lyberth-Moerch, Consultant, Nalik Ventures\n\nJoin us online for the opening session from the link in our bio - free and open for all!",
        "hashtags": [],
        "mentions": [],
        "media": ["speakers"],
        "engagement": {"likes": 0, "comments": 0},
        "status": "published",
        "post_type": "speaker_announcement"
    },
    {
        "id": "ig-004",
        "platform": "instagram",
        "date": "2025-11-13",
        "time_relative": "6d",
        "content": "Partner meetup tomorrow! Join us on October 14th for our partner meetup, where we will be giving information about digital partner sessions as well as this years programme - this is your chance to connect with the Nordic Circular Summit audience!",
        "hashtags": [],
        "mentions": [],
        "media": ["partner"],
        "engagement": {"likes": 0, "comments": 0},
        "status": "published",
        "post_type": "event"
    },
    {
        "id": "ig-005",
        "platform": "instagram",
        "date": "2025-10-29",
        "time_relative": "3w",
        "content": "CIRCULAR OCEAN INDUSTRIES: Industrial & Regional Symbiosis in the Blue Economy\n\nHow can the Arctic and Nordic ocean economy turn sidestreams, science, and innovation into new circular value chains?\n\nSpeakers:\n- Alexandra Leeper PhD, CEO, Iceland Ocean Cluster\n- Kristian Ottesen, Director, Royal Greenland\n- Michaela Lindström, CEO & Co-founder, Hailia Nordic Oy\n- Linn Indrestrand, Port of Hirtshals\n- Monica Paulsen, Cluster Manager, Arctic Cluster Team\n\nModerator: Cathrine Barth, Head of Circular Economy, Natural State",
        "hashtags": [],
        "mentions": ["@motheroffishes", "@cradlenet_", "@ldcluster"],
        "media": ["session"],
        "engagement": {"likes": 0, "comments": 0},
        "status": "published",
        "post_type": "session_highlight"
    }
]

# LinkedIn posts extracted from PDF
LINKEDIN_POSTS = [
    {
        "id": "li-001",
        "platform": "linkedin",
        "date": "2025-11-18",
        "time_relative": "1d",
        "author": "Einar Holthe",
        "author_title": "Founder: Natural State / Market & Place Development Strategist",
        "content": "Live from Nuuk this Wednesday - the Nordic Circular Summit 2025\n\nPå onsdag 19. november samler vi Norden og Arktis til Nordic Circular Summit i Nuuk, Grønland 🇬🇱\n\n\"Når vi snakker om sirkulærøkonomi i Norden, handler det ikke bare om teknologi eller politikk, det handler om natur, mennesker, samfunnsverdier og markedskultur. Norden og Arktis har muligheten til å vise verden hvordan utvikling kan være både lokalt forankret og globalt relevant.\"\n\nVi er stolte over å arrangere Nordic Circular Summit for 6. år på rad!\n\nFølg oss i Nuuk og online! Det er gratis å følge konferansen digitalt fra hele verden.",
        "hashtags": ["#nuuk"],
        "mentions": ["Cathrine Barth", "Martin Hagen", "Marthe Haugland", "Peter Munch-Madsen", "Nordic Innovation", "Cradlenet", "Lifestyle and Design Cluster", "Nalik Ventures"],
        "media": [],
        "engagement": {"likes": 0, "comments": 0, "shares": 0},
        "status": "published",
        "post_type": "announcement",
        "language": "norwegian"
    },
    {
        "id": "li-002",
        "platform": "linkedin",
        "date": "2024-11-17",
        "time_relative": "1y",
        "author": "Natural State",
        "author_title": "Company",
        "content": "Har du skaffet deg din gratis online-billett til Nordens største konferanse om sirkulær økonomi?\n\nNatural State er stolt medarrangør av Nordic Circular Summit, sammen med Cradlenet, Lifestyle and Design Cluster, MiXi Center og Business Finland.\n\nKonferansen starter på mandag 18. November! Årets tema er \"The Enterprise of Circular Economy.\"\n\n📍 Tid: 18.–19. november\n📍 Sted: Online og Helsinki\n\nNordic Circular Summit er en nordisk høynivåkonferanse der du møter politiske beslutningstakere, bedriftsledere, sirkulære eksperter, startups, entreprenører og intraprenører fra Norden og resten av verden.",
        "hashtags": ["#NordicCircularSummit", "#NordicCircularHotspot", "#CircularNordics"],
        "mentions": ["Einar Kleppe Holthe", "Cathrine Barth", "Thea Martinsen", "Juraj Kocar", "Renée Reif", "Martin Hagen"],
        "media": [],
        "engagement": {"likes": 0, "comments": 0, "shares": 0},
        "status": "published",
        "post_type": "event_promotion",
        "language": "norwegian"
    }
]


def save_social_posts():
    """Save extracted social media posts to JSON files"""

    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(base_dir, 'data', 'social-media')

    # Create directory if it doesn't exist
    os.makedirs(data_dir, exist_ok=True)

    # Save Instagram posts
    instagram_file = os.path.join(data_dir, 'instagram-posts.json')
    with open(instagram_file, 'w', encoding='utf-8') as f:
        json.dump(INSTAGRAM_POSTS, f, indent=2, ensure_ascii=False)

    # Save LinkedIn posts
    linkedin_file = os.path.join(data_dir, 'linkedin-posts.json')
    with open(linkedin_file, 'w', encoding='utf-8') as f:
        json.dump(LINKEDIN_POSTS, f, indent=2, ensure_ascii=False)

    # Combine all posts
    all_posts = INSTAGRAM_POSTS + LINKEDIN_POSTS
    all_posts_sorted = sorted(all_posts, key=lambda x: x['date'], reverse=True)

    all_posts_file = os.path.join(data_dir, 'all-posts.json')
    with open(all_posts_file, 'w', encoding='utf-8') as f:
        json.dump(all_posts_sorted, f, indent=2, ensure_ascii=False)

    print(f"✅ Saved {len(INSTAGRAM_POSTS)} Instagram posts to {instagram_file}")
    print(f"✅ Saved {len(LINKEDIN_POSTS)} LinkedIn posts to {linkedin_file}")
    print(f"✅ Saved {len(all_posts)} total posts to {all_posts_file}")

    return len(all_posts)


def generate_post_statistics():
    """Generate statistics about social media posts"""

    all_posts = INSTAGRAM_POSTS + LINKEDIN_POSTS

    stats = {
        "total_posts": len(all_posts),
        "instagram_posts": len(INSTAGRAM_POSTS),
        "linkedin_posts": len(LINKEDIN_POSTS),
        "post_types": {},
        "date_range": {
            "earliest": min(p['date'] for p in all_posts),
            "latest": max(p['date'] for p in all_posts)
        },
        "languages": {}
    }

    # Count post types
    for post in all_posts:
        post_type = post.get('post_type', 'unknown')
        stats['post_types'][post_type] = stats['post_types'].get(post_type, 0) + 1

        lang = post.get('language', 'english')
        stats['languages'][lang] = stats['languages'].get(lang, 0) + 1

    return stats


if __name__ == "__main__":
    print("🔄 Extracting social media posts from PDFs...")
    print()

    # Save posts
    total = save_social_posts()

    print()
    print("📊 STATISTICS")
    print("=" * 60)

    stats = generate_post_statistics()
    print(f"Total posts extracted: {stats['total_posts']}")
    print(f"  - Instagram: {stats['instagram_posts']}")
    print(f"  - LinkedIn: {stats['linkedin_posts']}")
    print()
    print(f"Date range: {stats['date_range']['earliest']} to {stats['date_range']['latest']}")
    print()
    print("Post types:")
    for post_type, count in stats['post_types'].items():
        print(f"  - {post_type}: {count}")
    print()
    print("Languages:")
    for lang, count in stats['languages'].items():
        print(f"  - {lang}: {count}")
    print()
    print("✅ Social media post extraction complete!")
