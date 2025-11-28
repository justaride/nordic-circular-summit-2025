# Nordic Circular Summit 2025 - Content & Intelligence Hub

The official content management, production, and intelligence platform for the Nordic Circular Summit 2025. This repository serves as both a web interface deployed on Vercel and a comprehensive data infrastructure for post-summit analysis, impact measurement, and project development.

## Event Information

- **Event**: Nordic Circular Summit 2025
- **Theme**: "Circular Frontiers: Shaping our Future"
- **Dates**: November 19-20, 2025
- **Location**: Hans Egede Hotel, Nuuk, Greenland (+ Online)
- **Website**: https://nordiccircularhotspot.org/summit/nordic-circular-summit-2025

## Live URLs

- **Production Site**: https://nordic-circular-summit-2025.vercel.app
- **GitHub Repository**: https://github.com/justaride/nordic-circular-summit-2025

---

## Project Purpose

This repository provides:

1. **Content Production System** - All summit sessions documented with transcripts, articles, social media posts
2. **Summit Intelligence Hub** - Comprehensive data infrastructure for impact measurement and project development
3. **Web Interface** - Browse summit content via Next.js app on Vercel
4. **AI-Assisted Workflow** - Optimized for Claude Code content generation
5. **Strategic Analysis** - NCH opportunity mapping and project pipeline

---

## What's Been Produced

### Content Assets

| Content Type | Day 1 | Day 2 | Total |
|--------------|-------|-------|-------|
| Session Transcripts | 6 | 3 | 9 |
| Long-form Articles | 6 | - | 6 |
| Executive Summaries | 1 | 1 | 2 |
| By-the-Numbers | 1 | 1 | 2 |
| Social Media Posts (session) | 50 | 34 | 84 |
| Social Media Posts (holistic) | 20 | 15 | 35 |
| Key Quotes Documents | 6 | - | 6 |

### Intelligence Data

| Data Category | Count |
|---------------|-------|
| Organizations Mapped | 85+ |
| Companies with Solutions | 32 |
| Speakers Profiled | 50+ |
| Projects in Pipeline | 11 |
| Funding Sources | 10 |
| Statistics Captured | 75+ |
| KPIs Defined | 35 |

---

## Project Structure

```
nordic-circular-summit-2025/
├── data/                           # Core structured data
│   ├── speakers/speakers.json      # 50+ speaker profiles
│   ├── sessions/sessions.json      # All session metadata
│   ├── organizations/              # Organization data
│   ├── transcripts/                # Raw and cleaned transcripts
│   └── event.json                  # Event metadata
│
├── public/                         # Public assets and content
│   ├── transcripts/                # Cleaned session transcripts (9)
│   ├── articles/                   # Long-form articles (6)
│   ├── social-media/               # Social media posts (119 posts)
│   ├── executive/                  # Executive summaries (2)
│   ├── highlights/                 # Key quotes and themes (8)
│   └── summit-intelligence/        # Intelligence Hub data
│       ├── entities/               # Organizations, companies
│       ├── opportunities/          # Projects, funding
│       ├── insights/               # Statistics, quotes
│       ├── metrics/                # KPIs framework
│       └── analysis/               # NCH opportunities
│
├── outputs/                        # Working content (mirrors public/)
├── app/                            # Next.js application
├── lib/                            # Utilities and types
└── SUMMIT_INTELLIGENCE_HUB.md      # Intelligence Hub documentation
```

---

## Summit Intelligence Hub

A comprehensive data infrastructure for measuring summit impact and developing follow-up projects.

### Key Components

**Entities Database**
- `organizations.json` - 85+ organizations with roles, contacts, follow-up priority
- `companies.json` - 32 companies with circular solutions, by sector and maturity

**Opportunity Pipeline**
- `projects.json` - 11 projects (launched, active, proposed)
- `funding.json` - 10 funding sources with application guidance

**Metrics Framework**
- `kpis.json` - 35 KPIs across 6 categories (15 captured, 20 pending)
- Reach, engagement, content, network, outcomes, quality

