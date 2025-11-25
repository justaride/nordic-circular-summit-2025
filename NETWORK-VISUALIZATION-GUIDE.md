# Network Visualization Guide
## Nordic Circular Summit 2025 - Interactive Network Map

**Created:** November 20, 2025
**Status:** ✅ Fully Functional (Local Build)
**Location:** `/network`

---

## 🎯 What Was Built

A professional, interactive network visualization showing connections between Day 1 speakers and participants, built with **Cytoscape.js** - the same technology used for scientific and academic network analysis.

### Current Network Statistics

**Day 1 Network (2025):**
- **53 people** (41 speakers + 12 participants)
- **218 connections**
  - 156 session connections (same session)
  - 29 organization connections (same organization)
  - 33 country connections (same country)
- **40 organizations** represented
- **16 countries** represented
- **4 sessions** mapped

---

## 🚀 Features

### Interactive Visualization
- **Force-directed graph** - Nodes naturally cluster by connections
- **Zoom & Pan** - Scroll to zoom, drag to pan
- **Click nodes** - See person details and highlight all connections
- **Real-time filtering** - Filter by connection type, person type, or search
- **Re-layout** - Reorganize the network with one click

### Visual Design
- **Color-coded nodes:**
  - 🔵 **Cyan** = Speakers (larger nodes)
  - 🟣 **Purple** = Participants (medium nodes)
  - 🟡 **Amber** = Selected node

- **Connection types:**
  - **Solid cyan** = Same session (primary connections)
  - **Thick pink** = Same organization (strong ties)
  - **Dashed green** = Same country (regional connections)

### Filters & Controls

**Left Sidebar:**
- Search box (name, organization, country)
- Connection type filter (all / session / organization / country)
- Node type filter (all / speakers / participants)
- View controls (fit to screen, re-layout)
- Interactive legend
- Live statistics

### Information Display
- Click any node to see:
  - Name and title
  - Organization
  - Country
  - Role (speaker/moderator/panelist/attendee)
  - All connections highlighted

---

## 📁 File Structure

```
nordic-circular-summit-2025/
├── app/network/
│   └── page.tsx                    # Main network visualization page
│
├── data/network/
│   └── summit-network.json         # Generated network data
│
├── scripts/
│   └── generate_network_data.py    # Data generation script
│
└── NETWORK-VISUALIZATION-GUIDE.md  # This file
```

---

## 🔧 How It Works

### 1. Data Generation (Python Script)

The `scripts/generate_network_data.py` script:
- Reads speaker data from `data/speakers/speakers.json`
- Reads session participation from `data/participants/session-participants.json`
- Reads all participants from `data/participants/participants.json`
- Creates nodes for each person
- Generates edges (connections) based on:
  - **Same session** - People who participated in the same session
  - **Same organization** - People from the same organization
  - **Same country** - People from the same country (limited to avoid clutter)
- Outputs to `data/network/summit-network.json`

**To regenerate network data:**
```bash
cd /Users/gabrielboen/nordic-circular-summit-2025/nordic-circular-summit-2025
python3 scripts/generate_network_data.py
```

### 2. Visualization (Next.js + Cytoscape.js)

The `/network` page:
- Imports network data from `data/network/summit-network.json`
- Initializes Cytoscape with force-directed layout
- Applies custom styling (colors, sizes, edge styles)
- Adds interactivity (click, zoom, filter)
- Renders in real-time with React

---

## 🎨 Customization Guide

### Change Visual Style

Edit `app/network/page.tsx` in the `style` array:

```typescript
// Example: Change speaker node color
{
  selector: 'node[type = "speaker"]',
  style: {
    'background-color': '#0891b2',  // Change this hex color
    'border-width': 3,
    'border-color': '#06b6d4'
  }
}
```

### Modify Layout Algorithm

Change the layout settings in `app/network/page.tsx`:

```typescript
layout: {
  name: 'cose',           // Or: 'circle', 'grid', 'concentric'
  animate: true,
  nodeRepulsion: 8000,    // Higher = more spread out
  idealEdgeLength: 100,   // Higher = longer edges
  gravity: 1              // Higher = tighter center
}
```

### Add New Connection Types

1. Update `generate_network_data.py` to create new edge type
2. Add style in `app/network/page.tsx`:

```typescript
{
  selector: 'edge[type = "your-new-type"]',
  style: {
    'line-color': '#yourcolor',
    'width': 2
  }
}
```

3. Add filter option in UI

---

