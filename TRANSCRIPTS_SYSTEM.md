# Transcripts Management System

**Status**: ✅ Complete
**Date**: November 19, 2025

---

## 🎯 Overview

Comprehensive system for managing session recordings, transcripts, and notes. Designed to handle full-day recordings that need to be separated into session parts according to the program structure.

---

## ✨ Features

### 1. **Session-Based Organization**
- List all sessions with transcript status
- Visual indicators for completion status
- Easy navigation between sessions

### 2. **Session Parts Structure**
Each session is divided into parts based on the program:
- Welcome & Opening Remarks
- Keynotes
- Panel Discussions
- Q&A Sessions
- Closing Remarks

### 3. **Dual-Level Notes**
- **Session-level notes**: Overall observations and context
- **Part-level notes**: Specific insights for each program segment

### 4. **Transcript Management**
- Add transcript text for each part separately
- Based on time markers from program
- Easy to paste from transcription services
- Supports full-day recording workflow

### 5. **Status Tracking**
- `pending` - Not started
- `in_progress` - Currently being transcribed
- `completed` - Fully transcribed
- `needs_review` - Requires quality check

---

## 📊 Data Model

### Transcript Structure

```typescript
interface Transcript {
  id: string;
  sessionId: string;
  date: string;
  recordingFile?: string;
  transcriptionStatus: 'pending' | 'in_progress' | 'completed' | 'needs_review';
  notes?: string; // Overall session notes
  metadata: {
    duration?: string;
    recordedBy?: string;
    transcribedBy?: string;
    language?: string;
  };
  parts: SessionPart[];
}

interface SessionPart {
  id: string;
  title: string;
  startTime: string; // e.g., "09:15"
  endTime: string;   // e.g., "09:30"
  description?: string;
  speakers: string[]; // speaker IDs
  segments: TranscriptSegment[];
  notes?: string; // Part-specific notes
}

interface TranscriptSegment {
  startTime: string;
  endTime: string;
  text: string;
  speakerId?: string;
}
```

---

## 🔧 How to Use

### For Full-Day Recordings

1. **Prepare Your Recording**
   - Have your full day recording file ready
   - Note the total duration

2. **Select a Session**
   - Click on a session from the list
   - View the pre-defined session parts

3. **Add Transcripts Part by Part**
   For each part:
   - Note the time range (e.g., 09:15 - 09:30)
   - Locate that segment in your full-day recording
   - Transcribe or paste the transcript text
   - Add notes for context or key points

4. **Session Parts Example**

   For "Opening Session":
   ```
   Part 1: Cultural Opening (09:15-09:22)
   Part 2: Welcome Remarks (09:22-09:30)
   Part 3: Arctic Perspectives (09:30-09:40)
   Part 4: Nordic Panel (09:43-10:10)
   ...
   ```

5. **Add Notes**
   - **Session notes**: Overall themes, important decisions, follow-ups
   - **Part notes**: Key quotes, action items, speaker highlights

---

## 📋 Workflow Example

### Day 1 Recording Process

1. **Before the Event**
   - Set up recording equipment
   - Confirm program times match session parts

2. **During the Event**
   - Record the full day
   - Note any time deviations from program

3. **After the Event**
   - Upload recording to secure storage
   - Link recording file in transcript metadata

4. **Transcription**
   - Use time markers to navigate recording
   - Transcribe each part in order
   - Add speaker attributions where possible
   - Add notes for clarity

5. **Review**
   - Mark as "needs_review"
   - Have moderator or speaker review
   - Update status to "completed"

---

## 🎨 UI Components

### Session List (Left Panel)
- Shows all sessions
- Status badges
- Active session highlight
- Quick navigation

### Transcript Editor (Right Panel)
- Session header with metadata
- Session-level notes editor
- Expandable session parts
- Part-specific transcript and notes editors

### Session Part Cards
Each part card shows:
- Part number and title
- Time range
- Description
- Speakers involved
- Completion indicators (✓ Transcript, 📝 Notes)

**Expanded view includes:**
- Notes editor
- Transcript text editor
- Helper instructions with time markers

---

## 📁 File Structure

```
/data/transcripts/
  transcripts.json                    # Main transcript list
  session-1-opening-template.json     # Template for Session 1
  session-2-ocean-template.json       # Template for Session 2
  ...

/app/transcripts/
  page.tsx                            # Main transcripts UI
```

---

## 🔄 Workflow States

### 1. Pending
- Session template created
- No transcript data yet
- Parts defined from program

### 2. In Progress
- Some parts transcribed
- Notes being added
- Ongoing work

### 3. Needs Review
- All parts transcribed
- Awaiting quality check
- May need corrections

### 4. Completed
- All parts transcribed
- Notes finalized
- Quality approved

