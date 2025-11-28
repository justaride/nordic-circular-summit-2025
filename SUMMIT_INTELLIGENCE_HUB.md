# Summit Intelligence Hub
## Nordic Circular Summit 2025 - Impact Measurement & Project Development

**Created**: November 28, 2025
**Status**: In Development
**Owner**: Nordic Circular Hotspot

---

## Purpose

The Summit Intelligence Hub is a comprehensive data infrastructure that captures, organizes, and analyzes all outputs from the Nordic Circular Summit 2025. It enables:

1. **Impact Measurement** - Quantify summit reach, engagement, and outcomes
2. **Project Development** - Identify and track opportunities emerging from summit
3. **Network Intelligence** - Map relationships between organizations, people, and initiatives
4. **Strategic Positioning** - Inform Nordic Circular Hotspot's role in follow-up activities

---

## Architecture

```
public/summit-intelligence/
├── entities/
│   ├── organizations.json      # All organizations mentioned/participating
│   ├── companies.json          # Companies with circular solutions
│   ├── speakers.json           # All speakers with enriched data
│   ├── networks.json           # Networks, clusters, platforms
│   └── contacts.json           # Key contact persons for follow-up
│
├── opportunities/
│   ├── projects.json           # Existing + proposed projects
│   ├── funding.json            # Funding sources and programs
│   ├── partnerships.json       # Partnership opportunities
│   └── pipeline.json           # Project development pipeline
│
├── insights/
│   ├── quotes.json             # Key quotes with metadata and themes
│   ├── statistics.json         # All numbers/stats mentioned
│   ├── action-items.json       # Concrete commitments and next steps
│   └── themes.json             # Thematic analysis across sessions
│
├── metrics/
│   ├── kpis.json               # All KPIs (captured + TBD placeholders)
│   ├── impact-framework.json   # Measurement methodology
│   └── benchmarks.json         # Comparison data points
│
└── analysis/
    ├── connections.json        # Entity relationships/network graph
    ├── sector-mapping.json     # Sectoral breakdown
    ├── geographic-mapping.json # Geographic distribution
    └── nch-opportunities.json  # NCH-specific opportunity analysis
```

---

## Data Categories

### 1. Entities

**Organizations** - All institutions mentioned across both days:
- Government bodies (ministries, agencies)
- Companies (large corporations, SMEs, startups)
- Research institutions (universities, research centers)
- NGOs and associations
- Networks and clusters
- International organizations

**Speakers** - Enriched speaker data:
- Contact information (where available)
- Expertise areas
- Project involvement
- Follow-up potential

**Networks** - Collaborative platforms:
- Existing networks (e.g., Iceland Ocean Cluster, ACT Cluster)
- New networks launched (e.g., NBTT Group)
- Potential networks to develop

### 2. Opportunities

**Projects** - Categorized by status:
- Active (mentioned as ongoing)
- Proposed (suggested during summit)
- Potential (identified through analysis)

**Funding** - Sources mentioned or relevant:
- Nordic Innovation
- Nordic Council of Ministers
- EU Horizon Europe
- National programs
- Private investment

**Partnerships** - Collaboration opportunities:
- Cross-border initiatives
- Public-private partnerships
- Research collaborations
- Policy coordination

### 3. Insights

**Quotes** - Structured for reuse:
- Speaker attribution
- Session source
- Themes/tags
- Use cases (social media, reports, presentations)

**Statistics** - All quantitative data:
- Market sizes
- Targets and goals
- Current state metrics
- Comparisons and benchmarks

**Action Items** - Commitments and deadlines:
- Who committed to what
- Deadlines mentioned
- Follow-up requirements

### 4. Metrics

**Summit KPIs** - What we can measure:

