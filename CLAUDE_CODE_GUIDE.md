# Claude Code Quick Reference Guide

This guide shows you how to work with Claude Code for content production during and after the Nordic Circular Summit 2025.

## Quick Start

1. Open the project in Claude Code
2. Your transcripts go in `data/transcripts/`
3. Generated content goes in `outputs/`
4. All speakers, sessions, and organizations are already in the database

## Common Workflows

### 1. Processing Transcripts

#### Add a transcript file
```
You: "I've added a transcript file to data/transcripts/day1-opening.txt - can you process it?"

Claude Code will:
- Read the transcript
- Extract speaker segments
- Match speakers to the database
- Create structured output
```

#### Extract key information
```
"From the opening keynote transcript, extract:
- Top 10 quotes
- Main themes discussed
- Action items mentioned
- Key statistics or data points"
```

#### Identify speakers
```
"This transcript mentions several speakers. Can you identify them and
match them to our speakers database in data/speakers/speakers.json?"
```

### 2. Generating Articles

#### LinkedIn Article
```
"Create a LinkedIn article about the Circular Ocean Industries session.
Include:
- Engaging headline
- 3-4 paragraph summary
- Key quotes from speakers
- Call to action
Target length: 400-500 words"
```

#### Blog Post
```
"Write a blog post titled 'Arctic Innovation in Circular Economy' based on
the opening keynote. Make it storytelling-focused with specific examples
from the speakers."
```

#### Speaker Spotlight
```
"Create a speaker spotlight article about [speaker name]. Use their profile
from our database and incorporate insights from their session contributions."
```

### 3. Social Media Content

#### Multiple Posts at Once
```
"Generate 5 social media posts for LinkedIn based on Day 1 sessions:
- 3 quote posts (with attribution)
- 1 event highlight
- 1 behind-the-scenes moment
Include relevant hashtags and emoji where appropriate."
```

#### Platform-Specific
```
"Create Instagram carousel content (5 slides) about textile circularity
from the 'Locally Rooted' session. Include:
- Eye-catching statistics
- Speaker quotes
- Key takeaways
- Call to action"
```

#### Thread Format
```
"Create a Twitter/X thread (8-10 tweets) summarizing the main insights
from the Arctic & Nordic Lifestyles panel."
```

### 4. Creating Summaries

#### Session Summary
```
"Create a comprehensive summary of the [session name] including:
- Overview (2-3 sentences)
- Key speakers and their main points
- Themes and topics covered
- Actionable takeaways
- Notable quotes
Format: 300-400 words"
```

#### Daily Recap
```
"Create a daily recap of Day 1 covering all 4 sessions. Structure:
- Opening paragraph setting context
- Brief summary of each session
- Overarching themes
- Highlights and key moments
Target: 600-800 words"
```

#### Executive Summary
```
"Create an executive summary of the entire summit for stakeholders.
Include: key themes, major announcements, participant insights, and
recommendations. Format as a 1-page PDF-ready document."
```

### 5. Extracting Highlights

#### Quote Compilation
```
"Go through all transcripts and extract the 20 most impactful quotes
about circular economy innovation. Include speaker name, title, and
context for each quote."
```

#### Key Statistics
```
"Extract all statistics, data points, and numerical insights mentioned
across all sessions. Organize by theme (ocean economy, textiles,
construction, etc.)"
```

#### Action Items
```
"Identify all concrete action items, commitments, or next steps
mentioned by speakers throughout the summit."
```

### 6. Data Management

#### Update Speaker Info
```
"I have updated bios for 5 speakers. Here's the information:
[paste info]

Please update their profiles in data/speakers/speakers.json"
```

#### Link Speakers to Sessions
```
"The opening keynote had these speakers: [list names]
Can you update the session JSON to link them properly?"
```

#### Add New Organizations
```
"Add this organization to our database:
Name: [org name]
Type: corporate
Country: Norway
Description: [description]
Representatives: [speaker IDs]"
```