---

## 💡 Best Practices

### Transcription

1. **Work sequentially** - Start from first part and work through in order
2. **Use timestamps** - Always reference the time markers
3. **Speaker attribution** - Note who is speaking when possible
4. **Key quotes** - Mark important quotes in notes
5. **Action items** - Capture decisions and follow-ups

### Notes

1. **Context** - Add background that won't be in transcript
2. **Clarity** - Explain acronyms, references, or inside jokes
3. **Highlights** - Note exceptional insights or moments
4. **Corrections** - If actual time differs from program, note it
5. **Follow-ups** - Track commitments or questions raised

---

## 📝 Template Structure

Each session comes with a pre-defined template based on the program:

```json
{
  "id": "transcript-session-1-opening",
  "sessionId": "session-1-opening",
  "date": "2025-11-19",
  "transcriptionStatus": "pending",
  "parts": [
    {
      "id": "part-cultural-opening",
      "title": "Cultural Opening - NAPA",
      "startTime": "09:15",
      "endTime": "09:22",
      "description": "Traditional Greenlandic cultural opening",
      "speakers": [],
      "segments": [],
      "notes": ""
    },
    // ... more parts
  ]
}
```

---

## 🚀 Future Enhancements

### Potential Features

1. **Audio Upload** - Direct audio file upload and storage
2. **Auto-transcription** - Integration with transcription services (Whisper, Rev.ai)
3. **Speaker Detection** - Automatic speaker diarization
4. **Export** - Export to PDF, Word, or subtitle formats
5. **Search** - Full-text search across all transcripts
6. **Timestamps** - Clickable timestamps to jump to audio position
7. **Collaboration** - Multiple users can edit and review
8. **Version History** - Track changes to transcripts
9. **AI Summary** - Auto-generate session summaries
10. **Translation** - Multi-language support

---

## 🎯 Use Cases

### 1. Content Creation
- Use transcripts to write articles
- Extract quotes for social media
- Create session summaries
- Generate highlights

### 2. Documentation
- Official session records
- Reference for speakers
- Archive for future summits
- Research material

### 3. Accessibility
- Provide text for hearing-impaired
- Create subtitles for videos
- Enable translation
- Search functionality

### 4. Analysis
- Topic modeling
- Speaker analysis
- Engagement metrics
- Key themes identification

---

## 📊 Example: Opening Session Parts

Based on the actual program:

| Part | Title | Time | Duration | Speakers |
|------|-------|------|----------|----------|
| 1 | Cultural Opening - NAPA | 09:15-09:22 | 7 min | Performance |
| 2 | Welcome & Opening | 09:22-09:30 | 8 min | Einar Kleppe Holthe |
| 3 | Arctic Perspectives | 09:30-09:40 | 10 min | Gorm Vold, Eva Jørgensen |
| 4 | Nordic Innovation Intro | 09:40-09:43 | 3 min | Marthe Haugland, Peter Munch Madsen |
| 5 | Nordic Arctic Panel | 09:43-10:10 | 27 min | 6 panelists |
| 6 | Reflection: New Nordics | 10:11-10:19 | 8 min | Einar, Agita |
| 7 | Program Presentation | 10:20-10:30 | 10 min | Cathrine, Eva |

**Total**: 73 minutes organized into 7 parts

---

## ✅ Benefits

### Organizational
- Structured approach to managing long recordings
- Easy to delegate transcription tasks
- Clear progress tracking
- Quality control built-in

### User Experience
- Intuitive interface
- Visual feedback on completion
- Easy navigation between parts
- Context-aware editing

### Data Quality
- Consistent structure across sessions
- Speaker attribution
- Time-stamped segments
- Rich metadata

---

## 🔒 Data Management

### Storage
- Transcripts stored in JSON format
- Easy to version control
- Exportable for backup
- Future: Database integration

### Privacy
- Recordings stored securely
- Access control via authentication
- Optional speaker approval workflow

---

## 📚 Quick Reference

### Keyboard Shortcuts (Future)
- `Ctrl/Cmd + S` - Save notes
- `Ctrl/Cmd + E` - Edit mode toggle
- `↑/↓` - Navigate parts
- `Enter` - Expand/collapse part

### Status Colors
- 🟡 **Pending** - Yellow
- 🔵 **In Progress** - Blue
- 🟢 **Completed** - Green
- 🟠 **Needs Review** - Orange

---

## 🎊 Conclusion

The Transcripts Management System provides a complete solution for handling full-day recordings, organizing them into session parts, and adding rich notes and context. The structure is based on the actual program, making it easy to locate and transcribe specific segments.

**Ready to use!** Navigate to `/transcripts` to start managing session recordings.

---

**URL**: http://localhost:3001/transcripts
