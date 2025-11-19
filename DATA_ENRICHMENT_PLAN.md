# Data Enrichment Plan - Nordic Circular Summit 2025

**Status**: In Progress
**Date**: November 19, 2025
**Goal**: Enrich the summit platform with comprehensive network data, historical participation records, and detailed contact information

---

## 📊 Data Source Analysis

### Current Project Data
- **40 speakers** - Basic info: name, title, organization, bio, photo
- **6 sessions** - Schedule and descriptions
- **17 organizations** - Basic organizational data
- **Social media posts** - Historical content

### SUMMIT LIBRARY Data Sources

#### 1. Historical Network Database
**File**: `Håvard noder og koblinger - Summit Konsolidert.csv`
- **265+ contacts** from summits 2020-2024
- **Fields**:
  - Name, Organization, Title, Email, Phone, LinkedIn
  - Country, Year(s) participated, Segment
- **Use**: Create comprehensive participant database with historical context

#### 2. Session-Specific Participant Lists (Notion Exports)
**Files**: Session CSVs from `drive-download-20251119T171303Z-1-001/`
- Opening Session, Ocean Industries, Locally Rooted, Arctic Lifestyles, Circular Regions & Cities
- **Fields**:
  - Name, Email, Gender, Organization, Country
  - Role (Speaker, Moderator, Participant)
  - Status (Confirmed, Declined, In Contact)
  - Presence (Nuuk, Digital)
  - Bio/Photo/Logo delivery status
  - Time assignments
- **Use**: Link participants to specific sessions, track roles and attendance mode

#### 3. Names Database (2025 Summit)
**File**: `Names 26ff447d5b4380498c0dc0b2267a417e.csv`
- All contacts in dialog for 2025 summit
- Contains detailed Notion metadata
- **Use**: Current year participant tracking

#### 4. Additional Resources
- Session folders with keynotes and presentations
- Working documents with session descriptions
- Participant overview Excel files
- Partner session information

---

## 🎯 Enrichment Strategy

### Phase 1: Data Model Extension
**Create new TypeScript interfaces for:**
1. **Participant** - Extended person entity
   - All speaker fields plus contact info (email, phone, LinkedIn)
   - Historical participation (years attended)
   - Session roles and assignments
   - Bio/photo/logo delivery status
   - Presence mode (physical/digital)

2. **Contact** - Historical network contact
   - May not be a current speaker but attended previous summits
   - Organizational affiliations
   - Participation history

3. **SessionParticipant** - Junction entity
   - Links participants to sessions
   - Tracks role (speaker, moderator, panelist, attendee)
   - Status (confirmed, declined, pending)
   - Time assignments

4. **ParticipationHistory** - Historical tracking
   - Year, role, session(s)
   - Organization at time of participation

### Phase 2: Data Import & Merge
1. **Import historical network data** (265+ contacts)
2. **Match and enrich current speakers** with:
   - Email addresses
   - Phone numbers
   - LinkedIn profiles
   - Historical participation data
3. **Import session participant lists** for all 6 sessions
4. **Create participant-session relationships**
5. **Deduplicate and consolidate** overlapping records

### Phase 3: New Features & UI
1. **Participants Page** - Browse all 265+ network contacts
   - Filter by year, organization, country, segment
   - Search by name, organization, or expertise

2. **Enhanced Speaker Profiles** - Add:
   - Contact information (email, phone, LinkedIn)
   - Participation history timeline
   - Sessions they're involved in

3. **Session Detail Enhancement** - Show:
   - All participants (not just speakers)
   - Roles (speaker, moderator, panelist)
   - Attendance mode (physical/digital)
   - Status indicators

4. **Network Graph/Connections** - Visualize:
   - Who attended which years
   - Organizational networks
   - Cross-session participation

5. **Search & Filter** - Advanced search across:
   - All participants (current + historical)
   - Organizations
   - Sessions and topics

---

## 📁 Proposed Data Structure

### New Data Files
```
/data/
  /participants/
    participants.json          # All 265+ participants (superset of speakers)
    participation-history.json # Historical attendance records
    session-participants.json  # Session-participant relationships
  /contacts/
    network-contacts.json      # Historical network database
```

### TypeScript Schema Updates
```typescript
interface Participant {
  id: string;
  name: string;
  title: string;
  organization: string;
  country: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  bio?: string;
  photo?: string;
  gender?: 'Male' | 'Female' | 'Other';
  segment?: string; // government, corporate, academic, etc.
  participationHistory: ParticipationRecord[];
  sessionRoles: SessionRole[];
  bioDelivered?: boolean;
  photoDelivered?: boolean;
  logoDelivered?: boolean;
}

interface ParticipationRecord {
  year: number;
  role?: string;
  organization: string;
  sessions?: string[]; // session IDs
}

interface SessionRole {
  sessionId: string;
  role: 'speaker' | 'moderator' | 'panelist' | 'attendee';
  status: 'confirmed' | 'declined' | 'pending' | 'in_contact';
  presence: 'nuuk' | 'digital' | 'hybrid';
  timeSlot?: string;
  presentationDelivered?: boolean;
}
```

---

## 🚀 Implementation Plan

### Step 1: Schema & Type Definitions ✓
- [x] Analyze existing data structures
- [ ] Create extended TypeScript interfaces
- [ ] Update lib/types.ts

### Step 2: Data Import Scripts
- [ ] Parse historical CSV (265+ contacts)
- [ ] Parse session participant CSVs (6 sessions)
- [ ] Parse Names database
- [ ] Create data transformation scripts

### Step 3: Data Merging & Enrichment
- [ ] Match historical contacts with current speakers
- [ ] Enrich speaker profiles with contact info
- [ ] Link participants to sessions
- [ ] Build participation history records

### Step 4: Data Validation
- [ ] Check for duplicates
- [ ] Validate email formats
- [ ] Ensure referential integrity (sessions, organizations)

### Step 5: UI Development
- [ ] Create /participants page
- [ ] Enhance speaker profile pages
- [ ] Update session detail pages
- [ ] Build search/filter components
- [ ] Add contact information display (with privacy controls)

### Step 6: Testing & Deployment
- [ ] Test data integrity
- [ ] Verify UI functionality
- [ ] Git commit and push
- [ ] Deploy to Vercel

---

## 📊 Expected Outcomes

### Quantitative
- **265+ participant profiles** (up from 40 speakers)
- **5 years of historical data** (2020-2024)
- **Complete contact database** (email, phone, LinkedIn)
- **Session-participant mappings** for all 6 sessions
- **Network visualization** capabilities

### Qualitative
- **Enhanced networking** - Users can find and connect with relevant contacts
- **Historical context** - Understanding who has been involved over time
- **Better planning** - Track delivery status, attendance mode, time assignments
- **Rich profiles** - Complete contact information for outreach

---

## 🔒 Privacy Considerations

- Email/phone displayed only to authenticated users
- LinkedIn profiles are public links (OK to show)
- Consider adding opt-in/opt-out for contact info display
- Bio/photo/logo delivery status is internal metadata (not public)

---

## 📝 Notes

- Historical CSV contains participants from 2020-2024
- Some current speakers already exist in historical data (can enrich)
- Session CSVs contain Notion URLs (can be stripped)
- Need to handle multiple email addresses (some entries have multiple)
- Gender data available for many participants
- Time assignments tracked in minutes for session planning

---

**Next Action**: Create TypeScript interfaces and begin data import