### 7. Cross-Referencing

#### Speaker Session Mapping
```
"Create a report showing which speakers appeared in which sessions,
organized by speaker name."
```

#### Topic Analysis
```
"Analyze all sessions and identify the top 10 most discussed topics.
For each topic, show which sessions covered it and key points made."
```

#### Organization Presence
```
"Generate a report of all organizations represented at the summit,
showing their representatives and which sessions they participated in."
```

## File Naming Conventions

### Transcripts
```
data/transcripts/
├── day1-opening-keynote.txt
├── day1-ocean-industries.txt
├── day1-locally-rooted.txt
└── day1-arctic-lifestyles.txt
```

### Articles
```
outputs/articles/
├── 2025-11-19-opening-keynote-summary.md
├── 2025-11-19-ocean-industries-insights.md
└── speaker-spotlight-alexandra-leeper.md
```

### Social Media
```
outputs/social-media/
├── linkedin-day1-highlights.md
├── instagram-textile-circularity.md
└── twitter-keynote-thread.md
```

## Pro Tips

### 1. Reference the Database
```
"Using our speakers database, create profiles of all government
representatives and their key policy positions mentioned in sessions."
```

### 2. Batch Processing
```
"Process all 4 Day 1 transcripts and create:
- Individual session summaries
- Combined daily highlight reel
- Social media content pack (10 posts)
- Key quotes document"
```

### 3. Maintain Consistency
```
"Using the article template in README.md, create articles for all sessions
maintaining consistent structure and tone."
```

### 4. Verify Information
```
"Before we publish this article, can you verify all speaker titles and
organizations against our database?"
```

### 5. Multi-Format Output
```
"Create content about circular construction in 3 formats:
1. LinkedIn article (500 words)
2. Twitter thread (10 tweets)
3. Email newsletter section (200 words)"
```

## Example Complete Workflow

### From Recording to Published Content

```
Step 1: Add transcript
"I've uploaded day1-ocean-industries.txt to data/transcripts/"

Step 2: Process and validate
"Process this transcript, identify speakers, and extract key themes."

Step 3: Generate content
"Create a LinkedIn article and 5 social posts from this session."

Step 4: Review and edit
[Review generated content, make edits as needed]

Step 5: Commit to GitHub
"Can you help me commit these outputs with an appropriate message?"

Step 6: Deploy
[Changes auto-deploy to Vercel]
```

## Data Structure Quick Reference

### Speaker Object Fields
- id, name, title, organization, country
- category (government, corporate, academic, etc.)
- bio, photo, sessions, topics

### Session Object Fields
- id, day, title, startTime, endTime
- type (keynote, panel, workshop, digital)
- description, speakers, moderators
- topics, location, transcriptFile

### Organization Object Fields
- id, name, type, country
- description, website, logo
- representatives (speaker IDs)

## Getting Help

### Check Existing Data
```
"Show me all speakers from Greenland"
"List all Day 1 sessions with their timings"
"What organizations are in the 'partner' category?"
```

### Understand Relationships
```
"How are speakers linked to sessions in our data structure?"
"Show me an example of how to add a new speaker"
```

### Generate Templates
```
"Create a template for a speaker spotlight article"
"Show me the format for a social media content pack"
```

## Best Practices

1. **Always reference the database** - Don't guess speaker names or titles
2. **Use consistent formatting** - Follow templates in README.md
3. **Verify before publishing** - Ask Claude Code to cross-check facts
4. **Commit frequently** - Save work in small, logical chunks
5. **Add context** - Provide session context when generating content
6. **Review outputs** - AI-generated content should be reviewed by humans
7. **Update the database** - Keep speaker/session info current

## Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Commit changes
git add .
git commit -m "Description of changes"
git push

# Deploy to Vercel
vercel --prod
```

---

**Remember**: Claude Code has access to all your structured data. The more context you provide, the better the output. Reference specific sessions, speakers, and themes from the database for optimal results.