**Strategic Analysis**
- `nch-opportunities.json` - Priority opportunities for Nordic Circular Hotspot
- Key contacts, next steps, success metrics

### Priority Opportunities Identified

1. **Nordic-Baltic Textile Transition Group** - Coordination role (deadline: Dec 1, 2025)
2. **ArcCirc Initiative** - Arctic CE Resource Centre development
3. **Circular Construction Catalog** - Platform integration
4. **Circular Design Toolbox** - Regional deployment

See `SUMMIT_INTELLIGENCE_HUB.md` for full documentation.

---

## Day-by-Day Content

### Day 1 (November 19) - Physical Summit in Nuuk

| Session | Transcript | Article | Social Posts | Quotes |
|---------|------------|---------|--------------|--------|
| 1. Circular Frontiers | ✅ | ✅ | 10 | ✅ |
| 2. Circular Ocean Industries | ✅ | ✅ | 10 | ✅ |
| 3. Locally Rooted | ✅ | ✅ | 10 | ✅ |
| 4. Arctic & Nordic Lifestyles | ✅ | ✅ | 10 | ✅ |
| 5. Circular Cities | ✅ | ✅ | 10 | ✅ |
| Day 1 Summary | ✅ | ✅ | - | ✅ |
| Holistic (cross-session) | - | - | 20 | - |

**Executive Summary**: `public/executive/day1-executive-summary.md`
**By-the-Numbers**: `public/highlights/day1-by-the-numbers.md`

### Day 2 (November 20) - Digital Partner Sessions

| Session | Transcript | Social Posts |
|---------|------------|--------------|
| Circular Construction | ✅ | 12 |
| NBTT Textiles | ✅ | 11 |
| Circular Design Toolbox | ✅ | 11 |
| Holistic (cross-session) | - | 15 |

**Executive Summary**: `public/executive/day2-executive-summary.md`
**By-the-Numbers**: `public/highlights/day2-by-the-numbers.md`

---

## Key Themes Across Both Days

1. **Trust as Infrastructure** - 8+ years to build collaborative trust
2. **Regional Collaboration** - Nordic-Baltic coordination as competitive advantage
3. **Building on Existing Assets** - Retrofit-first, use what exists
4. **Inner Loops First** - Prioritize reuse over recycling
5. **Data and Transparency** - DPP readiness, EPR harmonization
6. **Indigenous Knowledge** - Traditional wisdom meets innovation

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

---

## Working with Claude Code

### Content Generation
```
"Create social media posts for [session name]"
"Extract key quotes from the construction session"
"Write an executive summary of Day 2"
"Generate a LinkedIn article about textile circularity"
```

### Intelligence Queries
```
"List all high-priority organizations for follow-up"
"What funding sources are relevant for textile projects?"
"Summarize NCH opportunities from the summit"
"What statistics were mentioned about construction?"
```

### Data Management
```
"Add a new contact from the summit"
"Update project status in the pipeline"
"Add KPI data for participant count"
```

---

## Technology Stack

- **Framework**: Next.js 16.0.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (auto-deploy on push)
- **Version Control**: GitHub
- **AI Integration**: Claude Code optimized
- **Data Format**: JSON (structured, versionable)

---

## Key Documents

| Document | Purpose |
|----------|---------|
| `README.md` | Project overview (this file) |
| `PROJECT_SUMMARY.md` | Detailed project status and metrics |
| `SUMMIT_INTELLIGENCE_HUB.md` | Intelligence hub architecture |
| `public/executive/day1-executive-summary.md` | Day 1 leadership brief |
| `public/executive/day2-executive-summary.md` | Day 2 leadership brief |

---

## Contributing

1. **Branch naming**: `feature/`, `content/`, `data/`, `fix/`
2. **Commit messages**: Clear, descriptive
3. **Data changes**: Update relevant JSON files
4. **Content**: Add to appropriate `public/` subdirectory

---

**Built with**: Next.js, TypeScript, Tailwind CSS, Vercel
**AI Integration**: Claude Code optimized
**Last Updated**: November 28, 2025
**Status**: Post-summit content production complete, Intelligence Hub active
