# Nordic Circular Summit 2025 - Content Hub

This is the official content management and production hub for the Nordic Circular Summit 2025. It serves as both a web interface for team collaboration and a structured workspace for AI-assisted content creation with Claude Code.

## Event Information

- **Event**: Nordic Circular Summit 2025
- **Theme**: "Circular Frontiers: Shaping our Future"
- **Dates**: November 19-20, 2025
- **Location**: Hans Egede Hotel, Nuuk, Greenland (+ Online)
- **Website**: https://nordiccircularhotspot.org/summit/nordic-circular-summit-2025

## Project Purpose

This repository provides:

1. **Centralized Knowledge Base** - All summit data (speakers, sessions, organizations) in structured JSON format
2. **Web Interface** - Browse and search summit content via a Next.js app deployed to Vercel
3. **AI Content Production** - Structured data enables Claude Code to generate articles, social posts, highlights, and more
4. **Team Collaboration** - Git-based workflow for reviewing and editing content
5. **Transcription Management** - Organized storage and processing of session recordings

## Project Structure

```
nordic-circular-summit-2025/
├── data/                    # Core structured data
│   ├── speakers/           # Speaker profiles (40 speakers)
│   ├── sessions/           # Session information (5 sessions)
│   ├── organizations/      # Participating organizations (17 orgs)
│   ├── themes/            # Circular economy themes
│   ├── transcripts/       # Session transcripts (add your .txt/.srt files here)
│   └── event.json         # Event metadata
├── outputs/                # Generated content
│   ├── articles/          # Long-form articles
│   ├── social-media/      # Social media posts
│   ├── highlights/        # Key quotes and moments
│   └── summaries/         # Session summaries
├── app/                   # Next.js application
│   ├── speakers/          # Speakers page
│   ├── sessions/          # Sessions page
│   ├── organizations/     # Organizations page
│   └── page.tsx          # Homepage
├── lib/                   # Utilities
│   ├── types.ts          # TypeScript interfaces
│   └── data.ts           # Data access functions
└── public/media/         # Images and media
    ├── speaker-photos/
    ├── logos/
    └── session-images/
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## Working with Claude Code

This project is optimized for AI-assisted content creation. Here are common workflows:

### Transcription Processing

1. Add your audio/video files or transcripts to `data/transcripts/`
2. Use Claude Code:
   - "Transcribe the session recording in data/transcripts/day1-session1.mp4"
   - "Extract key quotes from the Circular Ocean Industries session"
   - "Identify all speakers in this transcript and match them to our speakers database"

### Content Generation

```
Claude Code prompts:

- "Create a LinkedIn article about the opening keynote"
- "Generate 5 social media posts highlighting the ocean industries panel"
- "Write a 500-word summary of Day 1 sessions"
- "Extract the top 10 quotes from all sessions"
- "Create an article about [speaker name]'s insights on circular textiles"
```

### Data Management

```
- "Add a new speaker: [name], [title], [organization]"
- "Update the Circular Frontiers session with the actual speakers"
- "Link transcript segments to specific speakers"
- "Create a report of all speakers by country"
```

## Data Schema

### Speaker Object
```typescript
{
  id: string;
  name: string;
  title: string;
  organization: string;
  country: string;
  category: 'government' | 'corporate' | 'academic' | etc.;
  bio: string;
  sessions: string[];  // session IDs
  topics: string[];
}
```

### Session Object
```typescript
{
  id: string;
  day: number;
  title: string;
  startTime: string;
  endTime: string;
  speakers: string[];  // speaker IDs
  transcriptFile: string;
  topics: string[];
}
```

See `lib/types.ts` for complete schema definitions.

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow the prompts to link to your Vercel account and deploy.

### GitHub Integration

1. Push to GitHub
2. Import repository in Vercel
3. Auto-deploy on every push to main branch

## Team Workflow

### Adding Transcripts

1. Create a branch: `git checkout -b transcripts/day1-session1`
2. Add transcript file to `data/transcripts/`
3. Update session JSON with `transcriptFile` path
4. Commit and push
5. Create pull request for review

### Creating Content

1. Use Claude Code to generate content in `outputs/` directory
2. Review and edit as needed
3. Commit with descriptive message
4. Content is version-controlled and accessible to team

### Updating Data

1. Edit JSON files in `data/` directory
2. Run `npm run dev` to verify changes
3. Commit and push
4. Changes automatically deploy to Vercel

## Content Templates

### Article Template
```markdown
# [Title]

**Session**: [Session Name]
**Speakers**: [Speaker 1], [Speaker 2]
**Date**: November XX, 2025

## Summary
[3-4 sentence summary]

## Key Insights
- Point 1
- Point 2
- Point 3

## Quotes
> "[Notable quote]" - [Speaker Name]

## Conclusion
[Wrap-up paragraph]
```

### Social Media Post Template
```
🌍 [Hook/Opening]

[2-3 sentences of content]

🗣️ Featured: [Speaker Name], [Title]

#CircularEconomy #NordicCircularSummit #Sustainability

[Link to full article]
```

## Contributing

This is a team project. Guidelines:

1. **Branch naming**: `feature/`, `content/`, `transcripts/`, `fix/`
2. **Commit messages**: Clear, descriptive (e.g., "Add Day 1 session transcripts")
3. **Pull requests**: Request review before merging
4. **Content review**: All outputs should be reviewed before external publication

## Data Sources

- Event information: https://nordiccircularhotspot.org/summit/nordic-circular-summit-2025
- Speaker profiles: https://nordiccircularhotspot.org/summit/nordic-circular-summit-2025/speakers-2025
- Session recordings: [To be added during/after event]

---

**Built with**: Next.js 16, TypeScript, Tailwind CSS, Vercel
**AI Integration**: Claude Code optimized
**Last Updated**: November 19, 2025