| Category | Metric | Status | Source |
|----------|--------|--------|--------|
| Reach | In-person attendees | TBD | Registration |
| Reach | Online viewers (live) | TBD | Stream analytics |
| Reach | Recording views | TBD | YouTube analytics |
| Engagement | Social media mentions | TBD | Social monitoring |
| Engagement | Hashtag usage | TBD | Social monitoring |
| Content | Sessions documented | ✅ Captured | 9 sessions |
| Content | Speaker profiles | ✅ Captured | 50+ speakers |
| Content | Organizations mapped | ✅ Captured | 70+ orgs |
| Content | Social posts created | ✅ Captured | 80+ posts |
| Content | Articles produced | ✅ Captured | 6 articles |
| Outcomes | Projects launched | ✅ Captured | 3+ initiatives |
| Outcomes | Partnerships formed | TBD | Follow-up |
| Outcomes | Media coverage | TBD | Media monitoring |

**Impact Framework** - How we measure success:
- Short-term: Content reach and engagement
- Medium-term: Project development and partnerships
- Long-term: Policy influence and market change

---

## NCH Strategic Positioning

### Roles Nordic Circular Hotspot Can Play

1. **Knowledge Hub**
   - Maintain and update summit intelligence
   - Publish "State of Nordic-Baltic Circular Economy" reports
   - Provide data services to partners

2. **Network Convener**
   - Host follow-up events and webinars
   - Facilitate cross-sector connections
   - Support new network development

3. **Project Developer**
   - Lead/coordinate funding applications
   - Provide project management services
   - Offer communication/dissemination support

4. **Policy Interface**
   - Aggregate industry input on regulations
   - Coordinate regional positions
   - Support advocacy efforts

### Priority Opportunities for NCH

| Opportunity | Role | Partners | Timeline |
|-------------|------|----------|----------|
| NBTT Group Support | Coordinator/Comms | LDC, Baltic CH | Ongoing |
| Construction Catalog | Platform/Distribution | Natural State | Q1 2026 |
| ArcCirc Development | Initiator/Lead | TBD | 2026 |
| Regional EPR Coordination | Facilitator | National EPR bodies | 2025-2026 |
| Summit 2026 Planning | Co-organizer | Nordic Innovation | Q2 2026 |

---

## Data Collection Methods

### Already Captured (from transcripts/documentation)
- All speaker mentions and organizations
- All statistics and numbers cited
- All projects and initiatives mentioned
- Key quotes and themes

### To Be Collected
- Participant registration data
- Stream/view analytics
- Social media metrics
- Post-summit survey responses
- Media coverage tracking
- Follow-up engagement metrics

### Data Sources
- Session transcripts (9 sessions)
- Speaker database (existing)
- Summit website analytics
- Social media platforms
- Partner reporting
- Manual research/verification

---

## Output Formats

### For Internal Use
- JSON databases (programmatic access)
- Dashboard views (web interface)
- Network visualizations
- Pipeline tracking

### For External Communication
- Summit Impact Report (PDF)
- Infographics and visualizations
- Social media content
- Partner briefings

### For Project Development
- Funding application data
- Partnership proposals
- Project concept notes
- Stakeholder mappings

---

## Implementation Plan

### Phase 1: Foundation (Current)
- [x] Create documentation and plan
- [ ] Build folder structure
- [ ] Populate entities database
- [ ] Create KPI framework
- [ ] Develop opportunity pipeline

### Phase 2: Enrichment
- [ ] Add TBD metrics as data becomes available
- [ ] Verify and enrich entity data
- [ ] Build relationship mappings
- [ ] Create analysis outputs

### Phase 3: Activation
- [ ] Develop web interface for data access
- [ ] Create visualization dashboards
- [ ] Produce impact report
- [ ] Support project development

---

## Technical Notes

### Data Format
All data stored as JSON for:
- Easy programmatic access
- Integration with web platform
- Version control via Git
- Export flexibility

### Schema Design
Each entity type has standardized fields:
- `id`: Unique identifier
- `name`: Display name
- `type`/`category`: Classification
- `source`: Where data originated
- `sessions`: Which sessions referenced
- `metadata`: Additional flexible fields

### Integration
- Data accessible via Next.js API routes
- Supports filtering and search
- Exportable to CSV/Excel
- Visualizable in web interface

---

**Document Status**: Living document - updated as hub develops
**Last Updated**: November 28, 2025
**Next Review**: After Phase 1 completion