## 📈 Expanding the Network

### Adding Historical Participants (2020-2024)

You have **286 total participants** in `data/participants/participants.json` from summits 2020-2024.

**To add them to the network:**

1. **Update `generate_network_data.py`:**

```python
# Current: Only processes session-participants.json (Day 1 2025)
# Expand to: Include all participants from participants.json

# Add this section:
print("\nProcessing historical participants...")
for participant in all_participants:
    # Add year-based filtering if needed
    years = [ph['year'] for ph in participant.get('participationHistory', [])]

    # Add as node
    nodes.append({
        'data': {
            'id': participant['id'],
            'label': participant['name'],
            'years': years,  # Track which years they participated
            # ... etc
        }
    })

# Then create historical connections based on:
# - People who attended the same year
# - People from the same organization across years
# - Multi-year attendees (show as "core network")
```

2. **Add year filter to UI:**

```typescript
// In app/network/page.tsx
const [filters, setFilters] = useState({
  year: 'all',  // all, 2020, 2021, 2022, 2023, 2024, 2025
  // ... existing filters
});
```

3. **Visualize multi-year participation:**
   - Larger nodes for people who attended multiple years
   - Special color for "core network" (attended 3+ years)
   - Timeline slider to show network evolution

### Adding Session Topics/Themes

```python
# In generate_network_data.py
# Create topic-based connections:

topic_groups = defaultdict(list)
for person_id, data in person_data.items():
    for topic in data.get('topics', []):
        topic_groups[topic].append(person_id)

# Connect people with shared topics
for topic, members in topic_groups.items():
    # Create edges...
```

### Adding Geographic Clustering

```python
# Create stronger regional connections
# Weight edges by geographic proximity
# Add visual clusters for Nordic regions
```

---

## 🔗 Kumu.io Export

For Catherine's "megamapping" work in Kumu, you can export the network data:

### Export Script (Future Enhancement)

Create `scripts/export_to_kumu.py`:

```python
#!/usr/bin/env python3
"""Export network data to Kumu.io format"""

import json

def export_to_kumu(network_data):
    """
    Convert our network data to Kumu JSON format
    Kumu format: {elements: [{attributes: {...}}, ...], connections: [...]}
    """

    kumu_data = {
        'elements': [],
        'connections': []
    }

    # Convert nodes
    for node in network_data['elements']['nodes']:
        kumu_data['elements'].append({
            'Label': node['data']['name'],
            'Type': node['data']['type'],
            'Element Type': 'Person',
            'Description': node['data'].get('title', ''),
            'Organization': node['data'].get('organization', ''),
            'Country': node['data'].get('country', ''),
            'Tags': ', '.join(node['data'].get('topics', []))
        })

    # Convert edges
    for edge in network_data['elements']['edges']:
        kumu_data['connections'].append({
            'From': edge['data']['source'],
            'To': edge['data']['target'],
            'Type': edge['data']['type'],
            'Label': edge['data'].get('label', ''),
            'Connection Type': 'Collaboration'
        })

    return kumu_data

# Usage:
# data = load_json('data/network/summit-network.json')
# kumu = export_to_kumu(data)
# save_json(kumu, 'exports/kumu-network.json')
```

Then import to Kumu:
1. Go to Kumu.io → Create new map
2. Import → Choose file → `kumu-network.json`
3. Kumu will automatically visualize and allow advanced customization

---

## 🎓 Advanced Features (Future Enhancements)

### 1. Community Detection
Identify natural clusters/communities in the network:

```bash
npm install cytoscape-cola  # Community detection layout
```

### 2. Network Metrics
Calculate and display:
- **Centrality** - Who are the most connected people?
- **Betweenness** - Who bridges different communities?
- **Clustering coefficient** - How interconnected is the network?

### 3. Time Evolution
Show how the network grows over years:
- Animated timeline slider
- Year-by-year network snapshots
- Growth visualization

### 4. Export Functions
Add export buttons:
- PNG image export
- CSV data export
- Kumu.io format export
- GraphML format (for advanced analysis tools)

### 5. AI-Powered Insights
- Suggest potential collaborations
- Identify knowledge gaps
- Recommend introductions

---

## 🛠️ Troubleshooting

### Network won't load
- Check browser console for errors
- Verify `data/network/summit-network.json` exists
- Try rebuilding: `npm run build`

### Layout looks wrong
- Click "Re-layout Network" button
- Try different layout algorithm (edit code)
- Adjust `nodeRepulsion` and `idealEdgeLength` values

