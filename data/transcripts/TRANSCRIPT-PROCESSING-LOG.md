# Transcript Processing Log
**Project**: Nordic Circular Summit 2025
**Last Updated**: November 25, 2025

---

## Processing Pipeline

### Standard Workflow
1. **Speaker Identification** - Create `DAY[X]-SESSION-[NAME]-SPEAKER-IDENTIFICATION.md`
2. **Clean Markdown** - Create `day[x]-session-[name]-CLEAN.md`
3. **JSON Transcript** - Create `day[x]-session-[name].json`
4. **Sessions Update** - Add transcript references to `sessions.json`
5. **Page Integration** - Add imports to `app/transcripts/page.tsx`
6. **Public Copy** - Copy files to `public/transcripts/` for downloads

---

## Day 1 Sessions - COMPLETED

| Session | Speaker ID | Clean MD | JSON | Page Integration |
|---------|------------|----------|------|------------------|
| Session 1: Circular Frontiers Opening | Done | Done | Done | Done |
| Session 2: Circular Ocean | Done | Done | Done | Done |
| Session 3: Locally Rooted Globally Connected | Done | Done | Done | Done |
| Session 4: Arctic Lifestyles | Done | Done | Done | Done |
| Session 5: Circular Cities | Done | Done | Done | Done |
| Day 1 Summary | Done | Done | Done | Done |

---

## Day 2 Sessions - COMPLETED

| Session | Speaker ID | Clean MD | JSON | Page Integration | Format Match |
|---------|------------|----------|------|------------------|--------------|
| Circular Design Toolbox | Done | Done | Done | Done | DONE |
| NBTT Textiles | Done | Done | Done | Done | DONE |
| Circular Construction | Done | Done | Done | Done | DONE |

---

## JSON Format Status - RESOLVED

### Standard Segment Format (Day 1 & Day 2)
All transcripts now use consistent segment structure:
```json
{
  "startTime": "09:22",
  "endTime": "09:23",
  "text": "Speaker content here...",
  "speakerId": "speaker-slug-id"
}
```

### Migration Completed: November 25, 2025
- NBTT Textiles: Already had correct format
- Circular Design Toolbox: Already had correct format
- Circular Construction: Migrated from `type`/`text` to `startTime`/`endTime`/`text`/`speakerId`

---

## Files Location Reference

### Source Files (for imports)
```
/data/transcripts/
├── day2-session-circular-construction.json
├── day2-session-circular-construction-CLEAN.md
├── DAY2-SESSION-CIRCULAR-CONSTRUCTION-SPEAKER-IDENTIFICATION.md
├── day2-session-circular-design-toolbox.json
├── day2-session-circular-design-toolbox-CLEAN.md
├── DAY2-SESSION-CIRCULAR-DESIGN-TOOLBOX-SPEAKER-IDENTIFICATION.md
├── day2-session-nbtt-textiles.json
├── day2-session-nbtt-textiles-CLEAN.md
└── DAY2-SESSION-NBTT-TEXTILES-SPEAKER-IDENTIFICATION.md
```

### Public Files (for downloads)
```
/public/transcripts/
├── [same files copied for direct download links]
```

---

## Integration Points

### page.tsx Imports Required
```typescript
// Day 2 imports
import day2CircularDesignToolboxTranscript from '@/data/transcripts/day2-session-circular-design-toolbox.json';
import day2NbttTextilesTranscript from '@/data/transcripts/day2-session-nbtt-textiles.json';
import day2CircularConstructionTranscript from '@/data/transcripts/day2-session-circular-construction.json';
```

### transcriptData Mapping
```typescript
'day2-circular-design-toolbox': day2CircularDesignToolboxTranscript,
'day2-nbtt-textiles': day2NbttTextilesTranscript,
'day2-circular-construction': day2CircularConstructionTranscript
```

### sessionDownloads Mapping
Each session needs entry with paths to:
- `transcript`: Clean markdown file
- `json`: JSON transcript file
- `speakerGuide`: Speaker identification document

---

## Notes

- Day 2 sessions are digital partner sessions (online format)
- Whisper transcriptions don't include timestamps
- Speaker identification done via contextual analysis
- Times are estimated based on session schedule and content proportions

---

*Log maintained by Claude Code*
