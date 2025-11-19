# Quick Start Guide

## Your Local Development Environment

**Project Location**: `/Users/gabrielboen/nordic-circular-summit-2025/nordic-circular-summit-2025/`

**Local URLs**:
- 🌐 **Website**: http://localhost:3000
- 📡 **Network**: http://192.168.10.117:3000 (accessible from other devices on your network)

**Production URL**:
- ✅ **Live Site**: https://nordic-circular-summit-2025-cky33fd0s-justarides-projects.vercel.app

## Server Status

✅ **Development server is running!**

The server auto-started when you opened this project. Any changes you make to files will automatically reload in the browser.

## Quick Commands

```bash
# Navigate to project
cd /Users/gabrielboen/nordic-circular-summit-2025/nordic-circular-summit-2025/

# Start development server (if not already running)
npm run dev

# Stop the server
# Press Ctrl+C in the terminal running npm run dev

# Build for production
npm run build

# Run production build locally
npm run build && npm start
```

## Project Structure Overview

```
nordic-circular-summit-2025/
│
├── 📁 data/                    # Your source data
│   ├── speakers/              # 40 speaker profiles
│   ├── sessions/              # 5 session details
│   ├── organizations/         # 17 organizations
│   ├── themes/               # 10 circular economy themes
│   └── transcripts/          # 👈 ADD YOUR TRANSCRIPTS HERE
│
├── 📁 outputs/                 # Generated content
│   ├── articles/             # 👈 ARTICLES GO HERE
│   ├── social-media/         # 👈 SOCIAL POSTS GO HERE
│   ├── highlights/           # 👈 QUOTES GO HERE
│   └── summaries/            # 👈 SUMMARIES GO HERE
│
├── 📁 app/                     # Website pages
│   ├── page.tsx              # Homepage
│   ├── speakers/             # Speakers page
│   ├── sessions/             # Sessions page
│   └── organizations/        # Organizations page
│
├── 📁 lib/                     # Utilities
│   ├── types.ts              # TypeScript definitions
│   └── data.ts               # Data access functions
│
└── 📁 public/media/           # Images & assets
    ├── speaker-photos/       # 👈 ADD SPEAKER PHOTOS HERE
    ├── logos/                # 👈 ADD ORG LOGOS HERE
    └── session-images/       # 👈 ADD SESSION IMAGES HERE
```

## Working with Transcripts

### Step 1: Add Your Transcript File
```bash
# Copy your transcript to the transcripts folder
cp ~/Downloads/session-recording.txt data/transcripts/day1-opening-keynote.txt
```

### Step 2: Use Claude Code to Process It
Open Claude Code and say:
```
"Process the transcript in data/transcripts/day1-opening-keynote.txt and:
1. Identify all speakers
2. Extract key themes
3. Pull out top 10 quotes"
```

### Step 3: Generate Content
```
"From this transcript, create:
- A LinkedIn article (500 words)
- 5 social media posts
- A session summary"
```

## Making Changes

### Edit Data
1. Open any JSON file in `data/` folder
2. Make your changes
3. Save the file
4. **Refresh your browser** - changes appear instantly!

Example: Add a speaker bio
```bash
# Edit the speakers file
code data/speakers/speakers.json

# Find the speaker and update their "bio" field
# Save the file
# Refresh localhost:3000/speakers
```

### Add Content
1. Create files in `outputs/` folders
2. Use Claude Code to generate content
3. Review and edit as needed

### Update Website Pages
1. Edit files in `app/` folder
2. Changes auto-reload in browser
3. No need to restart server!

## Publishing Your Changes

```bash
# Check what changed
git status

# Stage your changes
git add .

# Commit with a message
git commit -m "Add Day 1 transcripts and articles"

# Push to GitHub (auto-deploys to Vercel)
git push
```

**⏱️ Your changes will be live on Vercel in ~30 seconds!**

## Common Tasks

### View the Website Locally
Just open: http://localhost:3000

### Add a New Speaker
1. Edit `data/speakers/speakers.json`
2. Add new speaker object following the existing format
3. Save and refresh browser

### Create an Article
```
Ask Claude Code:
"Create a LinkedIn article about [topic] and save it to
outputs/articles/article-name.md"
```

### Generate Social Posts
```
Ask Claude Code:
"Create 5 LinkedIn posts about the ocean industries session
and save them to outputs/social-media/"
```

### Add Speaker Photos
```bash
# Copy photos to the right folder
cp ~/Downloads/speaker-photo.jpg public/media/speaker-photos/speaker-name.jpg

# Update the speaker JSON
# Edit data/speakers/speakers.json
# Find the speaker and update their "photo" field to "/media/speaker-photos/speaker-name.jpg"
```

## Troubleshooting

### Server Not Running?
```bash
npm run dev
```

### Port 3000 Already in Use?
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill

# Start again
npm run dev
```

### Changes Not Showing?
1. Check that you saved the file
2. Hard refresh browser (Cmd+Shift+R on Mac)
3. Check terminal for errors

### Need to Rebuild?
```bash
# Stop the server (Ctrl+C)
# Delete the build cache
rm -rf .next

# Start fresh
npm run dev
```

## File Naming Conventions

### Transcripts
- `day1-opening-keynote.txt`
- `day1-ocean-industries.txt`
- `day2-partner-session-1.txt`

### Articles
- `2025-11-19-opening-keynote-summary.md`
- `2025-11-20-speaker-spotlight-name.md`

### Social Media
- `linkedin-day1-highlights.md`
- `instagram-ocean-economy-quotes.md`

## Tips for Claude Code

**Good Prompts**:
```
✅ "Process data/transcripts/day1-opening.txt and extract speakers"
✅ "Create an article about circular textiles from the locally-rooted session"
✅ "Generate 5 social posts highlighting ocean economy insights"
✅ "Update speaker [name]'s bio with this information: [paste info]"
```

**Less Effective**:
```
❌ "Write something about the summit"
❌ "Make a post"
❌ "Add a speaker" (without details)
```

## Resources

- **README.md** - Full documentation
- **CLAUDE_CODE_GUIDE.md** - Detailed AI prompts and workflows
- **PROJECT_SUMMARY.md** - What was built and why
- **GitHub**: https://github.com/justaride/nordic-circular-summit-2025

## Support

If you need help:
1. Check README.md for detailed documentation
2. Check CLAUDE_CODE_GUIDE.md for content generation examples
3. Ask Claude Code: "How do I [task]?"

---

## You're All Set! 🚀

- ✅ Development server running on http://localhost:3000
- ✅ GitHub repository connected
- ✅ Auto-deploy to Vercel configured
- ✅ 40 speakers, 5 sessions, 17 organizations loaded
- ✅ Ready for transcript processing and content generation

**Next Step**: Add your first transcript to `data/transcripts/` and start generating content!