### Too many connections (cluttered)
- Use filters to show only specific connection types
- Increase `nodeRepulsion` for more spread
- Limit country connections to smaller groups

### Performance issues with large networks
- Reduce number of edges
- Use simpler layout (e.g., 'grid' instead of 'cose')
- Disable animations: `animate: false`

---

## 📚 Resources

### Cytoscape.js Documentation
- **Official docs:** https://js.cytoscape.org/
- **Demos:** https://js.cytoscape.org/#demos
- **Extensions:** https://js.cytoscape.org/#extensions

### Layout Algorithms
- **cose** (force-directed) - Current, good for organic clustering
- **circle** - Nodes in a circle
- **grid** - Regular grid layout
- **concentric** - Concentric circles
- **breadthfirst** - Tree-like hierarchy
- **cola** - Advanced force-directed with constraints

### Network Analysis
- **NetworkX** (Python) - For advanced analysis
- **Gephi** - Desktop software for large network analysis
- **Kumu.io** - Online platform for stakeholder mapping

---

## 🎯 Next Steps for Catherine

### Immediate (Already Working)
✅ Interactive network map at `/network`
✅ Day 1 speakers and participants (53 people, 218 connections)
✅ Filter by session, organization, country
✅ Professional visualization with Cytoscape.js

### Short-term Enhancements
- [ ] Add historical participants (286 people from 2020-2024)
- [ ] Year filter to explore network over time
- [ ] Export to Kumu.io format
- [ ] Network statistics dashboard (centrality, communities)

### Medium-term (Megamapping)
- [ ] Multi-year timeline slider
- [ ] Community detection and clustering
- [ ] Topic-based connection mapping
- [ ] Advanced filtering (by sector, expertise, region)
- [ ] Export functions (PNG, CSV, GraphML)

### Long-term Vision
- [ ] AI-powered collaboration recommendations
- [ ] Integration with other summit data
- [ ] Real-time network updates during events
- [ ] Mobile-optimized version
- [ ] Collaborative annotation and tagging

---

## 💡 Ideas for Advanced Megamapping

### 1. Multi-Layer Network
- **Layer 1:** People
- **Layer 2:** Organizations
- **Layer 3:** Topics/Themes
- **Layer 4:** Geographic regions
- Show relationships across layers

### 2. Temporal Network
- Animate network growth year by year
- Show "newcomers" vs "veterans"
- Identify emerging vs. declining connections

### 3. Influence Mapping
- Size nodes by:
  - Number of connections
  - Speaking engagements
  - Topic expertise
  - Geographic reach

### 4. Knowledge Flow
- Map how ideas/themes spread through the network
- Identify "bridge" people connecting different communities
- Show information paths

### 5. Collaboration Potential
- Highlight underutilized connections
- Suggest introduction opportunities
- Identify "missing links" between communities

---

## 🔑 Key Files Reference

| File | Purpose | Edit When |
|------|---------|-----------|
| `app/network/page.tsx` | Main visualization page | Changing UI, adding features |
| `scripts/generate_network_data.py` | Generate network data | Adding data sources, changing connections |
| `data/network/summit-network.json` | Network data (auto-generated) | Run Python script to regenerate |
| `data/speakers/speakers.json` | Speaker information | New speakers added |
| `data/participants/session-participants.json` | Session participation | Session changes |
| `data/participants/participants.json` | All participants (historical) | Expanding to include past years |

---

## 📊 Current Network Stats Summary

```
📍 Day 1 Network (November 19, 2025)
   People: 53 (41 speakers + 12 participants)
   Connections: 218
   Organizations: 40
   Countries: 16
   Sessions: 4

🗄️ Historical Data Available (Not Yet Mapped)
   Total participants: 286 (2020-2024)
   Years covered: 5 years
   Potential for: Multi-year network evolution analysis
```

---

## ✨ Summary

You now have a professional, interactive network visualization that:
- ✅ Shows Day 1 2025 connections
- ✅ Is fully interactive and filterable
- ✅ Uses professional visualization library (Cytoscape.js)
- ✅ Is expandable to include historical data
- ✅ Can be exported to Kumu.io for advanced mapping
- ✅ Provides foundation for Catherine's megamapping work

**Access the network map:** `/network` on the live site

**For questions or enhancements:** Refer to this guide and the Cytoscape.js documentation.

---

**Created with ❤️ for the Nordic Circular Summit 2025**
*Empowering connections, visualizing impact, enabling collaboration*
